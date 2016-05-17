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

## 组件开发 - 声明元数据

### Selector 选择符

使用 `Component` 注解的 `selector` 属性来告诉 Angular2 框架，当编译、链接模板时，遇到对应元素就实例化一个组件对象。

#### 标签名选择符

```typescript
@Component({selector:"ez-one",template:"TAGNAME-SELECTOR"})
class EzOne{}
```

将匹配：`<ez-one>...</ez-one>`

#### CSS 类选择符

```typescript
@Component({selector:".ez-two",template:"CSSCLASS-SELECTOR"})
class EzTwo{}
```

将匹配： `<any class="ez-two">...</any>`

#### 属性选择符

```typescript
@Component({selector:"[ez-three]",template:"ATTR-SELECTOR"})
class EzThree{}
```

将匹配：`<any ez-three>...</any>`

#### 属性值选择符

```typescript
@Component({selector:"[ez-four=123]",template:"ATTRVAL-SELECTOR"})
class EzFour{}
```

将匹配：`<any ez-four='123'>...</any>`

### template/templateUrl - 声明模板

组件的Component注解最重要的属性两个属性之一就是`template` - 模板。 Angular2的模板是兼容HTML语法的，这意味着你可以使用任何标准的HTML标签编写 组件模板。

所以，在最简单的情况下，一个Angular2组件的模板由标准的HTML元素构成，看起来就是 一段HTML码流。Angular2将原封不同地渲染这段模板：

有两种方法为组件指定渲染模板：

#### 1. 内联模板

可以使用组件的View注解中的template属性直接指定内联模板：

```typescript
@Component({
    template : `<h1>hello</h1>
                <div>...</div>`
})
```

#### 2. 外部模板

也可以将模板写入一个单独的文件：

```html
<!--ezcomp-tpl.html-->
<h1>hello</h1>
<div>...</div>
```

然后在定义组件时，使用templateUrl引用外部模板：

```typescript
@Component({
    templateUrl : "ezcomp-tpl.html"
})
```

### style/styleUrls - 设置样式

组件既然处于UI层，就应当好看些，好看是构造良好用户体验的一部分。Angular2的 组件模板基于HTML，那么显然，我们需要通过样式表/CSS来调整组件的外观。

和模板类似，我们有两种方法为组件设置CSS样式：

#### 1. 内联样式

可以使用组件Component注解的styles属性来设置内联样式：

```typescript
@Component({
    styles:[`
        h1{background:#4dba6c;color:#fff}     
    `]
})

```

#### 2.外部样式

也可以把样式定义在单独的样式文件中：

```typescript
/*ez-greeting.css*/
h1{background:#4dba6c;color:#fff}     

```

然后使用 `Component注解` 的 `styleUrls` 属性来引入外部样式:

```typescript
@Component({
    styleUrls:["ez-greeting.css"]
  })
```

### proerties - 声明属性

属性是组件暴露给外部世界调用的接口，调用者通过设置不同的属性值来定制组件的行为与外观。

在 Angular2 中为组件增加 `属性` 只需要在 Component 注解的 `properties` 属性中声明组件的 `成员变量` 就可以了:

```typescript
@Component({
    properties:["name","country"]
  })
```

上面的代码将组件的成员变量 `name` 和 `country` 暴露为同名属性，这意味着在 `EzApp` 的模板中，可以直接使用中括号来设置 `EzCard` 对象的属性:

```typescript
@Component({
    directives:[EzCard],
    template:'<ez-card [name]="'leof'" [country]="'中国'"></ez-card>'
  })

```

### events - 声明事件

与属性相反，事件从组件的内部流出，用来通知外部世界发生了一些事情

在 Angular2 中为组件增加事件接口也非常简单：定义一个 `事件源/EventEmitter` ，然后通过 `Component注解` 的 `events` 接口暴露出来

```typescript
//EzCard
@Component({
    events:["change"]
  })
class EzCard{
  constructor(){
    this.change = new EventEmitter();
  }
}
```

上面的代码将组件 `EzCard` 的事件源 `change` 暴露为 `同名事件`，这意味着调用者 `EzApp` 组件的模板中，可以直接使用 `小括号` 语法挂接事件监听函数:

```typescript
@Componen({
    template:"<ez-card (change)="onChange()"></ez-card>"
  })

```

每次 `EzCard` 触发 `change` 事件时，`EzApp` 的 `onChange()` 方法都将被调用.

### directives - 引用指令

在Angular2中，一个组件的模板内除了可以使用标准的HTML元素，也可以使用自定义的组件！

这是相当重要的特性，意味着Angular2将无偏差地对待标准的HTML元素和你自己定义的组件。这样， 你可以建立自己的领域建模语言了，这使得渲染模板和视图模型的对齐更加容易，也使得模板的语义性 更强：

声明要在模板中使用的组件

不过，在使用自定义组件之前，必需在组件的Component注解中通过directives属性声明这个组件：

```typescript
@Component({
    directives : [EzComp],
    template : "<ez-comp></ez-comp>"
})
```

你应该注意到了，directives属性的值是一个数组，这意味着，你需要在这里声明所有你需要在模板 中使用的自定义指令。
