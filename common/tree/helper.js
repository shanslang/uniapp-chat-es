import helper from './config.js'

function getdateGs(timestamp) {  // 时间戳格式转换
    // 补全为13位
    var arrTimestamp = (timestamp + '').split('');
    for (var start = 0; start < 13; start++) {
        if (!arrTimestamp[start]) {
            arrTimestamp[start] = '0';
        }
    }
    timestamp = arrTimestamp.join('') * 1;
 
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - timestamp;
 
    // 如果本地时间反而小于变量时间
    if (diffValue < 0) {
        return '不久前';
    }
 
    // 计算差异时间的量级
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
 
    // 数值补0方法
    var zero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };
 
    // 使用
    if (monthC > 12) {
        // 超过1年，直接显示年月日
        return (function () {
            var date = new Date(timestamp);
            return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
        })();
    } else if (monthC >= 1) {
        return parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
        return parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        return parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
        return parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
        return parseInt(minC) + "分钟前";
    }
    return '刚刚';
};

function getCurrentPageItem() {
	let pages = getCurrentPages();
	let page = pages[pages.length - 1];
	return page.$getAppWebview();
}

function SetTitleNView(titleNView) {
	let currentWebview = getCurrentPageItem();
	currentWebview.setStyle({
		titleNView: titleNView
	});
}

// 设置底部修复区域高度
function SetFixBottom(heigth) {
	//#ifdef APP-PLUS
	let currentWebview = getCurrentPageItem();
	currentWebview.setFixBottom(heigth || 54);
	//#endif
}

// 获取 webview.js
function GetWevViewJSPath(bot) {



	var result = uni.getStorageSync('_app1231_webview.js');

	if (!bot && result) {
		return result;
	} else {

		var url = 'https://file.help-itool.com/Content/JavaScript/webview.js';
		var fileurl = url.split('/');

		var filePath = '_downloads/20195/' + fileurl[fileurl.length - 1];

		plus.io.resolveLocalFileSystemURL(filePath, function(e) {
				// console.log('文件已存在...')
				if (bot) {
					e.remove(function() {
						var dtask = plus.downloader.createDownload(url, {
							filename: filePath
						}, function(file, status) {
							uni.setStorageSync('_app1231_webview.js', filePath);
						});
						dtask.start();
					});
				}
			},
			function(e) {
				var dtask = plus.downloader.createDownload(url, {
					filename: filePath
				}, function(file, status) {
					uni.setStorageSync('_app1231_webview.js', filePath);
				});
				dtask.start();
			});

	}

	return filePath;

}

// 设置标题栏上按钮的数字
function setBadge(show, text, index) {
	//#ifdef APP-PLUS
	let currentWebview = getCurrentPageItem();
	if (show) {
		currentWebview.setTitleNViewButtonBadge({
			index: index,
			text: text + ''
		});
	} else {
		currentWebview.removeTitleNViewButtonBadge({
			index: index
		});
		currentWebview.hideTitleNViewButtonRedDot({
			index: index
		});
	}
	//#endif
}

// 设置标题栏上按钮的红点
function setRedDot(show, index) {
	//#ifdef APP-PLUS
	let currentWebview = getCurrentPageItem();
	if (show) {
		currentWebview.showTitleNViewButtonRedDot({
			index: index
		});
	} else {
		currentWebview.hideTitleNViewButtonRedDot({
			index: index
		});
		currentWebview.hideTitleNViewButtonRedDot({
			index: index
		});
	}
	//#endif
}

// 时间字符处理
function timeForm(date) {

	var myDate;

	myDate = new Date(Date.parse(date.replace(/-/g, "/")));

	var hour = myDate.getHours();

	var minutes = myDate.getMinutes();

	if (minutes < 10) minutes = '0' + minutes;

	return thisTimeForm(hour, myDate) + ' ' + hour + ':' + minutes;

}

function thisTimeForm(hour, time) {

	var hour = time.getHours();
	var minutes = time.getMinutes();

	var year = time.getYear(); //获取当前年份(2位)
	var month = time.getMonth() + 1; //获取当前月份(0-11,0代表1月)
	var day = time.getDate(); ////获取当前日(1-31)

	var thisDate = new Date();
	var thisyear = thisDate.getYear(); //获取当前年份(2位)
	var thismonth = thisDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
	var thisday = thisDate.getDate(); ////获取当前日(1-31)

	if (year == thisyear && month == thismonth && day == thisday) {
		if (hour < 6) {
			return "凌晨";
		} else if (hour < 9) {
			return "早上";
		} else if (hour < 12) {
			return "上午";
		} else if (hour < 14) {
			return "中午";
		} else if (hour < 17) {
			return "下午";
		} else if (hour < 19) {
			return "傍晚";
		} else if (hour < 22) {
			return "晚上";
		} else {
			return "夜里";
		}
	} else {
		var date3 = thisDate.getTime() - time.getTime();
		var years = Math.floor(date3 / (12 * 30 * 24 * 3600 * 1000));
		var leave = date3 % (12 * 30 * 24 * 3600 * 1000);
		var months = Math.floor(leave / (30 * 24 * 3600 * 1000));
		var leave0 = leave % (30 * 24 * 3600 * 1000);
		var days = Math.floor(leave0 / (24 * 3600 * 1000));

		if (years == 0 && months == 0 && days > 0 && days < 7) {
			switch (days) {
				case 1:
					return '昨天';
				case 2:
					return '前天';
				default:
					return "星期" + "日一二三四五六".charAt(time.getDay());
					break;
			}
		} else {

			if (months == 0 && years == 0 && days == 0) {
				return '昨天';
			}

			if (months < 10) months = '0' + months;
			if (days < 10) days = '0' + days;

			if (years == 0) {
				return months + '-' + days;
			} else {
				return '20' + years + '-' + months + '-' + days;
			}
		}

	}

};

/** 向sesstion posh msg */
function SesstionMsgForm(item, uid) {

	var content = {
		text: item.message,
		length: item.len
	};
	
	if (item.parameter) {
		for (var key in item.parameter) {
			content[key] = item.parameter[key];
		}
	}

	return {
		type: 'user',
		msg: {
			id: 0,
			time: item.time,
			type: item.type,
			userinfo: {
				uid: uid,
				username: item.title,
				face: item.url[0]
			},
			content: content
		}
	};
}

/** 上传文件 */
function Uploader(paths, callback) {
	var zhongzi = ((Math.ceil((Math.random() + 1) * 5164789) * new Date().getTime()) + '');

	var primaryKey = zhongzi.substring(zhongzi.length - 10, zhongzi.length - 3) - 0;

	for (var i = 0; i < paths.length; i++) {

		uni.uploadFile({
			url: Global.Global.Uploader + '?primaryKey=' + primaryKey,
			filePath: paths[i],
			success: function(uploadFileRes) {
				var data = JSON.parse(uploadFileRes.data);
				callback && callback(data.primaryKey, data.filePath);
			}
		});
	}



	return primaryKey;
}

/** 发送图片 */
function SendImgs(v, paths) {

	Uploader(paths, function(key, file) {
		console.log(key)
		console.log(JSON.stringify(file));
		let msg = {
			text: Global.Global.FileService + file[0]
		};
		v.sendMsg(msg, 'img');
	});

}

/** 发送语音 */
function SendVoice(v, length, path) {
	Uploader([path], function(key, file) {
		console.log(key)
		console.log(JSON.stringify(file));
		let msg = {
			text: Global.Global.FileService + file[0],
			length: length
		};
		v.sendMsg(msg, 'voice');
	});
}

export default {
	timeForm: timeForm,
	SesstionMsgForm: SesstionMsgForm,

	SetSesstion: function(data) {
		uni.setStorageSync('sesstion_context', JSON.stringify(data));
	},
	GetSesstion: function() {
		var result = uni.getStorageSync('sesstion_context');
		if (result) {
			return JSON.parse(result);
		} else {
			return [];
		}

	},
	SetChatMsg: function(item, sesstion) {

		var keyStorage = item.msg.userinfo.uid + Global.UserInfo().id;

		if (sesstion) {
			keyStorage = sesstion + Global.UserInfo().id;
		}

		var result = uni.getStorageSync(keyStorage);

		var list = [];

		if (result) {
			list = JSON.parse(result);
			list.push(item);
		} else {
			list.push(item);
		}

		uni.setStorageSync(keyStorage, JSON.stringify(list));

	},
	GetChatMsg: function(key) {
		var keyStorage = key + Global.UserInfo().id;
		var result = uni.getStorageSync(keyStorage);
		if (result) {
			return JSON.parse(result);
		} else {
			return [];
		}
	},
	SendImgs: SendImgs,
	SendVoice: SendVoice,
	Uploader: Uploader,
	SetBadge: setBadge,
	SetRedDot: setRedDot,
	GetWevViewJSPath: GetWevViewJSPath,
	SetFixBottom: SetFixBottom,
	SetTitleNView: SetTitleNView,
	getdateGs: getdateGs
};

