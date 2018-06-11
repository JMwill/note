import _ from 'lodash'
import React, {PureComponent} from 'react'

import TableColgroup from '../../components/table-colgroup'

import TableItem from './table-item'

const total_width = 896
const cell_width_list = [92, 200, 92, 80, 80, 272]

function mapToState(props) {
  const ranks = _.map(props.items, e => e.priority)
  const ids = _.map(props.items, e => e.id)
  const entries = _.reduce(props.items, (m, e) => { m[e.id] = e; return m }, {})

  return {
    ranks,
    ids,
    entries,
  }
}

class CategoryTable extends PureComponent {
  constructor(props) {
    super(props)
    this.state = mapToState(props)
  }

  componentWillReceiveProps(nextProps) {
    const newState = mapToState(nextProps)

    this.setState({...newState})
  }

  render() {
    let ids = this.state.ids
    if (this.props.hasNext) {
      ids = _.take(ids, ids.length - 1)
    }
    if (this.props.hasPrev) {
      ids = _.tail(ids)
    }
    const priorities = this.props.priorities
    let items = _.map(ids, id => this.state.entries[id])

    return (
      <div className='order-table pepe-table-wrap'>
        <table className='pepe-table'>
          <TableColgroup total_width={total_width} cell_width_list={cell_width_list} />
          <thead>
            <tr>
              <th className='first'>
                分类 ID
              </th>
              <th>
                分类名称
              </th>
              <th>
                商品数量
              </th>
              <th>
                优先级
              </th>
              <th>
                使用状态
              </th>
              <th>
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) =>
              <TableItem
                {...item}
                type={this.props.type}
                key={item.id}
                hasNext={this.props.hasNext}
                hasPrev={this.props.hasPrev}
                isFirst={idx === 0}
                isLast={idx === ids.length - 1}
                priority={priorities[item.id] ? priorities[item.id].priority : item.priority}
                onChangePriority={this.props.onChangePriority}
                onUpdateCategoryStatus={this.props.onUpdateCategoryStatus}
                dirty={this.props.category_status_dirty.indexOf(item.id) !== -1}
                reloadCategoryList={this.props.reloadCategoryList}
              />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

CategoryTable.defaultProps = {
  items: [],
  isFirst: true,
  isLast: true,
  category_status_dirty: [],

  reloadCategoryList() {},
}

export default CategoryTable
