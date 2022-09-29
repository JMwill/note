# Typescript 相关记录

## 问题记录

### 定义属性关联关系类型

```typescript
interface SubTab {
  title: keyof titleNameMap,
  titleEn: Pick<titleNameMap, keyof titleNameMap>,
  index: number, 
}

interface TypeStatus {
  '全部': 'all',
  '待处理': 'todo',
  '处理中': 'ondo',
  '已完结': 'end',
  '满意度': 'satisfied',
  '草稿箱': 'drafts',
  '待办': 'all',
}
 
type SubTabs<Name extends keyof TypeStatus> = {
  title: Name
  titleEn: Pick<TypeStatus, Name>[Name]
}
 
const todo: SubTabs<'待处理'> = {
  title: '待处理',
  titleEn: 'todo'
};
```

使用这类型定义，能保证属性间一一对应，无需过多定义类型