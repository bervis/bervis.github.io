import{_ as s,c as n,o as a,a as p}from"./app.ba00ec8b.js";const D=JSON.parse('{"title":"Middleware\u4E2D\u95F4\u4EF6","description":"","frontmatter":{},"headers":[{"level":2,"title":"Middleware\u4E2D\u95F4\u4EF6","slug":"middleware\u4E2D\u95F4\u4EF6"},{"level":2,"title":"application.js","slug":"application-js"},{"level":3,"title":"use","slug":"use"},{"level":3,"title":"listen","slug":"listen"},{"level":3,"title":"koa-compose","slug":"koa-compose"},{"level":2,"title":"\u5206\u6790\u63A5\u53E3\u8BF7\u6C42","slug":"\u5206\u6790\u63A5\u53E3\u8BF7\u6C42"}],"relativePath":"index.md"}'),e={name:"index.md"},l=p(`<h2 id="middleware\u4E2D\u95F4\u4EF6" tabindex="-1">Middleware\u4E2D\u95F4\u4EF6 <a class="header-anchor" href="#middleware\u4E2D\u95F4\u4EF6" aria-hidden="true">#</a></h2><p>\u4E2D\u95F4\u4EF6\u662FKoa\u4E00\u4E2A\u975E\u5E38\u91CD\u8981\u7684\u4E00\u4E2A\u6982\u5FF5\uFF0C\u5229\u7528\u4E2D\u95F4\u4EF6\uFF0C\u53EF\u4EE5\u5F88\u65B9\u4FBF\u7684\u5904\u7406\u7528\u6237\u7684\u8BF7\u6C42\u3002</p><p>\u6211\u4EEC\u5148\u770B\u4E0B\u8FD9\u4E2A\u6D0B\u8471\u6A21\u578B\u56FE <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d4f7985bbd24a25b7079dcf9f169f8f~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>\u770B\u5B98\u7F51\u4F8B\u5B50\u7684\u6267\u884C\u7ED3\u679C</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">const Koa = require(&#39;koa&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">const app = new Koa()</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// x-response-time</span></span>
<span class="line"><span style="color:#A6ACCD;">app.use(async (ctx, next) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  const start = Date.now()</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(1)</span></span>
<span class="line"><span style="color:#A6ACCD;">  await next()</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(2)</span></span>
<span class="line"><span style="color:#A6ACCD;">  const ms = Date.now() - start</span></span>
<span class="line"><span style="color:#A6ACCD;">  ctx.set(&#39;X-Response-Time&#39;, \`\${ms}ms\`)</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// logger</span></span>
<span class="line"><span style="color:#A6ACCD;">app.use(async (ctx, next) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  const start = Date.now()</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(3)</span></span>
<span class="line"><span style="color:#A6ACCD;">  await next()</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(4)</span></span>
<span class="line"><span style="color:#A6ACCD;">  const ms = Date.now() - start</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(\`\${ctx.method} \${ctx.url} - \${ms}\`)</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// response</span></span>
<span class="line"><span style="color:#A6ACCD;">app.use(async ctx =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  ctx.body = &#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(5)</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">app.listen(3000)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u4E00\u4E2A\u8BF7\u6C42\u8FC7\u6765\uFF0C\u8FD9\u4E2A\u4F8B\u5B50\u7684\u6267\u884C\u7ED3\u679C\u4E3A</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">1</span></span>
<span class="line"><span style="color:#A6ACCD;">3</span></span>
<span class="line"><span style="color:#A6ACCD;">5</span></span>
<span class="line"><span style="color:#A6ACCD;">4</span></span>
<span class="line"><span style="color:#A6ACCD;">2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u770B\u4F8B\u5B50\u548C\u6D0B\u8471\u6A21\u578B\u56FE\u8FD8\u662F\u5F88\u96BE\u7406\u89E3\uFF0C\u6211\u4EEC\u6700\u597D\u53EF\u4EE5\u53BB\u770B\u770B\u6E90\u7801\uFF0C\u5206\u6790\u4E2D\u95F4\u4EF6\u6267\u884C\u7684\u8FC7\u7A0B</p><p>\u9996\u5148\u6253\u5F00\u6E90\u7801\uFF0C\u6211\u4EEC\u9996\u5148\u770B\u5230package.json\u6587\u4EF6\u7684main\u6307\u5411lib/application.js\u3002\u6211\u4EEC\u53EF\u4EE5\u53BB\u770B\u4E0Bapplication\u8FD9\u4E2A\u7C7B\u90FD\u6709\u54EA\u4E9B\u65B9\u6CD5</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d35a67b1c1f4c619b6777bc6a583e4f~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><h2 id="application-js" tabindex="-1">application.js <a class="header-anchor" href="#application-js" aria-hidden="true">#</a></h2><p>\u6211\u4EEC\u5148\u628A\u65B9\u6CD5\u6536\u8D77\u6765\uFF0C\u770B\u4E0B\u90FD\u6709\u54EA\u4E9B\u65B9\u6CD5</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1046c33385bd4046a5a01a8cc967af05~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"> \u5176\u4E2D\u6211\u4EEC\u7684\u4F8B\u5B50\u5F53\u4E2D\u4F7F\u7528\u4E86application\u5B9E\u4F8B\u4E2D\u7684<strong>use</strong>\u65B9\u6CD5\u548C<strong>listen</strong>\u65B9\u6CD5</p><h3 id="use" tabindex="-1">use <a class="header-anchor" href="#use" aria-hidden="true">#</a></h3><p>\u6211\u4EEC\u628Ause\u65B9\u6CD5\u5C55\u5F00</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">  use (fn) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (typeof fn !== &#39;function&#39;) throw new TypeError(&#39;middleware must be a function!&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    debug(&#39;use %s&#39;, fn._name || fn.name || &#39;-&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.middleware.push(fn)</span></span>
<span class="line"><span style="color:#A6ACCD;">    return this</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u53EF\u4EE5\u770B\u5230use\u65B9\u6CD5\u5F88\u7B80\u5355\uFF0C\u4EC5\u4EC5\u662F\u5C06\u4E2D\u95F4\u4EF6\u7684\u51FD\u6570push\u5230middleware\u6570\u7EC4\u4E2D</p><h3 id="listen" tabindex="-1">listen <a class="header-anchor" href="#listen" aria-hidden="true">#</a></h3><p>\u6211\u4EEC\u518D\u770B\u4E0Blisten\u65B9\u6CD5</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">  listen (...args) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    debug(&#39;listen&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    const server = http.createServer(this.callback())</span></span>
<span class="line"><span style="color:#A6ACCD;">    return server.listen(...args)</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>http\u662Fnode\u7684\u5185\u7F6E\u6A21\u5757\uFF0C\u6211\u4EEC\u77E5\u9053\u7528\u6CD5\u4E3A</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">const server = http.createServer((req, res) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">});</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u6240\u4EE5this.callback()\u4E00\u5B9A\u662F\u8FD4\u56DE\u4E00\u4E2A\u6709req\u548Cres\u4E24\u4E2A\u53C2\u6570\u7684\u56DE\u8C03\u51FD\u6570</p><p>\u6211\u4EEC\u518D\u53BB\u770B\u4E0Bcallback\u65B9\u6CD5\u548ChandleRequest\u65B9\u6CD5</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">  callback () {</span></span>
<span class="line"><span style="color:#A6ACCD;">    const fn = compose(this.middleware)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    if (!this.listenerCount(&#39;error&#39;)) this.on(&#39;error&#39;, this.onerror)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    const handleRequest = (req, res) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      const ctx = this.createContext(req, res)</span></span>
<span class="line"><span style="color:#A6ACCD;">      return this.handleRequest(ctx, fn)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    return handleRequest</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  handleRequest (ctx, fnMiddleware) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    const res = ctx.res</span></span>
<span class="line"><span style="color:#A6ACCD;">    res.statusCode = 404</span></span>
<span class="line"><span style="color:#A6ACCD;">    const onerror = err =&gt; ctx.onerror(err)</span></span>
<span class="line"><span style="color:#A6ACCD;">    const handleResponse = () =&gt; respond(ctx)</span></span>
<span class="line"><span style="color:#A6ACCD;">    onFinished(res, onerror)</span></span>
<span class="line"><span style="color:#A6ACCD;">    return fnMiddleware(ctx).then(handleResponse).catch(onerror)</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u9996\u5148\u6211\u4EEC\u770B\u5230\u4E00\u4E2Acompose\u8FD9\u4E2A\u65B9\u6CD5\uFF0C\u8FD9\u4E2A\u662F\u4F7F\u7528\u4E86\u4E00\u4E2Akoa-compose\u7C7B\u5E93\u3002</p><p>\u6211\u4EEC\u63D0\u524D\u8BF4\u4E0Bcompose\u7684\u4F5C\u7528: compose\u662F\u5C06\u591A\u4E2A\u51FD\u6570\u5408\u5E76\u6210\u4E00\u4E2A\u51FD\u6570\uFF08eg: a() + b() +c()=&gt; a(b(c()))\uFF09</p><h3 id="koa-compose" tabindex="-1">koa-compose <a class="header-anchor" href="#koa-compose" aria-hidden="true">#</a></h3><p>\u6211\u4EEC\u5206\u6790\u4E0Bkoa-compose\u6E90\u7801</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">function compose (middleware) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (!Array.isArray(middleware)) throw new TypeError(&#39;Middleware stack must be an array!&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">  for (const fn of middleware) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (typeof fn !== &#39;function&#39;) throw new TypeError(&#39;Middleware must be composed of functions!&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  return function (context, next) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // last called middleware #</span></span>
<span class="line"><span style="color:#A6ACCD;">    let index = -1</span></span>
<span class="line"><span style="color:#A6ACCD;">    return dispatch(0)</span></span>
<span class="line"><span style="color:#A6ACCD;">    function dispatch (i) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (i &lt;= index) return Promise.reject(new Error(&#39;next() called multiple times&#39;))</span></span>
<span class="line"><span style="color:#A6ACCD;">      index = i</span></span>
<span class="line"><span style="color:#A6ACCD;">      let fn = middleware[i]</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (i === middleware.length) fn = next</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (!fn) return Promise.resolve()</span></span>
<span class="line"><span style="color:#A6ACCD;">      try {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));</span></span>
<span class="line"><span style="color:#A6ACCD;">      } catch (err) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return Promise.reject(err)</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5728handleRequest\u65B9\u6CD5\u6211\u4EEC\u8C03\u7528\u4E86fnMiddleware\u65B9\u6CD5\uFF0C\u5373compose\u8FD4\u56DE\u7684\u51FD\u6570 \u81EA\u52A8\u8C03\u7528dispatch(0) \u6211\u4EEC\u91CD\u70B9\u5206\u6790\u8FD9\u884C\u4EE3\u7801</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5728\u7B2Cn\u4E2A\u4E2D\u95F4\u4EF6\u51FD\u6570\u91CC\u9762\u8C03\u7528next()\u51FD\u6570\u65F6, next\u4F1A\u6307\u5411dispatch(n + 1)\uFF0C, \u6267\u884Cdispatch(n + 1)\u51FD\u6570\u4F1A\u53BB\u6267\u884Cn + 1\u4E2A\u4E2D\u95F4\u4EF6\u51FD\u6570</p><h2 id="\u5206\u6790\u63A5\u53E3\u8BF7\u6C42" tabindex="-1">\u5206\u6790\u63A5\u53E3\u8BF7\u6C42 <a class="header-anchor" href="#\u5206\u6790\u63A5\u53E3\u8BF7\u6C42" aria-hidden="true">#</a></h2><p>\u8FC4\u4ECA\u4E3A\u6B62\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5206\u6790\u4E00\u4E2A\u63A5\u53E3\u8BF7\u6C42\u7684\u8FC7\u7A0B\u3002</p><p>\u9996\u5148\u4F1A\u8D70\u5230callback\u91CC\u9762\u7684handleRequest, handleRequest\u521B\u5EFA\u4E86\u4E00\u4E2Actx,\u5F15\u7528\u4E86compose\u51FD\u6570\u5408\u5E76\u4E2D\u95F4\u4EF6\u540E\u7684\u4E00\u4E2A\u51FD\u6570\u4F20\u9012\u7ED9this.handleRequest</p><p>\u6267\u884CfnMiddleware(ctx)\u65F6\u5019\u4F1A\u6267\u884Ccompose\u8FD4\u56DE\u7684\u51FD\u6570\uFF0C\u6211\u4EEC\u53EF\u4EE5\u7B80\u5355\u5206\u6790\u4E00\u4E0Bdispatch\u51FD\u6570 \u5047\u5982\u6211\u4EEC\u6709\u4E2D\u95F4\u4EF6\u51FD\u6570fn0, fn1, fn2\u3002</p><p>\u4E00\u4E2A\u8BF7\u6C42\u8FC7\u6765\u8C03\u7528fnMiddleware(ctx),\u4F1A\u8C03\u7528dispatch(0),dispatch(0)\u6267\u884C\u65F6\u4F1A\u4ECE\u6570\u7EC4\u4E2D\u53D6\u5230fn0,\u7136\u540E\u6267\u884Cfn0,fn0\u7684next\u53C2\u6570\u5B9E\u8D28\u4E0A\u5C31\u662Fdispatch(1)\u3002\u5F53\u6211\u4EEC\u5728fn0\u4E2D\u95F4\u4EF6\u51FD\u6570\u4E2D\u8C03\u7528next()\u65F6\uFF0C\u5B9E\u9645\u4E0A\u5C31\u662F\u5728\u8C03\u7528dispatch(1)\u3002</p><p>\u540C\u7406: dispatch(1)\u6267\u884C\u65F6\u4F1A\u4ECE\u6570\u7EC4\u4E2D\u53D6\u5230fn1,\u7136\u540E\u6267\u884Cfn1, fn1\u7684next\u53C2\u6570\u5B9E\u8D28\u4E0A\u5C31\u662Fdispatch(2)\u3002\u5F53\u6211\u4EEC\u5728fn1\u4E2D\u95F4\u4EF6\u51FD\u6570\u4E2D\u8C03\u7528next()\u65F6\uFF0C\u5B9E\u9645\u4E0A\u5C31\u662F\u5728\u8C03\u7528dispatch(1)...</p><p>\u6211\u4EEC\u7406\u89E3\u4E86\u8FD9\u4E2A\u6267\u884C\u7684\u8FC7\u7A0B\uFF0C\u5148\u5FFD\u7565ctx, \u6211\u4EEC\u53EF\u4EE5\u5C1D\u8BD5\u4E0D\u7528\u4E2D\u95F4\u4EF6\u65F6\uFF0C\u8FD9\u4E2A\u4F8B\u5B50\u4F1A\u662F\u4E00\u4E2A\u4EC0\u4E48\u6837\u5B50\u3002</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">const http = require(&#39;http&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const xResponseTime = async (ctx, next) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(1)</span></span>
<span class="line"><span style="color:#A6ACCD;">  await next(ctx, response)</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(2)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">const logger = async (ctx, next) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(3)</span></span>
<span class="line"><span style="color:#A6ACCD;">  await next(ctx, undefined)</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(4)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">const response = async (ctx, next) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(5)</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (!next) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return Promise.reslove()</span></span>
<span class="line"><span style="color:#A6ACCD;">  } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">    await next(ctx, undefined)</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">http.createServer(async (req, res) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  const ctx = {</span></span>
<span class="line"><span style="color:#A6ACCD;">    req: req,</span></span>
<span class="line"><span style="color:#A6ACCD;">    res: res,</span></span>
<span class="line"><span style="color:#A6ACCD;">    app: {}</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  await xResponseTime(ctx, logger)</span></span>
<span class="line"><span style="color:#A6ACCD;">}).listen(3000)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,41),o=[l];function c(t,r,i,A,C,d){return a(),n("div",null,o)}var h=s(e,[["render",c]]);export{D as __pageData,h as default};
