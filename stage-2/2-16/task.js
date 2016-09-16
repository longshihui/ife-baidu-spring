'use strict';
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var aqi_city_input;
var aqi_value_input;
var aqi_table_body;
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var cityName = aqi_city_input.value.trim();
    var rank = aqi_value_input.value.trim();
    if (/[^\u4e00-\u9fa5a-zA-Z]+/g.test(cityName)) {
        alert('请输入中英文城市名');
        return;
    }

    if (rank === '' || /[^0-9]/g.test(rank)) {
        alert('空气质量指数必须为整数');
        return;
    }

    aqiData[cityName.toUpperCase()] = parseInt(rank);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    aqi_table_body.innerHTML = '';

    var content = '';
    for (var cityName in aqiData) {
        content += '<tr><td>' + cityName + '</td><td>' + aqiData[cityName] + '</td><td><button class="del">删除</button></td></tr>'
    }

    aqi_table_body.innerHTML = content;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
    // do sth.
    var delBtn = e.target || e.srcElement;

    var cityName = Array.prototype.slice.call(delBtn.parentNode.parentNode.childNodes, 0).find(function (el) {
        return el.nodeName === 'TD';
    }).innerHTML;

    delete aqiData[cityName];

    aqi_table_body.removeChild(delBtn.parentNode.parentNode);

    renderAqiList();
}

function init() {
    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        };
    }

    window.addEventListener('DOMContentLoaded', function () {
        //获取文本框对象
        aqi_city_input = document.querySelector('#aqi-city-input');
        aqi_value_input = document.querySelector('#aqi-value-input');
        aqi_table_body = document.querySelector('#aqi-table > tbody');
        // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
        document.querySelector('#add-btn').addEventListener('click', addBtnHandle, false);
        // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
        aqi_table_body.addEventListener('click', delBtnHandle, false)
    })
}

init();