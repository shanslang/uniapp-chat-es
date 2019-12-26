<template>
	<view class="uni-padding-wrap uni-common-mt">

		<block v-if="hasLogin === false">
			<view class="uni-h3 uni-center uni-common-mt">
				<navigator url="../../login/login">请先登录</navigator>
			</view>
		</block>

		<block v-if="hasLogin === true">

			<view class="uni-h3 uni-center uni-common-mt">建群</view>

			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-flex uni-row" style="-webkit-justify-content: center;justify-content: center;">
					<block v-if="avatar">
						<image :src="avatar" class="image" mode="widthFix" @click="chooseImage"></image>
					</block>
					<block v-else>
						<view class="uni-hello-addfile" @click="chooseImage">+ 上传群头像</view>
					</block>
				</view>
				
				<view class="uni-form-item uni-column">
					<view class="title">群名</view>
					<input class="uni-input" name="groupname" placeholder="输入群名" />
				</view>

				<view class="uni-form-item uni-column">
					<view class="title">类型</view>
					<radio-group name="glevel" @change="radioChange">
						<label v-if="this.power.substr(2,1) > 0">
							<radio value="1" /><text>VIP群</text>
						</label>
						<label v-if="this.power.substr(3,1) > 0">
							<radio value="0" checked /><text>普通群</text>
						</label>
					</radio-group>
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">创建</button>
					<button @tap="navigateBack">取消</button>
				</view>
			</form>
		</block>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import  {s_upImg,s_createGroup}  from  '@/common/js/config.js'
	export default {
		computed: {
			...mapState(['hasLogin', 's_token']),
		},
		data() {
			return {
				chooseGender: 0,
				power: '0000',
				avatar: ''
			}
		},
		onLoad(){
			this.power = ""+this.$store.state.socket.mine.power+"";
		},
		methods: {
			formSubmit: function(e) {
				var formdata = e.detail.value
				if(formdata.groupname.length < 1 || formdata.groupname.length > 15){
					uni.showToast({
					    icon: 'none',
					    title: '群名字符长度必须在 1-15 之间'
					});
					return;
				}
				uni.showLoading({
					title: '提交修改..',
					mask: false
				});
				formdata.token = this.s_token;
				formdata.avatar = this.avatar;
				uni.request({
					url: s_createGroup,
					dataType: 'json',
					data: formdata,
					method: 'post',
					header: {  
						'Content-Type': 'application/x-www-form-urlencoded'  
					}, 
					success: (res) => {
						if(res.data.code === 200){
							uni.showToast({
							    title: '创建成功',
								icon: 'success'
							});
							this.switchTab();
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
						uni.hideLoading();
					}
				});
				
			},
			radioChange(e) {
				// console.log('type:' + e.detail.value);
				this.chooseGender = parseInt(e.detail.value);
			},
			switchTab() {
				uni.switchTab({
					url: '/pages/liaison/liaison'
				});
			},
			navigateBack() {
				uni.navigateBack();
			},
			formReset: function(e) {
				console.log('清空数据')
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
						
						uni.uploadFile({
							url: s_upImg, 
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
										// this.avatar = 'hh.data.src';
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
			}
		}
	}
</script>

<style>
</style>
