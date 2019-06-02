# 对象
每个函数都有原型对象prototype，通过对原型对象的修改可以实现基于原型的继承。
通过new调用函数后，新创建的对象具有函数原型对象的引用：[[prototype]]
原型对象默认只有一个constructor属性，指向构造执行的函数本身
```javascript
function Ninja() {
    // function logic
}
// Ninja.prototype ---> Ninja's prototype contains 
// {
//   constructor: function Ninja() {}, 
//   selfDefine properties and methods
// }

let ninja = new Ninja()
// ninja.[[prototype]] ---> Ninja.prototype ---^
// ninja.selfProperties ---> Ninja.prototype.selfProperties  ---> ... ---> Object.prototype
```
::: warning
如果某个方法对所有的实例对象一致，则应该考虑将该方法沉淀到原型方法中，避免重复函数定义带来的内存开销
而对于某个属性是需要私有的，则只能放在构造函数中作为实例属性
:::

## 原型判断
通过以下方法可以判断一个对象是否由某个函数构造
```javascript
ninja instanceof Ninja  // true
ninja.constructor === Ninja   // true
```
实例对象与原型的关系在创建时确认，即使原型对象被其他对象覆盖，也只影响之后创建的实例，已有的实例不受影响
```javascript
let ninja = new Ninja()
// ninja.[[prototype]] -> Ninja.prototype
Ninja.prototype = SomeOtherObj
let ninja2 = new Ninja()
// ninja.[[prototype]] -> Ninja.prototype's original object
// ninja2.[[prototype]] -> SomeOtherObj
```
# 继承
通过原型链实现继承
```javascript
function SuperClass () {}
function SubClass() {}
SubClass.prototype = new SuperClass()  // 由此实现sub继承SuperClass的原型属性和方法
let subClass = new SubClass()
```
::: warning
sub的原型由new SuperClass()的实例和SuperClass的原型组成
:::

::: warning
这种继承存在一种缺陷，即sub.prototye中缺失constructor，无法使用constructor判断实例来源
:::

修复方法入下
```javascript
SubClass.prototype.constructor = SubClass
```

### instanceof
instanceof的判断逻辑：右侧函数的原型对象是否存在与左侧对象的原型链上
```javascript
sub instanceof SubClass  // true, sub.[[prototype]] -> SubClass.prototype, SubClass的原型为： SubClass.prototype， 存在
sub instanceof SupClass  // true, sub.[[prototype]] -> SubClass.prototype, SubClass.prototype.[[prototype]] -> SupClass.prototype, SupClass的原型为：SubClass.prototype，存在
```
## 模拟实现静态方法
```javascript
Ninja.prototype.prototypeMethod = function() {}  // 实现原型方法
Ninja.staticMethod = function() {}  // 实现静态方法
```

# ES6中的Class
```javascript
Class Person {
    constructor () {
        // 构造方法
    }

    classMethodName() {
        // 类方法
    }

    static staticMethod() {
        // 静态方法
    }
}

Class Ninja extends Person {
    constructor () {
        super()
        // 构造方法
    }

    classMethodName2() {
        // 类方法
    }
}
```
等效基于原型链的写法
```javascript
function Person() {
    // 构造方法
}

Person.prototype.classMethodName = function() {
    // 类方法
}

Person.staticMethod = function() {
    // 静态方法
}

function Ninja() {
    // 构造方法
}

Ninja.prototype = new Person()
Ninja.prototype.constructor = Ninja
```