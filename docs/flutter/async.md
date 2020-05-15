# 异步编程
[快速回首页](/)

在Flutter的网络世界里，异步是用Future来修饰的，并运行在eventLoop中。

当你启动一个 Flutter（或任何 Dart）应用时，将创建并启动一个新的线程进程（在 Dart 中线程为「Isolate」）。该线程将是你在整个应用中的主线程。此线程创建后，Dart会自动初始化2个FIFO（先进先出）队列（「MicroTask Queue」和 「Event Queue」）。并且当队列创建完成后，执行应用的main()方法，

## 事件循环
启动事件循环。
在主线程的整个生命周期中，一个被称为事件循环的规则决定你代码的执行方式及顺序：
- Event Queue
- Microtask Queue 

事件循环是一种无限循环，在每个时钟周期内，如果没有其他 Dart 代码执行，则执行以下操作：
````javascript
void eventLoop(){
    while (microTaskQueue.isNotEmpty()){
        fetchFirstMicroTaskFromQueue();
        executeThisMicroTask();
    }

    if (eventQueue.isNotEmpty()){
        fetchFirstEventFromQueue();
        executeThisEventRelatedCode();
    }
}
````

### MicroTask 队列
MicroTask 队列用于非常简短且需要异步执行的内部动作，这些动作需要在其他事情完成之后并在将执行权送还给 Event 队列之前运行。
即：事件执行过程中（某个Future定义的逻辑）派发一些MicroTask任务作为该事件结束后且下一个事件开始处理前的执行逻辑。
因为microTask的执行优先级高于事件队列，如果microTask中定义了一些耗时操作，势必将影响事件队列（比如渲染任务，响应任务等）的及时响应。因此，一般情况下通过合理使用事件队列即可达到业务目的，避免滥用microTask。

### Event 队列
Event 队列适用于以下参考模型
外部事件如
- I/O
- 手势
- 绘图
- 计时器
- 流
- Future

事实上，每次外部事件被触发时，要执行的代码都会加入到 Event 队列中。一旦没有任何micro task运行，事件循环将取出 Event 队列中的第一项并执行。
值得注意的是，Future 操作也通过 Event 队列处理。

#### Future
Future 是一个异步执行并且在未来的某一个时刻完成（或失败）的任务。

当你实例化一个 Future 时，该 Future 的一个实例被创建并记录在由 Dart 管理的内部结构中。
- 如果非delayed Future，则此 Future 关联的代码直接加入到 Event 队列中。
- 如果是delayed Future，则将在指定时间后加入到Event队列中。

Future被妥善加入队列后，该 future实例返回一个状态（= incomplete），主线程将继续执行Future之后的下一个代码。

当事件队列中该Future被获取执行时，Future引用的代码将像其他任何Event一样执行。当该代码将被执行并将完成（或失败）时，then() 或 catchError() 方法将直接被触发。

### Async 方法
当你使用 async 关键字作为方法声明的后缀时，Dart 会将其理解为该方法的返回值是一个 Future。它同步执行该方法的代码直到第一个 await 关键字，然后它暂停该方法其他部分的执行；一旦由 await 关键字引用的 Future 执行完成，下一行代码将立即执行。
await返回的Future将加入事件队列，方法内的后续逻辑暂停了执行。但整个应用还是按照事件循环的运作模式并未被阻塞。

```javascript
void method1(){
  List<String> myArray = <String>['a','b','c'];
  print('before loop');
  myArray.forEach((String value) async {
    await delayedPrint(value);
  });
  print('end of loop');
}

void method2() async {
  List<String> myArray = <String>['a','b','c'];
  print('before loop');
  for(int i=0; i<myArray.length; i++) {
    await delayedPrint(myArray[i]);
  }
  print('end of loop');
}

Future<void> delayedPrint(String value) async {
  await Future.delayed(Duration(seconds: 1));
  print('delayedPrint: $value');
}
```
