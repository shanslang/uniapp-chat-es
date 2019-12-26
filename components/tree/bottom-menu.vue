<template>
	<view class="bottom-menu">
		<view class="bottom-menu-item" :key="index" v-for="(item, index) in meunList" @click="tabClick(item)">
			<text @tap="goToPage" :data-index="index">{{item.name}}</text>
			<view class="bottom-menu-wrap" v-if="!!item.children">
				<view class="bottom-menu-list">
					<view class="bottom-menu-citem" :key="cindex" v-for="(citem, cindex) in item.children">
						<text @tap="tochildPage" :data-path="citem.path" v-show="item.active">{{citem.name}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name:"bottom-menu",
		props: {
			tabClick: {
				type: Function
			}
		},
		data(){
			return{
				meunList:[
					{
						name:'好友',
						active:false,
						// ,
						// children:[
						// 	{
						// 		name:'分组管理',
						// 		path:''
						// 	}
						// ]
					},{
						name:'群组',
						active:false
					}
				]
			};
		},
		methods:{
			goToPage(e){
				let _this = this;
				let index = e.currentTarget.dataset.index;
				let curMenu = this.meunList[index];
				if(!!curMenu.path){
					// 一级菜单跳转
					uni.redirectTo({
						url:curMenu.path,
						animationType: 'pop-in',
						animationDuration: 200,
						complete:function(){
							_this.initMenu();
						}
					});
				}else{
					// 二级菜单显示
					this.meunList.forEach(item =>{
						if(item != curMenu){
							item.active = false;
						}
					});
					curMenu.active = !curMenu.active;
				}
			},
			tochildPage(e){
				let _this = this;
				let path = e.currentTarget.dataset.path;
				uni.navigateTo({
					url:path,
					animationType: 'pop-in',
					animationDuration: 200,
					complete:function(){
						_this.initMenu();
					}
				});
			},
			initMenu(){
				this.meunList.forEach(item =>{
					item.active = false;
				});
			}
		}
	}
</script>
<style>
	.bottom-menu {
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 999;
		display: -webkit-flex;
		display: flex;
		justify-content: center;
		height: 100upx;
		line-height: 100upx;
		background: #f2f2f2;
		text-align: center;
	}
	.bottom-menu-item {
		flex: 1;
		flex-direction: row;
		border-top: 1px solid #e0e0e0;
		border-right: 1px solid #e0e0e0;
		position: relative;
	}
	.bottom-menu-wrap {
		margin:0;
		padding: 0;
		position: absolute;
		width: 100%;
		bottom: 100upx;
		left: 0;
		background: #FFFFFF;
		box-shadow: #e0e0e0 0px 0px 1px 0px;
	}
</style>