# 函数 :100:
[快速回首页](/)

在Javascript的世界里，函数是一等公民，何为一等公民？即：函数可以和其他类型的变量一样：

- 通过字面声明
- 被引用
- 作为参数传递
- 作为返回值

## 函数声明与函数表达式
### 声明
```javascript
function functionName(arg1, arg2, ...) {
    // function logic
}
```

### 表达式
```javascript
let functionName = function(arg1, arg2, ...) {
    // function logic
}
```
::: warning 函数参数
函数的所有参数可以通过arguements获取
arguments并不是真正的数组类型，它仅仅是和数组一样具有length属性及可以通过下标访问而已
:::

## 函数调用
### 普通调用
```javascript
functionName(实参1, 实参2, ...)
```
### 立即函数
```javascript
(function(arg1, arg2, ...) {
    // function logic
})(实参1, 实参2, ...)
```
::: warning 注意
function前后的括号()必不可少，否则会被认为是函数声明，且函数声明会因为缺少函数名称而报错
:::

## 箭头函数
### 定义
```javascript
() => {
    // none arg
    // function logic
}

onlyArg => {
    // only one arg
    // function logic
}

(arg1, arg2) => {
    // more than one arg
    // function logic
}

```
::: warning 注意
如果箭头函数没有参数或者多于一个参数，都必须带上括号
:::

## 标识符提升
函数声明会被提升的文件开头位置
函数表达式和箭头函数均不会被提升

## 剩余参数
```javascript
function demoFunc(firstArg, ...restArgs) {
    // firstArg: 调用时传递的第一个参数
    // restArgs: 调用时传递的第二个及以后的参数，这是一个真正的数组对象
}
```
## 函数进阶
### this
this指向函数执行时的上下文，即：函数调用者关联的对象
函数的调用方式对函数行为有很大影响

### 箭头函数对this的影响
```javascript
let obj1 = {name: 'fyj0846', setName: function(newName) {this.name = newName}}
obj1.setName('fll1') // 此时setName执行上下文为obj1

let obj2 = {name: 'fyj0846', setName: newName => {this.name = newName}}
obj2.setName('fll2') // 此时setName执行上下文为函数定义时的上下文，本例子中为window

let obj3 = {
    name: 'parent0846',
    setName: obj1.setName
}
obj3.setName('parentFll') // 此时setName执行上下文为obj3

let obj4 = {
    name: 'parent0846-2'
    setName: obj2.setName
}
obj4.setName('parentFll-2') //此时，setName执行上下文为window，因为箭头函数的上下文取决于定义时，而obj2.setName定义时的上下文为window

let obj5 = {
    name: 'outer',
    createFunction: function() {
        return (newName) => {
            this.name = newName
        }
    }
}
mySetName = obj5.createFunction()  // 箭头函数定义时的上下文为obj5
mySetName('updateOuter')  //此时,mySetName的执行上下文为obj5，因为箭头函数定义在obj5中
```

### 构造函数调用
通过new运算符调用函数称为构造函数调用
执行逻辑为：
- 创建一个对象
- 把这个对象作为this传递给函数，成为函数执行的上下文
- 该对象作为new运算符的返回值

### apply与call
这是显式绑定上下文的两个方法，所有函数都有这两个方法
两者的区别仅在传递参数的方式上
```javascript
functionName.apply(target, arrayTypeArgs)   // target为需要显式绑定为this的对象
functionName.call(target, arg1, arg2, ...)  // target为需要显式绑定为this的对象
```
::: warning
apply -> a -> array：该方法以数组形式传递参数
:::

# 闭包
在外部函数中声明内部函数时，创建了一个闭包。闭包不仅包含内部函数声明，还包含了此时作用域内的所有变量。由此使得内部函数执行时，可以引用到所依赖的全部变量。
使用闭包，使得外部函数内的变量得以保存且每次调用外部函数都能不受调用次数限制的构造出独立的私有变量空间。每个变量空间相互独立，天然安全。
```javascript
let outVar1
let outVar2
function outFunction () {
    let innerVar = 'null'
    let innerFunction = function(newValue) {
        console.log('before set ', innerVar)
        innerVar = newValue
        console.log('after set ',innerVar)
    }
    return innerFunction
}
outVar1 = outFunction()
outVar1('out1')
outVar2 = outFunction()
outVar2('out2')
```
### 闭包的应用
```javascript
function Ninja() {
    var feints = 0
    this.getFeints = function() {
        return feints
    }
    this.setFeints = function() {
        feints++
    }
}
let ninja = new Ninja()
```
::: warning
执行外部函数时，将内部声明的函数暴露到外部，由外部变量应用
正常情况下outFunction执行完毕之后，函数栈出栈资源被回收，但因为此时外部引用了内部函数，而内部函数存在对内部变量的引用，因此资源得以保留
:::

## 生成器函数
在function关键字后面增加*来定义一个生成器函数
生成器函数使用yield关键字进行异步调用，yield关键字将会让渡cpu使用权等待下一次调用
```javascript
function * generatorFunction(args) {
    // function logic
    let returnN = yield aPromiseFunction(args)
}
```
调用生成器函数并不会真正执行生成器函数逻辑，而是返回一个迭代器对象
通过调用迭代器对象的next方法从迭代器中获得一个返回值
通过for...of遍历迭代器
```javascript
    yield firstFunction(args)  // 第一次调用next()：完成firstFunction(args)并将yield右边的表达值返回
    yield secondFunction()  // 第二次调用next(), 从上次让渡的yield之后继续执行，直到碰到下一个yield
```
对于普通函数，执行结束后函数上下文被推出执行栈并销毁。但对于生成器函数并不会，因为栈内调用池的上下文中有一个迭代器引用着生成器函数，和闭包类似的逻辑，使得资源被保留，直至迭代器被释放
通过next()调用，生成器函数并不会构造新的函数上下文而是通过迭代器引用之前的上下文并激活，将该上下文重新入栈并执行
关于传参：可以通过next(arg)向生成器函数传递参数，但第一次调用next的参数会被忽略，第二次及之后的next传参会作为上一次yield的结果带入后面的逻辑中，此时，如果next未传递参数，则认为是undefined

```javascript
function* testGenerator() {
    var first = yield "hello"
    var second =  yield (first + "world")
}
var it = testGenerator()
console.log(it.next())  // {value: "hello"}
console.log(it.next())  // {value: "undefinedworld"}
var it2 = testGenerator()
console.log(it.next())  // {value: "hello"}
console.log(it2.next('xx'))  // {value: "xxworld"}
```