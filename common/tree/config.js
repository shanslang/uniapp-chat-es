var Global = {
	WssService: "wss://api.itool.store/v1/.ws",
	ItoolStoreApi: "https://api.itool.store/",
	FileService: "https://file.help-itool.com/"
};

var UserInfo = function(info) {
	if (info) {
		uni.setStorageSync('userInfo', JSON.stringify(info));
	} else {
		var userinfostr = uni.getStorageSync('userInfo');
		if (userinfostr) {
			var userInfo = JSON.parse(userinfostr);
			if (!userInfo.paras || !userInfo.paras.replace(/\s*/g, "")) {
				userInfo.paras = {
					userName: '未定义',
					headImg: ''
				};
			} else {
				userInfo.paras = JSON.parse(userInfo.paras);
			}
			return userInfo;
		}else{
			return {};
		}
		
	}
}


;(function($) {
	
	$.is = function(str) {
		if(str) return this == str;
		return false;
	}

	$.Imgfiltr = function(str) {
		if(str) {
			if(this.indexOf(str) > -1) {
				return this;
			}
		}
		if(this.indexOf('Images_500') > -1) {
			return this.replace("ComPress/Images_500", "Images");
		}

		if(this.indexOf('Images_120') > -1) {
			return this.replace("ComPress/Images_120", "Images");
		}

		if(this.indexOf('Images_300') > -1) {
			return this.replace("ComPress/Images_300", "Images")
		}

		return this;
	}

	$.Img120 = function(str) {
		if(str) {
			if(this.indexOf(str) > -1) {
				return this;
			}
		}
		if(this.indexOf('Images_120') > -1) return this;
		return this.replace("ComPress/Images_300", "Images").replace("ComPress/Images_500", "Images").replace("Images", "ComPress/Images_120");
	}
	
	$.Img300 = function(str) {
		if(str) {
			if(this.indexOf(str) > -1) {
				return this;
			}
		}
		if(this.indexOf('Images_300') > -1) return this;
		return this.replace("ComPress/Images_120", "Images").replace("ComPress/Images_500", "Images").replace("Images", "ComPress/Images_300");

	}
	
	$.Img500 = function(str) {

		if(str) {
			if(this.indexOf(str) > -1) {
				return this;
			}
		}

		var path = this;

		if(path.indexOf('Images_500') > -1) return path;

		if(path.indexOf('Images_120') > -1) {
			path = path.replace("ComPress/Images_120", "Images");
		}

		if(path.indexOf('Images_300') > -1) {
			path = path.replace("ComPress/Images_300", "Images")
		}

		return path.replace("Images", "ComPress/Images_500");
	}
	
	$.FileSever = function(str) {
		if(str) {
			if(this.indexOf(str) > -1) {
				return this;
			}
		}
		if(this.indexOf('http') > -1) {
			return this;
		} else {
			try {
				return Global.FileService + JSON.parse(this)[0];
			} catch(e) {
				return Global.FileService + this;
			}
		}
	}

}(String.prototype));



export default {
	Project:{
		Token:"6D7-BB91-13901823A235"
	},
	Global: {
		WssService: "wss://api.itool.store/v1/.ws",
		ItoolStoreApi: "https://api.itool.store/",
		FileService: "https://file.help-itool.com/",
		Uploader: Global.FileService + "/api/upload/file"
	},
	GlobalQueue: {
		QueuePlus: Global.ItoolStoreApi + ".v1/queue/.push",
		QueueConfirm: Global.ItoolStoreApi + ".v1/queue/.Confirm",
		QueueFinished: Global.ItoolStoreApi + ".v1/queue/.Finished"
	},
	GlobalSocketUser: {

		WsByClient: Global.ItoolStoreApi + ".v1/socket/user/.wsbyclient",
		OutLoginWs: Global.ItoolStoreApi + ".v1/socket/user/.wsbyservice",

		AddMember: Global.ItoolStoreApi + ".v1/socket/Relationship/.member",
		GetMembers: Global.ItoolStoreApi + ".v1/socket/Relationship/" + UserInfo().id + "/" + UserInfo().projectToken,
		AddMemberGroup: Global.ItoolStoreApi + ".v1/socket/Relationship/.group",
		
		UpdateUserParas: Global.ItoolStoreApi + ".v1/socket/user/.paras",

		OutLoginWs: Global.ItoolStoreApi + ".v1/socket/user/.wsbyservice",
		
		GetGroupList: Global.ItoolStoreApi + ".v1/socket/Group/.grouplist" + UserInfo().id + "/" + UserInfo().projectToken,
		AddGroup: Global.ItoolStoreApi + ".v1/socket/Group/.add",
		CreateGroup: Global.ItoolStoreApi + ".v1/socket/Group",
	},
	UserInfo: UserInfo,
	AppOnStatus:function(){
		
		var AppOnStatus = uni.getStorageSync('AppOnStatus');
		if (AppOnStatus == 'show') {
			return true;
		} else if (AppOnStatus == 'hide'){
			return false;
		}

	}
};