var Setting = {
    countTask: 52,
    groupLastTaskNum: [12, 36, 49, 52],
    stageDescription: ['HTML+CSS', "Javascript", "HTML+CSS+JS", "HTML+CSS+JS"],
    style: {
        head: ['color8', 'color7', 'color3', 'color4']
    },
    url: 'stage-(stageID)/(stageID)-(taskID)/task-(stageID)-(taskID).html',
    lastFinishTask: 52
};
/*
 * 工具类
 * 通用模块
 */
var Util = (function () {
    var ChineseMap = {
        '1': '一',
        '2': '二',
        '3': '三',
        '4': '四',
        '5': '五',
        '6': '六',
        '7': '七',
        '8': '八',
        '9': '九',
        '0': '零'
    };
    var bit4_numberChinese = ['千', '百', '十', ''];
    var UNIT = ['亿', '万', ''];
    var supportNumberPatten = '000000000000';

    return {

        /*
         * 数字转换为中文格式数字
         * 支持 （0, 999999999999] 数字转换成中文
         */
        transToChinese: function (number) {
            //补位至12位
            number = (supportNumberPatten + number).substr(-12, 12);

            /*
             *数字分为每4位一部分进行处理
             */
            var numberArr = [];
            for (var start = -4; start >= -12; start -= 4) {
                numberArr.push(number.substr(start, 4));
            }

            //处理每一单位部分
            return numberArr.reverse().map(function (str, partNum) {

                //对此部分的每一位数字进行翻译
                str = Array.prototype.map.call(str, function (val, index) {
                    if (val === '0') {
                        return ChineseMap[val]
                    }
                    return ChineseMap[val] + bit4_numberChinese[index];
                }).join('').replace(/零+/g, '零').replace(/零$/g, '');

                //若此单位部分均为空，则返回空字符串
                if (str === '') {
                    return str;
                }

                //若此单位部分不全为零，则在翻译完成的基础上添加单位
                return str + UNIT[partNum];

            }).join('').replace(/^零/g, '');
        }
    }
})();

/*
 * 渲染DOM
 * 生成每一阶段任务列表
 */
var Render = (function ($, Util, Setting) {
    function getURL(stageID, taskID) {
        var t = Setting.url.replace(/\(stageID\)/g, stageID);
        return t.replace(/\(taskID\)/g, taskID);
    }

    var pageContent = $(".page-content > article");
    
    function hasStage(stageID) {
        return $("#stage-"+stageID).size() !== 0;
    }

    function renderWrap(stageID) {
        return $('<section class="stage"></section>').attr('id', 'stage-' + stageID);
    }

    function renderHead(stageID) {
        var h1 = $('<h1 class="stage-head"></h1>');
        var span = $('<span>' + Util.transToChinese(stageID) + '</span>');

        span.addClass(Setting.style.head[stageID - 1]);

        return h1.append(span);
    }

    function renderSep() {
        return $('<div class="stage-sep"></div>');
    }

    function renderDescription(stageID) {
        return $('<div class="description"></div>').html(Setting.stageDescription[stageID - 1]);
    }

    return {
        render: function (stageID, taskID) {
            var list = $('.task-list', "#stage-" + stageID);

            if (!hasStage(stageID)) {
                var wrap = renderWrap(stageID);
                var head = renderHead(stageID);
                var sep = renderSep();
                var description = renderDescription(stageID);
                list = $('<ul class="task-list"></ul>');

                wrap.append(head).append(sep).append(list).append(description).appendTo(pageContent);
            }

            var li = $('<li><a href="#"></a></li>');

            li.children('a').attr('href', getURL(stageID, taskID)).html('任务' + Util.transToChinese(taskID));

            list.append(li);
        }
    }

})(jQuery, Util, Setting);

/*
 * 主页初始化类
 * 初始化主页信息
 */
var Index = (function ($, Render) {

    function getStageID(taskID) {
        var el = Setting.groupLastTaskNum.find(function (val) {
            return val >= taskID;
        });

        return Setting.groupLastTaskNum.indexOf(el) + 1;
    }

    return {
        init: function () {
            for (var taskID = 1; taskID <= Setting.lastFinishTask; taskID++) {
                Render.render(getStageID(taskID), taskID);
            }
        }
    }

})(jQuery, Render);
