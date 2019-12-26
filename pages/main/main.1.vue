<template>
	<view class="content">
		
		<view class="example-body" v-bind:class="[horn.length > 0 ? '' : 'isHorn']">
			<uni-notice-bar :show-icon="true" :scrollable="true" :single="true" :text="horn" />
		</view>
		
		<view class="message-list">
			<wkiwi-action :options="options" :messagesList="messages"></wkiwi-action>
		</view>
	</view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
	import  {s_chatListUrl}  from  '@/common/js/config.js'
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
				options: [
					  {
						text: "置顶",
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
				messages: [
				  {
				    title: "系统消息",
				    url: "http://img1.3lian.com/gif/more/11/201212/0d1252b54be4f2d240b6b7fe4ed35054.jpg",
				    message: "这是一条系统消息",
				    time: "15:15",
				    count: 5,
				    stick: false, //是否为置顶状态
				    disabled: false, //是否禁止滑动
				    type: 1 //通知类型消息
				  },
				  {
				    title: "消息任务",
				    url: "http://img1.3lian.com/gif/more/11/201212/0d1252b54be4f2d240b6b7fe4ed35054.jpg",
				    message: "这是一条消息任务",
				    time: "15:15",
				    count: 5,
				    stick: false, //是否为置顶状态
				    disabled: false, //是否禁止滑动
				    type: 1 //通知类型消息
				  },
				  {
				    title: "马云",
				    url: "http://img1.3lian.com/gif/more/11/201212/0d1252b54be4f2d240b6b7fe4ed35054.jpg",
				    message: "什么鬼，我有支付宝[禁止滑动]",
				    time: "15:15",
				    count: 5,
					online: 'offline',
				    stick: true, //是否为置顶状态
				    disabled: true, //是否禁止滑动
				    type: 2 //普通用户类型消息
				  },
				  {
				    title: "扫黑除恶工作小组",
				    url: "http://img1.3lian.com/gif/more/11/201212/cd1d745ed855bef27f47c8aff0786067.jpg",
				    message: "原地待命",
				    time: "15:15",
				    count: 22,
					online: 'online',
				    stick: true,
				    disabled: false, //是否禁止滑动
				    type: 3 //群组消息
				  },
				  {
				    title: "李彦宏",
				    url: "http://img1.3lian.com/gif/more/11/201212/c011f2b2ab1a10d79fe931a786503d03.jpg",
				    message: "抄袭我的吧，我早都做过了",
				    time: "12:13",
				    count: 1,
					online: 'online',
				    stick: false,
				    disabled: false, //是否禁止滑动
				    type: 2 //普通用户类型消息
				  },
				  {
				    title: "四菜一汤",
				    url: "http://img1.3lian.com/gif/more/11/201212/e10e8faa201671b5a2e8a6146f80d99e.jpg",
				    message: "[语音]32秒",
				    time: "15:15",
				    count: 22,
				    stick: true,
				    disabled: false, //是否禁止滑动
				    type: 3 //群组消息
				  },
				  {
				    title: "雷军",
				    url: "http://img1.3lian.com/gif/more/11/201212/cf9d56d05c0cbc1edbf21cf64ad9c341.jpg",
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
				    url: "http://img1.3lian.com/gif/more/11/201212/04b335ead07530a6188a27549fad1a68.jpg",
				    message: "我们的春天来啦，哈哈哈",
				    time: "11:35",
				    count: 0,
					online: 'online',
				    stick: false,
				    disabled: false, //是否禁止滑动
				    type: 2 //普通用户类型消息
				  },
				  {
				    title: "微信小程序",
				    url: "http://img1.3lian.com/gif/more/11/201212/e10e8faa201671b5a2e8a6146f80d99e.jpg",
				    message: "谁有内测资格啊啊，300万买一个",
				    time: "08:23",
				    count: 0,
					online: 'online',
				    stick: false,
				    disabled: false, //是否禁止滑动
				    type: 2 //普通用户类型消息
				  },
				  {
				    title: "小程序",
				    url: "http://img1.3lian.com/gif/more/11/201212/3fab6379b6ef53e7c17a1cc772eed0d6.jpg",
				    message: "这个IDE方便都不要配置了",
				    time: "03:21",
				    count: 5,
					online: 'online',
				    stick: false,
				    disabled: false, //是否禁止滑动
				    type: 2 //普通用户类型消息
				  }
				]
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
				// this.$store.dispatch('initWs');
				this.getData(s_chatListUrl, this.s_token);
			}		
        },
		methods: {
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
						if(res.data.code === 200){
							
							this.horn = res.data.data.horn;
							// this.messages = res.data.data.reList;
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
.isHorn{display: none;}
	
</style>
