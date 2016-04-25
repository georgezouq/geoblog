#Less与Sass解析
  首先我们要明确一个观点，尽管Less和Sass语法上有一些共性，但是Less !== Sass。当我们构建一个网站的时候，
我们可能会需要调色板这个功能，即拥有提供固定的可选择样式，避免样式跳跃过大。这个时候我们就用到了Less和Sass，
事实证明，他们的功能要比这个多得多。

###Less 和 Sass 语法共性
1.混入（Minxins）—— class中的class
2.参数混入 —— 可以传递参数的class
3.嵌套规则 —— Class中嵌套class，从而较少重复的代码
4.运算 —— CSS中用上数学
5.颜色功能 —— 可编辑颜色
6.命名空间（namespace） —— 分组样式
7.作用域 —— 局部修改样式
8.JavaScript赋值 - 在CSS中使用JavaScript表达式赋值

Less和Sass的主要不同就是他们的实现方式，Less是基于JavaScript，所以是在客户端处理。而
Sass是基于Ruby在服务器端处理的。很多开发者不会选择Less因为JavaScript引擎需要额外的时
间来处理代码然后输出修改过的CSS到浏览器。关于这个有很多种方式，我选择的是只在开发环节使用
LESS，一旦我完成开发，就复制然后粘贴Less输出的到一个压缩器，然后到一个独立的CSS文件来替代
Less文件。另外，我选择使用LESS.app来编译和压缩Less文件。两个选择都将最小化你的样式输出，
从而避免由于用户的浏览器不支持JavaScript而可能引起的任何问题。

## Less Is More

### 介绍

在项目中引入less.js

1.下载less.js
2.创建一个文件来存放Less代码，如style.less
3.添加以下代码到你的HTML的<head>中

```HTML
<link rel="stylesheet/less" type="text/css" href="styles.less">
<script src="less.js" type="text/javascript"></script>
```

其实也有一个[服务器端的less版本](http://lesscss.org/#-server-side-usage)，在服务器上安装Less的最简单的办法就是使用[Node Package](https://github.com/npm/npm)Messager (NPM 一看 就知道是基于NodeJS的)

### 变量
    If you are developer,variables will be your best friend

我们可以将能重复使用到的值（本案例里是color）设置成变量，这样就可以避免重复的定义，减少很大的工作量

```less
  @blue : #00c;
  @light_blue : @blue + #333;
  @dark_blue : @blue - 333;
```

他们看起来：
[!less]:https://github.com/georgezouq/geoblog/raw/master/img/blue-gradient,jpg

关于变量 Less和Sass的唯一区别就是 Less使用`@` 而 Sass 使用`$`.同时还有一些作用域上的差别，我们之后会提到

### 混入(mixin)

有些时候我们会创建一些在样式表中重复使用的样式规则，通常会使用
```html
  <div class="border article"></div>
```

这种方式引用多种样式，但是有了less 我们可以

```less
.border{
  border-top : 1px dotted #333;
}
article.post{
  background:#333;
  .border;
}
ul.menu{
  background:#ccc;
  .border;
}

```

下面是在两个元素中分别添加`.border` 同样的效果，而且仅仅在样式变中就完成了

[!less]:https://github.com/georgezouq/geoblog/raw/master/img/bordered-elements,jpg

在Sass中，我们需要在样式规则前添加`@minxin`声明,然后通过`@include`来调用它

```Sass
  @mixin border {
    border-top:1px dotted #333;
  }
  article.post {
    background : #eee;
    @include border;
  }
  ui.menu {
    background:#ccc;
    @include border;
  }
```

### 参数混入

使用Less或Sass，我们可以使用函数处理Css中多余的工作。最好的例子就是我们正在经历的从Css2到css3的过渡过程中很多浏览器的私有前缀。Nettuts+有一篇Jeffrey Way写的[文章](http://code.tutsplus.com/tutorials/quick-tip-never-type-a-vendor-prefix-again--net-17589)
内容是包含参数的文件，他们可以附带大多数浏览器私有前缀Css3属性

```Less
.border-radius( @radius:3px ){
  -webkit-border-radius : @radius;
  -moz-border-radius : @radius;
  border-radius : @radius;
}
```

Sess的语法很像Less，只是只用$声明变量，然后使用前面提到的`@minxin` 和 `@include`来调用


http://blog.jobbole.com/24671/
