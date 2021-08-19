import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  title = 'zing-app';
  config:zingchart.graphset = {
    type: 'bar',
    series: [{
      values: [3,4,5,5,6,7,5,3]
    }]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
