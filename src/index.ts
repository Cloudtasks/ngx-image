import { NgModule, ModuleWithProviders } from '@angular/core';

import { CloudtasksDirective } from './directive';
import { CloudtasksService } from './service';

export * from './directive';
export * from './service';

@NgModule({
  declarations: [ CloudtasksDirective ],
  exports: [ CloudtasksDirective ]
})
export class CloudtasksModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CloudtasksModule,
      providers: [ CloudtasksService ]
    };
  }
}
