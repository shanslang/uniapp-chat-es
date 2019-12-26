<template>
	<view class="uni-padding-wrap uni-common-mt">

		<block v-if="hasLogin === false">
			<view class="uni-h3 uni-center uni-common-mt">
				<navigator url="../login/login">请先登录</navigator>
			</view>
		</block>

		<block v-if="hasLogin == true">

			<view class="uni-h3 uni-center uni-common-mt">{{nickname}}</view>

			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="title">支付宝账号</view>
					<input class="uni-input" name="zfbAcc" placeholder="支付宝账号" v-model="zfbAcc" />
				</view>
				
				<view class="uni-form-item uni-column">
					<view class="title">银行名</view>
					<input class="uni-input" name="bankname" placeholder="银行名" v-model="bankname" />
				</view>
				
				<view class="uni-form-item uni-column">
					<view class="title">银行卡号</view>
					<input class="uni-input" type="number" name="bankcode" placeholder="银行卡号" v-model="bankcode" />
				</view>
		
				<view class="uni-form-item uni-column">
					<view class="title">签名</view>
					<input class="uni-input" name="signature" placeholder="个人签名" v-model="signature" />
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">修改</button>
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
	import  {s_editInfo}  from  '@/common/js/config.js'
	export default {
		computed: {
			...mapState(['hasLogin', 's_token']),
		},
		data() {
			return {
				chooseGender: 0,
				nickname: '',
				zfbAcc: '',
				bankname:'',
				bankcode:'',
				signature: ''
			}
		},
		onLoad() {
			this.nickname = this.$store.state.socket.mine.nickname+'('+this.$store.state.socket.mine.gameid+')';
			this.zfbAcc = this.$store.state.socket.mine.zfb_account;
			this.bankname = this.$store.state.socket.mine.banks;
			this.bankcode = this.$store.state.socket.mine.bank_code;
			this.signature = this.$store.state.socket.mine.sign;
		},
		methods: {
			formSubmit: function(e) {
				var formdata = e.detail.value;
				formdata.token = this.s_token;

				uni.showLoading({
					title: '提交修改..',
					mask: false
				});
				
				uni.request({
					url: s_editInfo,
					dataType: 'json',
					data: {formdata: JSON.stringify(formdata)},
					method: 'post',
					header: {  
						'Content-Type': 'application/x-www-form-urlencoded'  
					}, 
					success: (res) => {
						uni.hideLoading(); 
						if(res.data.code === 200){
							this.$store.commit('set_mine', res.data.data.uinfo);
							uni.showToast({
							    icon: 'none',
							    title: '修改成功'
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
			},
			formReset: function(e) {
				console.log('清空数据')
			}
		}
	}
</script>

<style>
</style>
