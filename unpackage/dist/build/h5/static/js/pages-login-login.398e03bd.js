(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-login"],{"01ff":function(e,t,n){"use strict";(function(e){var o=n("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=o(n("0a0d")),i=o(n("f499")),c=o(n("cebc")),r=n("ec26"),d=(o(n("2d97")),n("2f62")),f=o(n("1f34")),s={components:{mInput:f.default},data:function(){return{providerList:[],hasProvider:!1,account:"",password:"",positionTop:0}},computed:(0,d.mapState)(["hasLogin"]),methods:(0,c.default)({},(0,d.mapMutations)(["login"]),{initProvider:function(){var t=this,n=["weixin","qq","sinaweibo"];uni.getProvider({service:"oauth",success:function(e){if(e.provider&&e.provider.length){for(var o=0;o<e.provider.length;o++)~n.indexOf(e.provider[o])&&t.providerList.push({value:e.provider[o],image:"../../static/img/"+e.provider[o]+".png"});t.hasProvider=!0}},fail:function(t){e.error("获取服务供应商失败："+(0,i.default)(t))}})},initPosition:function(){this.positionTop=uni.getSystemInfoSync().windowHeight-100},bindLogin:function(){var t=this;if(this.account.length<2)uni.showToast({icon:"none",title:"账号最短为 2 个字符"});else if(this.password.length<6)uni.showToast({icon:"none",title:"密码最短为 6 个字符"});else{var n={username:this.account,password:this.password};uni.request({url:r.s_loginUrl,dataType:"json",data:n,method:"post",header:{"Content-Type":"application/x-www-form-urlencoded"},success:function(e){200==e.data.code?(t.$store.commit("set_mine",e.data.data.uinfo),t.$store.commit("set_horn",e.data.data.horn),uni.setStorage({key:"words",data:e.data.data.words,success:function(){}}),uni.setStorage({key:"grouping",data:e.data.data.grouping,success:function(){}}),uni.showToast({title:e.data.msg,icon:"success",mask:!0,duration:1500}),t.toMain(t.account,e.data.data.token)):uni.showToast({icon:"none",title:e.data.msg})},fail:function(t){e.log("request fail",t),uni.showModal({content:t.errMsg,showCancel:!1})},complete:function(){}})}},oauth:function(t){var n=this;uni.login({provider:t,success:function(e){uni.getUserInfo({provider:t,success:function(e){n.toMain(e.userInfo.nickName)}})},fail:function(t){e.error("授权登录失败："+(0,i.default)(t))}})},toMain:function(e,t){this.login(t),uni.setStorageSync("token",t),this.hasLogin?uni.reLaunch({url:"../main/main"}):uni.navigateBack()}}),_request:function(){var t=this;uni.request({url:requestUrl,dataType:"text",data:{noncestr:(0,a.default)()},success:function(n){e.log("request success",n),uni.showToast({title:"请求成功",icon:"success",mask:!0,duration:duration}),t.res="请求结果 : "+(0,i.default)(n)},fail:function(t){e.log("request fail",t),uni.showModal({content:t.errMsg,showCancel:!1})},complete:function(){t.loading=!1}})},onReady:function(){this.initPosition(),this.initProvider()}};t.default=s}).call(this,n("5a52")["default"])},"1f34":function(e,t,n){"use strict";n.r(t);var o=n("6159"),a=n("23ee");for(var i in a)"default"!==i&&function(e){n.d(t,e,function(){return a[e]})}(i);n("f884");var c=n("2877"),r=Object(c["a"])(a["default"],o["a"],o["b"],!1,null,"680409d0",null);t["default"]=r.exports},"23ee":function(e,t,n){"use strict";n.r(t);var o=n("4830"),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,function(){return o[e]})}(i);t["default"]=a.a},2876:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"m-icon",class:["m-icon-"+e.type],style:{color:e.color,"font-size":e.fontSize},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onClick()}}})},a=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return a})},"2d97":function(e,t,n){"use strict";var o=n("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=o(n("f499")),i="USERS_KEY",c=function(){var e="";return e=uni.getStorageSync(i),e||(e="[]"),JSON.parse(e)},r=function(e){var t=c();t.push({account:e.account,password:e.password}),uni.setStorageSync(i,(0,a.default)(t))},d={getUsers:c,addUser:r};t.default=d},"2f2a":function(e,t,n){var o=n("4dbb");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var a=n("4f06").default;a("63e0ce3e",o,!0,{sourceMap:!1,shadowMode:!1})},"39d9":function(e,t,n){"use strict";var o=n("e732"),a=n.n(o);a.a},4830:function(e,t,n){"use strict";var o=n("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=o(n("9495")),i={components:{mIcon:a.default},props:{type:String,value:String,placeholder:String,clearable:{type:[Boolean,String],default:!1},displayable:{type:[Boolean,String],default:!1},focus:{type:[Boolean,String],default:!1}},model:{prop:"value",event:"input"},data:function(){return{showPassword:!1,isFocus:!1}},computed:{inputType:function(){var e=this.type;return"password"===e?"text":e},clearable_:function(){return"false"!==String(this.clearable)},displayable_:function(){return"false"!==String(this.displayable)},focus_:function(){return"false"!==String(this.focus)}},methods:{clear:function(){this.$emit("input","")},display:function(){this.showPassword=!this.showPassword},onFocus:function(){this.isFocus=!0},onBlur:function(){var e=this;this.$nextTick(function(){e.isFocus=!1})},onInput:function(e){this.$emit("input",e.target.value)}}};t.default=i},"4dbb":function(e,t,n){t=e.exports=n("2350")(!1),t.push([e.i,".m-input-view[data-v-680409d0]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:100%;-webkit-box-flex:1;-webkit-flex:1;flex:1;padding:0 %?10?%}.m-input-input[data-v-680409d0]{-webkit-box-flex:1;-webkit-flex:1;flex:1;width:100%}.m-input-icon[data-v-680409d0]{width:20px}",""])},"511b":function(e,t,n){t=e.exports=n("2350")(!1),t.push([e.i,'@font-face{font-family:uniicons;font-weight:400;font-style:normal;src:url(https://img-cdn-qiniu.dcloud.net.cn/fonts/uni.ttf?t=1536565627510) format("truetype")}.m-icon[data-v-8f9bedc2]{font-family:uniicons;font-size:%?48?%;font-weight:400;font-style:normal;line-height:1;display:inline-block;text-decoration:none;-webkit-font-smoothing:antialiased}.m-icon.uni-active[data-v-8f9bedc2]{color:#007aff}.m-icon-contact[data-v-8f9bedc2]:before{content:"\\E100"}.m-icon-person[data-v-8f9bedc2]:before{content:"\\E101"}.m-icon-personadd[data-v-8f9bedc2]:before{content:"\\E102"}.m-icon-contact-filled[data-v-8f9bedc2]:before{content:"\\E130"}.m-icon-person-filled[data-v-8f9bedc2]:before{content:"\\E131"}.m-icon-personadd-filled[data-v-8f9bedc2]:before{content:"\\E132"}.m-icon-phone[data-v-8f9bedc2]:before{content:"\\E200"}.m-icon-email[data-v-8f9bedc2]:before{content:"\\E201"}.m-icon-chatbubble[data-v-8f9bedc2]:before{content:"\\E202"}.m-icon-chatboxes[data-v-8f9bedc2]:before{content:"\\E203"}.m-icon-phone-filled[data-v-8f9bedc2]:before{content:"\\E230"}.m-icon-email-filled[data-v-8f9bedc2]:before{content:"\\E231"}.m-icon-chatbubble-filled[data-v-8f9bedc2]:before{content:"\\E232"}.m-icon-chatboxes-filled[data-v-8f9bedc2]:before{content:"\\E233"}.m-icon-weibo[data-v-8f9bedc2]:before{content:"\\E260"}.m-icon-weixin[data-v-8f9bedc2]:before{content:"\\E261"}.m-icon-pengyouquan[data-v-8f9bedc2]:before{content:"\\E262"}.m-icon-chat[data-v-8f9bedc2]:before{content:"\\E263"}.m-icon-qq[data-v-8f9bedc2]:before{content:"\\E264"}.m-icon-videocam[data-v-8f9bedc2]:before{content:"\\E300"}.m-icon-camera[data-v-8f9bedc2]:before{content:"\\E301"}.m-icon-mic[data-v-8f9bedc2]:before{content:"\\E302"}.m-icon-location[data-v-8f9bedc2]:before{content:"\\E303"}.m-icon-mic-filled[data-v-8f9bedc2]:before,.m-icon-speech[data-v-8f9bedc2]:before{content:"\\E332"}.m-icon-location-filled[data-v-8f9bedc2]:before{content:"\\E333"}.m-icon-micoff[data-v-8f9bedc2]:before{content:"\\E360"}.m-icon-image[data-v-8f9bedc2]:before{content:"\\E363"}.m-icon-map[data-v-8f9bedc2]:before{content:"\\E364"}.m-icon-compose[data-v-8f9bedc2]:before{content:"\\E400"}.m-icon-trash[data-v-8f9bedc2]:before{content:"\\E401"}.m-icon-upload[data-v-8f9bedc2]:before{content:"\\E402"}.m-icon-download[data-v-8f9bedc2]:before{content:"\\E403"}.m-icon-close[data-v-8f9bedc2]:before{content:"\\E404"}.m-icon-redo[data-v-8f9bedc2]:before{content:"\\E405"}.m-icon-undo[data-v-8f9bedc2]:before{content:"\\E406"}.m-icon-refresh[data-v-8f9bedc2]:before{content:"\\E407"}.m-icon-star[data-v-8f9bedc2]:before{content:"\\E408"}.m-icon-plus[data-v-8f9bedc2]:before{content:"\\E409"}.m-icon-minus[data-v-8f9bedc2]:before{content:"\\E410"}.m-icon-checkbox[data-v-8f9bedc2]:before,.m-icon-circle[data-v-8f9bedc2]:before{content:"\\E411"}.m-icon-clear[data-v-8f9bedc2]:before,.m-icon-close-filled[data-v-8f9bedc2]:before{content:"\\E434"}.m-icon-refresh-filled[data-v-8f9bedc2]:before{content:"\\E437"}.m-icon-star-filled[data-v-8f9bedc2]:before{content:"\\E438"}.m-icon-plus-filled[data-v-8f9bedc2]:before{content:"\\E439"}.m-icon-minus-filled[data-v-8f9bedc2]:before{content:"\\E440"}.m-icon-circle-filled[data-v-8f9bedc2]:before{content:"\\E441"}.m-icon-checkbox-filled[data-v-8f9bedc2]:before{content:"\\E442"}.m-icon-closeempty[data-v-8f9bedc2]:before{content:"\\E460"}.m-icon-refreshempty[data-v-8f9bedc2]:before{content:"\\E461"}.m-icon-reload[data-v-8f9bedc2]:before{content:"\\E462"}.m-icon-starhalf[data-v-8f9bedc2]:before{content:"\\E463"}.m-icon-spinner[data-v-8f9bedc2]:before{content:"\\E464"}.m-icon-spinner-cycle[data-v-8f9bedc2]:before{content:"\\E465"}.m-icon-search[data-v-8f9bedc2]:before{content:"\\E466"}.m-icon-plusempty[data-v-8f9bedc2]:before{content:"\\E468"}.m-icon-forward[data-v-8f9bedc2]:before{content:"\\E470"}.m-icon-back[data-v-8f9bedc2]:before,.m-icon-left-nav[data-v-8f9bedc2]:before{content:"\\E471"}.m-icon-checkmarkempty[data-v-8f9bedc2]:before{content:"\\E472"}.m-icon-home[data-v-8f9bedc2]:before{content:"\\E500"}.m-icon-navigate[data-v-8f9bedc2]:before{content:"\\E501"}.m-icon-gear[data-v-8f9bedc2]:before{content:"\\E502"}.m-icon-paperplane[data-v-8f9bedc2]:before{content:"\\E503"}.m-icon-info[data-v-8f9bedc2]:before{content:"\\E504"}.m-icon-help[data-v-8f9bedc2]:before{content:"\\E505"}.m-icon-locked[data-v-8f9bedc2]:before{content:"\\E506"}.m-icon-more[data-v-8f9bedc2]:before{content:"\\E507"}.m-icon-flag[data-v-8f9bedc2]:before{content:"\\E508"}.m-icon-home-filled[data-v-8f9bedc2]:before{content:"\\E530"}.m-icon-gear-filled[data-v-8f9bedc2]:before{content:"\\E532"}.m-icon-info-filled[data-v-8f9bedc2]:before{content:"\\E534"}.m-icon-help-filled[data-v-8f9bedc2]:before{content:"\\E535"}.m-icon-more-filled[data-v-8f9bedc2]:before{content:"\\E537"}.m-icon-settings[data-v-8f9bedc2]:before{content:"\\E560"}.m-icon-list[data-v-8f9bedc2]:before{content:"\\E562"}.m-icon-bars[data-v-8f9bedc2]:before{content:"\\E563"}.m-icon-loop[data-v-8f9bedc2]:before{content:"\\E565"}.m-icon-paperclip[data-v-8f9bedc2]:before{content:"\\E567"}.m-icon-eye[data-v-8f9bedc2]:before{content:"\\E568"}.m-icon-arrowup[data-v-8f9bedc2]:before{content:"\\E580"}.m-icon-arrowdown[data-v-8f9bedc2]:before{content:"\\E581"}.m-icon-arrowleft[data-v-8f9bedc2]:before{content:"\\E582"}.m-icon-arrowright[data-v-8f9bedc2]:before{content:"\\E583"}.m-icon-arrowthinup[data-v-8f9bedc2]:before{content:"\\E584"}.m-icon-arrowthindown[data-v-8f9bedc2]:before{content:"\\E585"}.m-icon-arrowthinleft[data-v-8f9bedc2]:before{content:"\\E586"}.m-icon-arrowthinright[data-v-8f9bedc2]:before{content:"\\E587"}.m-icon-pulldown[data-v-8f9bedc2]:before{content:"\\E588"}.m-icon-scan[data-v-8f9bedc2]:before{content:"\\E612"}',""])},"5c2e":function(e,t,n){"use strict";n.r(t);var o=n("9679"),a=n("9d16");for(var i in a)"default"!==i&&function(e){n.d(t,e,function(){return a[e]})}(i);n("ab00");var c=n("2877"),r=Object(c["a"])(a["default"],o["a"],o["b"],!1,null,"15c12aaa",null);t["default"]=r.exports},6159:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"m-input-view"},[n("v-uni-input",{staticClass:"m-input-input",attrs:{focus:e.focus_,type:e.inputType,value:e.value,placeholder:e.placeholder,password:"password"===e.type&&!e.showPassword},on:{input:function(t){arguments[0]=t=e.$handleEvent(t),e.onInput.apply(void 0,arguments)},focus:function(t){arguments[0]=t=e.$handleEvent(t),e.onFocus.apply(void 0,arguments)},blur:function(t){arguments[0]=t=e.$handleEvent(t),e.onBlur.apply(void 0,arguments)}}}),e.clearable_&&!e.displayable_&&e.value.length?n("v-uni-view",{staticClass:"m-input-icon"},[n("m-icon",{attrs:{color:"#666666",type:"clear",size:"20"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.clear.apply(void 0,arguments)}}})],1):e._e(),e.displayable_?n("v-uni-view",{staticClass:"m-input-icon"},[n("m-icon",{attrs:{color:e.showPassword?"#666666":"#cccccc",type:"eye",size:"20"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.display.apply(void 0,arguments)}}})],1):e._e()],1)},a=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return a})},"77e0":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("c5f6");var o={props:{type:String,color:String,size:{type:[Number,String],default:24}},computed:{fontSize:function(){var e=Number(this.size);return e=isNaN(e)?24:e,"".concat(e,"px")}},methods:{onClick:function(){this.$emit("click")}}};t.default=o},9495:function(e,t,n){"use strict";n.r(t);var o=n("2876"),a=n("c2af");for(var i in a)"default"!==i&&function(e){n.d(t,e,function(){return a[e]})}(i);n("39d9");var c=n("2877"),r=Object(c["a"])(a["default"],o["a"],o["b"],!1,null,"8f9bedc2",null);t["default"]=r.exports},9679:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"content"},[n("v-uni-view",{staticClass:"input-group"},[n("v-uni-view",{staticClass:"input-row border"},[n("v-uni-text",{staticClass:"title"},[e._v("账号：")]),n("m-input",{staticClass:"m-input",attrs:{type:"text",clearable:"",placeholder:"请输入账号"},model:{value:e.account,callback:function(t){e.account=t},expression:"account"}})],1),n("v-uni-view",{staticClass:"input-row"},[n("v-uni-text",{staticClass:"title"},[e._v("密码：")]),n("m-input",{attrs:{type:"password",displayable:"",placeholder:"请输入密码"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1)],1),n("v-uni-view",{staticClass:"btn-row"},[n("v-uni-button",{staticClass:"primary",attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.bindLogin.apply(void 0,arguments)}}},[e._v("登录")])],1),e.hasProvider?n("v-uni-view",{staticClass:"oauth-row",style:{top:e.positionTop+"px"}},e._l(e.providerList,function(t){return n("v-uni-view",{key:t.value,staticClass:"oauth-image"},[n("v-uni-image",{attrs:{src:t.image},on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.oauth(t.value)}}})],1)}),1):e._e()],1)},a=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return a})},"9d16":function(e,t,n){"use strict";n.r(t);var o=n("01ff"),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,function(){return o[e]})}(i);t["default"]=a.a},ab00:function(e,t,n){"use strict";var o=n("fe65"),a=n.n(o);a.a},b901:function(e,t,n){t=e.exports=n("2350")(!1),t.push([e.i,".action-row[data-v-15c12aaa]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.action-row uni-navigator[data-v-15c12aaa]{color:#007aff;padding:0 %?20?%}.oauth-row[data-v-15c12aaa]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;position:absolute;top:0;left:0;width:100%}.oauth-image[data-v-15c12aaa]{width:%?100?%;height:%?100?%;border:%?1?% solid #ddd;border-radius:%?100?%;margin:0 %?40?%;background-color:#fff}.oauth-image uni-image[data-v-15c12aaa]{width:%?60?%;height:%?60?%;margin:%?20?%}",""])},c2af:function(e,t,n){"use strict";n.r(t);var o=n("77e0"),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,function(){return o[e]})}(i);t["default"]=a.a},e732:function(e,t,n){var o=n("511b");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var a=n("4f06").default;a("61c10e93",o,!0,{sourceMap:!1,shadowMode:!1})},f884:function(e,t,n){"use strict";var o=n("2f2a"),a=n.n(o);a.a},fe65:function(e,t,n){var o=n("b901");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var a=n("4f06").default;a("7a07fbdf",o,!0,{sourceMap:!1,shadowMode:!1})}}]);