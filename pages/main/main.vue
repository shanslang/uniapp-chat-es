<template>
	<view class="content">
		
		<view class="example-body" v-bind:class="[horn.length > 0 ? '' : 'isHorn']">
			<uni-notice-bar :show-icon="true" :scrollable="true" :single="true" :text="horn" />
		</view>
		
		<view class="message-list">
			<wkiwi-action :options="options" :messagesList="messages" :fNotice="fNotice"></wkiwi-action>
		</view>
	</view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
	import helper from  '@/common/tree/helper.js';
	import wkiwiAction from "../../components/wkiwi-action.vue";
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
    export default {
        computed: mapState(['forcedLogin', 'hasLogin', 'userName', 's_token']),
		components: { 
			wkiwiAction,
			uniNoticeBar
		},
		data() {
			return {
				userList: [],
				groupList:[],
				indexList:[],
				isLoad:false,
				horn: 'rt',
				fNotice: 0,
				options: [
					{
						text: "删除",
						style: {
						    backgroundColor: "#dd524d"
						}
					}
				],
				messages: [
					{
					id: 0,
				    username: "暂无会话, 选择好友一起聊天吧",
				    avatar: "",
				    content: "",
				    time: "",
				    cts: 0,
					status: 'online',
				    disabled: false, //是否禁止滑动
					type: 'friend'
				}
				]
			}
		},
        onLoad() {
			// uni.clearStorageSync();
			this.horn = this.$store.state.socket.horn;
            this.getnewsList();
			uni.$on('main_infoList', this.addChatList);
			uni.$on('main_chatChange', this.chatChange);  // 监听更改数量
        },
		onUnload(){
			uni.$off();
		},
		onShow() {
			this.horn = this.$store.state.socket.horn;
		},
		onPullDownRefresh:function(){ // 下拉刷新
			uni.showNavigationBarLoading();
			this.getnewsList();
		},
		methods: {
			...mapMutations(['logout']),
			playMusic:function(url){
				audioClass.play(url);
			},
			goItem:function(item){
				if(item.gid!=0 || item.gid!=""){
					uni.navigateTo({
						url:"chat?groupid="+item.groupid
					})
				}else{
					uni.navigateTo({
						url:"pm?uuid="+item.touserid
					})
				}
			},
			getnewsList: function (){
				if (!this.hasLogin) {
				    uni.showModal({
				        title: '未登录',
				        content: '您未登录，需要登录后才能继续',
				        /**
				         * 如果需要强制登录，不显示取消按钮
				         */
				        showCancel: !this.forcedLogin,
				        success: (res) => {
				            if (res.confirm) {
								/**
								 * 如果需要强制登录，使用reLaunch方式
								 */
				                if (this.forcedLogin) {
				                    uni.reLaunch({
				                        url: '../login/login'
				                    });
				                } else {
				                    uni.navigateTo({
				                        url: '../login/login'
				                    });
				                }
				            }
				        }
				    });
				}else{
					this.$store.dispatch('initWs');
				}		
				uni.hideNavigationBarLoading();
				uni.stopPullDownRefresh();
			},
			addChatList: function (e){
				//uni.clearStorageSync();
				if(e.isSys == 0){
					if(e.iscc == 1){
						var strkey = '';
						
						var strkey = "sto_"+e.type+this.$store.state.socket.mine.id + "0" + e.id;  // 与好友或群聊的本地存储key
						var key_v = uni.getStorageSync(strkey);
						if(key_v.length < 1){
							key_v = [];
						}else if(key_v.length > 19){
							key_v.shift();
						}
						key_v.push(e);
						uni.setStorage({
							key: strkey,
							data: key_v,
							success: function () {
								//console.log('success');
							}
						});
					}
					//console.log(uni.getStorageSync(strkey));
					var isExists = 0;
					if(this.messages.length > 0 && this.messages[0].id === 0){this.messages.shift();}
					for(let i=0;i<this.messages.length;i++){
						if(this.messages[i].id == e.id && this.messages[i].type == e.type && e.type == 'friend'){
							this.messages[i].username = e.username;
							this.messages[i].avatar = e.avatar;
							this.messages[i].content = e.msg_type == 1 ? '图片' : e.content.text;
							this.messages[i].time = helper.getdateGs(e.timestamp);
							this.messages[i].timestamp = e.timestamp;
							if(e.cts == undefined){
								this.messages[i].cts += 1;
							}else{
								this.messages[i].cts = 0;
							}
							isExists = 1;
						}else if(e.type == 'group' && this.messages[i].type == e.type && this.messages[i].id == e.gid){
							this.messages[i].content = e.msg_type == 1 ? '图片' : e.content.text;
							this.messages[i].time = helper.getdateGs(e.timestamp);
							this.messages[i].timestamp = e.timestamp;
							if(e.cts == undefined){
								this.messages[i].cts += 1;
							}else{
								this.messages[i].cts = 0;
							}
							isExists = 1;
						}
					}
					if(isExists === 0){
						let clist = {};
						if(e.type == 'friend'){
							clist = {
								id: e.id,
								username: e.username,
								avatar: e.avatar,
								content: e.msg_type == 1 ? '图片' : e.content.text,
								time: helper.getdateGs(e.timestamp),
								timestamp: e.timestamp,
								cts: e.cts == undefined ? 1 : e.cts,
								status: 'online',
								disabled: false, //是否禁止滑动
								type: e.type
							};
						}else{
							clist = {
								id: e.gid == undefined ? e.id : e.gid,
								gid: e.gid == undefined ? e.id : e.gid,
								groupname: e.groupname,
								username: e.groupname,
								avatar: e.avatar,
								content: e.msg_type == 1 ? '图片' : e.content.text,
								time: helper.getdateGs(e.timestamp),
								timestamp: e.timestamp,
								cts: e.cts == undefined ? 1 : e.cts,
								status: 'online',
								disabled: false, //是否禁止滑动
								type: e.type
							};
						}
						
						this.messages.unshift(clist);
					}
					this.messages.sort(this.sortBy('timestamp'));
				}else{
					this.fNotice += e.count;
					console.log(e);
				}
			},
			chatChange: function (e) {
				if(e.type == 1){
					this.messages[e.i].cts = 0;
				}else{
					this.fNotice = 0;
				}
			},
			sortBy: function(attr,rev){ 
				//第二个参数没有传递 默认降序排列
				if(rev == undefined){
					rev = -1;
				}else{
					rev = (rev) ? -1 : 1;
				}
				
				return function(a,b){
					a = a[attr];
					b = b[attr];
					if(a < b){
						return rev * -1;
					}
					if(a > b){
						return rev * 1;
					}
					return 0;
				}
			}
		}
    }
</script>

<style>
.isHorn{display: none;}
	
</style>
