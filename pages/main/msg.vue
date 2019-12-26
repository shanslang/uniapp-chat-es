<template>
	<view>
		<uni-section title="好友通知" type="line"></uni-section>
		<view class="example-body">
			<view v-for="(item, i) of list" :key="i" class="example-box">
				<block v-if="item.type == 1" >
					<!-- <uni-card v-if="item.group_id == 0"><text class="redT">系统: </text><text class="content-box-text">{{ item.nickname }} &nbsp; {{item.status == 1 ? "已同意" : "已拒绝"}} 你的好友申请</text> 
					<view class="text-box" scroll-y="true"><text>{{item.time}}</text></view>
					</uni-card> -->
					<uni-card><text class="redT">系统: </text><text class="content-box-text">{{ item.nickname }} &nbsp;  {{item.status == 1 ? "已同意" : "已拒绝"}} 你的申请</text> <view class="text-box" scroll-y="true"><text>{{item.time}}</text></view></uni-card>
				</block>
				
				<block v-if="item.type == 0" >
					<uni-card :is-shadow="true" :title="item.nickname" mode="title" :thumbnail="item.avatar" :extra="item.time" note="true">
						<view>
							<view class="content-box">
								<text class="content-box-text">
									申请添加你为好友
								</text>
								<view class="text-box" scroll-y="true"><text>附言： {{item.remark}}</text></view>
							</view>
						</view>
						<template slot="footer">
							<view class="footer-box">
								<block v-if="item.status == 0" >
									<view @click.stop="footerClick(item,i,1)"><text class="footer-box__item"> 同意</text></view>
									<view @click.stop="footerClick(item,i,2)"><text class="footer-box__item"> 拒绝</text></view>
								</block>
								<block v-if="item.status > 0" >
									<view><text class="footer-box__item">已{{item.status == 1 ? "同意" : "拒绝"}} </text></view>
								</block>
							</view>
						</template>
					</uni-card>
				</block>	
				
				<block v-if="item.type == 2" >
					<uni-card :is-shadow="true" :title="item.nickname" mode="title" :thumbnail="item.avatar" :extra="item.time" note="true">
						<view>
							<view class="content-box">
								<text class="content-box-text">
									申请加入群 {{item.groupname}}
								</text>
								<view class="text-box" scroll-y="true"><text>附言： {{item.remark}}</text></view>
							</view>
						</view>
						<template slot="footer">
							<view class="footer-box">
								<block v-if="item.status == 0" >
									<view @click.stop="footerClick(item,i,1)"><text class="footer-box__item"> 同意</text></view>
									<view @click.stop="footerClick(item,i,2)"><text class="footer-box__item"> 拒绝</text></view>
								</block>
								<block v-if="item.status > 0" >
									<view><text class="footer-box__item">已{{item.status == 1 ? "同意" : "拒绝"}} </text></view>
								</block>
							</view>
						</template>
					</uni-card>
				</block>
			</view>
		</view>
		
		<uni-popup :show="showgroup" type="bottom" @change="change">
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
					<button type="primary" plain="true" @click="sendqq(itinfo.id)">确认</button>
				</view>
				<text class="uni-share-btn" @click="cancel">取消</text>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	import  {s_msgBox,s_joinGroup2,s_addFriend}  from  '@/common/js/config.js'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniCard from '@/components/uni-card/uni-card.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import avatorGroup from "../../components/avator-group.vue"
	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 's_token']),
		components: {
			uniSection,
			uniCard,
			uniPopup,
			avatorGroup
		},
		data() {
			return {
				index: 0,
				itinfo: {},
				showgroup: false,
				list: {},
				grouping: []
			}
		},
		onLoad() {
			this.initPage(s_msgBox, {}, this.s_token);
			this.grouping = uni.getStorageSync('grouping');
		},
		onPullDownRefresh:function(){ // 下拉刷新
			uni.showNavigationBarLoading();
			this.initPage(s_msgBox, {}, this.s_token);
		},
		methods: {
			initPage: function(url, sdata, token){
				if (!this.hasLogin) {
				    uni.showModal({
				        title: '未登录',
				        content: '您未登录，需要登录后才能继续',
				        showCancel: !this.forcedLogin,
				        success: (res) => {
				            if (res.confirm) {
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
					this.sendRequest(url, sdata, token);
				}	
				uni.hideNavigationBarLoading();
				uni.stopPullDownRefresh();
			},
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			sendRequest: function(url, sdata, token){
				uni.request({
					url: url,
					dataType: 'json',
					data: {token: token, data: sdata},
					method: 'post',
					header: {  
						'Content-Type': 'application/x-www-form-urlencoded'  
					}, 
					success: (res) => {
						if(res.data.code === 200){
							var data = res.data;
							this.list = data.data;
							console.log(this.list);
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
			footerClick(item, i, type) {
				//console.log(item);return;
				if(type == 1){
					
					if(item.type == 2){
						var data = {groupid:item.gid,uid:item.from_id,id:item.id, fid:item.user_id};
						this.addgroup(s_joinGroup2,data,2);
						this.list[i]['status'] = 1;
					}else{
						this.itinfo = item;
						console.log(this.itinfo);
						this.showgroup = true;
					}
				}else{
					console.log(item.id);
					this.$store.dispatch('sendMsg',JSON.stringify({type:"refuseFriend",id:item.id}));
					this.list[i]['status'] = 2;
					uni.showToast({
						title: '已拒绝',
						icon: 'none'
					})
				}
				console.log(item);
				// uni.showToast({
				// 	title: types,
				// 	icon: 'none'
				// })
			},
			cancel() {
				this.showgroup = false;
			},
			sendqq(id){
				var data = {id: id, groupid: this.grouping[this.index].id, token: this.s_token};
				this.addgroup(s_addFriend,data,1);
				this.list[i]['status'] = 1;
			},
			change(e) {
				if (!e.show) {
					this.showgroup = false;
				}
			},
			addgroup: function(url,cs,type){
				uni.request({
					url: url,
					dataType: 'json',
					data: cs,
					method: 'post',
					header: {  
						'Content-Type': 'application/x-www-form-urlencoded'  
					}, 
					success: (res) => {
						if(res.data.code === 200){
							if(type == 2){
								var joinNotify = {type:"joinNotify","groupid":cs.groupid,token:this.s_token,uid:cs.uid,data:res.data.data}
								this.$store.dispatch('sendMsg',JSON.stringify(joinNotify));
								uni.showToast({
								    icon: 'none',
								    title: '对方已成功加群'
								});
							}else{
								uni.showToast({
								    icon: 'none',
								    title: '添加成功,下拉 联系人 刷新'
								});
								this.showgroup = false;
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
		}
	}
</script>

<style>
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 28rpx;
		line-height: inherit;
	}

	.example {
		padding: 0 30rpx 30rpx;
	}

	.example-info {
		padding: 30rpx;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14rpx;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 30rpx;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 30rpx;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 30rpx;
	}

	.example-info-text {
		font-size: 28rpx;
		line-height: 36rpx;
	}


	.example-body {
		flex-direction: column;
		padding: 30rpx;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
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


	.example-body {
		padding: 20rpx 0;
		padding-bottom: 0;

	}

	.example-box {
		/* margin-bottom: 30rpx;
 */
	}

	.image-box {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		height: 350rpx;
		overflow: hidden;
	}

	.image {
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		/* #endif */
		flex: 1;
	}

	.content-box {
		padding-top: 20rpx;
	}

	.content-box-text {
		font-size: 30rpx;
	}

	.footer-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: space-between;
		flex-direction: row;

	}

	.footer-box__item {
		align-items: center;
		padding: 10rpx 0;
		font-size: 30rpx;
		color: #FFA500;
	}
	.redT {
		color: #f00;
		letter-spacing:4upx;
		margin-right: 10upx;
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