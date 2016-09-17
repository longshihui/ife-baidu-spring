'use strict';
/**
 * 封装获取DOM节点函数，减少重复代码
 * @param selector
 * @returns {Element}
 */
var $ = function (selector) {
    return document.querySelector(selector);
};
/**
 * 事件添加函数
 * @param dom
 * @param eventName
 * @param callback
 */
function addEvent(dom, eventName, callback) {
    if (window.addEventListener) {
        dom.addEventListener(eventName, callback, false);
    } else if (window.attachEvent) {
        dom.attachEvent(eventName, callback);
    } else {
        dom.onclick = callback;
    }
}
/**
 * [Queue 类]
 * @constructor
 */
var Queue = function () {
    this.data = [];
};
/**
 * 自定义Queue方法
 * @type {{push: Queue.push, pop: Queue.pop, shift: Queue.shift, unshift: Queue.unshift}}
 */
Queue.prototype = {
    push: function (el) {
        this.data.push(el);
    },
    pop: function () {
        return this.data.pop();
    },
    shift: function () {
        return this.data.shift();
    },
    unshift: function (el) {
        return this.data.unshift(el);
    },
    getQueryLength: function () {
        return this.data.length;
    },
    deleteElByIndex: function (index) {
        if (index < 0 || index >= this.getQueryLength()) {
            return;
        }
        var the = this.data[index];
        this.data.splice(index, 1);
        return the;
    },
    isEmpty: function () {
        return this.data.length === 0;
    }
};
/**
 * 队列页面渲染类
 * @param queue
 * @param setting
 * @constructor
 */
var QueueRender = function (queue, setting) {
    setting = setting || {};
    this.queue = queue;
    this.displayBlock = setting.displayBlock || $('#queue-display');
    this.input = setting.input || $('#entry');
    this.btnGroup = setting.btnGroup || {
            left: {
                inDOM: $('#left-in'),
                outDOM: $('#left-out')
            },
            right: {
                inDOM: $('#right-in'),
                outDOM: $('#right-out')
            }
        };
    this.ElementClassName = setting.ElementClassName || 'queue-el';
};
QueueRender.fn = QueueRender.prototype;
QueueRender.action = QueueRender.prototype;
/**
 * 创建DOM;
 * @param number
 * @returns {Element}
 */
QueueRender.fn.createDOM = function (number) {
    var div = document.createElement('div'),
        text = document.createTextNode(number),
        attr = document.createAttribute('class');
    attr.nodeValue = this.ElementClassName;
    div.appendChild(text);
    div.setAttributeNode(attr);
    return div;
};
/**
 * 验证输入
 * @returns {boolean}
 */
QueueRender.fn.isValid = function () {
    return /[0-9]+/g.test(this.input.value);
};
/**
 * 返回队列DOM中指定方向上的最后一个元素
 * @param direct
 * @returns {Node}
 */
QueueRender.fn.getQueryLastChild = function (direct) {
    return direct.toLowerCase() === 'left' ? this.displayBlock.firstChild : this.displayBlock.lastChild;
};
/**
 * 返回给定DOM元素所在队列展示区的index
 * @param dom
 * @returns {number}
 */
QueueRender.fn.getDOMIndex = function (dom) {
    var index = -1;
    Array.prototype.slice.call(this.displayBlock.childNodes, 0).forEach(function (el, i) {
        if (el === dom) {
            index = i;
            return false;
        }
    });
    return index;
};
/**
 * 入队渲染函数
 * @param direct
 */
QueueRender.action.in = function (direct) {
    if (!this.isValid()) {
        alert('请输入合法数字');
        return;
    }
    var lastNode = this.getQueryLastChild(direct);
    var newEl = this.createDOM(this.input.value);
    if (direct === 'left') {
        this.displayBlock.insertBefore(newEl, lastNode);
        this.queue.unshift(this.input.value);
    } else {
        this.displayBlock.appendChild(newEl);
        this.queue.push(this.input.value);
    }
};
/**
 * 出队渲染函数
 * @param direct
 */
QueueRender.action.out = function (direct) {
    if (this.queue.isEmpty()){
        alert('队列已空，请添加数字后再试');
        return;
    }
    var lastNode = this.getQueryLastChild(direct);
    alert(this.displayBlock.childNodes.length);
    this.displayBlock.removeChild(lastNode);
    if (direct === 'left') {
        alert(this.queue.shift());
    } else {
        alert(this.queue.pop());
    }
};
/**
 * 根据ID值出队
 * @param id
 */
QueueRender.action.outById = function (id) {
    var wrap = this.displayBlock;
    wrap.removeChild(wrap.childNodes[id]);
    alert(this.queue.deleteElByIndex(id));
};
/**
 * 模块初始化
 */
QueueRender.prototype.init = function () {
    var self = this;
    var btns = self.btnGroup;
    var wrap = self.displayBlock;

    addEvent(btns.left.inDOM, 'click', function () {
        self.in('left');
    });
    addEvent(btns.left.outDOM, 'click', function () {
        self.out('left');
    });
    addEvent(btns.right.inDOM, 'click', function () {
        self.in('right');
    });
    addEvent(btns.right.outDOM, 'click', function () {
        self.out('right');
    });

    addEvent(wrap, 'click', function (e) {
        var originEl = e.target || e.currentTarget;
        var id = self.getDOMIndex(originEl);
        self.outById(id);
    })
};

(function () {
    addEvent(window, 'DOMContentLoaded', function () {
        var queue = new Queue();
        var render = new QueueRender(queue);
        render.init();
    });
})();
