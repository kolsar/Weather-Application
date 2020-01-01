import {Component, Input, OnChanges, OnInit} from '@angular/core';
import * as CanvasJS from 'src/canvasjs.min.js';
import { DayModalService} from '../services/day-modal.service';
import {bind} from '@angular/core/src/render3';
import {LocationService} from '../services/location.service';

@Component({
  selector: 'app-weekly-tab',
  templateUrl: './weekly-tab.component.html',
  styleUrls: ['./weekly-tab.component.css']
})
export class WeeklyTabComponent implements OnInit, OnChanges {
  @Input() currentData;
  @Input() savedCity;

  days = 0;
  i = 0;
  dailyDataPoints: [];
  date = '';
  temperature: number;
  summary = '';
  icon = '';
  precipitation: number;
  chanceOfRain: number;
  windSpeed: number;
  humidity: number;
  visibility = '';
  dayModalData: any;
  degreeImage = 'https://cdn3.iconfinder.com/data/icons/virtual-notebook/16/button_shape_oval-512.png';

  constructor(private dayModalService: DayModalService) {}

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.currentData) {
      const that = this;
      this.days = this.currentData.daily.data.length;
      this.dailyDataPoints = [];
      for (this.i = 0; this.i < this.days; this.i++) {
        const data = {y: [], label: '', color: 'rgb(166, 207, 237)', epoch: ''};
        const range = [];
        let date = '';
        range[0] = this.currentData.daily.data[this.i].temperatureLow;
        range[1] = this.currentData.daily.data[this.i].temperatureHigh;
        const epoch = this.currentData.daily.data[this.i].time;
        date = this.getDate(epoch);
        data.y = range;
        data.label = date;
        data.epoch = epoch;
        // @ts-ignore
        this.dailyDataPoints.push(data);
      }

      const lat = this.currentData ? this.currentData.latitude : '';
      const lon = this.currentData ? this.currentData.longitude : '';

      const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        title: {
          text: 'Weekly Weather'
        },
        dataPointWidth: 15,
        axisX: {
          title: 'Days',
          titleFontSize: 14
        },
        axisY: {
          gridThickness: 0,
          includeZero: false,
          title: 'Temperature in Fahrenheit',
          interval: 10,
          titleFontSize: 14
        },
        legend: {
          horizontalAlign: 'center',
          verticalAlign: 'top',
        },
        data: [{
          click: showDayModal.bind(this),
          type: 'rangeBar',
          legendMarkerColor: 'rgb(166, 207, 237)',
          showInLegend: true,
          yValueFormatString: '#0',
          indexLabel: '{y[#index]}',
          legendText: 'Day wise temperature range',
          toolTipContent: '<b>{label}</b>: {y[0]} to {y[1]}',
          dataPoints: this.dailyDataPoints ? this.dailyDataPoints.reverse() : []
        }]
      });
      chart.render();
      // @ts-ignore
      function showDayModal(e) {
        that.date = e.dataPoint.label;

        function getIconImage(phrase: string) {
            let icon = '';
            switch (phrase) {
              case 'clear-day':
                icon = 'https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png';
                break;
              case 'clear-night':
                icon = 'https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png';
                break;
              case 'rain':
                icon = 'https://cdn3.iconfinder.com/data/icons/weather-344/142/rain-512.png';
                break;
              case 'snow':
                icon = 'https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-19-512.png';
                break;
              case 'sleet':
                icon = 'https://cdn3.iconfinder.com/data/icons/weather-344/142/lightning-512.png';
                break;
              case 'wind':
                icon = 'https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_10-512.png';
                break;
              case 'fog':
                icon = 'https://cdn3.iconfinder.com/data/icons/weather-344/142/cloudy-512.png';
                break;
              case 'cloudy':
                icon = 'https://cdn3.iconfinder.com/data/icons/weather-344/142/cloud-512.png';
                break;
              case 'partly-cloudy-day':
                icon = 'https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png';
                break;
              case 'partly-cloudy-night':
                icon = 'https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png';
                break;
              default:
                break;
            }
            return icon;
          }

        that.dayModalService.getDayModalData(lat, lon, e.dataPoint.epoch).subscribe(data => {
          that.dayModalData = data;
          that.summary = that.dayModalData.currently.summary;
          that.temperature = Math.round(that.dayModalData.currently.temperature);
          that.icon = getIconImage(that.dayModalData.currently.icon);
          that.precipitation = Math.round(that.dayModalData.currently.precipIntensity * 100) / 100;
          that.chanceOfRain = Math.round(that.dayModalData.currently.precipProbability * 100 * 100) / 100;
          that.windSpeed = Math.round(that.dayModalData.currently.windSpeed * 100) / 100;
          that.humidity =  Math.round(that.dayModalData.currently.humidity * 100 * 100) / 100;
          that.visibility = that.dayModalData.currently.visibility;
        });
        document.getElementById('modalButton').click();
      }
    }
  }

  getDate(seconds) {
      const milliseconds = new Date(seconds * 1000);
      const month = milliseconds.getMonth() + 1;
      this.date = milliseconds.getDate() + '/' + month + '/' + milliseconds.getFullYear();
      return this.date;
  }
}
