<template>
    <view>
        <view class="uni-flex uni-row">
			<view class="flex-item uni-bg-red sel" @click="add" v-bind:class="[canAdd ? 'sel2' : '']">找人</view>
			<view class="flex-item uni-bg-green sel" @click="remove" v-bind:class="[canAdd ? '' : 'sel2']">找群</view>
		</view>
		
		<view class="example-body">
			<uni-search-bar radius="100" clearButton="always" @confirm="search" :placeholder="platText" />
		</view>

		<view class="message-list" v-if="canAdd == true">
			<block v-for="(it,i) of userlist" :key="i">
				<view class="uni-swipe-action">
					<view class="uni-swipe-action__container">
						<view class="uni-swipe-action__content ">
							<view class="item">
								<!-- <block v-if="it.type == 2 || it.type == 3"> -->
									<view class="item-left">
										<!-- <avator-group :type ="it.type" :avator = "it.url"></avator-group> -->
										<avator-group :type ="2" :avator = "it.avatar" :text="it.nickname" v-bind:class="[it.status == 'offline' ? 'hui' : '']"></avator-group>
									</view>
									<view class="item-middle">
										<text class="title" :class="it.vip > 0 ? 'red' : ''">{{it.nickname}} ({{it.gameid}})</text>
										<text class="message">{{it.sign}}</text>
									</view>
									<view class="item-right" v-if="myid != it.id">
										<button class="mini-btn" type="primary" size="mini" @click="togglePopup('share', it)">加好友</button>
									</view>
								<!-- </block> -->
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>

		<view class="message-list" v-if="canAdd == false">
			<block v-for="(it,i) of groupList" :key="i">
				<view class="uni-swipe-action">
					<view class="uni-swipe-action__container">
						<view class="uni-swipe-action__content ">
							<view class="item stick">
								<!-- <block v-if="it.type == 2 || it.type == 3"> -->
									<view class="item-left">
										<!-- <avator-group :type ="it.type" :avator = "it.url"></avator-group> -->
										<avator-group :type ="2" :avator = "it.avatar" :text="it.groupname"></avator-group>
									</view>
									<view class="item-middle">
										<text class="title2" :class="it.levels > 0 ? 'red' : ''">{{it.groupname}}</text>
									</view>
									<view class="item-right" v-if="it.levels <= myvip">
										<button class="mini-btn" type="primary" size="mini" @click="togglePopup('group', it)">加群</button>
									</view>
								<!-- </block> -->
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		
		<uni-popup :show="showshare" type="bottom" @change="change">
			<view class="uni-share">
				<text class="uni-share-title">加好友</text>
				<view class="uni-share-content">
					<view class="uni-share-content-box">
						<view class="uni-share-content-image">
							<avator-group :avator = "itinfo.avatar" :text="itinfo.nickname"></avator-group>
						</view>
						<text class="uni-share-content-text">{{itinfo.nickname}}</text>
					</view>
	
					<view class="uni-share-content-box">
						<view class="uni-list">
							<view class="uni-list-cell">
								<view class="uni-list-cell">
									<view class="uni-list-cell-db">
										<picker @change="bindPickerChange" :value="index" :range="grouping" range-key="groupname">
											<view class="uni-input">{{grouping[index].groupname}}</view>
										</picker>
									</view>
								</view>
							
							</view>
						</view>
					</view>				
				</view>
				<view class="uni-share-content">
					<textarea v-model="yanz" auto-height  placeholder="输入验证信息" />
				</view>
				<view class="uni-share-content">
					<button type="primary" plain="true" @click="sendqq(1)">发送申请</button>
				</view>
				<text class="uni-share-btn" @click="cancel('share')">取消</text>
			</view>
		</uni-popup>
		
		<uni-popup :show="showgroup" type="bottom" @change="change">
			<view class="uni-share">
				<text class="uni-share-title">加群</text>
				<view class="uni-share-content">
					<view class="uni-share-content-box">
						<view class="uni-share-content-image">
							<avator-group :avator = "itinfo.avatar" :text="itinfo.groupname"></avator-group>
						</view>
						<text class="uni-share-content-text">{{itinfo.groupname}}</text>
					</view>			
				</view>
				<view class="uni-share-content">
					<textarea auto-height v-model="yanz" placeholder="输入验证信息" />
				</view>
				<view class="uni-share-content">
					<button type="primary" plain="true" @click="sendqq(2)">发送申请</button>
				</view>
				<text class="uni-share-btn" @click="cancel('group')">取消</text>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import  {s_find}  from  '@/common/js/config.js'
	import {
		mapState
	} from 'vuex'
	import avatorGroup from "../../../components/avator-group.vue"
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 's_token']),
		components: {
			avatorGroup,
			uniSearchBar,
			uniPopup
		},
		data() {
			return {
				yanz: '',
				itinfo: [],// 加好友信息
				index: 0, // 分组id 
				showshare: false,
				showgroup: false,
				canAdd: true,
				platText: '输入ID',
				id: '',
				myid: 0,
				myvip: 0, // 自己的等级
				userlist:[],
				groupList: [],
				grouping: []
			}
		},
		onLoad(){
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
			                        url: '../../login/login'
			                    });
			                } else {
			                    uni.navigateTo({
			                        url: '../../login/login'
			                    });
			                }
			            }
			        }
			    });
			}else{
				this.myid = this.$store.state.socket.mine.id;	
				this.myvip = this.$store.state.socket.mine.vip;	
				this.grouping = uni.getStorageSync('grouping');
				//console.log(this.grouping);
			}
		},
		methods: {	
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			add: function(e) {
				this.platText = '输入ID';
				this.canAdd = true;
			},
			remove: function(e) {
				this.platText = '输入群ID';
				this.canAdd = false;
			},
			cquery: function(type, id){
				uni.request({
					url: s_find,
					dataType: 'json',
					data: {token: this.s_token, type: type, id: id},
					method: 'post',
					header: {  
						'Content-Type': 'application/x-www-form-urlencoded'  
					}, 
					success: (res) => {
						if(res.data.code === 200){
							console.log(res.data.data);
							if(type == 'friend'){
								this.userlist = res.data.data;
							}else{
								this.groupList = res.data.data;
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
			},
			sendqq: function(type){
				var data = {};
				if(type == 1){
					data = {type:"addFriend",to_user_id:this.itinfo.id,to_friend_group_id:this.grouping[this.index].id,remark:this.yanz,token:this.s_token};
				}else{
					data = {type:"addGroup",to_group_id:this.itinfo.id,to_friend_group_id:0,remark:this.yanz,token:this.s_token};
				}
				this.$store.dispatch('sendMsg',JSON.stringify(data));
				uni.showModal({
					content: '已发送,等待对方验证',
					showCancel: false
				});
				this.showshare = false;
				this.showgroup = false;
			},
			togglePopup(open, it) {
				this.yanz = '';
				this.itinfo = it;
				this['show' + open] = true
			},
			search(res) {
				var reg = /^\d{1,}$/;
				if(!reg.test(res.value)) {	
					uni.showToast({
						title: '必须是数字，长度 >= 3',
						icon: 'none'
					})
				}else{
					var type = this.canAdd == true ? 'friend' : 'group';
					this.cquery(type, res.value);
					
				}
			},
			cancel(type) {
				this['show' + type] = false;
			},
			change(e) {
				console.log('是否打开:' + e.show)
				if (!e.show) {
					this.showshare = false;
					this.showgroup = false;
				}
			}
		}
	}
</script>

<style lang="scss">
	.sel{width: 50%;height: 60upx;line-height: 60upx; background-color: #0088CC;text-align: center;}
	.sel2{color: #E1FFFF;background-color: #8FBC8F;}
	.bg{background-color: #a9bca9;}
	.red{color: #f00;}
	.hui{filter: grayscale(100%);}
	
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
			.title2 {
				width: 100%;
				//color: #000;
				font-family: "微软雅黑";
				font-weight: 400;
				font-size: 30upx;
				height: 100upx;
				line-height:100upx;
				overflow: hidden; /*自动隐藏文字*/
				text-overflow: ellipsis; /*文字隐藏后添加省略号*/
				white-space: nowrap; /**强制不换行*/
				letter-spacing: 2upx;
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
				height:100upx;
				line-height: 100upx;
			}
			// .mark {
			//   background-color: #f74c31;
			//   line-height: 35upx;
			// 	text-align: center;
			//   font-size: 18upx;
			//   min-width: 35upx;
			//   min-height: 35upx;
			//   border-radius: 18upx;
			//   color: #fff;
			// }
		}
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
	.uni-share-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 15px;
	}
	.uni-share-content-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		width: 200rpx;
	}
	.uni-share-content-image {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100rpx;
		height: 100rpx;
		overflow: hidden;
		// border-radius: 10rpx;
	}
	.uni-share-btn {
		height: 90rpx;
		line-height: 90rpx;
		font-size: 14px;
		border-top-color: #f5f5f5;
		border-top-width: 1px;
		border-top-style: solid;
		text-align: center;
		color: #666;
	}
	.uni-share-btn2 {
		height: 100rpx;
		line-height: 100rpx;
		font-size: 14px;
		border-color: #f5f5f5;
		border-width: 1px;
		border-style: solid;
		text-align: center;
		color: #666;
	}
</style>