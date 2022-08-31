import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderComponent } from './uploader.component';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
@NgModule({
  imports: [CommonModule, UploaderModule, MatSnackBarModule],
  declarations: [UploaderComponent],
  exports: [UploaderComponent],
})
export class UploadModule {}
