import _ from 'lodash'
import React from 'react'
import utils from '../../utils'

function Td({cell}) {
  if (cell.pass) return null
  return (
    <td rowSpan={cell.row} >{cell.value}</td>
  )
}

function Tr({row}) {
  return (<tr>{row.map(cell => <Td cell={cell} />)}</tr>)
}

/**
 * 展示 SKU 表格，最多支持 3 种 SKU
 * 穷尽法
 */
export default function SkuTable({items, close = function() {}}) {
  if (items.length === 0) return null

  let append = []
  if (items[0].spec_str != null && items[0].spec_str.length > 0) {
    append = _.map(items[0].spec_str.split(','), (s) => s.split(':')[0])
    items = _.map(items, (item) => {
      const specs = item.spec_str.split(',')
      const obj = _.reduce(specs, (m, s) => {
        const p = s.split(':')
        m[p[0]] = p[1]
        return m
      }, {})
      return {
        ...item,
        ...obj,
      }
    })
  }
  let header = [...append, '进价', '单价', '库存', '销量']
  let rows = []

  function fixedRow(item) {
    return [{
      pass: false,
      row: 1,
      value: utils.toFriendlyPrice(item.unit_cost),
    }, {
      pass: false,
      row: 1,
      value: utils.toFriendlyPrice(item.discount_price),
    }, {
      pass: false,
      row: 1,
      value: item.inventory || 0,
    }, {
      pass: false,
      row: 1,
      value: item.sold_count || 0,
    }]
  }
  if (append.length === 0) {
    rows = _.map(items, item => fixedRow(item))
  }
  if (append.length === 1) {
    rows = _.map(items, (item) => {
      const appendRow = [{
        pass: false,
        row: 1,
        value: item[append[0]],
      }]
      return [...appendRow, ...fixedRow(item)]
    })
  }
  if (append.length === 2) {
    const group = _.groupBy(items, x => x[append[0]])
    _.each(group, (groupItems) => {
      _.each(groupItems, function(item, i) {
        const appendRow = [{
          pass: i > 0,
          row: groupItems.length,
          value: item[append[0]],
        }, {
          pass: false,
          row: 1,
          value: item[append[1]],
        }]
        rows.push([...appendRow, ...fixedRow(item)])
      })
    })
  }
  if (append.length === 3) {
    const group1 = _.groupBy(items, x => x[append[0]])
    const flagMap = _.reduce(_.keys(group1), (obj, key) => { obj[key] = false; return obj }, {})

    _.each(group1, (groupItems1) => {
      const group2 = _.groupBy(groupItems1, x => x[append[1]])
      _.each(group2, function(groupItems2) {
        _.each(groupItems2, function(item, i) {
          const appendRow = [{
            pass: flagMap[item[append[0]]],
            row: groupItems1.length,
            value: item[append[0]],
          }, {
            pass: i > 0,
            row: groupItems2.length,
            value: item[append[1]],
          }, {
            pass: false,
            row: 1,
            value: item[append[2]],
          }]
          rows.push([...appendRow, ...fixedRow(item)])
          flagMap[item[append[0]]] = true
        })
      })
    })
  }

  return (
    <div className='pepe-modal-table'>
      <table className='table table-bordered'>
        <thead>
          <tr>{header.map(x => <th>{x}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map(row => <Tr row={row} />)}
        </tbody>
      </table>
    </div>
  )
}
