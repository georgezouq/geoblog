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

## 组件开发 - 模板基本语法

### {{model}} - 文本插值

在模板中使用可以 `{{表达式}}` 的方式绑定组件模型，当表达式变化时，Angular2 将会自动更新对应的DOM对象:

```typescript
import {Component} from "angular2/core";
import {bootstrap} from "angular2/platform/brower";

@Component({
    selector:"ez-app",
    template:`
      <div>
        <h1>{{title}}</h1>
        <div>
          <span>{{data}}</span>
          来源<span>{{source}}</span>
        </div>
        <p>{{content}}</p>
      </div>
    `
  })
class EzApp{
    constructor(){
      this.title = "证监会：对恶意做空是有监测的";
  this.date = "2015年07月11日 15:32:35";
  this.source = "北京晚报";
  this.content = `
证监会新闻发言人邓舸昨天表示，近期，证监会要求所有上市公司制定维护股价稳定的方案，举措包括大股东增持、董监高增持、公司回购、员工持股计划、股权激励等，相关方案应尽快公布，并通过交易所平台向投资者介绍生产经营管理情况、加强投资者关系管理、维护股价稳定、做好投资者沟通工作。他介绍，该措施得到了上市公司大股东的积极响应，包括北京创业板董事长俱乐部、创业板首批28家公司实际控制人、浙江24家公司董事长等多个上市公司联盟以及大连、青岛、湖南等多地上市公司集体发声，宣布通过积极增持、回购、暂不减持等方式稳定公司股价。截至9日，两市已有655家公司公布股份增持、回购计划，积极维护公司股价稳定。
  `;
    }
}

bootstrap(EzApp);
```

### [property] - 属性绑定

在模板中，也可以使用一对 `中括号` 将HTML元素或组件的 `属性` 绑定到组件模型的某个 `表达式` ，当表达式的值变化时，对应的DOM对象也会进行更新。

```typescript

import {Component} from "angular2/core";
import {bootstrap} from "angular2/platform.brower";

@Component({
      selector:"ez-app",
      template:`<h1 [style.color]="color"><Hello,Angular2</h1>`
  })
class EzApp{
    constructor(){
        this.color = "red";
    }
}

```

等价的，你也可以使用 `bind-` 前缀进行属性绑定:

```typescript
@Component({template:`<h1 bind-textContent="title"></div>`})
```

很容易理解，通过属性，应用相关的数据 `流入` 组件，并影响组件的外观与行为。需要注意的是，属性的值总是被当做 `调用者` 模型中的 `表达式` 进行绑定，当表达式变化时，被调用的组件自动得到更新。如果希望将属性绑定到一个常量字符串，别忘了给字符串加引号或者去掉中括号

```typescript

//错误，Angular2将找不到表达式 Hello,Angular2
@Component({template:`<h1 [textContent]="Hello,Angualr2"></h1>`})
//正确，Angular2识别出常量字符串表达式 'Hello,Angular2'
@Component({template:`<h1 [textContent]="'Hello,Angular2'"></h1>`})
//正确，Angular2识别出常量字符串作为属性textContent的值
@Component({template:`<h1 textContent="Hello,Angular2"></h1>`})
```

### (event) - 事件绑定

在模板中为元素添加事件监听很简单，使用一对 `小括号` 包裹 `事件` 名称，并绑定到表达式即可:

```typescript

import {Component,View} from "angular2/core";
import {bootstrap} from "angular2/platform/brower";

@Component({selector:"ez-app"})
@View({
      template:`
        <h1>Your turn!<b>{{sb}}</b></h1>
        <button (click)="roulette()" >ROULETTE</button>
      `
  })
class EzApp{
    constructor(){
        this.name = ["Jason","Mary","Linda","Lincoln"];
        this.roulette();
    }
    //轮盘赌
    roulette(){
        var idx = parseInt(Math.random() * this.name.length);
        this.sb = this.names[idx];
    }
}
```

### var - 局部变量

有时模板中的不同元素之间可能需要相互调用，Angular2 提供一种简单的语法将元素映射为 `局部变量` : 添加一个以 `#` 或 `var-` 开始的属性，后续部门表示变量名，这个变量对应元素的实例。

在下面代码示例中，我们为元素 `h1`定义了一个局部变量 `v_h1`，这个变量指向该元素对应的DOM对象，你可以在模板中的其他地方调用其方法和属性：

```typescript

@Component({
    template:`
      <h1 #v_h1>hello</h1>
      <button (click) = "v_h1.textContent" = 'HELLO'">
      test</button>
    `
  })

```

如果在一个组件元素上定义局部变量，那么其对应的对象为组件的实例:

```typescript

@Component({
    directives:[EzCalc],
    template:"<ez-calc #c></ez-calc>"
  })

在上面的实例中，模板内局部变量 `c` 指向EzCalc的实例。

```

一个栗子

```typescript

import {Component} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";

@Component({
    selector: "ez-app",
    template: `
        <h1>
            <button>变色</button>
            I choose
            <b #v_who>WHO?</b>
        </h1>
        <button (click)="v_who.textContent = 'Jason'">Jason</button>
        <button (click)="v_who.textContent = 'Mary'">Mary</button>
        <button (click)="v_who.textContent = 'Linda'">Linda</button>
        <button (click)="v_who.textContent = 'Lincoln'">Lincoln</button>
        <button (click)="v_who.textContent = 'Jimmy'">Jimmy</button>
        <button (click)="v_who.textContent = 'Albert'">Albert</button>
      `
  })
class EzApp{}

bootstrap(EzApp);

```

### NgStyle - 内联样式

我们可以使用样式绑定的方法设置单一样式。但如果要同时设置多个样式值，可以使用 `NgStyle` 指令，将内联样式绑定到组件的属性上。

`NgStyle` 指令的选择符是 `[ngStyle]` ，下面的示例将div元素的样式绑定到组件的 `style` 属性:

```typescript
<div [ngStyle]="styles">...</div>
```

`style`属性应当一个JSON对象，其键为样式名，值为样式值:

```typescript
//EzApp class
this.style={
    "color" : "red",
    "font-style" : "italic",
    "background-color" : "black"
}
```

样式名可以使用HTML语法中的属性名写上（同上），也可以使用JS语法中的 `驼峰/camelCase` 书写方法:

```typescript
//EzApp class
this.styles = {
    color: "red"
    fontStyle : "italic",
    backgroundColor : "black"
}
```

通常来讲，在JavaScript中设置DOM元素的CSS样式，都会使用驼峰名称，因此，建议 采用后一种写法。

### NgClass - 样式类

在WebApp中，我们通常采用动态添加或删除 `样式类` 的方法，来改变DOM元素的外观表现。

当然我们可以使用HTML元素的 `class` 属性绑定到组件实例的属性上，然后通过改变实例的属性，实现动态修改HTML元素的 `样式类`
:

```typescript
import {Component} from "angular2/core";
import {bootstrap} from "angular2/platform/browser"

@Component({
    selector:"ez-app",
    template:`
      <h1 [ngClass]="cns">EZ-APP</h1>
    `,
    styles:[`
      .colorful{color:red;}
      .italic{font-style:italic}
      .bold{font-weight:bold}
    `]
  })
class EzApp{
    constructor(){
        this.cns = {
            colorful:true,
            italic:true,
            bold:true
        }
    }
}

bootstrap(EzApp);
```

不过，如果一次要删除或添加多个样式类，Angular2 内置的 `NgClass` 指令会更简单。`NgClass` 指令的选择符是 `ngClass`，下面的示例将div元素的class属性绑定到组件的cns属性:

```typescript
<div [ngClass]="cns">...</div>
```

`cns`属性是一个JSON对象，每个键代表 `样式类名`，对应的值为true是表示HTML元素添加该样式类，为false时表示删除该样式类，如果cns的值如下:

```typescript
//EzApp class
this.cns = {
    colorful:true,
    italic:false,
    bold:true
}

```

那么示例模板渲染后的结果是:

```typescript
<div class="colorful bold">...</div>
```
### NgIf - 条件逻辑

我们需要模板的一部分在满足一定条件时才显示，比如下面的`EzReader`组件，对于试用用户，他将在正文之上额外显示一个广告:

```typescript
import {Component} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";

@Component({
    selector:"ez-reader",
    properties:["trial"],
    template:`
      <img [src]="banner" *ngIf="trial == true" class="banner">

      <pre>{{content}}</pre>
    `
  })
class EzReader{
      constructor(){
          var self = this;
          this._trial = true;
          this.banner = "img/banner.jpg";
          this.content = `“没关系，我已经没有放射性了。”史强对坐在旁边的汪森说，“这两天，我让人家像洗面口袋似的翻出来洗了个遍。`;
      }
  }

@Component({
    selector:"ez-app",
    directives:[EzReader],
    template:`
      <ez-reader [trial]="true"></ez-reader>
    `
  })
class EzApp{}

bootstrap(EzApp);

```

这是指令 `NgIf` 发挥作用的场景，他评估属性 `ngIf` 的值是否为真，来决定是否渲染 `template` 元素的内容:

```typescript
@Component({
    template:`
      <!-- 根据变量trial的值决定是否显示广告图片 -->
      <template [ngIf]="trial==true">
        <img src="ad.jpg">
      </template>
    `
  });
```

Angular2 同时提供了两种语法糖，让`NgIf`写起来更简单，下面的两种书写方式和上面的正式语法是等效的:

```typescript
//使用template attribute
<img src="ad.jpg" template="ngIf tiral==true">
//使用*前缀
<img src="ad.jpg" *ngIf="trial==true">

```

看起来，显然 `*ngIf` 的书写方式更加有人情味，不过无论采用哪种书写方式，都将转换成上面的正式写法在进行编辑。

### NgSwitch - 分支逻辑

如果组件的模板需要根据某个表达式的不同取值真是不同的片段，可以使用 `NgSwitch` 系列指令来动态切分模板。比如下面示例广告组件`EzPromotion`，需要根据来访者性别的不同推送不同的广告：

```typescript
import {Component,} from "angular2/core";
import {bootstrap} from "angular2/platform/brower";

@Component({
    selector:"ez-promotion",
    properties:["gender"],
    template:`
      <div [ngSwitch]="gender">
          <template ngSwitchWhen="Male">
              <img src="img/male-ad.jpg" class="banner">
          </template>
          <template ngSwitchWhen="Female">
            <img src="img/female-ad.png" class="banner">
          </template>
          <template ngSwitchDefault>
            <h1>Learn Something, NOW!</h1>
          </template>      
      </div>
    `
  })
```

#### NgSwitch

`NgSwitch` 指令可以应用在任何HTML元素上，它评估元素的ngSwitch 属性值，并根据这个值决定应用哪些 template 的内容（可以同时显示多个分支）

#### ngSwitchWhen

`NgSwitchWhen`指令必须应用在NgSwitch指令的字template元素上，它指定一个表达式，如果表达式结果为true，那么显示这个template的内容

#### NgSwitchDefault

NgSwitchDefault指令必须应用在NgSwitch指令的子template元素上，当没有NgSwitchWhen指令匹配 时，NgSwitch将显示这个template的内容:

```typescript
<ANY [ngSwitch]="...">
    <template ngSwitchDefault>...</template>
</ANY>
```
### NgFor - 循环逻辑

如果希望利用一组可遍历的数据动态构造模板，那么应当使用NgFor指令

```typescript

import {Component} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";

@Component({
    selector:"ez-star",
    template:`
      <div>
        <h2>{{actor}} - Films</h2>
        <ul>
            <li *ngFor="#film of films">{{film}}</li>
        </ul>
      </div>
    `
  })

```

### 迭代

NgFor指令应用在template元素上，对`ngForOf`属性指定的数据集中的每一项 实例化一个template的内容：

```typescript
<template ngFor [ngForOf]="items" >
    <li>----------</li>
</template>
```

如果items数据集有3条记录，那么会生成3个li对象，就像这样：

```html
<li>----------</li>
<li>----------</li>
<li>----------</li>
```

不过这没多大用。

### 使用数据项

好在我们还可以为数据集的每一项声明一个局部变量，以便在模板内引用：

```typescript
<template ngFor [ngForOf]="items" #item>
    <li>{{item}}</li>
</template>
```

假如items数据集是一个数组：`["China","India","Russia"]`，那么 现在生成的结果就有点用了：

```html
<li>China</li>
<li>India</li>
<li>Russia</li>
```

#### 使用数据项索引

有时还需要数据项在数据集中的索引，我们也可以为数据集的每一项的索引声明一个 局部变量，以便在模板内引用：

```typescript
<template ngFor [ngForOf]="items" #item #i="index">
    <li>[{{i+1}}] {{item}}</li>
</template>
```

现在生成的结果更规矩了：

```html
<li>[1] China</li>
<li>[2] India</li>
<li>[3] Russia</li>
```

#### 语法糖

与NgIf类似，Angular2也为NgFor提供了两种语法糖：

```typescript
//使用template attribute
<ANY template="ngFor #item of items;#i=index">...</ANY>
//使用*前缀
<ANY *ngFor="#item of items;#i=index">...</ANY>
毫无疑问，应当尽量使用*ngFor的简便写法，这可以提高模板的可读性。
```
