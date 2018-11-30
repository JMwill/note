import _ from 'lodash'
import React, {PureComponent} from 'react'

import InputAmount from '../../components/input-amount'
import InputInteger from '../../components/input-integer'
import Uploader from '../../components/uploader'

function dynamicSku(specs = []) {
  if (specs.length === 0) {
    return {
      headerList: [],
    }
  }

  const headerMap = _.reduce(specs, (r, v, k) => { r[`s${k}`] = v.spec_key_id; return r }, {})

  const headerList = _.map(specs, x => x.spec_key_name)
  const skuLenMap = _.map(specs, x => x.spec_value_list.length)
  const skuNameMap = _.reduce(
    specs,
    (r, v, k) => {
      r[`s${k}`] = _.reduce(
        v.spec_value_list,
        (r1, v1) => {
          r1[v1.spec_value_id] = v1.spec_value_name
          return r1
        }, {}
      )
      return r
    }, {}
  )
  let list = []

  for (let key in skuNameMap['s0']) {
    let obj = {}
    obj['s0'] = key
    convertToMap(1, headerList.length, skuNameMap, obj, list, headerMap)
  }

  return {
    headerList,
    skuLenMap,
    skuNameMap,
    list,
    headerMap,
  }
}

function convertToMap(i, max, map, obj, list, headerMap) {
  if (i >= max) {
    let newItem = {...obj}
    let spec_list = []
    for (var k in headerMap) {
      spec_list.push(headerMap[k] + ':' + newItem[k])
    }
    newItem.spec_list = spec_list.join(',')
    list.push(newItem)
    return
  }

  for (let key in map[`s${i}`]) {
    obj[`s${i}`] = key
    convertToMap(i + 1, max, map, obj, list, headerMap)
  }
}

class Td extends PureComponent {
  constructor(props) {
    super(props)

    let defaultState = {
      value: this.props.value,
    }
    if (props.control === 'visible') {
      defaultState.value = _.includes(this.props.selected, this.props.spec_list)
    }

    this.state = defaultState

    this.onChange = this.onChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.control === 'visible') {
      this.setState({
        value: _.includes(nextProps.selected, this.props.spec_list),
      })
    }
  }

  onChange(value) {
    this.setState({
      value,
    })
    this.props.onChange(this.props.spec_list, value, this.props.control)
  }

  render() {
    const {
      pass,
      row,
      control,
    } = this.props

    if (pass) {
      return null
    }

    let part = null
    if (control === 'visible') {
      part = (
        <input
          className='checkable'
          type='checkbox'
          checked={this.state.value}
          onChange={(e) => this.onChange(e.target.checked)}
        />
      )
    } else if (control === 'sku_image') {
      part = (
        <Uploader
          width='600'
          height='600'
          imgs={this.state.value}
          onChange={this.onChange}
        />
      )
    } else if (_.includes(['unit_cost', 'original_price', 'discount_price'], control)) {
      part = (
        <InputAmount
          className='form-control input-sm input-amount'
          value={this.state.value}
          onChange={this.onChange}
        />
      )
    } else if (_.includes(['inventory'], control)) {
      part = (<InputInteger className='form-control input-sm' value={this.state.value} onChange={this.onChange} />)
    } else if (_.includes(['bar_code', 'supplier_code'], control)) {
      part = (
        <input
          type='text'
          className='form-control input-sm'
          value={this.state.value}
          onChange={e => this.onChange(e.target.value)}
        />
      )
    } else {
      part = (<span>{this.props.value}</span>)
    }

    return (
      <td className={control} rowSpan={row}>{part}</td>
    )
  }
}

Td.defaultProps = {
  onChange() {},

  control: '',
  value: '',
  pass: false,
  row: 1,
  spec_list: '',
  selected: [],
}

function Tr(props) {
  const {items, onChange, selected} = props
  return (
    <tr>
      {items.map((item) => {
        let key = item.spec_list
        if (item.control) {
          key += item.control
        }
        if (item.spec_value_id) {
          key += item.spec_value_id
        }

        return (
          <Td
            key={key}
            {...item}
            onChange={onChange}
            selected={selected}
          />
        )
      })}
    </tr>
  )
}

function handleFixedRow(currentRow, spec_list, cache) {
  // 固定数据 cell
  currentRow.push({
    value: cache['unit_cost'] || '',
    pass: false,
    row: 1,
    control: 'unit_cost',
    spec_list,
  })
  currentRow.push({
    value: cache['original_price'] || '',
    pass: false,
    row: 1,
    control: 'original_price',
    spec_list,
  })
  currentRow.push({
    value: cache['discount_price'] || '',
    pass: false,
    row: 1,
    control: 'discount_price',
    spec_list,
  })
  currentRow.push({
    value: cache['inventory'] || '',
    pass: false,
    row: 1,
    control: 'inventory',
    spec_list,
  })
  currentRow.push({
    value: cache['bar_code'] || '',
    pass: false,
    row: 1,
    control: 'bar_code',
    spec_list,
  })
  currentRow.push({
    value: cache['supplier_code'] || '',
    pass: false,
    row: 1,
    control: 'supplier_code',
    spec_list,
  })
  currentRow.push({
    value: cache['sku_image'] || '',
    pass: false,
    row: 1,
    control: 'sku_image',
    spec_list,
  })
}

function mapPropsToState(props, postData) {
  let specs = props.all_specs

  const dynamicSkuData = dynamicSku(specs)

  // 表头的处理
  let headers = []
  const fixedHeaders = ['进价', '原价', '折后价', '库存', '条码', '供应商编码', '图片']
  headers = [...dynamicSkuData.headerList, ...fixedHeaders]

  // 表格的处理
  let rows = []
  if (dynamicSkuData.headerList.length !== 0) {
    let rowSpanMap = {}
    for (let i = 0; i < dynamicSkuData.headerList.length - 1; i++) {
      let len = 1
      for (let j = i + 1; j < dynamicSkuData.skuLenMap.length; j++) {
        len = len * dynamicSkuData.skuLenMap[j]
      }
      rowSpanMap[`s${i}`] = len
    }
    let prevRow = null
    rows = _.map(dynamicSkuData.list, (item) => {
      let currentRow = []
      let cache = postData[item.spec_list] || {}

      currentRow.push({
        value: cache['visible'] || false,
        pass: false,
        row: 1,
        control: 'visible',
        spec_list: item.spec_list,
      })

      for (let i = 0; i < dynamicSkuData.headerList.length - 1; i++) {
        let key = `s${i}`

        let pass = false
        if (prevRow !== null && rowSpanMap[key] > 1) {
          if (_.filter(prevRow, prItem => prItem.spec_value_id === item[key]).length > 0) {
            pass = true
          }
        }

        currentRow.push({
          spec_list: item.spec_list,
          spec_value_id: item[key],
          value: dynamicSkuData.skuNameMap[key][item[key]],
          pass: pass,
          row: rowSpanMap[key],
        })
      }

      let key = `s${dynamicSkuData.headerList.length - 1}`
      currentRow.push({
        spec_list: item.spec_list,
        spec_value_id: item[key],
        value: dynamicSkuData.skuNameMap[key][item[key]],
        pass: false,
        row: 1,
      })

      handleFixedRow(currentRow, item.spec_list, cache)
      prevRow = currentRow
      return currentRow
    }, [])
  } else {
    const currentRow = []
    const cache = postData[''] || {}
    currentRow.push({
      value: cache['visible'] || {},
      pass: false,
      row: 1,
      control: 'visible',
      spec_list: '',
    })
    handleFixedRow(currentRow, '', cache)
    rows.push(currentRow)
  }

  const dynamicIds = _.map(dynamicSkuData.headerMap, (v, k) => v).sort()

  return {
    headers,
    rows,
    dynamicIds: dynamicIds.join(','),
  }
}

class ProductStock extends PureComponent {
  constructor(props) {
    super(props)

    this.postData = {
    }
    _.each(props.skus, sku => {
      this.postData[sku.spec_list] = sku
    })

    const {headers, rows, dynamicIds} = mapPropsToState(props, this.postData)

    const defaultSelected = _.map(this.props.skus, sku => sku.spec_list)

    this.state = {
      selected: defaultSelected,
      headers,
      rows,
      dynamicIds,
    }

    this.onRowChange = this.onRowChange.bind(this)
    this.checkAll = this.checkAll.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const {headers, rows, dynamicIds} = mapPropsToState(nextProps, this.postData)

    if (dynamicIds !== this.state.dynamicIds) {
      this.setState({
        selected: [],
      })
    }

    this.setState({
      headers,
      rows,
      dynamicIds,
    })
  }

  onRowChange(spec_list, value, control) {
    let selected = this.state.selected
    if (control === 'visible') {
      if (value) {
        selected = [...this.state.selected, spec_list]
        this.setState({
          selected: selected,
        })
      } else {
        selected = selected.filter(x => x !== spec_list)
        this.setState({
          selected: selected,
        })
      }
    }

    this.postData[spec_list] = this.postData[spec_list] || {}
    this.postData[spec_list][control] = value

    const data = {}
    _.each(selected, (key) => (data[key] = this.postData[key]))
    this.props.onChange(selected, data)
  }

  checkAll(e) {
    let selected = []
    if (e.target.checked) {
      selected = _.map(this.state.rows, x => x[0].spec_list)
    }
    this.setState({
      selected,
    })
    const data = {}
    _.each(selected, (key) => (data[key] = this.postData[key]))
    this.props.onChange(selected, data)
  }

  render() {
    const {selected, headers, rows} = this.state

    const allChecked = selected.length === rows.length
    return (
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>
              <input className='checkable' type='checkbox' checked={allChecked} onChange={this.checkAll} />
            </th>
            {headers.map(h => <th key={h}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <Tr
              key={row.spec_list}
              items={row}
              onChange={this.onRowChange}
              selected={selected}
            />
          ))}
        </tbody>
      </table>
    )
  }
}

ProductStock.defaultProps = {
  all_specs: [],
  skus: [],
  onChange() {},
}

export default ProductStock
