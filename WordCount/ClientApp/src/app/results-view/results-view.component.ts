import { Component, OnInit } from '@angular/core';
import { StateHelperService } from 'src/core/state-helper.service';

@Component({
  selector: 'app-results-view',
  templateUrl: './results-view.component.html',
  styleUrls: ['./results-view.component.scss']
})
export class ResultsViewComponent implements OnInit {
  WordCountData?: object;

  constructor(private stateHelperService: StateHelperService) { }

  ngOnInit(): void {
    this.stateHelperService.WordCount$.subscribe(wordcountData=> {
      console.log(wordcountData); 
      this.WordCountData = wordcountData;
    })
  }
  keys(value: object) {
    return Object.keys(value)
  }
}
