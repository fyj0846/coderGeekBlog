# 正则表达式
## 捕获匹配片段
```javascript
var testStr = "transform:translateX(10px);transform:translateY(15px);transform:translateX(20px);transform:translateY(30px);"
var match = testStr.match(/translateX\(([^\)]+)\);\w+:translateY\(([^\)]+)\)/)
// match: 只有一个实例被匹配，返回匹配的整个内容
// match[0]: "translateX(10px);transform:translateY(15px)" match[0]为完整匹配内容
// match[1]: "10px" match[1]为第1个匹配组的匹配结果 
// match[2]: "15px" match[2]为第1个匹配组的匹配结果 

```
## 反向应用
```regexp
<(\w+)>(.+)<\/\1>
```