👉 GitHub: https://github.com/majunchang/reachChatApp


#####  基于==React(16.x)== 全家桶制作的一款实时聊天app，采用组件化，模块化的开发方式，用到了==react-redux==等插件，使用==antd-mobile==的ui框架。

#### 技术栈

##### 【前端】
- React: 用于搭建用户界面的javascript库，特点是声明式渲染和组件化开发
- Redux: Redux 是 JavaScript 状态容器，提供可预测化的状态管理。让你构建一致化的应用，运行与不同的环境，并且易于测试。
- React-redux: 核心在于provieder，connect和中间件机制。
- React-router:是一个基于 React 之上的强大路由库，它可以让你向应用中快速地添加视图和数据流，同时保持页面与 URL 间的同步。
##### 【后端】
- NodeJs:使用 express 构建一个本地 HTTP server 来调试 React 项目
- MongoDB: 存储用户数据和聊天数据的非关系型数据库
- Express: Node的基于 Node.js 平台，快速、开放、极简的 web 开发框架。

##### 【自动化构建】
- create-react-app: 官网提供的react脚手架工具，快速初始化项目代码
- eslint： 代码风格检查工具，规范代码书写


##  技术详解
> react中注意的地点
> ##### 绑定事件，state和actions的映射，路由包含的switch等
#### 登录和注册部分（以登录举例）
1. 首先发送一个接口请求后端，检测是否有用户信息。没有的话 直接跳转到登录页
2. 登录这里 对输入的用户名和密码做一下校验 然后存储到本地一个用户id
3. 登录返回成功之后dispatch返回数据 触发reducer  将数据存储到state中
#### 主页以及切换部分
1. 头部和底部使用共有部分，中间的内容使用数组中循环渲染不同的Route
2. 登录成功之后，有了redirect选项，并且我们在Login中，设置了路由的跳转

```js
{this.props.redirectTo && this.props.redirectTo !== '/login' ?
                    <Redirect to={this.props.redirectTo}></Redirect> : null}
```
3. 我们在这些子组件中 使用@connect方法, 将redux中的state和action传递进来
#### 聊天数据的展示
1. 主要是使用socket.io 实现数据通信原理
2. 后端使用express+socketio的结合，前端监听端口号9000以后，进行了数据的交互和接收
3.  我们在每条数据上 加上了其他的一些值 形成一个对象。根据发收方的用户id 进行辨别和数组的循环渲染
#### 未读消息的更新
1. 默认每条数据的read字段 都是false，筛选聊天数据的发送对象是正在使用这个软件的用的时候，筛选出来的结果就是未读消息的数量
2. socket 使用emit触发 on来接受  当接受到一个消息的时候  未读消息加1
3. 当我们从聊天页面退出的时候 把这个聊天界面的对方的id发送给后端进行处理 将总体未读消息数量 减去这个id的维度消息数量

##  快速开始
##### 开发版

```

//  开启mongodb数据库服务
//  将项目地址完整的clone下来 
    git clone https://github.com/majunchang/reachChatApp
//  进入到项目文件夹  安装相关依赖
    cd reatChatApp 
    npm install
//  进行本地编译
    npm start
//  进入到server文件夹里面 启动nodejs服务  建议使用nodemon启动
    node（ndoemon） server
   
```
##### 生产版


```
//  开启mongodb数据库服务
//  将项目地址完整的clone下来 
    git clone https://github.com/majunchang/reachChatApp
//  进入到项目文件夹  安装相关依赖
    cd reatChatApp 
    npm install
//  首先将项目进行打包 然后启动打包的端口（server.js)中已经配置
    npm run build
//  完成之后
    npm run server 

```





<div align=center>
<img width="300" height="300" src="http://oneg19f80.bkt.clouddn.com/18-3-16/36877665.jpg">
</div>
