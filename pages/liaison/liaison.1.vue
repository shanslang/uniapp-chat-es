<template>
    <view>
        <view class="uni-flex uni-row">
			<view class="flex-item uni-bg-red sel" @click="add" v-bind:class="[canAdd ? 'sel2' : '']">好友</view>
			<view class="flex-item uni-bg-green sel" @click="remove" v-bind:class="[canAdd ? '' : 'sel2']">群组</view>
		</view>
		
		<view class="uni-panel" v-for="(item, index) in list" :key="item.id" v-bind:class="[canAdd ? '' : 'isShow']">
		    <view class="uni-panel-h" :class="item.open ? 'uni-panel-h-on' : ''" @click="triggerCollapse(index)">
		        <text class="uni-panel-text">{{item.name}}</text>
		        <text class="uni-panel-icon uni-icon" :class="item.open ? 'uni-panel-icon-on' : ''">&#xe581;</text>
		    </view>
		    <view class="uni-panel-c" v-if="item.open">	
					
				<block v-for="(it,i) of item.pages" :key="i">
					<uni-swipe-action :options="options">
					<view class="uni-swipe-action">
						<view class="uni-swipe-action__container">	
							<view class="uni-swipe-action__content " @click="toMessageDetail(i,it.type)">		
								<view class="item" :class="it.stick  ? 'stick' : ''">
									<block>
										<view class="item-left">
											<avator-group :type ="it.type" :avator = "it.url" v-bind:class="[it.online == 'offline' ? 'hui' : '']"></avator-group>
										</view>
										<view class="item-middle">
											<text class="title">{{it.title}}</text>
											<text class="message">{{it.message}}</text>
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
					<uni-list-item title="创建分组" />
					<uni-list-item title="添加好友/群" />
					<uni-list-item title="创建群" />
					<uni-list-item class="last-list-item" :show-badge="true" title="新朋友" badge-text="0" />
				</uni-list>
				<!-- #endif -->
				<!-- #ifdef MP-BAIDU || MP-ALIPAY || MP-TOUTIAO -->
				<view class="uni-list">
					<uni-list-item title="创建分组" />
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
		
    </view>
</template>


<script>
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
	export default {
	        computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
			components: {
				uniIcons,
			    uLink,
				uniListItem,
				avatorGroup,
				uniList,
				uniDrawer,
				uniSwipeAction
			},
			data() {
				const elId = `Uni_${Math.ceil(Math.random() * 10e5).toString(36)}`
				return {
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
						  },
						  {
							text: "删除",
							style: {
							  backgroundColor: "#dd524d"
							}
						  }
					],
					list: [{
						id: 'view',
						name: '默认分组',
						open: false,
						pages: [
							{
								title: "雷军",
								url: [
									"http://img1.3lian.com/gif/more/11/201212/cf9d56d05c0cbc1edbf21cf64ad9c341.jpg"
								],
								message: "微信给你下线，看你还嘚瑟",
								time: "12:11",
								count: 0,
								online: 'online',
								stick: false,
								disabled: 1, //是否禁止滑动
								type: 2 //普通用户类型消息
							}
						]
					}, {
						id: 'content',
						name: 'leaf',
						open: false,
						pages: [							
							{
								title: "雷军",
								url: [
									"http://img1.3lian.com/gif/more/11/201212/cf9d56d05c0cbc1edbf21cf64ad9c341.jpg"
								],
								message: "微信给你下线，看你还嘚瑟",
								time: "12:11",
								count: 0,
								online: 'online',
								stick: false,
								disabled: false, //是否禁止滑动
								type: 2 //普通用户类型消息
							},
							{
								title: "前端开发者",
								url: [
									"http://img1.3lian.com/gif/more/11/201212/04b335ead07530a6188a27549fad1a68.jpg"
								],
								message: "我们的春天来啦，哈哈哈",
								time: "11:35",
								count: 0,
								online: 'offline',
								stick: false,
								disabled: false, //是否禁止滑动
								type: 2 //普通用户类型消息
							}
							
						]
					}],
					groupList: [{
						title: "扫黑除恶工作小组",
						url: [
							// "http://img1.3lian.com/gif/more/11/201212/cd1d745ed855bef27f47c8aff0786067.jpg",
							// "http://img1.3lian.com/gif/more/11/201212/c011f2b2ab1a10d79fe931a786503d03.jpg",
							// "http://img1.3lian.com/gif/more/11/201212/cf9d56d05c0cbc1edbf21cf64ad9c341.jpg",
							"http://img1.3lian.com/gif/more/11/201212/e10e8faa201671b5a2e8a6146f80d99e.jpg"
						],
						message: "原地待命",
						time: "15:15",
						count: 22,
						stick: true,
						disabled: false, //是否禁止滑动
						type: 3 //群组消息
					},
					{
					    title: "扫黑除恶工作小组",
					    url: [
					        "http://img1.3lian.com/gif/more/11/201212/cd1d745ed855bef27f47c8aff0786067.jpg",
					        "http://img1.3lian.com/gif/more/11/201212/c011f2b2ab1a10d79fe931a786503d03.jpg",
					        "http://img1.3lian.com/gif/more/11/201212/cf9d56d05c0cbc1edbf21cf64ad9c341.jpg",
					        "http://img1.3lian.com/gif/more/11/201212/e10e8faa201671b5a2e8a6146f80d99e.jpg"
					    ],
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
				        this.goDetailPage(this.list[e].url);
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
				bindClickBtn(item, index) {
					this.messageIndex = -1;
					console.log(item.text +'message第'+ index+ '项');
					
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
	
	.hui{filter: grayscale(100%);}
</style>
