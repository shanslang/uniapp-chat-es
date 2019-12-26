<template>
	
	<view class="content">
		<view class="mix-tree-list">
			<block v-for="(item, index) in treeList" :key="index">
				<view 
					class="mix-tree-item"
					:style="[{
							paddingLeft: item.rank*15 + 'px',
							zIndex: item.rank*-1 +50
						}]"
					:class="{
							border: item.border === true,
							show: item.show,
							last: item.lastRank,
							showchild: item.showChild
						}"
					@click.stop="treeItemTap(item, index)"
					
					@longpress.stop="treeItemLongTap(item)"
				>
					<image v-if="!item.lastRank" class="mix-tree-icon" :src="item.lastRank ? item.img : item.showChild ? treeParams.currentIcon : treeParams.defaultIcon"></image>
					<image v-else class="mix-tree-img" :src="item.img"></image>
					
					{{item.name}}
					
					<view style="position: absolute; right: 30upx; top: 30upx; color: #666666; font-size: 30upx; text-indent: 1px;">{{item.count}}</view>
					
				</view>
			</block>
		</view>
	</view>
	
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default(){
					return [];
				}
			},
			params: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				treeList: [],
				treeParams: {
					defaultIcon: '/static/mix-tree/defaultIcon.png',
					currentIcon: '/static/mix-tree/currentIcon.png',
					lastIcon: '',
					border: false
				}
			}
		},
		watch: {
			list(list){
				this.treeList = [];
				this.treeParams = Object.assign(this.treeParams, this.params);
				this.renderTreeList(list);
			}
		},
		methods: {
			//扁平化树结构
			renderTreeList(list=[], rank=0, parentId=[]){
				list.forEach(item=>{
					this.treeList.push({
						id: item.id,
						name: item.name,
						count: item.count,
						img: item.img,
						parentId,  // 父级id数组
						rank,  // 层级
						showChild: item.showChild ? true : false,  //子级是否显示
						show: rank === 0  // 自身是否显示
					})
					
					if(Array.isArray(item.children)){
						let parents = [...parentId];
						parents.push(item.id);
						this.renderTreeList(item.children, item.showChild ? rank : rank+1, parents);
					}else{
						this.treeList[this.treeList.length-1].border = true;
						this.treeList[this.treeList.length-1].lastRank = true;
					}
				})
			},
			
			// 点击
			treeItemTap(item){
				let list = this.treeList;
				let id = item.id;
				if(item.lastRank === true){
					//点击最后一级时触发事件
					this.$emit('treeItemClick', item);
					return;
				}
				item.showChild = !item.showChild;
				list.forEach(childItem=>{
					if(item.showChild === false){
						//隐藏所有子级
						if(!childItem.parentId.includes(id)){
							return;
						}
						if(childItem.lastRank !== true){
							childItem.showChild = false;
						}
						childItem.show = false;
					}else{
						if(childItem.parentId[childItem.parentId.length-1] === id){
							childItem.show = true;
						}
					}
				})
			},
			
			treeItemLongTap(item){
				this.$emit('treeItemLongTap', item);
				return;
			}
		}
	}
</script>

<style>
	page{
		border-top: 1px solid #e0e0e0;
	}
	.mix-tree-list{
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
	}
	.mix-tree-item{
		display: flex;
		align-items: center;
		font-size: 36upx;
		font-weight: 400;
		color: #000;
		height: 0;
		opacity: 0;
		transition: .2s;
		position: relative;
	}
	.mix-tree-item.border{
		border-bottom: 1px solid #eee;
	}
	.mix-tree-item.show{
		height: 100upx;
		opacity: 1;
	}
	.mix-tree-icon{
		width: 30upx;
		height: 30upx;
		margin-right: 14upx;
		opacity: 1;
	}
	
	.mix-tree-img{
		width: 68upx;
		height: 68upx;
		margin-left: 10upx;
		margin-right: 16upx;
		border-radius: 50%;
		opacity: .9;
	}
	
	.mix-tree-item.showchild:before{
		transform: rotate(90deg);
	}
	.mix-tree-item.last:before{
		opacity: 0;
	}
</style>