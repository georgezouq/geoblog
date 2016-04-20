#Angular 1.x 编码规则
##Angular 团队支持
<非常感谢Angular团队领导Igor Minar,检查审视，贡献必要的资料

##目录
	1.[单一职责](#single-responsibility)
	1.[IIFE](#iife)
	1.[Modules](#modules)
	1.[Controllers](#controllers)
	1.[Services](#services)
	1.[Factories](#factories)
	1.[数据服务](#dataservices)
	1.[Directives](#directives)
	1.[Promises解决方案](#promises)
	1.[手动依赖注入](#manualdi)
	1.[压缩和注解](#minification-and-annotation)
	1.[异常处理](#exception-handling)
	1.[命名规则](#naming)
	1.[应用结构优化准则](#application-structure-lift-principle)
	1.[应用结构](#application-structure)
	1.[模块化](#modularity)
	1.[启动](#startup-logic)
	1.[Angular $服务包装](#angular-wrapper-services)
	1.[测试](#testing)
	1.[动画](#animations)
	1.[评论](#comments)
	1.[JSHint](#js-hint)
	1.[JSCS](#jscs)
	1.[常量](#constants)
	1.[文件模板和代码片段](#file-templates-and-snippets)
	1.[路由](#routing)
	1.[自动化任务](#task-automation)
	1.[Filter过滤器](#filter)
	1.[Angular 文档](#angular-docs)

## 单一职责

### 规则1
##### [Style [Y001](#style-y001)]

	- 每个文件仅包含一个组件，并且使其少于400行代码，它的好处在于
		1.对于测试来说更加容易
		1.使得代码可读性更强，更好维护，避免团队在源代码控制方面的问题
		1.可以避免 多个组件在共享变量，创建不必要的闭包，或者不必要的耦合和依赖 时隐藏的错误

```javascript
/*不规范示例*/
angular
	.module('app',['ngRoute'])
	.controller('SomController',SomeController)
	.factory('SomeFactory',SomeFactory);

	function SomeController(){}

	function SomeFactory(){}
```

```javascript
/*推荐*/
//app.module.js
angular
	.module('app',['ngRoute']);
```
```javascript
/*some.controller.js*/
angular
	.module('app')
	.controller('SomeController',SomeController);

	function SomeController() { }
```
```javascript
/* recommended */

// some.factory.js
angular
		.module('app')
		.factory('someFactory', someFactory);

function someFactory() { }
```
**[返回顶部](table-of-contents)**

## IIFE (立即执行方法 Immediately Invoked Function Expression(IIFE)).
### Javascript Scopes
###### [Style [Y010](#style-y010)]
	- 将Angular组件包含在IIFE代码块中，这样的优势在于
	1.一个IIFE将变量从全局作用域中移出，这会有效的方式变量和方法之间的命名冲突
	1.当你将你的代码从开发板 压缩和打包 到生产服务器上的时候，会有很多全局作用域下的变量发生冲突，
	这时IIFE就可以有效的隔离这些变量

	```javascript
  /* 不规范 */
  // logger.js
  angular
      .module('app')
      .factory('logger', logger);

  // logger 方法已经添加到了全局作用域中
  function logger() { }

  // storage.js
  angular
      .module('app')
      .factory('storage', storage);

  // storage 方法已经添加到了全局作用域中
  function storage() { }
  ```

  ```javascript
  /**
   * 推荐
   *
   * 下面代码中没有全局作用域变量和方法
   */

  // logger.js
  (function() {
      'use strict';

      angular
          .module('app')
          .factory('logger', logger);

      function logger() { }
  })();

  // storage.js
  (function() {
      'use strict';

      angular
          .module('app')
          .factory('storage', storage);

      function storage() { }
  })();
  ```
	**[返回顶部](#table-of-contents)**
## Modules

### 避免命名冲突
###### [Style [Y020](#style-y020)]
	- 使用统一的子模块命名规则可以帮助避免模块命名冲突。分隔符帮助定义模块和他们的子模块之间的层次结构
	例如`app`可以作为父模块名，`app.dashboard`和`app.users`模块作为依赖于`app`模块的子模块。

### 定义(or 设置)
###### [Style [Y021](#style-y021)]

	- 可以使用模块的setter语法定义模块，而不要使用变量定义模块。
			在单一组件文件中，使用到模块变量的情况会变得非常少。
			```javascript
		  /* 避免使用 */
		  var app = angular.module('app', [
		      'ngAnimate',
		      'ngRoute',
		      'app.shared',
		      'app.dashboard'
		  ]);
		  ```

		  ```javascript
		  /* 推荐方式 */
		  angular
		      .module('app', [
		          'ngAnimate',
		          'ngRoute',
		          'app.shared',
		          'app.dashboard'
		      ]);
		  ```

### Getters
###### [Style [Y022](#style-y022)]
	- 当使用一个模块的时候，可以使用getter链而非变量装载。
		这样可以使项目代码的可读性更高并且避免变量冲突

		```javascript
	  /* 避免使用 */
	  var app = angular.module('app');
	  app.controller('SomeController', SomeController);

	  function SomeController() { }
	  ```

	  ```javascript
	  /* 推荐使用 */
	  angular
	      .module('app')
	      .controller('SomeController', SomeController);

	  function SomeController() { }
	  ```
### Getter 方法和Setter 方法之间的比较
###### [Style [Y023](#style-y023)]

```javascript
/* recommended */

// 创建一个模块
angular.module('app', []);

// 从模块集合中取出这个模块
angular.module('app');
```

### 命名 与 匿名方法之间的比较
###### [Style [Y024](#style-y024)]

	- 在回调函数中尽量使用命名方法代替匿名方法，这样会使得代码的可读性更高，并且提升代码可复用的程度
	```javascript
  /* 避免使用 */
  angular
      .module('app')
      .controller('DashboardController', function() { })
      .factory('logger', function() { });
  ```

  ```javascript
  /* 推荐使用 */

  // dashboard.js
  angular
      .module('app')
      .controller('DashboardController', DashboardController);

  function DashboardController() { }
  ```

  ```javascript
  // logger.js
  angular
      .module('app')
      .factory('logger', logger);

  function logger() { }
  ```
**[Back to top](#table-of-contents)**

## 控制器Controllers

### controllerAs View Syntax
###### [Style [Y030](#style-y030)]
	-使用[`controllerAs`](http://www.johnpapa.net/do-you-like-your-angular-controllers-with-or-without-sugar/) 语句替代`经典控制器$scope`语句
		1.控制器构造、新建的时候回提供一个简单的实例，而`controllerAs`语句相比`传统$scope 语句`更接近Javascript原声方法
		1.它会在视图中使用一个虚拟的对象绑定（例如 使用`customer.name` 代替 `name`）,更加贴近上下文关系，
		增加刻度性，避免引用冲突问题
		1.帮助避免在视图嵌套控制器中使用`$parent`

		```html
	  <!-- avoid -->
	  <div ng-controller="CustomerController">
	      {{ name }}
	  </div>
	  ```

	  ```html
	  <!-- recommended -->
	  <div ng-controller="CustomerController as customer">
	      {{ customer.name }}
	  </div>
	  ```

### controllerAs 控制器语句
###### [Style [Y031](#style-y031)]

	- `controllerAs`语句在Controller内部使用`this`将数据绑定在`$scope`上
	`controllerAs` 是`$scope`语法糖。你依然可以使用`$scope`方法.
