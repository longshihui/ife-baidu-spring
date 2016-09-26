'use strict';

/**
 * [Queue 类]
 * @constructor
 */
var Queue = function () {
    this.data = [];
};
/**
 * 队列最大长度
 * @type {number}
 */
Queue.MAX_LEN = 60;
/**
 * 自定义Queue方法
 * @type {{push: Queue.push, pop: Queue.pop, shift: Queue.shift, unshift: Queue.unshift}}
 */
Queue.prototype = {
    /**
     * 右入队
     * @param el
     */
    push: function (el) {
        if (this.isSpill()) throw new Error('队列已满，请删除一个元素以后再试');
        this.data.push(el);
    },
    /**
     * 右出队
     * @returns {*}
     */
    pop: function () {
        if (this.isEmpty()) throw new Error('队列已空，请添加数字后再试');
        return this.data.pop();
    },
    /**
     * 左出队
     * @returns {*}
     */
    shift: function () {
        if (this.isEmpty()) throw new Error('队列已空，请添加数字后再试');
        return this.data.shift();
    },
    /**
     * 左入队
     * @param el
     * @returns {Number}
     */
    unshift: function (el) {
        if (this.isSpill()) throw new Error('队列已满，请删除一个元素以后再试');
        return this.data.unshift(el);
    },
    /**
     * 返回队列长度
     * @returns {Number}
     */
    getQueryLength: function () {
        return this.data.length;
    },
    /**
     * 删除指定id队列元素，并返回该元素
     * @param index
     * @returns {*}
     */
    deleteElByIndex: function (index) {
        if (index < 0 || index >= this.getQueryLength()) {
            return;
        }
        var the = this.data[index];
        this.data.splice(index, 1);
        return the;
    },
    /**
     * 判断队列是否为空
     * @returns {boolean}
     */
    isEmpty: function () {
        return this.data.length === 0;
    },
    /**
     * 判断队列是否已满
     * @returns {boolean}
     */
    isSpill: function () {
        return this.data.length === Queue.MAX_LEN;
    },
    /**
     * 返回内部数据结构
     * @returns {Array}
     */
    getData: function () {
        return this.data;
    }
};