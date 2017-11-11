import { NgModule, ModuleWithProviders } from '@angular/core'

import { CloudtasksDirective } from './ngx-image.directive'
import { CloudtasksService } from './ngx-image.service'

@NgModule({
  declarations: [CloudtasksDirective],
  exports: [CloudtasksDirective]
})
export class CloudtasksModule {
  constructor() {}

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CloudtasksModule,
      providers: [CloudtasksService]
    }
  }
}
