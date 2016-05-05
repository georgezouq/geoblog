# Angular 2 Quick Start

## ES6 工具链

Angular2是面向未来的科技，要求浏览器支持ES6+，我们现在要尝试的话，需要加一些`垫片`来抹平当前浏览器与ES6的差异:

  · angular2 polyfills - 为ES5浏览器提供ES6特性支持，比如promise等。
  · systemjs - 通用模块加载器，支持AMD、CommonJS、ES6等各种格式的JS模块加载
  · typescript - TypeScript转化器，将TypeScript代码转换为当前浏览器支持的ES5代码，在后面，systemjs被配置为只用TypeScript转码器
  · reactive exetension - Javascript版本的`反应式编程/Reactive Programming`实现库，被打包为systemjs的包格式以便systemjs动态加载
  · angular2 - Angular2框架，被打包为systemjs的包格式，以便systemjs动态加载模块
处于方便代码书写的考虑，我们将这些基本依赖打包到一个压缩文件中

    angular2.beta.stack.min.js

## 初识 Angular2

写一个Angular2的Hello World应用相当简单，分为三步:

1.引入Angular2预定义类型

```typescript
import {Component} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";

```

`import` 是ES6的关键字，用来从模块中引入类型定义。在这里，我们从angular2模块库中引入了两个类型:Component类和bootstrap函数

2.实现一个Angular2组件

实现一个Angular2组件也很简单，定义一个类，然后给这个类添加`注解`：

```typescript
@Component({
    selector:"ez-app",
    template:"<h1>Hello,Angular2</h1>"
  })

class EzApp{}
```

`class` 也是ES6的关键词，用来定义一个类。`@Component`是给类`EzApp`附加的元信息，被称为`注解/Annotation`。

@Component 最重要的作用是:

  1.通过`selector`属性（值为CSS选择器），告诉Angular2框架这个组件渲染到哪个DOM对象上。
  2.通过`template`属性，告诉Angular2框架，使用什么模板进行渲染。

在alpha版本中的注解`@View`依然存在并可以使用，比如:
```typescript
@Component({selector:"ez-app"})
@View({template:"<h1>Hello,Angular2</h1>"})

class EzApp{}
```
## 注解/Annotation

你一定好奇`@Component`和`@View`到底是怎么回事？看起来像其他语言(比如python)的`装饰器`，是这样吗?ES6中其实并没有装饰器，这其实是利用了`转码器`提供的一个特性:`注解`。给一个类添加注解等同于设置这个类的`annotations`属性:
```typescript
//注解写法
@Component({selector:"ez-app"})
class EzApp{...}
```

```typescript
class EzApp{...}

EzApp.annotations = {new Component({selector:"ez-app"})}

```

很显然，`注解`可以看做转码器(typescript/traceur/babel)层面的`语法糖`，但是与python的`装饰器`不同,`注解`在编译转码时仅仅被放在类对象的`annotations`属性里，编译器并不进行解释展开 —— 这个解释的工作是Angular2框架完成的:

[baidu]:https://github.com/georgezouq/geoblog/raw/master/img/annotations.png

据称，注解/Annotation的功能就是Angular2团队向编译器开发团队提出的，因此这通常不是 编译器的默认选项，因此你 看到， 我们配置systemjs在使用TypeScript转码时打开注解：

```typescript
System.config({
    transpiler:'typescript',
    typescriptOptions:{ emitDecoratorMetadata:true}
  });
```




















的
