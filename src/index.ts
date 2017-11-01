import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf
} from '@angular/core';

import { CloudtasksDirective } from './directive';
import { CloudtasksService } from './service';

export * from './directive';
export * from './service';

@NgModule({
  declarations: [ CloudtasksDirective ],
  exports: [ CloudtasksDirective ]
})
export class CloudtasksModule {
  constructor(@Optional() @SkipSelf() parentModule: CloudtasksModule) {
    if (parentModule) {
      throw new Error(
        'CloudtasksModule.forRoot() called twice. Lazy loaded modules should use CloudtasksModule instead.',
      );
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CloudtasksModule,
      providers: [ CloudtasksService ]
    };
  }
}
