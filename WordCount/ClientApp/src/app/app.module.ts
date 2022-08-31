import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadModule } from './uploader/uploader.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { FilesViewComponent } from './files-view/files-view.component';
import { ResultsViewComponent } from './results-view/results-view.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { ChartAllModule, AccumulationChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { ResultsChartsViewComponent } from './results-charts-view/results-charts-view.component';

@NgModule({
  declarations: [AppComponent, FilesViewComponent, ResultsViewComponent, ResultsChartsViewComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AppRoutingModule,
    UploadModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ScrollingModule,
    MatToolbarModule,
    MatIconModule,
    ChartAllModule, 
    AccumulationChartAllModule, 
    RangeNavigatorAllModule 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
