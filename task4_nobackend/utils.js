export default {
	putLocalData: function(key, src) {
		window.localStorage.setItem(key, JSON.stringify(src));
	},

	getLocalData: function(key) {
		return JSON.parse(window.localStorage.getItem(key));
	},

	//格式化日期
	//必填参数date,Date类型日期
	//可选参数formatType,格式化类型,默认为1
	formatDate: function(date, formatType) {

		var fmt;
		formatType = formatType || 1;

		//方便以后扩展
		switch (formatType) {
			case 1:
				fmt = "yyyy-MM-dd EE hh:mm:ss";
				break;
		}

		var o = {
			"M+": date.getMonth() + 1, //月份
			"d+": date.getDate(), //日
			"h+": date.getHours(), //小时
			"m+": date.getMinutes(), //分
			"s+": date.getSeconds(), //秒
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度
			"S": date.getMilliseconds() //毫秒
		};

		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, date.getFullYear().toString().substr(4 - RegExp.$1.length));
		}

		if (/(E+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1,
				((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + "日一二三四五六" [date.getDay().toString()]);
		}

		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(o[k].toString().length)));
			}
		return fmt;
	}
};