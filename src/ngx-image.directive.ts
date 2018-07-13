import {
  Directive,
  Injectable,
  ElementRef,
  Renderer2,
  Input,
  OnInit,
  AfterViewInit
} from '@angular/core'
import { CloudtasksService } from './ngx-image.service'

@Injectable()
@Directive({
  selector: '[ctSrc]',
  host: {
    '(error)': 'onError()'
  }
})
export class CloudtasksDirective implements OnInit, AfterViewInit {
  @Input('ctSrc') imageSource: string
  @Input() ctOptions: any
  @Input() ctPlaceholderImage: string
  @Input() ctSize: string
  @Input() ctForceSize: boolean

  private el: any

  private settings: any
  private width: number
  private height: number
  private optionsString: string = '/'

  private tries: number = 0

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private cloudtasks: CloudtasksService
  ) {
    this.el = this.elRef.nativeElement
    this.settings = this.cloudtasks.getSettings()
  }

  ngOnInit() {
    if (!this.settings.clientId.length) {
      throw 'Cloudtasks: You need to configure your clientId.'
    }

    if (!this.imageSource) {
      throw 'Cloudtasks: You need to provide an URL string on [ngSrc].'
    }
  }

  ngAfterViewInit() {
    this.parseOptions()

    if (this.isLocal() || typeof window === 'undefined') {
      return this.renderer.setAttribute(this.el, 'src', this.imageSource)
    }

    if (this.ctSize) {
      this.init()
    } else {
      let element = this.el
      let style = (
        ((typeof window !== 'undefined' && window) as any) || (global as any)
      ).getComputedStyle(element)
      this.width = parseInt(style.width, 10) || 0
      this.height = parseInt(style.height, 10) || 0

      while (
        (element = element !== null ? element.parentNode : void 0) instanceof Element &&
        (this.width <= 0 || this.height <= 0)
      ) {
        style = (
          ((typeof window !== 'undefined' && window) as any) || (global as any)
        ).getComputedStyle(element)
        this.width = parseInt(style.width, 10)
        this.height = parseInt(style.height, 10)
      }

      this.init()
    }
  }

  init() {
    if (this.ctPlaceholderImage || this.settings.placeholderImage) {
      this.renderer.setStyle(this.el, 'background-image', 'url(//' + this.getDefaultURL() + ')')
    }

    this.renderer.setAttribute(this.el, 'src', this.getURL())
  }

  onError() {
    if (this.tries === 0) {
      this.tries += 1
      if (this.ctPlaceholderImage || this.settings.placeholderImage) {
        this.renderer.setAttribute(this.el, 'src', this.getDefaultURL())
      }
    } else if (this.tries === 1) {
      this.tries += 1
      this.renderer.setAttribute(this.el, 'src', this.imageSource)
    } else if (this.tries === 2) {
      this.tries += 1
      this.renderer.setAttribute(this.el, 'src', this.getErrorURL())
    }
  }

  getURL(): string {
    return this.cloudtasks.buildUrl(
      this.cloudtasks.resolve(this.imageSource),
      this.getSize(),
      this.optionsString
    )
  }

  getDefaultURL(): string {
    return this.cloudtasks.buildUrl(
      this.cloudtasks.resolve(this.ctPlaceholderImage || this.settings.placeholderImage),
      this.getSize(),
      this.optionsString
    )
  }

  getErrorURL(): string {
    return this.cloudtasks.buildUrl(
      'https://cloudtasks.ctcdn.co/images/cloudtasks_fill_blue-512x512.png',
      this.getSize(),
      this.optionsString
    )
  }

  isLocal(): boolean {
    const a = this.renderer.createElement('a')
    a.href = this.imageSource
    return /localhost$|\.local$|:\d{2,4}$/i.test(a.hostname)
  }

  getSize(): string {
    let calc = ''

    if (this.ctSize) {
      calc = this.ctSize
    } else {
      if (!this.ctForceSize) {
        if (this.width) {
          for (var x = 0; x < this.settings.photoWidths.length; x++) {
            if (this.settings.photoWidths[x] < this.width) {
              calc += this.settings.photoWidths[x - 1]
                ? this.settings.photoWidths[x - 1]
                : this.settings.photoWidths[x]
              break
            }
          }
        }

        if (this.height && (!this.width || this.width / this.height <= 4)) {
          for (var y = 0; y < this.settings.photoHeights.length; y++) {
            if (this.settings.photoHeights[y] < this.height) {
              calc +=
                'x' +
                (this.settings.photoHeights[y - 1]
                  ? this.settings.photoHeights[y - 1]
                  : this.settings.photoHeights[y])
              break
            }
          }
        }
      } else {
        if (this.width) {
          calc = this.width.toString()
        }

        if (this.height) {
          calc = calc + 'x' + this.height
        }
      }

      if (!calc) {
        calc = 'origxorig'
      } else if (calc.toString().indexOf('x') === -1) {
        calc = calc + 'x'
      }
    }

    return calc
  }

  parseOptions() {
    let options = Object.assign({}, this.settings.options)

    if (this.ctOptions) {
      options = Object.assign(options, this.ctOptions)
    }

    let optionsString = '/'

    for (let key in options) {
      if (!options.hasOwnProperty(key)) {
        continue
      }

      const value = options[key]

      if (value) {
        if (typeof value === 'string') {
          optionsString = optionsString + key + ':' + value + '/'
        } else {
          optionsString = optionsString + key + '/'
        }
      }
    }

    this.optionsString = optionsString
  }
}
