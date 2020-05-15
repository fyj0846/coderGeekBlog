## &javascript中的类型
### 基本类型

| 名称      | 分类         | 子类型 |
| --------- | :----------- | ------ |
| null      | 简单基本类型 | 无     |
| undefined | 简单基本类型 | 无     |
| boolean   | 简单基本类型 | 无     |
| number    | 简单基本类型 | 无     |
| string    | 简单基本类型 | 无     |
| symbol    | 简单基本类型 | 无     |
| object    | 复杂基本类型 | 有     |

* 除null之外，都可以通过typeof来判断其基础类型

```js
typeof undefined === 'undefined'
typeof true === 'boolean'
typeof 42 === 'number'
typeof '42' === 'string'
typeof {} === 'object'
typeof Symbol() === 'symbol'
```

* 对于null类型的判断，typeof会将其误判为object

```js
typeof null === 'null'  // 失效判断

var a = null
(!a && typeof a === 'object')  // 有效判断
```

* 对于函数的判断，typeof会将其判定为function

```js
var f = function() {}
typeof f === 'function'  // 有效判断
```

* js中变量没有类型，但值有类型

### 复杂基本类型

| 名称      | 类型 |      |
| --------- | ---- | ---- |
| String    |      |      |
| Number    |      |      |
| Bollean   |      |      |
| Function  |      |      |
| Array     |      |      |
| Date      |      |      |
| RegExp    |      |      |
| Exception |      |      |