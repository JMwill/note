## 模式匹配：基于规则的代换

模式通过规则进行代换到骨架当中，即模式是用来匹配原表达式的，应用规则会产生一个新的表达式，称之为目标，而这个目标是通过骨架的实例化实现的，这称之为实例化

构造一种语言以及它的解析与执行方法，使得这种语言可以直接表述这些规则，与其通过将规则翻译为程序，让计算机理解并执行，不如让计算机理解我们，我们写一些程序让计算机理解这些规则。