## Middleware中间件 
中间件是Koa一个非常重要的一个概念，利用中间件，可以很方便的处理用户的请求。

我们先看下这个洋葱模型图
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d4f7985bbd24a25b7079dcf9f169f8f~tplv-k3u1fbpfcp-watermark.image?)

看官网例子的执行结果
```
const Koa = require('koa')
const app = new Koa()

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now()
  console.log(1)
  await next()
  console.log(2)
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

// logger
app.use(async (ctx, next) => {
  const start = Date.now()
  console.log(3)
  await next()
  console.log(4)
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

// response
app.use(async ctx => {
  ctx.body = 'Hello World'
  console.log(5)
})

app.listen(3000)

```
一个请求过来，这个例子的执行结果为

```
1
3
5
4
2
```
看例子和洋葱模型图还是很难理解，我们最好可以去看看源码，分析中间件执行的过程

首先打开源码，我们首先看到package.json文件的main指向lib/application.js。我们可以去看下application这个类都有哪些方法

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d35a67b1c1f4c619b6777bc6a583e4f~tplv-k3u1fbpfcp-watermark.image?)
## application.js
我们先把方法收起来，看下都有哪些方法

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1046c33385bd4046a5a01a8cc967af05~tplv-k3u1fbpfcp-watermark.image?)
其中我们的例子当中使用了application实例中的**use**方法和**listen**方法
### use
我们把use方法展开
```
  use (fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!')
    debug('use %s', fn._name || fn.name || '-')
    this.middleware.push(fn)
    return this
  }
```
可以看到use方法很简单，仅仅是将中间件的函数push到middleware数组中

### listen
我们再看下listen方法

```
  listen (...args) {
    debug('listen')
    const server = http.createServer(this.callback())
    return server.listen(...args)
  }
```
http是node的内置模块，我们知道用法为

```
const server = http.createServer((req, res) => {
});
```
所以this.callback()一定是返回一个有req和res两个参数的回调函数

我们再去看下callback方法和handleRequest方法
```
  callback () {
    const fn = compose(this.middleware)

    if (!this.listenerCount('error')) this.on('error', this.onerror)

    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res)
      return this.handleRequest(ctx, fn)
    }

    return handleRequest
  }
  
  handleRequest (ctx, fnMiddleware) {
    const res = ctx.res
    res.statusCode = 404
    const onerror = err => ctx.onerror(err)
    const handleResponse = () => respond(ctx)
    onFinished(res, onerror)
    return fnMiddleware(ctx).then(handleResponse).catch(onerror)
  }
```
首先我们看到一个compose这个方法，这个是使用了一个koa-compose类库。

我们提前说下compose的作用: compose是将多个函数合并成一个函数（eg: a() + b() +c()=> a(b(c()))）

### koa-compose
我们分析下koa-compose源码
```
function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }
  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```
在handleRequest方法我们调用了fnMiddleware方法，即compose返回的函数
自动调用dispatch(0)
我们重点分析这行代码

```
return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
```
在第n个中间件函数里面调用next()函数时, next会指向dispatch(n + 1)，, 执行dispatch(n + 1)函数会去执行n + 1个中间件函数


## 分析接口请求
迄今为止，我们可以分析一个接口请求的过程。

首先会走到callback里面的handleRequest, handleRequest创建了一个ctx,引用了compose函数合并中间件后的一个函数传递给this.handleRequest

执行fnMiddleware(ctx)时候会执行compose返回的函数，我们可以简单分析一下dispatch函数
假如我们有中间件函数fn0, fn1, fn2。

一个请求过来调用fnMiddleware(ctx),会调用dispatch(0),dispatch(0)执行时会从数组中取到fn0,然后执行fn0,fn0的next参数实质上就是dispatch(1)。当我们在fn0中间件函数中调用next()时，实际上就是在调用dispatch(1)。

同理: dispatch(1)执行时会从数组中取到fn1,然后执行fn1, fn1的next参数实质上就是dispatch(2)。当我们在fn1中间件函数中调用next()时，实际上就是在调用dispatch(1)...

我们理解了这个执行的过程，先忽略ctx, 我们可以尝试不用中间件时，这个例子会是一个什么样子。


```
const http = require('http')

const xResponseTime = async (ctx, next) => {
  console.log(1)
  await next(ctx, response)
  console.log(2)
}
const logger = async (ctx, next) => {
  console.log(3)
  await next(ctx, undefined)
  console.log(4)
}
const response = async (ctx, next) => {
  console.log(5)
  if (!next) {
    return Promise.reslove()
  } else {
    await next(ctx, undefined)
  }
}

http.createServer(async (req, res) => {
  const ctx = {
    req: req,
    res: res,
    app: {}
  }
  await xResponseTime(ctx, logger)
}).listen(3000)

```
