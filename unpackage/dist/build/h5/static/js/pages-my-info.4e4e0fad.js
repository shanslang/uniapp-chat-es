(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-info"],{"4d8f":function(t,n,e){"use strict";e.r(n);var i=e("e439"),a=e.n(i);for(var s in i)"default"!==s&&function(t){e.d(n,t,function(){return i[t]})}(s);n["default"]=a.a},a3a0:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"uni-padding-wrap uni-common-mt"},[!1===t.hasLogin?[e("v-uni-view",{staticClass:"uni-h3 uni-center uni-common-mt"},[e("v-uni-navigator",{attrs:{url:"../login/login"}},[t._v("请先登录")])],1)]:t._e(),1==t.hasLogin?[e("v-uni-view",{staticClass:"uni-h3 uni-center uni-common-mt"},[t._v(t._s(t.nickname))]),e("v-uni-form",{on:{submit:function(n){arguments[0]=n=t.$handleEvent(n),t.formSubmit.apply(void 0,arguments)},reset:function(n){arguments[0]=n=t.$handleEvent(n),t.formReset.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"uni-form-item uni-column"},[e("v-uni-view",{staticClass:"title"},[t._v("支付宝账号")]),e("v-uni-input",{staticClass:"uni-input",attrs:{name:"zfbAcc",placeholder:"支付宝账号"},model:{value:t.zfbAcc,callback:function(n){t.zfbAcc=n},expression:"zfbAcc"}})],1),e("v-uni-view",{staticClass:"uni-form-item uni-column"},[e("v-uni-view",{staticClass:"title"},[t._v("银行名")]),e("v-uni-input",{staticClass:"uni-input",attrs:{name:"bankname",placeholder:"银行名"},model:{value:t.bankname,callback:function(n){t.bankname=n},expression:"bankname"}})],1),e("v-uni-view",{staticClass:"uni-form-item uni-column"},[e("v-uni-view",{staticClass:"title"},[t._v("银行卡号")]),e("v-uni-input",{staticClass:"uni-input",attrs:{type:"number",name:"bankcode",placeholder:"银行卡号"},model:{value:t.bankcode,callback:function(n){t.bankcode=n},expression:"bankcode"}})],1),e("v-uni-view",{staticClass:"uni-form-item uni-column"},[e("v-uni-view",{staticClass:"title"},[t._v("签名")]),e("v-uni-input",{staticClass:"uni-input",attrs:{name:"signature",placeholder:"个人签名"},model:{value:t.signature,callback:function(n){t.signature=n},expression:"signature"}})],1),e("v-uni-view",{staticClass:"uni-btn-v"},[e("v-uni-button",{attrs:{"form-type":"submit"}},[t._v("修改")])],1)],1)]:t._e()],2)},a=[];e.d(n,"a",function(){return i}),e.d(n,"b",function(){return a})},e439:function(t,n,e){"use strict";(function(t){var i=e("288e");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=i(e("f499")),s=i(e("cebc")),o=e("2f62"),u=e("ec26"),c={computed:(0,s.default)({},(0,o.mapState)(["hasLogin","s_token"])),data:function(){return{chooseGender:0,nickname:"",zfbAcc:"",bankname:"",bankcode:"",signature:""}},onLoad:function(){this.nickname=this.$store.state.socket.mine.nickname+"("+this.$store.state.socket.mine.gameid+")",this.zfbAcc=this.$store.state.socket.mine.zfb_account,this.bankname=this.$store.state.socket.mine.banks,this.bankcode=this.$store.state.socket.mine.bank_code,this.signature=this.$store.state.socket.mine.sign},methods:{formSubmit:function(n){var e=this,i=n.detail.value;i.token=this.s_token,uni.showLoading({title:"提交修改..",mask:!1}),uni.request({url:u.s_editInfo,dataType:"json",data:{formdata:(0,a.default)(i)},method:"post",header:{"Content-Type":"application/x-www-form-urlencoded"},success:function(t){uni.hideLoading(),200===t.data.code?(e.$store.commit("set_mine",t.data.data.uinfo),uni.showToast({icon:"none",title:"修改成功"})):uni.showToast({icon:"none",title:t.data.msg})},fail:function(n){return t.log("request fail",n),uni.showModal({content:n.errMsg,showCancel:!1}),!1},complete:function(){}})},formReset:function(n){t.log("清空数据")}}};n.default=c}).call(this,e("5a52")["default"])},ecc1:function(t,n,e){"use strict";e.r(n);var i=e("a3a0"),a=e("4d8f");for(var s in a)"default"!==s&&function(t){e.d(n,t,function(){return a[t]})}(s);var o=e("2877"),u=Object(o["a"])(a["default"],i["a"],i["b"],!1,null,"65725378",null);n["default"]=u.exports}}]);