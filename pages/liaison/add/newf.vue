<template>
    <view>	
		<view class="message-list">
			
			<block v-if="hasLogin === false">
				<view class="uni-h3 uni-center uni-common-mt">
					<navigator url="../login/login">请先登录</navigator>
				</view>
			</block>
			
			<block v-if="hasLogin === true">
				<block v-for="(it,i) of groupList" :key="i">
					<view class="uni-swipe-action">
						<view class="uni-swipe-action__container" :data-disabled="it.disabled">
							<view class="uni-swipe-action__content ">
								<view class="item" :class="it.stick  ? 'stick' : ''">
									<block v-if="it.type == 2 || it.type == 3">
										<view class="item-left">
											<avator-group :type ="it.type" :avator = "it.url" v-bind:class="[it.online == 'offline' ? 'hui' : '']"></avator-group>
										</view>
										<view class="item-middle">
											<text class="title">{{it.title}}</text>
											<text class="message">{{it.message}}&nbsp;{{it.time}}</text>
										</view>
										<view class="item-right">
											<button class="mini-btn" type="primary" size="mini">同意</button>
											<button class="mini-btn" type="warn" size="mini">拒绝</button>
										</view>
									</block>
								</view>
							</view>
						</view>
					</view>
				</block>
			</block>
		</view>
		
	</view>
</template>

<script>
	import avatorGroup from "../../../components/avator-group.vue"
	import {
		mapState
	} from 'vuex'
	export default {
		computed: {
			...mapState(['hasLogin', 's_token'])
		},
		components: {
			avatorGroup
		},
		data() {
			return {
				canAdd: true,
				platText: '输入ID',
				id: '',
				groupList: [{
					title: "扫黑除恶工作小组",
					url: "http://img1.3lian.com/gif/more/11/201212/e10e8faa201671b5a2e8a6146f80d99e.jpg",
					message: "原地待命",
					time: "15:15",
					count: 22,
					stick: true,
					disabled: false, //是否禁止滑动
					type: 3 //群组消息
				},
				{
				    title: "扫黑除恶工作小组",
				    url: "http://img1.3lian.com/gif/more/11/201212/cd1d745ed855bef27f47c8aff0786067.jpg",
				    message: "原地待命",
				    time: "15:15",
				    count: 22,
				    stick: true,
				    disabled: false, //是否禁止滑动
				    type: 3 //群组消息
				}]
			}
		},
		methods: {	
			add: function(e) {
				this.platText = '输入ID';
				this.canAdd = true;
			},
			remove: function(e) {
				this.platText = '输入群ID';
				this.canAdd = false;
			},
			cquery: function(){
				console.log(this.id);
			}
		}
	}
</script>

<style lang="scss">
	.sel{width: 50%;height: 60upx;line-height: 60upx; background-color: #0088CC;text-align: center;}
	.sel2{color: #E1FFFF;background-color: #8FBC8F;}
	.bg{background-color: #a9bca9;}
	
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
</style>