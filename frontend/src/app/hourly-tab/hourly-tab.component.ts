import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseChartDirective} from 'ng2-charts';
import {ChartOptions} from 'chart.js';

@Component({
  selector: 'app-hourly-tab',
  templateUrl: './hourly-tab.component.html',
  styleUrls: ['./hourly-tab.component.css']
})
export class HourlyTabComponent implements OnInit, OnChanges {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor() {}

  @Input() currentData;
  form: FormGroup;

  barChartOptions: ChartOptions = {
    legend: {
      onClick(event: MouseEvent, legendItem: Chart.ChartLegendLabelItem): void {
        event.stopPropagation();
      }
    },
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          fontSize: 14,
          labelString: 'Fahrenheit'
        },
        ticks: {
          // @ts-ignore
          userCallback(label) {
            if (Math.floor(label) === label) {
              return label;
            }
          },
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          fontSize: 14,
          labelString: 'Time Difference from current hour'
        }
      }]
    }
  };
  barChartLabels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
    '20', '21', '22', '23'];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'temperature',
      backgroundColor: 'rgb(166, 207, 237)', hoverBackgroundColor: 'rgb(111, 145, 169)'}
  ];
  hours = 24;
  i = 0;

  ngOnInit() {
  }

  ngOnChanges() {
   if (this.currentData) {
      for (this.i = 0; this.i < this.hours; this.i++) {
        this.barChartData[0].data[this.i] = this.currentData.hourly.data[this.i].temperature;
      }
    }
  }

  showBarChart(property) {
    this.barChartData[0].data = [];
    for (this.i = 0; this.i < this.hours; this.i++) {
     if (property === 'humidity') {
        this.barChartData[0].data.push(this.currentData.hourly.data[this.i][property] * 100);
        this.barChartData[0].label = property;
      } else {
        this.barChartData[0].data.push(this.currentData.hourly.data[this.i][property]);
        this.barChartData[0].label = property;
      }
    }

    this.chart.chart.config.options.scales.yAxes = [];
    if (property === 'temperature') {
      this.barChartOptions.scales.yAxes[0].scaleLabel.labelString = 'Fahrenheit';
      this.chart.chart.config.options.scales.yAxes.push(this.barChartOptions.scales.yAxes[0]);
    } else if (property === 'pressure') {
      this.barChartOptions.scales.yAxes[0].scaleLabel.labelString = 'Millibars';
      this.chart.chart.config.options.scales.yAxes.push(this.barChartOptions.scales.yAxes[0]);
    } else if (property === 'humidity') {
      this.barChartOptions.scales.yAxes[0].scaleLabel.labelString = '% Humidity';
      this.chart.chart.config.options.scales.yAxes.push(this.barChartOptions.scales.yAxes[0]);
    } else if (property === 'ozone') {
      this.barChartOptions.scales.yAxes[0].scaleLabel.labelString = 'Dobson Units';
      this.chart.chart.config.options.scales.yAxes.push(this.barChartOptions.scales.yAxes[0]);
    } else if (property === 'visibility') {
      this.barChartOptions.scales.yAxes[0].scaleLabel.labelString = 'Miles (Maximum 10)';
      this.chart.chart.config.options.scales.yAxes.push(this.barChartOptions.scales.yAxes[0]);
      this.barChartOptions.scales.yAxes[0].ticks.suggestedMax = 12;
    } else if (property === 'windSpeed') {
      this.barChartOptions.scales.yAxes[0].scaleLabel.labelString = 'Miles per Hour';
      this.chart.chart.config.options.scales.yAxes.push(this.barChartOptions.scales.yAxes[0]);
      this.barChartOptions.scales.yAxes[0].ticks.suggestedMax = 9;
    }
  }

  get property() {
    return this.form.get('property');
  }

}

