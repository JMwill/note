# JavaScript 状态机

首先介绍以下概念，什么是**领域模型**？

领域模型代表着需要在软件中建模与某个领域知识、影响或者活动有关并且在现实世界中有意义的概念。领域模型可以代表真实世界的对象，或者是更加抽象的事物，如会议、事件

## 有限状态机

有限状态机是一个抽象的机器并且在**任何**时刻都对应着有限数量的状态, 状态机可以回应外部输入从一个状态转移到另一个状态，这叫做状态的转移。因此一个状态机由三个部分组成：

- 已经定义好的一系列状态
- 状态机的初始状态
- 以及状态转移执行的各种条件

在 JavaScript 中如何区分普通对象与状态机？可以依据以下三点：

- 首先，状态机是**一个**具有状态的概念，且总是处于有限状态中的一个
- 其次，状态机会正式定义一个初始状态，并允许在状态之间切换
- 第三， 状态机在响应事件之间进行状态间切换

直接将状态对应的函数编写在对象中是最低效率的，为了提高状态机编写的效率，可以使用一张状态转换表最左侧为当前状态，表格的头部为将要到达的状态，而两者相交的形成的格子则用于存放执行函数

假设有一个账户对应的状态表如下：

|      | open | held | closed |
-------|------|--------|------|
| open | deposit, withdraw | placeHold | close |
| held | removeHold | deposit | close |
|closed | reopen|

```js
const STATES = Symbol('states')
const STARTING_STATE = Symbol('starting-state')

const Account = {
  balance: 0,
  STARTING_STATE: 'open',
  STATES: {
    open: {
      open: {
        deposit(amount) { this.balance = this.balance + amount },
        withdraw(amount) { this.balance = this.balance - amount}
      },
      held: {
        placeHold() {}
      },
      closed: {
        close() {}
      },
    },
    held: {
      open:{
        removeHold() {}
      },
      held: {
        deposit(amount) { this.balance = this.balance + amount},
      },
      closed: {
        close() {}
      }
    },
    closed: {
      open: {
        reopen() {},
      }
    }
  }
}
```

上面是状态表的实现

```js
const STATE = Symbol('state')
const STATES = Symbol('states')

// 将 open 状态下可以执行的方法聚合在一起
const open = {
  deposit(amount) {},
  withdraw(amount) {},
  placeHold() {
    this[STATE] = this[STATES].hold
  },
  close() {} 
}

const held = {
  removeHold() {
    this[STATE] = this[STATES].open
  },
  deposit(amount) {},
  close() {},
}

const closed() {
  reopen() {
    this[STATE] = this[STATES].open
  }
}

// 实际再实现 Account 对象，同时状态保存由字符串改为了对象
const account = {
  balance: 0,
  [STATE]: open,
  [STATES]: {open, hald, closed},

  deposit(...args) { return this[STATE].deposit.apply(this, args) },
  withdraw (...args) { return this[STATE].withdraw.apply(this, args); },
  close (...args) { return this[STATE].close.apply(this, args); },
  placeHold (...args) { return this[STATE].placeHold.apply(this, args); },
  removeHold (...args) { return this[STATE].removeHold.apply(this, args); },
  reopen (...args) { return this[STATE].reopen.apply(this, args); }
}

// 上面的 account 实现无法清晰地看出状态间的转移，可以通过实现
// 一个 transitionsTo 装饰器来实现
const STATE = Symbol('state')
const STATES = Symbol('states')

function transitionsTo(stateName, fn) {
  return function(...args) {
    const returnValue = fn.apply(this, args) {
      this[STATE] = this[STATES][stateName]
      return returnValue
    }
  }
}

const open = {
  deposit(amount) { this.balance = this.balance + amount }
  withdraw(amount) { this.balance = this.balance - amount }
  placeHold: transitionsTo('held', () => undefined)
  close: transitionsTo('closed', function() {
    if (this.balance > 0) {

    }
  })
}

// ... 后续就和上面一样
// 现在可以清晰地看到哪个方法属于哪种状态，以及可以转化成哪种状态
```

为了更好地管理状态机，我们会更希望将描述编译为状态机

```js
const STATES = Symbol('states')
const STARTING_STATE = Symbol('starting-state')


function transitionsTo(stateName, fn) {
  return function(...args) {
    const returnValue = fn.apply(this, args) {
      this[STATE] = this[STATES][stateName]
      return returnValue
    }
  }
}

const account = StateMachine({
  balance: 0,
  [STARTING_STATE]: 'open',
  [STATES]: {
    open: {
      deposit(amount) { this.balance = this.balance + amount }
      withdraw(amount) { this.balance = this.balance - amount }
      placeHold: transitionsTo('held', () => undefined)
      close: transitionsTo('closed', function() {
        if (this.balance > 0) {

        }
      })
    }
  },
  // 后续实现同前面一样
})

// StateMachine 实现
const RESERVED = [STARTING_STATE, STATES]

function StateMachine(description) {
  const machine = {}

  // 管理所有的初始状态 以及／或者 方法
  const propertiesAndMethods = Object.keys(description).filter(property => !RESERVED.includes(property))
  for (const property of propertiesAndMethods) {
    machine[property] = description[property]
  }

  // 接着是它的 states
  machine[STATES] = description[STATES]

  // 收集所有的事件处理程序
  const eventNames = Object.entries(description[STATES]).reduce(
    (eventNames, [state, stateDescription]) => {
      const eventNamesForThisState = Object.keys(stateDescription)

      for (const eventName of eventNamesForThisState) {
        eventNames.add(eventName)
      }

      return eventNames
    },
    new Set() // 初始是一个空的集合
  )

  // 定义一个委托方法
  for (const eventName of eventNames) {
    machine[eventName] = function(...args) {
      const handler = this[STATE][eventName]
      if (typeof handler === 'function') {
        return handler.apply(this, args)
      } else {
        throw `invalid event ${eventName}`
      }
    }
  }

  machine[STATE] = description[STATES][description[STARTING_STATE]]

  return machine
}
```