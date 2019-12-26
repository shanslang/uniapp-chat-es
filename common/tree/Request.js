/** 请求封装 */
var Request = (function() {
	/**
	 *
	 * @param url 请求地址
	 * @param header 请求头
	 * @param data 请参数
	 */
	function Request(url, data, header) {
		if (data === void 0) {
			data = null;
		}
		if (header === void 0) {
			header = null;
		}
		/** 请求头 */
		this.header = {
			"content-type": "application/json"
		};
		/** 请求方式 */
		this.type = "get";
		/** 成功回调 */
		this.success = function(e) {};
		/** 失败回调 */
		this.error = function(e) {};
		var that = this;
		that.url = url;
		that.header = header || that.header;
		that.data = data;
		that.TimeoutFunction = setTimeout(function() {
			return that.Start;
		}, 100);
	}
	Request.prototype.Get = function() {
		this.type = "get";
		this.ExecTimeoutFunction();
		return this;
	};
	Request.prototype.Post = function() {
		this.type = "post";
		this.ExecTimeoutFunction();
		return this;
	};
	Request.prototype.Put = function() {
		this.type = "put";
		this.ExecTimeoutFunction();
		return this;
	};
	Request.prototype.Delete = function() {
		this.type = "delete";
		this.ExecTimeoutFunction();
		return this;
	};
	Request.prototype.Then = function(res) {
		this.success = res;
		this.ExecTimeoutFunction();
		return this;
	};
	Request.prototype.Catch = function(error) {
		this.error = error;
		this.ExecTimeoutFunction();
		return this;
	};
	Request.prototype.ExecTimeoutFunction = function() {
		var that = this;
		clearTimeout(that.TimeoutFunction);
		that.TimeoutFunction = setTimeout(function() {
			that.Start();
		}, 200);
	};
	Request.prototype.Start = function() {
		var that = this;		
		
		console.log(that.type.toUpperCase())
		
		uni.request({
			url: that.url, //仅为示例，并非真实接口地址。
			dataType: 'json',
			method:that.type.toUpperCase(),
			data: that.data,
			header: that.header,
			success: (res) => {
				that.success(res.data);
			},
			fail:(res) => {
				that.error(that.url);
			}
		});
	};
	return Request;
}());

export default { Request:Request };