import { Injectable } from '@angular/core'

export interface Settings {
  clientId: string
  dev?: boolean
  options?: any
  placeholderImage?: string
  photoWidths: number[]
  photoHeights: number[]
}

@Injectable({
  providedIn: 'root'
})
export class CloudtasksService {
  public settings: Settings = {
    clientId: '',
    dev: false,
    options: {},
    placeholderImage: '',
    photoWidths: [
      7680,
      4096,
      3840,
      3600,
      3072,
      2560,
      2500,
      2048,
      2000,
      1920,
      1856,
      1824,
      1792,
      1600,
      1536,
      1520,
      1440,
      1400,
      1366,
      1365,
      1360,
      1280,
      1152,
      1080,
      1024,
      960,
      896,
      856,
      832,
      800,
      768,
      729,
      720,
      704,
      640,
      544,
      512,
      480,
      468,
      460,
      400,
      392,
      384,
      352,
      320,
      256,
      234,
      192,
      180,
      176,
      160,
      128,
      88,
      64,
      32,
      16,
      8
    ],
    photoHeights: [
      4320,
      4096,
      3600,
      3072,
      2613,
      2400,
      2252,
      2048,
      1600,
      1536,
      1440,
      1392,
      1368,
      1344,
      1340,
      1280,
      1200,
      1152,
      1128,
      1120,
      1080,
      1050,
      1024,
      992,
      960,
      900,
      870,
      864,
      856,
      854,
      800,
      788,
      768,
      766,
      720,
      624,
      600,
      576,
      540,
      486,
      484,
      483,
      480,
      400,
      384,
      372,
      350,
      348,
      342,
      320,
      300,
      288,
      256,
      240,
      200,
      192,
      144,
      135,
      132,
      120,
      96,
      72,
      64,
      60,
      55,
      32,
      31,
      16,
      8
    ]
  }

  constructor() {
    if (typeof window !== 'undefined' && this.canUseWebP()) {
      this.settings.options.convert = 'webp'
    }
  }

  /**
   * Gets the service base url
   * @returns
   */
  public serviceUrl(): string {
    return this.settings.dev
      ? 'cloudtasks-images-dev.global.ssl.fastly.net'
      : 'cloudtasks.global.ssl.fastly.net'
  }

  /**
   * Sets the client id
   * @param id
   */
  public setId(id: string): void {
    this.settings.clientId = id
  }

  /**
   * Gets the settings
   * @returns
   */
  public getSettings(): Settings {
    return this.settings
  }

  /**
   * Invalidate cache for given url
   * @param url
   */
  public invalidateCache(url: string): void {
    fetch('//' + this.serviceUrl() + '/' + this.settings.clientId + '/invalidate/' + url, {
      mode: 'no-cors'
    })
  }

  /**
   * Build url
   * @param url
   * @param [size= ] - Calculated size string.
   * @param [options= ] - Options string.
   *
   * @returns
   */
  public buildUrl(url: string, size: string = '', options: string = '/'): string {
    return (
      '//' +
      this.serviceUrl() +
      '/' +
      this.settings.clientId +
      options +
      size +
      '/' +
      encodeURIComponent(decodeURIComponent(url))
    )
  }

  /**
   * Checks if browser supports webp format
   * @returns
   */
  private canUseWebP(): boolean {
    const elem = document.createElement('canvas')
    return (
      elem.getContext &&
      elem.getContext('2d') &&
      elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
    )
  }
}
