<template>
	<view class="message-list">
		
		<!-- <block v-if="fNotice"> -->
		<view class="item" @click="mainMsg(fNotice)">
				<view class="item-left">
					<view class="avator"><view class="iconfont ic_system-news"></view></view>
				</view>
				<view class="item-middle">
					<text class="title">好友通知</text>
					<!-- <text class="message">{{it.content}}</text> -->
				</view>
				<view class="item-right">
					<view class="mark" v-if="fNotice>0">{{fNotice}}</view>
					<!-- <view class="time">2019-12-19</view> -->
				</view>
		</view>
		<!-- </block> -->
		
		<block v-for="(it,i) of messagesList" :key="i">
			<view class="uni-swipe-action">
				<view class="uni-swipe-action__container" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"
				 @touchcancel="touchEnd" :style="{'transform':messageIndex == i ? transformX : 'translateX(0px)','-webkit-transform':messageIndex == i ? transformX : 'translateX(0px)'}" :data-index="i" :data-disabled="it.disabled">
				 
					
						
					<view class="uni-swipe-action__content " @click="toMessageDetail(i,it)">
						<view class="item" :class="it.type == 'group' ? 'stick' : ''">
							<!-- <block v-if="it.type == 1">
								<view class="item-left">
									<view class="avator"><view class="iconfont ic_system-news"></view></view>
								</view>
								<view class="item-middle">
									<text class="title">{{it.username}}</text>
									<text class="message">{{it.content}}</text>
								</view>
								<view class="item-right">
									<view class="mark" v-if="it.count>0">{{it.cts}}</view>
									<view class="time">{{it.time}}</view>
								</view>
							</block> -->
							<!-- <block v-if="it.type == 2 || it.type == 3"> -->
								<view class="item-left">
									<avator-group :avator = "it.avatar" v-bind:class="[it.status == 'offline' ? 'hui' : '']" :text="it.username"></avator-group>
								</view>
								<view class="item-middle">
									<text class="title">{{it.username}}</text>
									<text class="message">{{it.content}}</text>
								</view>
								<view class="item-right">
									<view class="mark" v-if="it.cts>0">{{it.cts}}</view>
									<view class="time">{{it.time}}</view>
								</view>
							<!-- </block> -->
						</view>
					</view>
					<view class="uni-swipe-action__btn-group" :id="elId">
						<div v-for="(item,index) in options" :key="index" class="uni-swipe-action--btn" :style="{backgroundColor: item.style && item.style.backgroundColor ? item.style.backgroundColor : '#C7C6CD',color: item.style && item.style.color ? item.style.color : '#FFFFFF',fontSize: item.style && item.style.fontSize ? item.style.fontSize : '28upx'}"
						 @click="bindClickBtn(item,i)">
							{{item.text }}
						</div>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import avatorGroup from "./avator-group.vue"
	export default {
		name: 'swipe-action',
		props: {
			options: Array,
			messagesList:Array,
			fNotice: Number
		},
		components: {avatorGroup},
		data() {
			const elId = `Uni_${Math.ceil(Math.random() * 10e5).toString(36)}`
			return {
				elId: elId,
				transformX: 'translateX(0px)',
				messageIndex: -1,
			}
		},
		created() {
			this.direction = ''
			this.startX = 0
			this.startY = 0
			this.btnGroupWidth = 0
			this.isMoving = false
		},
		// #ifdef H5
		mounted() {
			this.getSize()
		},
		// #endif
		// #ifndef H5
		onReady() {
			this.getSize()
		},
		// #endif
		methods: {
			mainMsg(ct){
				this.$store.state.socket.CurrentToUser = {id:0,type:'sys'};
				this.$store.state.socket.noreadnum -= ct;
				this.$store.commit('set_noreadnum',0);
				var hh = {type:0, i: -1}; // type=0就是好友通知,=1就是用户或群聊的消息列
				uni.$emit('main_chatChange', hh);
				uni.navigateTo({
					url: "msg"
				})
			},
			toMessageDetail(i, it){
				this.$store.state.socket.CurrentToUser = it; // 
				console.log(this.$store.state.socket.CurrentToUser);
				this.$store.state.socket.noreadnum -= it.cts;
				this.$store.commit('set_noreadnum',0);
				var hh = {type:1, i: i};
				uni.$emit('main_chatChange', hh);
				console.log(it);
				it.groupname = it.username;
				var idinfo = JSON.stringify(it);
				if(it.type == 'friend'){	
					uni.navigateTo({
						//url:"../msg/msg?id="+it.id+"&username="+it.username+"&it="+it
						url:"../msg/msg?it="+idinfo
					})
				}else{
					this.$store.state.socket.CurrentToUser.id = it.gid;
					console.log(idinfo)
					uni.navigateTo({
						url:"../msg/groupMsg?it="+idinfo
					})
				}
				// else if(it.type == 1){
				// 	console.log('进入系统消息界面'+i)
				// }
			},
			getSize() {
				uni.createSelectorQuery().in(this).select(`#${this.elId}`).boundingClientRect().exec((ret) => {
					this.btnGroupWidth = ret[0].width;
				});
			},
			bindClickBtn(item, index) {
				this.messageIndex = -1;
				console.log(item.text +'message第'+ index+ '项');
				if(item.text == '删除'){
					this.messagesList.splice(index,1);
				}
				console.log(this.messagesList)
			},
			touchStart(event) {
				console.log(event.currentTarget.dataset.disabled);
				if(event.currentTarget.dataset.disabled === true){
					return;
				}
				this.startX = event.touches[0].pageX;
				this.startY = event.touches[0].pageY;
			},
			touchMove(event) {
				if (this.direction === 'Y' || event.currentTarget.dataset.disabled === true) {
					this.direction = '';
					return;
				}
				var moveY = event.touches[0].pageY - this.startY,
						moveX = event.touches[0].pageX - this.startX;
				if (!this.isMoving && Math.abs(moveY) > Math.abs(moveX) || Math.abs(moveY) > 100 || Math.abs(moveX) < 50) { //纵向滑动//参数100与50可调节侧滑灵敏度
					this.direction = 'Y';
					return;
				}
				this.direction = moveX > 0 ? 'right' : 'left';
				this.messageIndex = moveX < 0 ? event.currentTarget.dataset.index : -1;
				this.isMoving = true;
			},
			touchEnd(event) {
				this.isMoving = false;
				if (this.direction !== 'right' && this.direction !== 'left') {
					this.direction = '';
					return;
				}
				if (this.direction == 'right') {
					this.messageIndex = -1;
				} 
				this.endMove(event)
			},
			endMove(event) {
				console.log(event.currentTarget.dataset.disabled);
				if (this.direction === 'Y' || event.currentTarget.dataset.disabled === true) {
					this.direction = '';
					return;
				}
				if (this.messageIndex !== -1) {
					this.transformX = `translateX(${-this.btnGroupWidth}px)`;
					this.$emit('opened');
				} else {
					this.transformX = 'translateX(0px)';
					this.$emit('closed');
				}
				this.direction = '';
			}
		}
	}
</script>

<style lang="scss">
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
	.hui{filter: grayscale(100%);}
</style>