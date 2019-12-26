import Request_1 from './Request.js'
import Global_1 from './config.js'


/** 用户模块 */
var SocketUser = (function() {
	
	function SocketUser() {}
	
	/** 根据客户端标识登陆 获取 ClientToken */
	SocketUser.prototype.LoginWsByClient = function(paramster, callback) {
		if (!paramster.uuid) {
			console.error("project uuid is null");
			return;
		}
		if (!Global_1.Project.Token) {
			console.error("project projectToken is null");
			return;
		}
		
		paramster.projectToken = Global_1.Project.Token;
		
		var request = new Request_1.Request(Global_1.GlobalSocketUser.WsByClient.toString(), paramster);
		request.Then(function(e) {
			if (e.code == 200) {
				callback && callback(e);
			} else {
				console.error(e.info);
			}
		}).Catch(function(a) {
			console.error("请求异常请刷新重试");
		}).Post();
	};
	
	/** 根据用户身份修改Paras相关信息 */
	SocketUser.prototype.UpdateUserParas = function(paramster, callback) {
		
		if (!paramster.Id) {
			console.error("paramster Id is null");
			return;
		}
		
		if (!paramster.Token) {
			console.error("paramster Token is null");
			return;
		}
		
		if (!paramster.Paras) {
			console.error("paramster Paras is null");
			return;
		}
		
		if (!Global_1.Project.Token) {
			console.error("project projectToken is null");
			return;
		}
		
		if (typeof(paramster.Paras) == 'object') {
			paramster.Paras = JSON.stringify(paramster.Paras);
		}
		
		paramster.projectToken = Global_1.Project.Token;
		
		console.log(JSON.stringify(paramster))
		
		var request = new Request_1.Request(Global_1.GlobalSocketUser.UpdateUserParas.toString(), paramster);
		request.Then(function(e) {
			if (e.code == 200) {
				callback && callback(e);
			} else {
				console.error(JSON.stringify(e));
			}
		}).Catch(function(a) {
			console.error("请求异常请刷新重试");
		}).Put();
	};
	
	/**
	 * 退出 Ws 登陆
	 * token 为ServiceToken
	 * 原token 仍然有效
	 */
	SocketUser.prototype.OutLoginWs = function(token, callback) {
		if (!token) {
			console.error("token is null");
			return;
		}
		
		var request = new Request_1.Request(Global_1.GlobalSocketUser.OutLoginWs.toString() + token);
		
		request.Then(function(e) {
			
		}).Catch(function(a) {
			console.error("请求异常请刷新重试");
		}).Delete();
	};
	
	SocketUser.prototype.GetMembers = function(callback) {
		
		var request = new Request_1.Request(Global_1.GlobalSocketUser.GetMembers.toString());
		
		request.Then(function(e) {
			if (e.code == 200) {
				callback && callback(e);
			} else {
				console.error(JSON.stringify(e));
			}
		}).Catch(function(a) {
			console.error("请求异常请刷新重试");
		});
	};
	
	SocketUser.prototype.AddMemberGroup = function(paramster,callback) {
		
		var request = new Request_1.Request(Global_1.GlobalSocketUser.AddMemberGroup.toString(),paramster);
		
		request.Then(function(e) {
			if (e.code == 200) {
				callback && callback(e);
			} else {
				console.error(JSON.stringify(e));
			}
		}).Catch(function(a) {
			console.error("请求异常请刷新重试");
		}).Post();
	};
	
	SocketUser.prototype.GetGroupList = function(callback) {
		var request = new Request_1.Request(Global_1.GlobalSocketUser.GetGroupList.toString());
		request.Then(function(e) {
			if (e.code == 200) {
				callback && callback(e);
			} else {
				console.error(JSON.stringify(e));
			}
		}).Catch(function(a) {
			console.error("请求异常请刷新重试");
		});
	};
	
	SocketUser.prototype.AddGroup = function(paramster,callback) {
		var request = new Request_1.Request(Global_1.GlobalSocketUser.AddGroup.toString(), paramster);
		request.Then(function(e) {
			if (e.code == 200) {
				callback && callback(e);
			} else {
				console.error(JSON.stringify(e));
			}
		}).Catch(function(a) {
			console.error("请求异常请刷新重试");
		}).Post();
	};
	
	SocketUser.prototype.CreateGroup = function(paramster,callback) {
		var request = new Request_1.Request(Global_1.GlobalSocketUser.CreateGroup.toString(), paramster);
		request.Then(function(e) {
			console.log(JSON.stringify(e))
			if (e.code == 200) {
				callback && callback(e);
			} else {
				console.error(JSON.stringify(e));
			}
		}).Catch(function(a) {
			console.error("请求异常请刷新重试");
		}).Post();
	};
	
	
	
	return SocketUser;
	
}());


export default { SocketUser:SocketUser };