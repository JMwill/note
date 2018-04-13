# 模块化原则

模块化可以作为解决复杂性的答案，而在程序中的复杂性指的一般是：

- 具有非常复杂且有相互关联的排列特点的单元、部分等。
- 这些部分之间是如此的复杂以至于难以理解与处理。

广义上说，当一件事物难以掌握或者完全理解就可以认为它是复杂的。代码的行数是常用的用于描述复杂度的指标，不过可以遇见的是如果一个文件由成千上万行的常量组成，那么它的复杂度其实并不高。相反地，一个文件由几十行代码组成，但是它的接口以及它的实现上具有难以逾越的复杂度的话，一旦加上几个复杂的组件后，那代码库也不会有人想要维护的。

## 单一职责原则

混合了多种职责的代码块

```js
import insane from 'insane'
import mailApi from 'mail-api'
import { mailApiSecret } from './secrets'
function sanitize(template, ...expressions) {
  return template.reduce((result, part, i) =>
    result + insane(expressions[i - 1]) + part
  )
}

export default function send(options, done) {
  const {
    to,
    subject,
    model: { title, body, tags }
  } = options
  const html = sanitize`
    <h1>${ title }</h1>
    <div>${ body }</div>
    <div>
      ${
        tags.map(tag => `${ <span>${ tag }</span> }`)
          .join(' ')
      }
    </div>`
  const client = mailApi({ mailApiSecret })
  client.send({
    from: 'some@javascript.com',
    to,
    subject,
    html,
  }, done)
}
```

将上述代码进行单一职责拆分：

这段代码只关注配置邮件客户端接口对象并传入深思熟虑后的参数并发送邮件，所有的这些关注点都在发送邮件上

```js
import mailApi from 'mail-api'
import { mailApiSecret } from './secrets'
export default function send(options, done) {
  const { to, subject, html } = options
  const client = mailApi({ mailApiSecret })
  client.send({
    from: 'some@javascript.com',
    to,
    subject,
    html,
  }, done)
}
```

只要暴露的接口没有修改，内部可以任意实现。以达到想要的目的

```js
export default function send(options, done) {
  const { to, subject, html } = options
  console.log(`
    Sending email.
    To: ${ to }
    Subject: ${ subject }
    ${ html }`
  )
  done()
}
```

另一份切分后的代码块：

```js
import insane from 'insane'
function sanitize(template, ...expressions) {
  return template.reduce((result, part, i) =>
    result + insane(expressions[i - 1]) + part
  )
}
export default function compile(model) {
  const { title, body, tags } = model
  const html = sanitize`
    <h1>${ title }</h1>
    <div>${ body }</div>
    <div>
      ${
        tags.map(tag => `${ <span>${ tag }</span> }`)
          .join(' ')
      }
    </div>`
  return html
}
```

最后则是专注于将各个部分组合起来的代码块：

```js
import { send } from './email/log-provider'
import { compile } from './templating/static'
export default function send(options, done) {
  const { to, subject, model } = options
  const html = compile(model)
  send({ to, subject, html}, done)
}
```

以上就是单一职责的演示。而除了单一职责以外，还需要应用 “接口优先原则”，这个原则的应用可以先对将要实现的组件进行接口模拟。以便了解想要实现的组件需要具备什么功能。假设需要实现一个 `elasticsearch` 组件，它需要具有一个 `createClient` 的绑定，会返回一个对象，这个对象具有 `client#get` 方法，这个方法会返回一个 Promise 对象。使用情况如下：

```js
import { createClient } from './elasticsearch'
import { elasticsearchHost } from './secrets'

const client = createClient({
  host: elasticsearchHost,
})
client
  .get({
    index: 'blog',
    type: 'articles',
    body: {
      query: {
        match: {
          tags: ['modularity', 'javascript'],
        }
      }
    }
  })
  .then(response => {
    // ...
  })
```

`createClient` 方法会创建到 `elasticsearch` 服务器的连接，`backoff` 设置是否可以用于在一段时间后仍无法建立链接时切换 `backoff` 机制的使用，`optimistic` 设置默认开启，避免连接未创建时进行查询而被拒绝，等到连接建立后才能够执行查询。

遵循 API 优先原则对于了解 API 将会被如何使用是至关重要的。只有当真的需要某个接口时才真的在组件中实现出来，代码永远都应该紧挨着接口

## 找到合适的抽象

在编写代码过程当中，只有当引入抽象层能够减少代码复杂度时，才对已有代码进行抽象，过早的抽象只会增加代码的内部复杂度以及维护成本

## CRUST

深思熟虑的 API 一般都具有以下的这些特征：连贯一致（Consistent）、有弹性（Resilient）、不含糊的（Unambiguous）、简单（Simple）、聚焦小目标（Tiny）

# 设计模块的原则（重要程度高到低）

- 设计合理的 API
- 准确编写如文档或介绍所说的代码实现
- 代码实现需要尽可能简单，越简单越容易引入改变
- 代码实现要尽可能高性能
- 灵活性
