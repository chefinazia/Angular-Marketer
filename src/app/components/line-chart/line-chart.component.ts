import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  title = 'zing-app';
  config:zingchart.graphset = {
    type: 'line',
    series: [{
      values: [3,4,5,5,6,7,5,3]
    }]
  };
  constructor() { }

  ngOnInit(): void {
  }

}
