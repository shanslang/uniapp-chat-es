<template>
	<view>
		<view class="uni-flex uni-row" style="-webkit-justify-content: center;justify-content: center;">
			<block v-if="avatar">
				<image :src="avatar" class="image" mode="widthFix" @click="chooseImage"></image>
			</block>
			<block v-else>
				<view class="uni-hello-addfile" @click="chooseImage">+ 更新头像</view>
			</block>
		</view>
		<uni-list>
			<navigator url="info">
				<uni-list-item :show-extra-icon="true" :extra-icon="extraIcon1" title="更新用户信息" />
			</navigator>
			<navigator @click="outs">
				<uni-list-item :show-extra-icon="true" :extra-icon="extraIcon2" title="退出" />
			</navigator>
		</uni-list>
	</view>
</template>

<script>
	import  {s_upImg}  from  '@/common/js/config.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	var _self;
	export default {
		...mapState(['hasLogin', 'loginProvider']),
		components: {
			uniList,
			uniListItem
		},
		
		data() {
			return {
				extraIcon1: {
					color: '#007aff',
					size: '28',
					type: 'compose'
				},
				extraIcon2: {
					color: '#4cd964',
					size: '28',
					type: 'gear'
				},
				avatar: ''
			}
		},
		onLoad() {
			this.loadf();
			this.avatar = this.$store.state.socket.mine.avatar;
		},
		computed: {
			...mapState(['hasLogin', 's_token']),
		},
		methods: {
			...mapMutations(['logout']),
			outs: function(){
				this.logout();
				this.$store.commit('wsClose');
				uni.reLaunch({
				    url: '../login/login'
				});
				return;
			},
			loadf: function(){
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
			},
			switchChange(e) {
				uni.showToast({
					title: 'change:' + e.value,
					icon: 'none'
				})
			},
			chooseImage: function() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: (res) => {
						uni.showLoading({
							title: '上传中..',
							mask: false
						});
						const imageSrc = res.tempFilePaths[0];
						
						// uni.getImageInfo({
						// 	src: imageSrc,
						// 	success: function (image) {
						// 		console.log(image.width);
						// 		console.log(image.height);
						// 	}
						// });
						
						uni.uploadFile({
							url: s_upImg, //仅为示例，非真实的接口地址
							filePath: imageSrc,
							name: 'imgAv',
							formData: {
								'token': this.s_token,
								'type': 1 // 1代表用户头像
							},
							success: (uploadFileRes) => {
								var hh = uploadFileRes.data;
								if(uploadFileRes.statusCode == 200){
									hh = JSON.parse(uploadFileRes.data);
									if(hh.code == 200){
										console.log(hh);
										uni.showToast({
										    icon: 'none',
										    title: '上传成功'
										});
									}else{
										uni.showToast({
										    icon: 'none',
										    title: hh.msg
										});
									}
								}else{
									uni.showToast({
									    icon: 'none',
									    title: '上传失败，请选择小于 3M 的图片'
									});
								}
							},
							complete: () => {
								uni.hideLoading();
							}
						});
					},
					fail: (err) => {
						console.log('chooseImage fail', err)
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.album'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: '需要从您的相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
		}
	}
</script>

<style>
	.image {
		margin:40upx 0;
		width: 200upx;
	}
</style>
