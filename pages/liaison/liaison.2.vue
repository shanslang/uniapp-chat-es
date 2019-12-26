<template>
    <view>
        <view class="uni-flex uni-row">
			<view class="flex-item uni-bg-red sel" @click="add" v-bind:class="[canAdd ? 'sel2' : '']">好友</view>
			<view class="flex-item uni-bg-green sel" @click="remove" v-bind:class="[canAdd ? '' : 'sel2']">群组</view>
		</view>
		
		<view class="uni-panel" v-for="(item, index) in list" :key="item.id" v-bind:class="[canAdd ? '' : 'isShow']">
		    <view class="uni-panel-h" :class="item.open ? 'uni-panel-h-on' : ''" @click="triggerCollapse(index)">
		        <text class="uni-panel-text">{{item.groupname}}</text>
		        <text class="uni-panel-icon uni-icon" :class="item.open ? 'uni-panel-icon-on' : ''">&#xe581;</text>
		    </view>
		    <view class="uni-panel-c" v-if="item.open">	
					
				<block v-for="(it,i) of item.pages" :key="i">
					<uni-swipe-action :options="options" @tap="bindClickBtn(it.username, 'popup', 0)">
					<view class="uni-swipe-action">
						<view class="uni-swipe-action__container">	
							<view class="uni-swipe-action__content " @click="toMessageDetail(i,it.type)">		
								<view class="item" :class="it.stick  ? 'stick' : ''">
									<block>
										<view class="item-left">
											<avator-group :text="it.username" :type ="it.type" :avator = "it.avatar" v-bind:class="[it.status == 'offline' ? 'hui' : '']"></avator-group>
										</view>
										<view class="item-middle">
											<text class="title">{{it.username}}</text>
											<text class="message">{{it.sign}}</text>
										</view>
									</block>
								</view>
							</view>	
						</view>
					</view>
					</uni-swipe-action>
				</block>
				
		    </view>
		</view>
		
		<view class="message-list" v-bind:class="[canAdd ? 'isShow' : '']">
			<block v-for="(it,i) of groupList" :key="i">
				<view class="uni-swipe-action">
					<view class="uni-swipe-action__container" :data-disabled="it.disabled">
						<view class="uni-swipe-action__content ">
							<view class="item" :class="it.stick  ? 'stick' : ''">
								<block v-if="it.type == 2 || it.type == 3">
									<view class="item-left">
										<!-- <avator-group :type ="it.type" :avator = "it.url"></avator-group> -->
										<avator-group :type ="2" :avator = "it.url"></avator-group>
									</view>
									<view class="item-middle">
										<text class="title">{{it.title}}</text>
									</view>
								</block>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		
		<view class="example-body">
			<uni-drawer :visible="showRight" mode="right" @close="closeDrawer('right')">
				<!-- #ifndef MP-BAIDU || MP-ALIPAY || MP-TOUTIAO -->
				<uni-list>
					<uni-list-item title="创建分组" @tap="bindClickBtn('', 'share', 0)" />
					<uni-list-item title="添加好友/群" @tap="navigateTo('add/addf')" />
					<uni-list-item title="创建群" @tap="navigateTo('add/createGroup')" />
					<uni-list-item class="last-list-item" @tap="navigateTo('add/newf')" :show-badge="true" title="新朋友" badge-text="0" />
				</uni-list>
				<!-- #endif -->
				<!-- #ifdef MP-BAIDU || MP-ALIPAY || MP-TOUTIAO -->
				<view class="uni-list">
					<uni-list-item title="创建分组" @tap="bindClickBtn('', 'share', 0)" />
					<uni-list-item title="添加好友/群" />
					<uni-list-item title="创建群" />
					<uni-list-item class="last-list-item" :show-badge="true" title="新朋友" badge-text="0" />
				</view>
				<!-- #endif -->
				<view class="close">
					<view class="word-btn" hover-class="word-btn--hover" :hover-start-time="20" :hover-stay-time="70" @click="hide"><text class="word-btn-white">关闭</text></view>
				</view>
			</uni-drawer>
		</view>
		
		<uni-popup :show="showpopup" type="center" @change="change">
			<view class="uni-padding-wrap uni-common-mt" style="background-color: #ccc;">
				<form @submit="formSubmit">
					<view class="uni-form-item uni-column">
						<view class="title">修改 【 {{remarkNick}} 】 备注</view>
						<input class="uni-input" name="nickname" placeholder="请输入备注" />
					</view>
					<view class="uni-btn-v">
						<button form-type="submit">修改</button>
						<button type="default" form-type="reset">重置</button>
						<button type="default" @click="erClosed">关闭</button>
					</view>
				</form>
			</view>
		</uni-popup>
		
		<!-- 底部创建分组 -->
		<uni-popup :show="showshare" type="bottom" @change="change">
			<view class="uni-share">
				<text class="uni-share-title">创建分组</text>
				<form @submit="formSubmit">
					<view class="uni-form-item uni-column">
						<input class="uni-input" name="nickname" placeholder="请输入分组名" />
					</view>
					<view class="uni-btn-v">
						<button form-type="submit">添加</button>
						<button type="default" @click="erClosed">关闭</button>
					</view>
				</form>
				<text class="uni-share-btn" @click="cancel('share')">取消</text>
			</view>
		</uni-popup>
		
    </view>
</template>


<script>
	import  {s_UserList}  from  '@/common/js/config.js'
	var  graceChecker = require("../../common/graceChecker.js");
	import {
		mapState
	} from 'vuex'
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import uLink from '@/components/lxr/uLink.vue'
	import avatorGroup from "../../components/avator-group.vue"
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
	        computed: mapState(['forcedLogin', 'hasLogin', 's_token']),
			components: {
				uniIcons,
			    uLink,
				uniListItem,
				avatorGroup,
				uniList,
				uniDrawer,
				uniSwipeAction,
				uniPopup
			},
			data() {
				const elId = `Uni_${Math.ceil(Math.random() * 10e5).toString(36)}`
				return {
					remarkNick: '', // 昵称
					showpopup: false,
					showshare: false, // 显示创建分组
					elId: elId,
					transformX: 'translateX(0px)',
					canAdd: true,
					messageIndex: -1,
					showRight: false,
					options: [
						{
							text: "修改备注",
							style: {
							    backgroundColor: "#C7C6CD"
							}
						}
					],
					list: [{
						id: 'view',
						groupname: '默认分组',
						open: false,
						pages: [
							{
								username: "雷军",
								avatar:"http://img1.3lian.com/gif/more/11/201212/cf9d56d05c0cbc1edbf21cf64ad9c341.jpg",
								sign: "微信给你下线，看你还嘚瑟",
								time: "12:11",
								count: 0,
								status: 'online',
								stick: false,
								disabled: 1, //是否禁止滑动
								type: 4 //普通用户类型消息
							}
						]
					}, {
						id: 'content',
						groupname: 'leaf',
						open: false,
						pages: [							
							{
								username: "雷军",
								avatar:"http://img1.3lian.com/gif/more/11/201212/cf9d56d05c0cbc1edbf21cf64ad9c341.jpg",
								sign: "微信给你下线，看你还嘚瑟",
								time: "12:11",
								count: 0,
								status: 'online',
								stick: false,
								disabled: false, //是否禁止滑动
								type: 2 //普通用户类型消息
							},
							{
								username: "前端开发者",
								avatar:"http://img1.3lian.com/gif/more/11/201212/cf9d56d05c0cbc1edbf21cf64ad9c341.jpg",
								sign: "我们的春天来啦，哈哈哈",
								time: "11:35",
								count: 0,
								status: 'offline',
								stick: false,
								disabled: false, //是否禁止滑动
								type: 2 //普通用户类型消息
							}
							
						]
					}],
					groupList: [{
						title: "扫黑除恶工作小组",
						url: "http://img1.3lian.com/gif/more/11/201212/cd1d745ed855bef27f47c8aff0786067.jpg",
						message: "原地待命",
						time: "15:15",
						count: 22,
						stick: true,
						disabled: false, //是否禁止滑动
						type: 3 //群组消息
					},
					{
					    title: "扫黑除恶工作小组",
						url: "http://img1.3lian.com/gif/more/11/201212/e10e8faa201671b5a2e8a6146f80d99e.jpg",
					    message: "原地待命",
					    time: "15:15",
					    count: 22,
					    stick: true,
					    disabled: false, //是否禁止滑动
					    type: 3 //群组消息
					}
					]
				}
			},
			onNavigationBarButtonTap(e) {
				this.showRight = !this.showRight
			},
			methods: {	
				navigateTo(url) {
					uni.navigateTo({
						url: url
					})
				    setTimeout(()=>{
				        uni.$emit('postMsg',{msg:'From navigator'})
				    },1000)
				},
				togglePopup(open) {
					this['show' + open] = true
				},
				change(e) {
					console.log('是否打开:' + e.show)
					if (!e.show) {
						this.remarkNick = '';
						this.showpopup = false;
						this.showshare = false
					}
				},
				hide() {
					console.log("hide");
					this.showRight = false
				},
				closeDrawer(e) {
					this.showRight = false
				},
				toMessageDetail(i,type){
					if(type == 2){
						console.log('进入到聊天界面'+i)
						uni.navigateTo({
							url:"../msg/msg"
						})
					}else if(type == 1){
						console.log('进入系统消息界面'+i)
					}
				},
				add: function(e) {
					this.canAdd = true;
				},
				remove: function(e) {
					this.canAdd = false;
				},
				triggerCollapse(e) {
				    if (!this.list[e].pages) {
						console.log(this.list[e].avatar);
				        this.goDetailPage(this.list[e].avatar);
						
				        return;
				    }
				    for (var i = 0; i < this.list.length; ++i) {
				        if (e === i) {
				            this.list[i].open = !this.list[e].open;
				        } else {
				            this.list[i].open = false;
				        }
				    }
				},
				goDetailPage(e) {
				    if (this.navigateFlag) {
				        return;
				    }
				    this.navigateFlag = true;
				    if (typeof e === 'string') {
				        uni.navigateTo({
				            url: '/pages/component/' + e + '/' + e
				        })
				    } else {
				        uni.navigateTo({
				            url: e.url
				        })
				    }
				    setTimeout(() => {
				        this.navigateFlag = false;
				    }, 200)
				},
				bindClickBtn(nick, type, id) {
					this.showRight = false;
					this.remarkNick = nick;
					this.togglePopup(type);
				},
				erClosed(){
					this.showpopup = false;
					this.showshare = false;
				},
				formSubmit: function(e) {
					console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				    //定义表单规则
				    var rule = [
				        {name:"nickname", checkType : "string", checkRule:"1,15",  errorMsg:"备注应为1-15个字符"}
				    ];
				    //进行表单检查
				    var formData = e.detail.value;
				    var checkRes = graceChecker.check(formData, rule);
				    if(checkRes){
						this.showpopup = false;
				        uni.showToast({title:"验证通过!", icon:"none"});
				    }else{
				        uni.showToast({ title: graceChecker.error, icon: "none" });
				    }
				},
				getData: function (url, token){
					uni.request({
						url: url,
						dataType: 'json',
						data: {token: token},
						method: 'post',
						header: {  
							'Content-Type': 'application/x-www-form-urlencoded'  
						}, 
						success: (res) => {
							// console.log(res.data.data);
							if(res.data.code === 0){
								// var data = JSON.parse(JSON.stringify(res.data));
								var data = res.data;
								this.$store.commit('set_mine', data.data.mine);
								this.list = data.data.friend;
								// console.log(this.$store.state.socket.mine);
							// 	uni.showToast({
							// 		title: res.data.msg,
							// 		icon: 'success',
							// 		mask: true,
							// 		duration: 1500
							// 	});
							}else{
								uni.showToast({
								    icon: 'none',
								    title: res.data.msg
								});
								return;
							}
						},
						fail: (err) => {
							console.log('request fail', err);
							uni.showModal({
								content: err.errMsg,
								showCancel: false
							});
							return false;
						},
						complete: () => {
							// uni.hideToast();
						}
					});
				}
			},
	        onLoad() {
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
					var uList = this.getData(s_UserList, this.s_token);
					
					// if(uList){
					// 	console.log(graceChecker.err);
					// }else{
					// 	console.log('uList');
					// }
					
				}
				
	        }
	    }
</script>

<style lang="scss">
	@import '../../common/lxr/uni-nvue.css';
	.sel{width: 50%;height: 60upx;line-height: 60upx; background-color: #0088CC;text-align: center;}
	.sel2{color: #E1FFFF;background-color: #8FBC8F;}
	.isShow{display: none;}
	
	.uni-swipe-action {
		width: 100%;
		overflow: hidden;
		&__container {
			background-color: #FFFFFF;
			width: 200%;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			transition: transform 350ms cubic-bezier(.165, .84, .44, 1);
		}
		&__content {
			width: 50%;
		}
		&__btn-group {
			display: flex;
			flex-direction: row;
		}
		&--btn {
			padding: 0 32upx;
			color: #FFFFFF;
			background-color: #C7C6CD;
			font-size: 28upx;
			display: inline-flex;
			text-align: center;
			flex-direction: row;
			align-items: center;
		}
	}
	.item {
	  display: flex;
	  flex-direction: row;
	  justify-content: space-between;
	  padding: 10upx 16upx;
	  background-color: #fff;
		border-bottom:1px solid rgb(243,243,243);
		&.stick{
			background-color: rgba(243, 236, 221,.5);
		}
		.item-left {
		  text-align: center;
			.image {
			  width: 100upx;
			  height: 100upx;
			  border-radius: 50upx;
			  background-color: #eee;
			}
			.avator{
				width: 100upx;
				height: 100upx;
				text-align: center;
				line-height: 100upx;
				background: #4191ea;
				border-radius: 50%;
				overflow: hidden;
				.iconfont{
					width: 100upx;
					height: 100upx;
					text-align: center;
					line-height: 100upx;
					color: #fff;
					font-size: 40upx;
				}
			}
		}
		.item-middle {
			display: flex;
		  flex: 1;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: flex-start;
		  margin-left: 15upx;
		  overflow: hidden;
			.title {
				width: 100%;
			  color: #000;
			  font-family: "微软雅黑";
			  font-weight: 400;
			  font-size: 30upx;
				height: 50upx;
			  line-height:60upx;
			  overflow: hidden; /*自动隐藏文字*/
			  text-overflow: ellipsis; /*文字隐藏后添加省略号*/
				white-space: nowrap; /**强制不换行*/
			}
			.message {
				width: 100%;
			  font-family: "微软雅黑";
			  color: #808080;
				height: 50upx;
			  line-height: 40upx;
			  font-size: 24upx;
			  overflow: hidden; /**自动隐藏文字*/
			  text-overflow: ellipsis; /**文字隐藏后添加省略号*/
			  white-space: nowrap; /**强制不换行*/
			}
		}
		.item-right {
		  overflow: hidden;
		  display: flex;
		  flex-direction: column;
		  align-items: center;
			.time {
			  color: #808080;
			  font-size: 18upx;
				height:60upx;
				line-height: 60upx;
			}
			.mark {
			  background-color: #f74c31;
			  line-height: 35upx;
				text-align: center;
			  font-size: 18upx;
			  min-width: 35upx;
			  min-height: 35upx;
			  border-radius: 18upx;
			  color: #fff;
			}
		}
	}
	
	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}
	
	.word-btn--hover {
		background-color: #4ca2ff;
	}
	
	/* 底部分享 */
	.uni-share {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		background-color: #fff;
	}
	.uni-share-title {
		line-height: 60rpx;
		font-size: 24rpx;
		padding: 15rpx 0;
		text-align: center;
	}
	
	.hui{filter: grayscale(100%);}
</style>
