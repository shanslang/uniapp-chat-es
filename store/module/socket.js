import config from '@/common/js/config.js'
export default {
    state:{
        //链接是否打开了,在page里使用属性:this.$store.state.socket.IsOpen
        IsOpen:false, 
        // SocketTask
        SocketTask:false,
        //绑定的fd
        bindFd:null,
        // 当前聊天对象（进入聊天页面获取）
        Network:true,
        //断线重连定时器
        timer:null,
        //心跳间隔
        timeout:25000,
        //心跳事件
        interval:null,
        // 当前重连次数
        connectNum : 0,
        //当前聊天场景
        CurrentToUser:{
            id:0, // 用户ID,或者群聊ID
            name:"",
            avatar:"",
            type:"chat",//group 群聊,type=chat,就是昵称,group,就是群聊名称
        },
		infoList: [],  // 消息表
        noreadnum:0,//当前总未读消息数量,最大99
		mine: {},
		horn: '' // main的喇叭消息
    },
    mutations:{
        // 关闭连接,
        wsClose(state){
            if (state.IsOpen){
                state.IsOpen = false;
                state.SocketTask.close();               
            }
        },
        set_IsOpen(state,bool){ // 在pages里使用方法:this.$store.commit('set_IsOpen',true)
            state.IsOpen = bool
        },
        set_SocketTask(state,object){
            state.SocketTask = object
        },
        set_bindFd(state,fd){
            state.bindFd = fd
        },
        set_Network(state,bool){
            state.Network = bool
        },
        set_timer(state,timer){
            state.timer = timer
        },
        set_timeout(state,timeout){
            state.timeout = timeout
        },
        set_interval(state,obj){
            state.interval = obj
        },
        set_connectNum(state,num){
            state.connectNum = num
        },
        set_CurrentToUser(state,obj){
            state.CurrentToUser = obj
        },
        set_noreadnum(state,num){
            state.noreadnum = num
        },
		set_mine(state, obj){
			state.mine = obj;
		},
		set_horn(state, horn){
			state.horn = horn;
		},
		set_noreadnum(state, index){
			if(state.noreadnum > 0){
				uni.setTabBarBadge({
					index: index,
					text: ""+state.connectNum+""
				});
			}else{
				uni.removeTabBarBadge({
					index: index
				})
			}
		}
    },
    actions:{
        initWs({ commit, state }){  // 在pages里使用方法:this.$store.dispatch('initWs')
            console.log('检查是否已链接')
            if(state.IsOpen) return; // 防止重复连接
            //检查网络是否可用
            const _this = this; 
            
            uni.getNetworkType({
                success(result) {
                    console.log(result)
                    if (result.networkType != 'none') {
						// 连接
						console.log('开始ws链接')
						const wsurl = config.SocketUrl +'?token=' + uni.getStorageSync('token');
						console.log(wsurl)
						state.SocketTask = uni.connectSocket({
							url:wsurl,
							complete: (e)=> { 
                        
							},
						});
						if (!state.SocketTask) return;
						// 监听开启
						state.SocketTask.onOpen(()=>{
							console.log('链接成功')
							// 将连接状态设为已连接
							state.IsOpen = true;
                        
							//开启心跳
							state.interval=setInterval(() => {
								//发送心跳
                                console.log('send ping');
								uni.sendSocketMessage({
                                    data : '{"type":"ping"}',
                                    fail:function(e){
                                        console.log('心跳发送失败了 ...执行重连');
                                        uni.showToast({
                                            title: '正在尝试重新链接第'+state.connectNum+'次',
                                            icon:"none",                                       
                                        });
                                        state.IsOpen = false;
                                        //执行重连
                                        _this.dispatch('reConnect');
                                    },
								});
							}, state.timeout);
						});
						// 监听信息
						state.SocketTask.onMessage((e)=>{
							console.log(e.data);
							if(e.data !=='PONG'){
								// 字符串转json
								let res = JSON.parse(e.data);
								console.log(res);
								//根据消息类型分发事件
								switch(res.type){
									case   'friend':
									case   'group':
										//聊天消息
										//根据消息内容处理业务 
										// 总未读数+1
										if (state.CurrentToUser.id !== res.id && state.CurrentToUser.type !== res.type) {
											if(state.noreadnum < 99){
												state.noreadnum +=1;
											}     
											uni.setTabBarBadge({
												index: 0,
												text: ""+state.noreadnum+""
											});
											res.isSys = 0;
											res.iscc = 1; // 0就是不加到本地存储,1则要加
											
											uni.$emit('main_infoList',res);
										}else if(res.type == 'friend'){
											uni.$emit('msg_fri',res);
										}else if(res.type == 'group'){
											uni.$emit('msg_group',res);
										}               
										break;
									case 'msgBox':
										if(res.count > 0){
											//console.log(state.CurrentToUser.type)
										    //if (state.CurrentToUser.type !== 'sys'){
												//console.log('msgbox');
												state.noreadnum += res.count;
												uni.setTabBarBadge({
													index: 0,
													text: ""+state.noreadnum+""
												});
												res.isSys = 1;
												uni.$emit('main_infoList', res);
											//}
										}
										break;
									case 'token_expire':
										state.hasLogin = false;
										if (state.IsOpen){
											state.SocketTask.close();               
										}
										break;
									case 'sys_notify':
										uni.setTabBarBadge({
											index: 3,
											text: "new"
										});
										break;
									case 'layer':
										uni.showModal({
											content: res.msg,
											showCancel: false
										});
										break;
									case 'sys_horn':
										state.horn = res.horn
										break;
								}                       
							}                                            
						})
						// 监听关闭
						state.SocketTask.onClose(()=>{
							state.IsOpen = false;
							state.SocketTask = false;
							//清除定时器
							clearTimeout(state.interval);
							state.interval = null
						});
						// 监听错误
						state.SocketTask.onError((e)=>{
							state.IsOpen = false;
							state.SocketTask = false;
						});
                     
					} else {
                        console.log('网络已断开');
                        state.netWork = false;
                        // 网络断开后显示model
                        uni.showModal({
                            title: '网络错误',
                            content: '请重新打开网络',
                            showCancel: false,
                            success: function(res) {
                                if (res.confirm) {
                                    console.log('用户点击确定')
                                }
                            }
                        })
                    }
                }
            })  
        },      
        reConnect({ commit, state }){
            if (state.connectNum < 20) {
                state.timer = setTimeout(() => {
                   this.dispatch('initWs')
                }, 3000)
                state.connectNum += 1;
            } else if (state._connectNum < 50) {
                state.timer = setTimeout(() => {
                     this.dispatch('initWs')
                }, 10000)
                state.connectNum += 1;
            } else {
                state.timer = setTimeout(() => {
                   this.dispatch('initWs')
                }, 450000)
                state.connectNum += 1;
            }
        },
		sendMsg({commit, state}, datas){ 
			const _this = this; 
			var hh = true;
			uni.sendSocketMessage({
			    data : datas,
			    fail:function(e){
			        console.log('消息发送失败了 ...执行重连');
			        uni.showToast({
			            title: '正在尝试重新链接第'+state.connectNum+'次',
			            icon:"none",                                       
			        });
			        state.IsOpen = false;
			        //执行重连
			        _this.dispatch('reConnect');
					hh = false;
			    },
				success: function(e){
					console.log('发送成功');

				}
			});
			return hh;
		}
    }
}