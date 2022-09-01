import { Component, OnInit } from '@angular/core';
import { StateHelperService } from 'src/core/state-helper.service';

@Component({
  selector: 'app-results-view',
  templateUrl: './results-view.component.html',
  styleUrls: ['./results-view.component.scss']
})
export class ResultsViewComponent implements OnInit {
  WordCountData?: {
    x: string;
    y: any;
}[];

  constructor(private stateHelperService: StateHelperService) { }

  ngOnInit(): void {
    this.stateHelperService.WordCount$.subscribe(wordData=> {
      const justForReq = []
      for (const word in wordData) {
        if (Object.prototype.hasOwnProperty.call(wordData, word)) {
          const count = (wordData as any)[word];
          justForReq.push({ x: word, y: count });
          justForReq.sort((b, a)=>  {
            return parseFloat(a.y) - parseFloat(b.y);
          });
          
        }
      }
      this.WordCountData = justForReq
    })
  }
  keys(value: object) {
    return Object.keys(value)
  }
}
