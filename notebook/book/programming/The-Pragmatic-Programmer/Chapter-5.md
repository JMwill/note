# 巜程序员修练之道》

## 第五章 弯曲，或折断

为了赶上变化，我们需要编写尽可能宽松、灵活的代码。

### 解耦与得墨忒耳法则

编写"羞怯"的代码是有益的。但"羞怯"的工作方式有两种： 不向别人暴露你自己，不与太多人打交道。

将代码组织成最小组织单位（模块），并限制组织间的交互，像两个特工之间的关系一样。随后即使某个模块需要替换，对其余模块并不会有影响。

#### 使耦合减至最少

让模块之间相互交互原则上是没有问题的，但是需要注意一个模块与多少其他模块交互，且更重要的是，我们是怎样开始与它们交互的。

对象间直接的横贯关系有可能很快带来依赖关系的组合爆炸，为了使以来关系保持最少， 可以使用得墨忒耳法则设计方法与函数。

#### 函数的得墨忒耳法则

函数的得墨忒耳法则试图使任何给定程序中的模块之间的耦合减至最少。它设法阻止为了获得第三个对象的方法的访问而进入某个对象。通过编写尽可能遵守得墨忒耳法则的"羞怯"代码，可以实现：使模块之间的耦合减至最少。

#### 这真的有关系吗

具有较小响应集的类比具有较大响应集的类更不容易出错。响应集：类的各个方法直接调用的函数的数目。

函数的得墨忒耳法则：某个对象的任何方法都应该只调用属于以下情形的方法：

```
class Demeter {
	private:
		A *a;
		int func();
	public:
		// ...
		void example(B& b);
	void Demeter::example(B& b) {
		C c;
		int f = func(); <-------- 它自身

		b.invert(); <------------ 传入该方法的任何参数

		a = new A();
		a->setActive(); <-------- 它创建的任何对象

		c.print(); <------------- 任何直接持有的组件对象
	}
}
```

因为遵循得墨忒耳法则缩小了调用类中的响应集的规模，结果以这种方式设计的类的错误也往往更少。

使用得墨忒耳法则使代码的适应性更好、更健壮，但是它带来的代价是：作为总承包人，模块必须直接委托并管理全部"子承包人"，而不牵涉到模块的客户。这意味着将会编写大量的包装方法，而这些方法只是把请求转发给委托者，这会带来运行时代价以及空间开销。

对于一些情况，需要违反规范化规则来换取速度时，可以反转得墨忒耳法则，使若干模块紧密耦合，来获得性能的提升，只要对于耦合在一起的模块而言，这是总所周知的和可以接受的，这样的设计就没有问题。

**物理解耦**，随着系统变大，另外有一种相互依赖会变得高度重要。例如：组成系统的文件、目录及库之间的关系有关的各种问题。忽略这些物理设计问题的大型项目最后带来的是以天为单位计算的构建周期、可能会把整个系统作为支持代码拖进来的单元测试、以及其它一些问题。

### 元程序设计

> 再多的天才都无法胜过对细节的专注  

细节会弄乱整洁的代码，特别是如果它们经常变化。为了适应变化，我们需要对代码进行改动，这会导致破坏系统（引入新bug）的危险。

将细节从代码中隔离，能够使得我们的代码变得高度可配置和容易适应变化。

#### 动态配置

要让系统变得高度可配置，就需要将更深层面的选择如：界面风格、算法等作为配置选项，而不是通过集成或工程实现。

**要配置，不要集成**

使用元数据描述应用的配置选项：调谐参数、用户偏好、安装目录等。

元数据严格地来讲是关于数据的数据。就像数据库的schema或数据词典。我们应该能够访问和操纵这些信息。 

在其最宽泛的意义上使用该术语。元数据是对应用进行描述的数据————应用应该怎样运行、它应该使用什么资源等。一般情况下，元数据在运行时、而不是编译时被访问和使用。程序每时每刻都在使用元数据，如浏览器将偏好信息作为元数据存储在某种内部数据库中。

#### 元数据驱动的应用

我们不只是想把元数据用于简单的偏好，而是想要尽可能多地通过元数据配置和驱动应用。目标是以声明方式思考（规定要做什么，而不是怎么做），并创建高度灵活和可适应的程序。采用一条一般准则可以做到这一点：为一般情况编写程序，把具体情况放在别处————在编译的代码库之外。

**将抽象放进代码，细节放进元数据**

这个方法带来的若干好处有：

- 它迫使你解除你的设计的耦合，从而带来更灵活、可适应性更好的程序。
* 它迫使你通过推迟细节处理，创建更健壮、更抽象的设计————完全推迟到程序之外。
* 无需重新编译应用，就可以对其进行定制。还可以利用这一层面的定制，轻松地绕开正在运行的产品系统中的重大bug。
* 与通用的编程语言相比，可以通过一种更为接近问题领域的方式表示元数据。
* 甚至是可以用相同的应用引擎和是不同的元数据来实现若干不同的项目。

推迟大多数细节的定义到最后时刻，并尽可能保持细节的适应性，通过精心制作允许快速作出变更的解决方案，能够更好地应对使许多项目覆没的"转向"。

#### 商业逻辑

与项目的其它方面（界面风格、引擎）项目，商业政策与规则更有可能发生变化，以一种非常灵活的格式维护它们很有意义。

**何时进行配置**

程序读取配置的时间点不应该仅仅只是在启动时扫描这样的配置，因为如果修改配置，就会迫使要重新启动应用。更为灵活的方式是编写能在运行时重新加载其配置的程序。代价是实现更复杂。但对于能够快速启动的小型客户端GUI应用可能就不需要这么做。

**协作式牌纸**

让应用互相配置，让其自身适应其环境。这种更为动态的途径能在某些问题上帮到我们。

没有元数据，代码就不可能获得它应有的适应性与灵活性。

### 时间耦合

这里我们谈论的是作为软件自身的一种设计要素的时间的角色。 时间有两个方面对我们很重要：并发（同一时间发生的事情）和次序（事情在时间中的相对位置）

由于大多数人的思考方式是线性的，在设计架构或者编写程序时，总是先做这个、再做哪个，这样的思考方式会带来时间耦合。也就是a必须总是在b之前运行，或者同时只能运行一个报告等。

我们的程序或者架构需要容许并发，并考虑解除任何时间或者次序上的依赖。这样做可以获得灵活性、并减少许多开发领域中的任何基于时间的依赖：工作流分析、架构、设计还有部署。

#### 工作流

在许多项目中，需要把用户的工作流当作需求分析的一部分来进行建模和分析。帮助我们找出同一时间可能发生什么，以及什么必须以严格的次序发生。可以使用UML来实现对工作流的描述。

通过UML动作图，找出本来可以却没有并行执行的动作，使并行度最大化。

**分析工作流，以改善并发性**

#### 架构

例子是一个在线事务处理（OLTP）系统。系统必须做的就是读取请求，依靠数据库对事务进行处理。作者这边实现了一个三层的多处理分布式应用。应用中每个工作进程通过工作队列通信。每个输入进程监控一条通信入线，并向应用服务器发出请求。而且请求都是异步的。

例子说明了在多个消费者进程间进行快速而粗糙的负载平衡的一种途径：饥饿的消费者模型。这一模型中，使用一些独立的消费者任务和集中式工作队列取代中央调度器。使得各个组件在时间上解除了与其它组件的耦合。

**用服务进行设计**，实际上这里创建的不是组件，而是服务，位于定义良好的一致的接口之后的独立、并发的对象。

#### 为并发进行设计

多线程编程施加了某些设计约束，它们将帮助解除代码的耦合，避免靠巧合编程

首先，必须对任何全局或静态变量加以保护，使其免于并发访问。此外不管调用的次序是什么，都需要确保给出的是一致的状态信息。

在并发系统中，必须确保对象在被调用时，必须总是处在有效的状态中，这种问题常常出现在构造器与初始化例程分开定义的类中。

#### 更整洁的接口

对并发和时序依赖进行思考海能够引导我们设计更整洁的接口。**总是为并发进行设计**

#### 部署

一旦设计了具有并发要素的架构，对许多并发服务的处理进行思考救回变得更容易。因为模型变成了普遍的。由此可以灵活地处理应用的部署方式，通过把系统架构成多个独立的服务，也可以让配置成为动态的。通过对并发做出规划，解除各个操作在时间上的耦合，可以拥有所有这些选择，包括并发或者不并发。

### 它只是视图

模块（或类）的一个好定义就是它具有单一的，定义良好的责任。而基于责任把程序划分成不同模块后，需要以一种整洁、灵活的方式来进行不同对象中的状态的变化（或数据值的更新）的同步。

使用事件传递消息的方式可以使得对象之间的耦合得以减至最少，发送者不需要对接收者有任何明确的了解。

#### 发布／订阅

对象应该能进行登记，只接收它需要的事件，并决不会收到不需要的事件。因此这里会用到发布／订阅协议。

Subscriber对某个Publisher生成的事件进行订阅，当Publisher生成相应事件时，会依次通知每个Subscriber订阅的事件已经发生。

使用发布／订阅机制可以实现一种非常重要的设计概念：模型与模型的视图的分离。

#### Model-View-Controller

当一些模块共享相同的数据时，为了不维护多份数据副本，可以以数据为自身来创建一个模型 以及用于对其进行操作的常用操作。根据之前的模块来创建对应的不同视图，用以不同的方式展现数据。每个视图拥有相对应的控制器用于影响其行为而不会对数据有任何影响。

MVC的关键概念是：既让模型与表示模型的GUI分离，也让模型与管理视图的控件分离。

由于三者相互分离，有具有一定的联系，因此可以实现用同一数据模型来填充多个视图或者多个不同的数据模型上使用相同的视图，再或者一个视图支持多个控制器，以提供不同的输入机制等等。

**使视图与模型分离**

通过松解模型与视图／控制器之间的耦合，是实现最为重要的维护可撤销性的途径之一。

#### 超越GUI

MVC是一种通用的编程技术：

- 模型。表示目标对象的抽象数据模型。模型对任何视图或控制器都没有直接的了解。
* 视图。解释模型的方式。它订阅模型中的变化和来自控制器的逻辑事件。
* 控制器。控制视图、并向模型提供新数据的途径。它既向模型、也向视图发布事件。

MVC模式可以不断嵌套形成一个网络，每条嵌套链路都解除原始数据与创建它的事件的耦合，每个新的查看器都是一种抽象。

### 黑板

黑板方法的关键特征是：

- 没有侦探需要知道其它任何侦探的存在——侦探只是查看黑板，从中了解新信息并加上他们的发现
* 侦探可能接受过不同的训练，有不同程度的教育背景和专业经验，甚至可能不在同一个辖区工作。但是他们都渴望破案，而这就是全部的共同点
* 破案过程中，不同的侦探可能会来来去去，且工作的班次可能不同
* 放在黑板上的内容没有限制，可以是图片、判断、证物等等

围绕黑板模型设计设计工作流或者分布式数据采集过程的解决方案可以得到一个坚实的用于工作的比喻：上面列出的所有关于侦探的特性同样适用于对象和代码模块。

黑板系统解除了对象之间的耦合，并提供一个"论坛"，知识消费者和生产者可以从中匿名、异步地交换数据。

现代的分布式类黑板系统以一种键／值对模型为基础；如：JavaSpaces和T Spaces，这种模型在某些系统中也被称为元组空间

因为黑板系统可以存储对象，因此可以使用黑板设计基于对象流、而不仅仅是数据的算法。

像这样的系统的一大优点是， 与黑板有单一、一致的接口。在构建传统的分布式应用时，可以避免为系统中每一个分布式事务和交互精心制作独特的API调用而造成接口和交互的组合爆炸。

在处理大案子（项目）时，黑板可能会变得混乱，难以在黑板上确定资料的位置。解决的方式是对黑板进行分区，并开始以某种方式组织黑板上的资料。不同的软件系统以不同的方式处理分区，有的几乎只有一级的区域或兴趣组，而另一些则采用更佳层次化的树状结构。

**用黑板协调工作流**

黑板可以用于协调完全不同的事实和因素，同时又使各参与方保持独立、甚至隔离