#bower

###为什么使用bower？因为它可以节省掉你去git或是网上找js的时间
###Bower是一个软件包管理器，所以你可以在应用程序中用它来安装新的软件包。

####前提准备
为了安装bower，首先需要安装如下软件
- node: 下载最新版本的node.js
- npm:
- Git: 你需要从git仓库获取一些代码包
- 对于windows用户，还需要装msysgit

###安装bower
>安装过以上的必要文件，使用如下命令安装bower

    npm install -g bower

###编写.bowerrc的配置文件
* 创建配置文件，文件名： .bowerrc
   配置bower下载文件到 public/lib。文件内容如下
   
        {"directory":"./public/lib"}
###使用bower安装bootstrap
    
        bower install bootstrap

