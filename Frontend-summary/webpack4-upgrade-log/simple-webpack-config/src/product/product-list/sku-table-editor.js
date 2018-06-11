import _ from 'lodash'
import React, {PureComponent} from 'react'
import alert from '../../components/alert'
import confirm from '../../components/confirm'
import InputInteger from '../../components/input-integer'
import lock from '../../components/lock'
import io from '../../io'
import utils from '../../utils'

function Td({cell, form, onInputStock}) {
  if (cell.pass) return null
  if (cell.control) {
    let val = ''
    if (form[cell.id] != null) {
      if (form[cell.id] > 0 && cell.control === 'increment') {
        val = form[cell.id]
      }
      if (form[cell.id] < 0 && cell.control === 'descrement') {
        val = -form[cell.id]
      }
    }

    return (
      <td style={{width: '120px'}}>
        <div className='form-group mb-0'>
          <InputInteger
            className={`form-control input-sm ${cell.control}`}
            pred={(n) => n > 0}
            value={val}
            onChange={(n) => {
              onInputStock(cell.control, cell.id, n)
            }}
            placeholder='请输入数量'
          />
        </div>
      </td>
    )
  }
  return (
    <td rowSpan={cell.row} >{cell.value}</td>
  )
}

function Tr({row, form, onInputStock}) {
  return (<tr>{row.map(cell => <Td cell={cell} form={form} onInputStock={onInputStock} />)}</tr>)
}

/**
 * 展示库存批量编辑器，最多支持 3 种 SKU
 * 穷尽法
 */
export default class SkuTableEditor extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      form: {},
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputStock = this.handleInputStock.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    const {id, ok = function() {}, close = function() {}} = this.props
    const newForm = {...this.state.form}
    const params = _.map(newForm, (v, k) => {
      return {id: k, number: v}
    })

    if (params.length === 0) {
      alert('至少要填写一项')
      return
    }

    confirm({
      message: '确定要更新库存吗？',
      ok() {
        const unlock = lock('.modal-dialog')

        io.updateProductStock(id, params)
          .then(() => {
            unlock()
            ok()
            close()
          })
          .catch((err) => {
            unlock()
            utils.fail(err)
          })
      },
    })
  }

  handleInputStock(control, id, n) {
    const newForm = {...this.state.form}
    delete newForm[id]
    if (n !== '') {
      if (control === 'increment') {
        newForm[id] = n
      } else {
        newForm[id] = -n
      }
    }
    this.setState({
      form: newForm,
    })
  }

  render() {
    const {close = function() {}} = this.props
    let items = this.props.items

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
    let header = [...append, '现有库存', '新增', '减少']
    let rows = []

    function fixedRow(item) {
      return [{
        pass: false,
        row: 1,
        value: item.inventory,
      }, {
        pass: false,
        row: 1,
        control: 'increment',
        id: item.id,
      }, {
        pass: false,
        row: 1,
        control: 'descrement',
        id: item.id,
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
            {rows.map(row => <Tr row={row} form={this.state.form} onInputStock={this.handleInputStock} />)}
          </tbody>
        </table>
        <div className='ft'>
          <button className='btn btn-primary' onClick={this.handleSubmit}>确定</button>
          <button className='btn btn-default' onClick={close}>取消</button>
        </div>
      </div>
    )
  }
}
