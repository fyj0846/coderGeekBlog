# this绑定

## 判断this绑定情况
- 函数是否存在new调用，如果有new调用，则this绑定的是新创建出来的对象
- 函数是否通过call/app/bind进行显示绑定，如果是的话，this绑定的是指定的对象
- 函数是否在某个上下文中调用，如果是的话，this绑定的是上下文的对象
- 如果没有以上情况，则是默认绑定，严格模式下绑定到undefined,非严格模式绑定到全局对象

### 忽略默认绑定规则
创建一个DMZ对象，作为绑定对象
```
omega = Object.create(null)
```

## 箭头函数的判断
以上规则不适用箭头函数
- 箭头函数会根据词法作用域来决定this指向，即捕获外层函数的this绑定
- 这种指向不受其他任何绑定规则影响