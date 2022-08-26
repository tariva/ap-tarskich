import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderComponent } from './uploader.component';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
@NgModule({
  imports: [CommonModule, UploaderModule],
  declarations: [UploaderComponent],
  exports: [UploaderComponent],
})
export class UploadModule {}
