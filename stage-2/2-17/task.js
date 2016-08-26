'use strict';
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

//图表DOM
var wrap;

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {
    style: {
        maxWidth: '100%',
        height: '300px'
    },
    cityName: '',
    data: []
};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: '北京',
    nowGraTime: "day"
};

/*
 * 将styleObj转换成字符串
 */
function getStyleStr(obj) {
    var style = 'style="';
    for (var prop in obj) {
        style += prop + ':' + obj[prop] + ';'
    }
    return style + '"';
}

function createNewBarStr(setting) {
    var barWrap = '<div class="bar" style>content</div>';
    var barContent = '<div class="bar-content" style></div>';
    var wrapStyle = {
        'position': 'relative'
    };
    var contentStyle = {
        'background': "#ccc",
        'position': 'absolute',
        'left': '0'
    };

    if (setting.direction && setting.direction.toLowerCase() === 'vertical') {
        wrapStyle['float'] = 'left';
        wrapStyle['width'] = setting.width;
        wrapStyle['height'] = '100%';

        contentStyle['width'] = '100%';
        contentStyle['height'] = setting.percent;
        contentStyle['bottom'] = '0';
    } else {
        wrapStyle['width'] = '100%';
        wrapStyle['height'] = setting.width;

        contentStyle['width'] = setting.percent;
        contentStyle['height'] = '100%';
    }

    barWrap = barWrap.replace('style', getStyleStr(wrapStyle));
    barContent = barContent.replace('style', getStyleStr(contentStyle));

    return barWrap.replace('content', barContent);
}

/**
 * 渲染图表
 */
function renderChart() {
    wrap.style.maxWidth = chartData.style.maxWidth;
    wrap.style.height = chartData.style.height;
    var barSetting = {
        width: 100 / chartData.data.length + '%',
        direction: 'vertical'
    };
    var content = '';

    chartData.data.forEach(function (data) {
        barSetting['percent'] = '' + (data.value / chartData.maxValue * 100) + '%';

        content += createNewBarStr(barSetting);
    });
    wrap.innerHTML = content;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(e) {
    // 确定是否选项发生了变化
    var radio = e.target || e.srcElement;
    // 设置对应数据
    pageState.nowGraTime = radio.value;
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(e) {
    // 确定是否选项发生了变化
    var select = e.target || e.srcElement;
    // 设置对应数据
    pageState.nowSelectCity = select.value;
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var timeForm = document.querySelector('#form-gra-time');
    timeForm.addEventListener('change', graTimeChange, false)
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var citySelect = document.querySelector('#city-select');
    var content = '';
    for (var cityName in aqiSourceData) {
        content += '<option value="' + cityName + '">' + cityName + '</option>';
    }
    citySelect.innerHTML = content;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    citySelect.addEventListener('change', citySelectChange, false);
}


/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    var cityName = pageState.nowSelectCity;
    var cityData = aqiSourceData[cityName];
    var data = [];

    //根据选择日期粒度整理数据
    switch (pageState.nowGraTime) {
        case 'day':
            for (var date in cityData) {
                data.push({
                    date: date,
                    value: cityData[date]
                });
            }
            break;
        case 'week':
            var values = [];
            for (var date in cityData) {
                values.push(cityData[date]);
            }

            var begin = 0, end = 7, weekCount = 1, len = values.length;

            while (begin < len) {
                data.push({
                    date: '第 ' + weekCount + ' 个星期',
                    value: values.slice(begin, end).reduce(function (preVal, curVal) {
                        return preVal + curVal;
                    })
                });

                weekCount++;
                begin += 7;
                end += 7;
            }

            break;
        case 'month' :
            var month, t = {};
            for (var date in cityData) {
                month = /([0-9]+-[0-9]+)-[0-9]+/g.exec(date)[1];
                if (month && !t[month]) {
                    t[month] = cityData[date];
                } else if (t[month]) {
                    t[month] += cityData[date];
                }
            }
            for (date in t) {
                data.push({
                    date: date,
                    value: t[date]
                })
            }
            break;
    }
    // 处理好的数据存到 chartData 中
    //查找最大值\
    chartData.maxValue = Math.max.apply(null, data.map(function (curVal) {
        return curVal.value;
    }));
    chartData.cityName = cityName;
    chartData.data = data;
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
    renderChart();
}

window.addEventListener('DOMContentLoaded', function () {
    wrap = document.querySelector("#aqi-chart-wrap");
    init();
}, false);
