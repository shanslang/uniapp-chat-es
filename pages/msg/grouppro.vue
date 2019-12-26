<template>
    <view>
		<button type="primary" plain="true" class="button-sp-area" v-if="myid == gownid" @click="editGname">修改群名</button>
		<block v-for="(it,i) of list" :key="i">
			<uni-swipe-action :options="options" @tap="bindClickBtn(it.id, it.username)">
				<view class="uni-swipe-action">
					<view class="uni-swipe-action__container">	
						<view class="uni-swipe-action__content " @click="toMessageDetail(i,it,'friend')">		
							<view class="item" :class="i == 0  ? 'stick' : ''">
								<block>
									<view class="item-left">
										<avator-group :text="it.username" :type ="it.type" :avator = "it.avatar" v-bind:class="[it.status == 'offline' ? 'hui' : '']"></avator-group>
									</view>
									<view class="item-middle">
										<text class="title" :class="it.vip > 0  ? 'red' : ''">{{it.username}}</text>
										<text class="message">{{it.sign}}</text>
									</view>
								</block>
							</view>
						</view>	
					</view>
				</view>
			</uni-swipe-action>
		</block>
		
		<uni-popup :show="showpopup" type="center" @change="change">
			<view class="uni-padding-wrap uni-common-mt" style="background-color: #ccc;">
				<form @submit="formSubmitbz">
					<view class="uni-form-item uni-column">
						<view class="title">修改群名</view>
						<input class="uni-input" name="gname" placeholder="请输入群名" />
					</view>
					<view class="uni-btn-v">
						<button form-type="submit">修改</button>
						<button type="default" form-type="reset">重置</button>
						<button type="default" @click="change">关闭</button>
					</view>
				</form>
			</view>
		</uni-popup>
    </view>
</template>


<script>
	import  {s_members,s_editGname,s_kickPeople}  from  '@/common/js/config.js'
	var  graceChecker = require("../../common/graceChecker.js");
	import {
		mapState
	} from 'vuex'
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import avatorGroup from "../../components/avator-group.vue"
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
	        computed: mapState(['forcedLogin', 'hasLogin', 's_token']),
			components: {
				uniIcons,
				avatorGroup,
				uniDrawer,
				uniSwipeAction,
				uniPopup
			},
			data() {
				return {
					myid:0, 
					groupid:0, // 群id
					gownid: 0, // 群主id
					list: {},
					options: [],
					showpopup: false
				}
			},
			onNavigationBarButtonTap(e) {
				var cont = '确定退出该群？';
				if(this.gownid == this.$store.state.socket.mine.id){
					cont = "确定解散该群？";
				}
				uni.showModal({
				    title: '退群',
				    content: cont,
				    success: (res) => {
				        if (res.confirm) {
							console.log('退群');
				        }
				    }
				});
			},
			onLoad(e){
				uni.setNavigationBarTitle({
					title: " "+e.name+"  成员"
				});
				console.log(e);
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
					this.groupid = e.id;
					this.myid = this.$store.state.socket.mine.id;
					uni.request({
						url: s_members,
						dataType: 'json',
						data: {token: this.s_token, id: e.id},
						method: 'post',
						header: {  
							'Content-Type': 'application/x-www-form-urlencoded'  
						}, 
						success: (res) => {
							if(res.data.code === 200){
								var data = res.data;
								this.list = data.data.list;
								//console.log(data.data);
								var groupz = {};
								var index = 0;
								this.gownid = data.data.ownerid;
								for(let i=0;i<this.list.length; i++){
									if(this.list[i].id == data.data.ownerid){
										groupz = this.list[i];
										index = i;
										break;
									}	
								}
								this.list.splice(index, 1, groupz);
								if(data.data.ownerid == this.$store.state.socket.mine.id){
									this.options = [{
											text: "踢人",
											style: {
												backgroundColor: "#C7C6CD"
											}
									}];
	
								}
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
			methods: {	
				bindClickBtn(e, name){
					if(e == this.gownid){
						uni.showModal({
							content: '不能踢自己',
							showCancel: false
						});
					}else{
						uni.showModal({
						    title: '踢人',
						    content: '确定把 '+name+' 踢出该群？',
						    success: (res) => {
						        if (res.confirm) {
									uni.request({
										url: s_kickPeople,
										dataType: 'json',
										data: {token: this.s_token, gid: this.groupid, id: e},
										method: 'post',
										header: {  
											'Content-Type': 'application/x-www-form-urlencoded'  
										}, 
										success: (res) => {
											if(res.data.code === 200){
												uni.showToast({
												    icon: 'none',
												    title: '成功'
												});
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
						    }
						});
					}
				},
				editGname:function(){
					this.showpopup = true;
				},
				toMessageDetail(i,it,type){
					var idinfo = JSON.stringify(it);
					it.type = 'friend';
					this.$store.state.socket.CurrentToUser = it;
					uni.navigateTo({
						url:"../msg/msg?it="+idinfo
					})
				},
				change(e) {
					if (!e.show) {
						this.showpopup = false;
					}
				},
				formSubmitbz: function(e){
					var formData = e.detail.value;
					if(formData.gname.length < 1 || formData.gname.length > 15){
						uni.showToast({ title: '群名长度在 1-15 之间', icon: "none" });
						return;
					}else{
						this.tj(s_editGname,formData.gname);
					}
				},
				tj: function (url, editname){
					uni.request({
						url: url,
						dataType: 'json',
						data: {token: this.s_token, gid: this.groupid, gname: editname},
						method: 'post',
						header: {  
							'Content-Type': 'application/x-www-form-urlencoded'  
						}, 
						success: (res) => {
							if(res.data.code === 200){
								uni.setNavigationBarTitle({
									title: " "+editname+"  （"+ this.groupid +"）成员"
								});
								this.showpopup = false;
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
	
	.button-sp-area {
		margin: 10upx 10upx;
	}
	
	.hui{filter: grayscale(100%);}
	
	.red{color:#f00;}
</style>
