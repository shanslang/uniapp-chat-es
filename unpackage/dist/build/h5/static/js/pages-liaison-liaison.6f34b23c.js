(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-liaison-liaison"],{"50df":function(t,i,e){"use strict";e.r(i);var n=e("598f"),a=e("8566");for(var o in a)"default"!==o&&function(t){e.d(i,t,function(){return a[t]})}(o);e("666d");var r=e("2877"),s=Object(r["a"])(a["default"],n["a"],n["b"],!1,null,"245a1885",null);i["default"]=s.exports},"598f":function(t,i,e){"use strict";var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",[e("v-uni-view",{staticClass:"uni-flex uni-row"},[e("v-uni-view",{staticClass:"flex-item uni-bg-red sel",class:[t.canAdd?"sel2":""],on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.add.apply(void 0,arguments)}}},[t._v("好友")]),e("v-uni-view",{staticClass:"flex-item uni-bg-green sel",class:[t.canAdd?"":"sel2"],on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.remove.apply(void 0,arguments)}}},[t._v("群组")])],1),t._l(t.list,function(i,n){return e("v-uni-view",{key:i.id,staticClass:"uni-panel",class:[t.canAdd?"":"isShow"]},[e("v-uni-view",{staticClass:"uni-panel-h",class:i.open?"uni-panel-h-on":"",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.triggerCollapse(n)}}},[e("v-uni-text",{staticClass:"uni-panel-text"},[t._v(t._s(i.groupname))]),e("v-uni-text",{staticClass:"uni-panel-icon uni-icon",class:i.open?"uni-panel-icon-on":""},[t._v("")])],1),i.open?e("v-uni-view",{staticClass:"uni-panel-c"},[t._l(i.pages,function(i,a){return[e("uni-swipe-action",{key:a+"_0",attrs:{options:t.options},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.bindClickBtn(i.username,"popup",i.id,n,a)}}},[e("v-uni-view",{staticClass:"uni-swipe-action"},[e("v-uni-view",{staticClass:"uni-swipe-action__container"},[e("v-uni-view",{staticClass:"uni-swipe-action__content ",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toMessageDetail(a,i,"friend")}}},[e("v-uni-view",{staticClass:"item",class:i.stick?"stick":""},[[e("v-uni-view",{staticClass:"item-left"},[e("avator-group",{class:["offline"==i.status?"hui":""],attrs:{text:i.username,type:i.type,avator:i.avatar}})],1),e("v-uni-view",{staticClass:"item-middle"},[e("v-uni-text",{staticClass:"title",class:[i.vip>0?"red":""]},[t._v(t._s(i.username))]),e("v-uni-text",{staticClass:"message"},[t._v(t._s(i.sign))])],1)]],2)],1)],1)],1)],1)]})],2):t._e()],1)}),e("v-uni-view",{staticClass:"message-list",class:[t.canAdd?"isShow":""]},[t._l(t.groupList,function(i,n){return[e("v-uni-view",{key:n+"_0",staticClass:"uni-swipe-action"},[e("v-uni-view",{staticClass:"uni-swipe-action__container"},[e("v-uni-view",{staticClass:"uni-swipe-action__content ",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toMessageDetail(n,i,"group")}}},[e("v-uni-view",{staticClass:"item"},[[e("v-uni-view",{staticClass:"item-left"},[e("avator-group",{attrs:{type:2,avator:i.avatar,text:i.groupname}})],1),e("v-uni-view",{staticClass:"item-middle"},[e("v-uni-text",{staticClass:"title",class:[i.levels>0?"red":""]},[t._v(t._s(i.groupname))])],1)]],2)],1)],1)],1)]})],2),e("v-uni-view",{staticClass:"example-body"},[e("uni-drawer",{attrs:{visible:t.showRight,mode:"right"},on:{close:function(i){arguments[0]=i=t.$handleEvent(i),t.closeDrawer("right")}}},[e("uni-list",[e("uni-list-item",{attrs:{title:"创建分组"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.bindClickBtn("","share",0,0,0)}}}),e("uni-list-item",{attrs:{title:"添加好友/群"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.navigateTo("add/addf")}}}),this.power.substr(3,1)>0||this.power.substr(2,1)>0?e("uni-list-item",{attrs:{title:"创建群"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.navigateTo("add/createGroup")}}}):t._e()],1),e("v-uni-view",{staticClass:"close"},[e("v-uni-view",{staticClass:"word-btn",attrs:{"hover-class":"word-btn--hover","hover-start-time":20,"hover-stay-time":70},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.hide.apply(void 0,arguments)}}},[e("v-uni-text",{staticClass:"word-btn-white"},[t._v("关闭")])],1)],1)],1)],1),e("uni-popup",{attrs:{show:t.showpopup,type:"center"},on:{change:function(i){arguments[0]=i=t.$handleEvent(i),t.change.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"uni-padding-wrap uni-common-mt",staticStyle:{"background-color":"#ccc"}},[e("v-uni-form",{on:{submit:function(i){arguments[0]=i=t.$handleEvent(i),t.formSubmitbz.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"uni-form-item uni-column"},[e("v-uni-view",{staticClass:"title"},[t._v("修改 【 "+t._s(t.remarkNick)+" 】 备注")]),e("v-uni-input",{staticClass:"uni-input",attrs:{name:"nickname",placeholder:"请输入备注"}})],1),e("v-uni-view",{staticClass:"uni-btn-v"},[e("v-uni-button",{attrs:{"form-type":"submit"}},[t._v("修改")]),e("v-uni-button",{attrs:{type:"default","form-type":"reset"}},[t._v("重置")]),e("v-uni-button",{attrs:{type:"default"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.erClosed.apply(void 0,arguments)}}},[t._v("关闭")])],1)],1)],1)],1),e("uni-popup",{attrs:{show:t.showshare,type:"bottom"},on:{change:function(i){arguments[0]=i=t.$handleEvent(i),t.change.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"uni-share"},[e("v-uni-text",{staticClass:"uni-share-title"},[t._v("创建分组")]),e("v-uni-form",{on:{submit:function(i){arguments[0]=i=t.$handleEvent(i),t.formSubmit.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"uni-form-item uni-column"},[e("v-uni-input",{staticClass:"uni-input",attrs:{name:"nickname",placeholder:"请输入分组名"}})],1),e("v-uni-view",{staticClass:"uni-btn-v"},[e("v-uni-button",{attrs:{"form-type":"submit"}},[t._v("添加")]),e("v-uni-button",{attrs:{type:"default"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.erClosed.apply(void 0,arguments)}}},[t._v("关闭")])],1)],1),e("v-uni-text",{staticClass:"uni-share-btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.cancel("share")}}},[t._v("取消")])],1)],1)],2)},a=[];e.d(i,"a",function(){return n}),e.d(i,"b",function(){return a})},"613f":function(t,i,e){"use strict";(function(t){var n=e("288e");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a=n(e("f499"));e("6b54");var o=e("ec26"),r=e("2f62"),s=n(e("6da6")),l=n(e("6ea2")),c=n(e("d24f")),u=n(e("c016")),d=n(e("cb38")),f=n(e("32eb")),p=n(e("6d27")),h=n(e("2ada")),v=e("583d"),w={computed:(0,r.mapState)(["forcedLogin","hasLogin","s_token"]),components:{uniIcons:f.default,uLink:c.default,uniListItem:l.default,avatorGroup:u.default,uniList:d.default,uniDrawer:s.default,uniSwipeAction:p.default,uniPopup:h.default},data:function(){var t="Uni_".concat(Math.ceil(1e6*Math.random()).toString(36));return{power:"0000",reindex:0,reidd:0,remarkid:0,remarkNick:"",showpopup:!1,showshare:!1,elId:t,transformX:"translateX(0px)",canAdd:!0,messageIndex:-1,showRight:!1,options:[{text:"修改备注",style:{backgroundColor:"#C7C6CD"}}],options1:[{text:"修改群名",style:{backgroundColor:"#dd524d"}}],list:[],groupList:[]}},onNavigationBarButtonTap:function(t){this.showRight=!this.showRight},methods:{getnewsList:function(){var t=this;if(this.hasLogin)this.getData(o.s_UserList,this.s_token);else uni.showModal({title:"未登录",content:"您未登录，需要登录后才能继续",showCancel:!this.forcedLogin,success:function(i){i.confirm&&(t.forcedLogin?uni.reLaunch({url:"../login/login"}):uni.navigateTo({url:"../login/login"}))}});uni.hideNavigationBarLoading(),uni.stopPullDownRefresh()},navigateTo:function(t){uni.navigateTo({url:t}),setTimeout(function(){uni.$emit("postMsg",{msg:"From navigator"})},1e3)},togglePopup:function(t){this["show"+t]=!0},change:function(i){t.log("是否打开:"+i.show),i.show||(this.remarkNick="",this.showpopup=!1,this.showshare=!1)},hide:function(){t.log("hide"),this.showRight=!1},closeDrawer:function(t){this.showRight=!1},toMessageDetail:function(i,e,n){if("friend"==n){var o=(0,a.default)(e);e.type="friend",this.$store.state.socket.CurrentToUser=e,uni.navigateTo({url:"../msg/msg?it="+o})}else if("group"==n){e.type="group",this.$store.state.socket.CurrentToUser=e,e.gid=e.id;o=(0,a.default)(e);t.log(o),uni.navigateTo({url:"../msg/groupMsg?it="+o})}},add:function(t){this.canAdd=!0},remove:function(t){this.canAdd=!1},triggerCollapse:function(i){if(!this.list[i].pages)return t.log(this.list[i].avatar),void this.goDetailPage(this.list[i].avatar);for(var e=0;e<this.list.length;++e)this.list[e].open=i===e&&!this.list[i].open},goDetailPage:function(t){var i=this;this.navigateFlag||(this.navigateFlag=!0,"string"===typeof t?uni.navigateTo({url:"/pages/component/"+t+"/"+t}):uni.navigateTo({url:t.url}),setTimeout(function(){i.navigateFlag=!1},200))},bindClickBtn:function(t,i,e,n,a){this.reindex=n,this.reidd=a,this.remarkid=e,this.showRight=!1,this.remarkNick=t,this.togglePopup(i)},erClosed:function(){this.showpopup=!1,this.showshare=!1},formSubmit:function(i){t.log("form发生了submit事件，携带数据为："+(0,a.default)(i.detail.value));var e=[{name:"nickname",checkType:"string",checkRule:"1,15",errorMsg:"应为1-15个字符"}],n=i.detail.value,r=v.check(n,e);r?(this.showpopup=!1,this.tj(o.s_addGroup,n.nickname)):uni.showToast({title:v.error,icon:"none"})},formSubmitbz:function(i){var e=[{name:"nickname",checkType:"string",checkRule:"1,15",errorMsg:"应为1-15个字符"}],n=i.detail.value,a=v.check(n,e);a?(t.log(n.nickname),this.showpopup=!1,this.tj(o.s_remarkEdit,n.nickname)):uni.showToast({title:v.error,icon:"none"})},getData:function(i,e){var n=this;uni.request({url:i,dataType:"json",data:{token:e},method:"post",header:{"Content-Type":"application/x-www-form-urlencoded"},success:function(i){if(0===i.data.code){var e=i.data;n.list=e.data.friend,n.groupList=e.data.group,t.log(n.list),t.log(n.groupList),uni.setStorage({key:"grouping",data:n.list,success:function(){}})}else uni.showToast({icon:"none",title:i.data.msg})},fail:function(i){return t.log("request fail",i),uni.showModal({content:i.errMsg,showCancel:!1}),!1},complete:function(){}})},tj:function(i,e){var n=this;uni.request({url:i,dataType:"json",data:{token:this.s_token,id:this.remarkid,bz:e},method:"post",header:{"Content-Type":"application/x-www-form-urlencoded"},success:function(t){if(200===t.data.code)if(n.remarkid>0)n.list[n.reindex]["pages"][n.reidd]["username"]=e;else{var i={groupname:e,id:t.data.data.id,open:!1,pages:[]};n.list.push(i),uni.setStorage({key:"grouping",data:n.list,success:function(){}})}else uni.showToast({icon:"none",title:t.data.msg})},fail:function(i){return t.log("request fail",i),uni.showModal({content:i.errMsg,showCancel:!1}),!1},complete:function(){}})}},onLoad:function(){this.power=""+this.$store.state.socket.mine.power,this.getnewsList()},onPullDownRefresh:function(){uni.showNavigationBarLoading(),this.getnewsList()}};i.default=w}).call(this,e("5a52")["default"])},"666d":function(t,i,e){"use strict";var n=e("fdb3"),a=e.n(n);a.a},8566:function(t,i,e){"use strict";e.r(i);var n=e("613f"),a=e.n(n);for(var o in n)"default"!==o&&function(t){e.d(i,t,function(){return n[t]})}(o);i["default"]=a.a},9900:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={name:"u-link",props:{href:{type:String,default:""},text:{type:String,default:""},inWhiteList:{type:Boolean,default:!1}},methods:{openURL:function(){window.open(this.href)}}};i.default=n},b802:function(t,i,e){i=t.exports=e("2350")(!1),i.push([t.i,'@charset "UTF-8";\nuni-page-body[data-v-245a1885]{min-height:100%;height:auto}\n\n/* 解决头条小程序字体图标不显示问题，因为头条运行时自动插入了span标签，且有全局字体 */\n.uni-icon[data-v-245a1885]{font-family:uniicons;font-weight:400}.uni-container[data-v-245a1885]{padding:15px;background-color:#f8f8f8}.uni-header-logo[data-v-245a1885]{padding:15px 15px;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-top:%?10?%}.uni-header-image[data-v-245a1885]{width:80px;height:80px}.uni-hello-text[data-v-245a1885]{margin-bottom:20px}.hello-text[data-v-245a1885]{color:#7a7e83;font-size:14px;line-height:20px}.hello-link[data-v-245a1885]{color:#7a7e83;font-size:14px;line-height:20px}.uni-panel[data-v-245a1885]{margin-bottom:12px}.uni-panel-h[data-v-245a1885]{background-color:azure;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:12px}\n/*\r\n.uni-panel-h:active {\r\n    background-color: #f8f8f8;\r\n}\r\n */.uni-panel-h-on[data-v-245a1885]{background-color:#f0f0f0}.uni-panel-text[data-v-245a1885]{-webkit-box-flex:1;-webkit-flex:1;flex:1;color:#000;font-size:14px;font-weight:400}.uni-panel-icon[data-v-245a1885]{margin-left:15px;color:#999;font-size:14px;font-weight:400;-webkit-transform:rotate(0deg);transform:rotate(0deg);-webkit-transition-duration:0s;transition-duration:0s;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform}.uni-panel-icon-on[data-v-245a1885]{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.uni-navigate-item[data-v-245a1885]{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background-color:#fff;border-top-style:solid;border-top-color:#f0f0f0;border-top-width:1px;padding:12px}.uni-navigate-item[data-v-245a1885]:active{background-color:#f8f8f8}.uni-navigate-text[data-v-245a1885]{-webkit-box-flex:1;-webkit-flex:1;flex:1;color:#000;font-size:14px;font-weight:400}.uni-navigate-icon[data-v-245a1885]{margin-left:15px;color:#999;font-size:14px;font-weight:400}.sel[data-v-245a1885]{width:50%;height:%?60?%;line-height:%?60?%;background-color:#08c;text-align:center}.sel2[data-v-245a1885]{color:#e1ffff;background-color:#8fbc8f}.isShow[data-v-245a1885]{display:none}.uni-swipe-action[data-v-245a1885]{width:100%;overflow:hidden}.uni-swipe-action__container[data-v-245a1885]{background-color:#fff;width:200%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-transition:-webkit-transform .35s cubic-bezier(.165,.84,.44,1);transition:-webkit-transform .35s cubic-bezier(.165,.84,.44,1);transition:transform .35s cubic-bezier(.165,.84,.44,1);transition:transform .35s cubic-bezier(.165,.84,.44,1),-webkit-transform .35s cubic-bezier(.165,.84,.44,1)}.uni-swipe-action__content[data-v-245a1885]{width:50%}.uni-swipe-action__btn-group[data-v-245a1885]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row}.uni-swipe-action--btn[data-v-245a1885]{padding:0 %?32?%;color:#fff;background-color:#c7c6cd;font-size:%?28?%;display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex;text-align:center;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.item[data-v-245a1885]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding:%?10?% %?16?%;background-color:#fff;border-bottom:1px solid #f3f3f3}.item.stick[data-v-245a1885]{background-color:rgba(243,236,221,.5)}.item .item-left[data-v-245a1885]{text-align:center}.item .item-left .image[data-v-245a1885]{width:%?100?%;height:%?100?%;border-radius:%?50?%;background-color:#eee}.item .item-left .avator[data-v-245a1885]{width:%?100?%;height:%?100?%;text-align:center;line-height:%?100?%;background:#4191ea;border-radius:50%;overflow:hidden}.item .item-left .avator .iconfont[data-v-245a1885]{width:%?100?%;height:%?100?%;text-align:center;line-height:%?100?%;color:#fff;font-size:%?40?%}.item .item-middle[data-v-245a1885]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;margin-left:%?15?%;overflow:hidden}.item .item-middle .title[data-v-245a1885]{width:100%;font-family:微软雅黑;font-weight:400;font-size:%?30?%;height:%?50?%;line-height:%?60?%;overflow:hidden;\n      /*自动隐藏文字*/text-overflow:ellipsis;\n      /*文字隐藏后添加省略号*/white-space:nowrap\n      /**强制不换行*/}.item .item-middle .message[data-v-245a1885]{width:100%;font-family:微软雅黑;color:grey;height:%?50?%;line-height:%?40?%;font-size:%?24?%;overflow:hidden;\n      /**自动隐藏文字*/text-overflow:ellipsis;\n      /**文字隐藏后添加省略号*/white-space:nowrap\n      /**强制不换行*/}.item .item-right[data-v-245a1885]{overflow:hidden;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.item .item-right .time[data-v-245a1885]{color:grey;font-size:%?18?%;height:%?60?%;line-height:%?60?%}.item .item-right .mark[data-v-245a1885]{background-color:#f74c31;line-height:%?35?%;text-align:center;font-size:%?18?%;min-width:%?35?%;min-height:%?35?%;border-radius:%?18?%;color:#fff}.word-btn[data-v-245a1885]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;border-radius:6px;height:48px;margin:15px;background-color:#007aff}.word-btn--hover[data-v-245a1885]{background-color:#4ca2ff}\n/* 底部分享 */.uni-share[data-v-245a1885]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;background-color:#fff}.uni-share-title[data-v-245a1885]{line-height:%?60?%;font-size:%?24?%;padding:%?15?% 0;text-align:center}.hui[data-v-245a1885]{-webkit-filter:grayscale(100%);filter:grayscale(100%)}.red[data-v-245a1885]{color:red}',""])},d24f:function(t,i,e){"use strict";e.r(i);var n=e("f9d0"),a=e("eaa1");for(var o in a)"default"!==o&&function(t){e.d(i,t,function(){return a[t]})}(o);var r=e("2877"),s=Object(r["a"])(a["default"],n["a"],n["b"],!1,null,"5c7a9c0c",null);i["default"]=s.exports},eaa1:function(t,i,e){"use strict";e.r(i);var n=e("9900"),a=e.n(n);for(var o in n)"default"!==o&&function(t){e.d(i,t,function(){return n[t]})}(o);i["default"]=a.a},f9d0:function(t,i,e){"use strict";var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-text",{staticStyle:{"text-decoration":"underline"},attrs:{href:t.href,inWhiteList:t.inWhiteList},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.openURL.apply(void 0,arguments)}}},[t._v(t._s(t.text))])},a=[];e.d(i,"a",function(){return n}),e.d(i,"b",function(){return a})},fdb3:function(t,i,e){var n=e("b802");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=e("4f06").default;a("ca5407b4",n,!0,{sourceMap:!1,shadowMode:!1})}}]);