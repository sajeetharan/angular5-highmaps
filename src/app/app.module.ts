import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ChartModule, HIGHCHARTS_MODULES} from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as highstock from 'highcharts/modules/stock.src';
import * as highmaps from 'highcharts/modules/map.src';
import * as noData from 'highcharts/modules/no-data-to-display.src';
import * as drilldown from 'highcharts/modules/drilldown.src';
import * as grouped from 'highcharts-grouped-categories/grouped-categories';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChartModule,
    HttpClientModule
  ],
  providers: [{
    provide: HIGHCHARTS_MODULES, useFactory: () => {
      return [highstock, more, noData, drilldown, highmaps, grouped];
    }
  }],
  bootstrap: [AppComponent],
  exports: [
    ChartModule
  ]
})
export class AppModule {
}
