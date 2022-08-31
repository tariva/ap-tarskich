import { Component, OnInit } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { StateHelperService } from 'src/core/state-helper.service';

@Component({
  selector: 'app-results-charts-view',
  templateUrl: './results-charts-view.component.html',
  styleUrls: ['./results-charts-view.component.scss']
})
export class ResultsChartsViewComponent implements OnInit {

  public chartArea: Object = {
    border: {
      width: 0
    }
  };
  //Initializing Chart Width
  public width: string = '80%' //  : '60%';
  public data?: Object[] = undefined;

  //Initializing Marker
  public marker: Object = {
    dataLabel: {
      visible: true,
      position: 'Top',
      font: {
        fontWeight: '600', color: '#ffffff'
      }
    }
  }
  //Initializing Primary X Axis
  public primaryXAxis: Object = {
    valueType: 'Category',
    title: 'Word',
    interval: 1,
    majorGridLines: { width: 0 }
  };
  //Initializing Primary Y Axis
  public primaryYAxis: Object = {
    labelFormat: '{value}x',
    edgeLabelPlacement: 'Shift',
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 },
    labelStyle: {
      color: 'transparent'
    }
  };
  public tooltip: Object = {
    enable: true
  };
  public load(args: ILoadedEventArgs): void {
    let selectedTheme = 'Material';
    args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
  };

  constructor(private stateHelperService: StateHelperService) { }

  ngOnInit(): void {
    this.stateHelperService.WordCount$.subscribe(wordData => {
      const ChartData = []
      for (const word in wordData) {
        if (Object.prototype.hasOwnProperty.call(wordData, word)) {
          const count = (wordData as any)[word];
          ChartData.push({ x: word, y: count });
          ChartData.sort((b, a)=>  {
            return parseFloat(a.y) - parseFloat(b.y);
          });
          
        }
      }
      this.data = ChartData.slice(0, 9).reverse();
      console.log(this.data)
    })
  }
}
