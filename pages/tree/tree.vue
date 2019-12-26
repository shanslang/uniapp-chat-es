<template>
	<view class="content">


		<view v-show="isGroup" class="sesstion-list">
			<sesstion-list :messagesList="groups" :toSesscton="toGroup"></sesstion-list>
		</view>

		<view v-show="!isGroup" class="mix-tree">
			<mix-tree :list="list" @treeItemClick="treeItemClick" @treeItemLongTap="treeItemLongTap"></mix-tree>
		</view>

		<!-- <button type="primary" plain="true" style="position: fixed; bottom: 20%; left: 35%;" @click="buttonclick">{{buttontext}}</button> -->

		<bottom-menu :tabClick="bottomMenuTap" />
	</view>
</template>

<script>
	import bottomMenu from '@/components/tree/bottom-menu.vue'
	import mixTree from '@/components/tree/mix-tree';
	import sesstionList from '../../components/tree/group-list.vue';

	import Global from '@/common/tree/config.js';
	import SocketUser_1 from '@/common/tree/SocketUser.js';


	import helper from '@/common/tree/helper.js';


	export default {
		components: {
			mixTree,
			bottomMenu,
			sesstionList
		},
		data() {
			return {
				isGroup: false,
				list: [],
				buttontext: '添加分组',
				groups: [{
					title: '群组名称',
					url: '../../static/img/im/face/face_6.jpg'
				}]
			};
		},
		onHide: function() {
			uni.hideLoading();
		},
		onLoad() {

			var that = this;

			helper.SetTitleNView({
				buttons: [{
					"fontSrc": "/static/iconfont.ttf",
					"text": "\ue6ed",
					"fontSize": "19px",
					"color": "#333333",
					onclick: function() {

						var list = ['添加分组'];
						if (that.isGroup) {
							list = ['添加群组'];
						}

						uni.showActionSheet({
							itemList: list,
							success: function(res) {
								that.buttonclick();
								console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
							},
							fail: function(res) {
								console.log(res.errMsg);
							}
						});
					}
				}]
			});

			uni.showLoading({
				title: 'loading...'
			});

			var socketUser = new SocketUser_1.SocketUser();

			socketUser.GetMembers(function(a) {

				that.list.push({
					id: 99999999999,
					name: '我的好友',
					count: 0,
					children: []
				});

				for (var i = 0; i < a.date.projectUserGroup.length; i++) {
					var item = a.date.projectUserGroup[i];
					that.list.push({
						id: item.id,
						name: item.title,
						count: 0,
						children: []
					});
				}

				for (var i = 0; i < a.date.projectUserGroupMember.length; i++) {
					var item = a.date.projectUserGroupMember[i];

					var parameter = JSON.parse(item.parameter);

					if (item.groupKey) {

						for (var i = 0; i < that.list.length; i++) {
							var thisGroup = that.list[i];
							if (thisGroup.id == item.groupKey) {
								thisGroup.children.push({
									id: parameter.userkey,
									name: parameter.userName,
									img: parameter.headImg
								});
							}
						}

					} else {
						that.list[0].children.push({
							id: parameter.userkey,
							name: parameter.userName,
							img: parameter.headImg
						});
						that.list[0].count++;
					}
				}



				that.list[0].children.push({
					id: '115',
					name: 'CBA',
					img: 'https://file.help-itool.com//Content/ComPress/Images_120/20190429/29152899470.jpg'
				});

				that.list[0].count++;

				uni.hideLoading();

			});

			socketUser.GetGroupList(function(e) {
				// console.log(JSON.stringify(e))

				var list = [];
				if (e.date) {
					for (var i = 0; i < e.date.length; i++) {
						var item = e.date[i];
						list.push({
							id: item.id,
							title: item.title,
							url: item.logo
						});
					}
				}

				that.groups = list;

			});

		},
		methods: {
			//点击最后一级时触发该事件
			treeItemClick(item) {
				uni.navigateTo({
					url: '../chat/chat?sesstion=' + item.id + '&userName=' + item.name + '&headImg=' + item.img
				});
			},
			toGroup: function(item, type) {

				var that = this;

				console.log(JSON.stringify(item))

				uni.showActionSheet({
					itemList: ['分享群组', '进入会话'],
					success: function(res) {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');

						switch (res.tapIndex) {
							case 0:

								var value = JSON.stringify({
									type: 'addgroup',
									data: item
								});

								uni.navigateTo({
									url: '../test/test?value=' + value + '&title=添加群组'
								});


								break;
							case 1:
								that.sesstion = 'group_' + item.id;
								item.count = 0;

								helper.SetSesstion(that.messages);

								if (type == 1) {
									console.log('进入系统消息界面' + i);
								} else {
									uni.navigateTo({
										url: '../chat/chat?sesstion=group_' + item.id + '&userName=' + item.title + '&headImg=' + item.url
									});
								}
								break;
							default:
								break;
						}

					},
					fail: function(res) {}
				});


			},

			buttonclick: function() {

				var that = this;

				var socketUser = new SocketUser_1.SocketUser();

				plus.nativeUI.prompt(
					'Input your name: ',
					function(e) {
						switch (e.index) {
							case 0:
								if (e.value) {
									if (that.isGroup) {

										uni.chooseImage({
											count: 1,
											sourceType: [type],
											sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
											success: res => {

												helper.Uploader(res.tempFilePaths, function(key, filePaths) {

													socketUser.CreateGroup({
														UserId: Global.UserInfo().id,
														Title: e.value,
														ProjectToken: Global.Project.Token,
														Logo: filePaths[0].FileSever(),
														Paras: ''
													}, function(e1) {

														if (e1.code == 200) {

															uni.showToast({
																title: '创建成功'
															});

															socketUser.AddGroup({
																GroupKey: e1.date.id,
																Level: 9,
																UserId: Global.UserInfo().id,
																ProjectToken: Global.Project.Token
															}, function(data) {
																that.groups.push({
																	id: e1.date.id,
																	url: e1.date.logo.Img120(),
																	title: e1.date.title
																});
															});

														} else {
															uni.showToast({
																title: '创建失败'
															});
														}

													});

												});
											}
										});

									} else {

										socketUser.AddMemberGroup({
											UserId: Global.UserInfo().id,
											Title: e.value,
											ProjectToken: Global.Project.Token
										}, function(e1) {
											console.log(JSON.stringify(e1))

											that.list.push({
												id: e1.date.id,
												name: e1.date.title,
												count: 0,
												children: []
											});

										});

									}
								}
								break;
							default:
								break;
						}
					},
					that.buttontext,
					'your name',
					['OK', 'Cancel']
				);

			},

			bottomMenuTap: function(item) {


				switch (item.name) {
					case '好友':
						this.isGroup = false;
						this.buttontext = '添加分组';
						uni.setNavigationBarTitle({
							title: '我的好友'
						});
						break;
					case '群组':
						this.isGroup = true;
						this.buttontext = '创建群组';
						uni.setNavigationBarTitle({
							title: '我的群组'
						});
						break;
					default:
						break;
				}

			},

			treeItemLongTap: function(item) {

				var that = this;
				var group = true;

				var list = ['修改分组', '删除分组'];

				if (item.parentId.length > 0) {
					group = false;
					list = ['移动分组', '添加备注', '修改信息', '推荐给朋友', '删除好友'];
				}

				uni.showActionSheet({
					itemList: list,
					success: function(res) {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');

						if (group) {
							switch (res.tapIndex) {
								case 0:
									// 修改分组标题
									break;
								case 1:
									// 删除分组
									break;
							}
						} else {
							switch (res.tapIndex) {
								case 0:
									// 移动分组
									uni.showActionSheet({
										itemList: that.list.map(function(item) {
											return item.name;
										}),
										success: function(res) {
											console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
										},
										fail: function(res) {
											console.log(res.errMsg);
										}
									});
									break;
								case 1:
									// 添加备注
									break;
								case 2:
									// 修改好友信息 to webview
									break;
								case 3:
									// 分享名片给好友 to webview
									break;
								case 4:
									// 删除好友
									uni.showModal({
										title: '提示',
										content: '确认要删除该好友？',
										success: function(res) {
											if (res.confirm) {
												console.log('用户点击确定');
											} else if (res.cancel) {
												console.log('用户点击取消');
											}
										}
									});
									break;
							}
						}

					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});

			}

		},
		onNavigationBarButtonTap: function(e) {
			console.log(3);
			console.log(JSON.stringify(e));
		}
	};
</script>

<style></style>