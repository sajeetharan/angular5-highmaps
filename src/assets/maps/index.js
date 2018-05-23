module.exports = function (Highcharts) {
    require('./de-all')(Highcharts);
    require('./europe')(Highcharts);
    require('./jp-all')(Highcharts);
    require('./north-america-no-central')(Highcharts);
    require('./us-all')(Highcharts);
    require('./world')(Highcharts);
    require('./cn-all-sar')(Highcharts);
};
