import { NgModule } from '@angular/core';
import { UuidToIdPipe } from './pipes/uuid-to-id.pipe';

const sharedPipes = [UuidToIdPipe];

@NgModule({
  declarations: [...sharedPipes],
  exports: [...sharedPipes],
})
export class SharedModule {}
