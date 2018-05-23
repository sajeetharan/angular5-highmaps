import {Component, OnInit, Injectable} from '@angular/core';
import {Chart, MapChart} from 'angular-highcharts';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const Highcharts = {maps: {}};
require('../assets/maps')(Highcharts);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Spatial Accessibility';
  mapEuropeSpatial: MapChart;
  mapUSSpatial: MapChart

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.mapEuropeSpatial = this.getEuropeMap();
    this.getJSON('https://cdn.rawgit.com/highcharts/highcharts/057b672172ccc6c08fe7dbb27fc17ebca3f5b770/samples/data/us-population-density.json').subscribe(data => {
      // Make codes uppercase to match the map data
      data.forEach((item) => {
        item.code = item.code.toUpperCase();
      });
      this.mapUSSpatial = this.getUSPopulationDensityMap(data);
    });
  }

  getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }

  getEuropeMap() {
    //set the data to plot
    const data = [{
      name: 'UTC',
      data: ['IE', 'IS', 'GB', 'PT'].map(code => {
        return {code: code};
      })
    }, {
      name: 'UTC + 1',
      data: ['NO', 'SE', 'DK', 'DE', 'NL', 'BE', 'LU', 'ES', 'FR', 'PL', 'CZ', 'AT', 'CH', 'LI', 'SK', 'HU',
        'SI', 'IT', 'SM', 'HR', 'BA', 'YF', 'ME', 'AL', 'MK'].map(code => {
        return {code: code};
      })
    }, {
      name: 'UTC + 2',
      data: ['FI', 'EE', 'LV', 'LT', 'BY', 'UA', 'MD', 'RO', 'BG', 'GR', 'TR', 'CY'].map(code => {
        return {code: code};
      })
    }, {
      name: 'UTC + 3',
      data: [{
        code: 'RU'
      }]
    }];
    // Instantiate the map
    return new MapChart({
      chart: {
        map: Highcharts['maps']['custom/europe'],
        spacingBottom: 20
      },
      title: {
        text: 'Europe time zones'
      },
      legend: {
        enabled: true
      },
      plotOptions: {
        map: {
          allAreas: false,
          joinBy: ['iso-a2', 'code'],
          dataLabels: {
            enabled: true,
            color: '#FFFFFF',
            style: {
              fontWeight: 'bold'
            },
            // Only show dataLabels for areas with high label rank
            format: null,
            formatter: function () {
              if (this.point.properties && this.point.properties.labelrank.toString() < 5) {
                return this.point.properties['iso-a2'];
              }
            }
          },
          tooltip: {
            headerFormat: '',
            pointFormat: '{point.name}: <b>{series.name}</b>'
          }
        }
      },
      series: data
    });
  }

  getUSPopulationDensityMap(data) {
    // Instantiate the map
    return new MapChart({
      chart: {
        map: Highcharts['maps']['countries/us/us-all'],
        borderWidth: 1
      },
      title: {
        text: 'US population density (/km²)'
      },
      exporting: {
        sourceWidth: 600,
        sourceHeight: 500
      },
      legend: {
        layout: 'horizontal',
        borderWidth: 0,
        backgroundColor: 'rgba(255,255,255,0.85)',
        floating: true,
        verticalAlign: 'top',
        y: 25
      },
      mapNavigation: {
        enabled: true
      },
      colorAxis: {
        min: 1,
        type: 'logarithmic',
        minColor: '#EEEEFF',
        maxColor: '#000022',
        stops: [
          [0, '#EFEFFF'],
          [0.67, '#4444FF'],
          [1, '#000022']
        ]
      },
      series: [{
        animation: {
          duration: 1000
        },
        data: data,
        joinBy: ['postal-code', 'code'],
        dataLabels: {
          enabled: true,
          color: '#FFFFFF',
          format: '{point.code}'
        },
        name: 'Population density',
        tooltip: {
          pointFormat: '{point.code}: {point.value}/km²'
        }
      }]
    });
  }
}
