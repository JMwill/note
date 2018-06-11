import _ from 'lodash'
import React, {PureComponent} from 'react'

import io from '../../io'
import utils from '../../utils'

class SpecUpdate extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      specValue: props.initSpecValue || '',
    }

    this.updateSpec = this.updateSpec.bind(this)
    this.handleSpecValueChange = this.handleSpecValueChange.bind(this)
    this.requesting = false
  }

  handleSpecValueChange(e) {
    this.setState({
      specValue: e.target.value,
    })
  }

  updateSpec(e) {
    e.preventDefault()
    const value_name = this.state.specValue.trim()

    if (value_name.length > 0 && !this.requesting) {
      let params = this.props.isNameAlter
        ? {spec_key_name: value_name}
        : {spec_value_list: [value_name]}

      if (this.props.spec_value_id) {
        params.spec_value_id = this.props.spec_value_id
      }
      this.requesting = true
      ;(() => {
        if (this.props.isUpdateFields) {
          return io.updateSpecFields(this.props.spec_key_id, params)
        } else {
          return io.updateSpec(this.props.spec_key_id, params)
        }
      })()
        .then(res => {
          this.requesting = false
          this.props.onChange(res.data)
          this.props.close()
        })
        .catch(err => {
          this.requesting = false
          utils.fail(err)
        })
    }
  }

  render() {
    if (!this.props.open) return null
    return (
      <div className='spec-update'>
        <div className='popup'>
          <div className='form-inline'>
            <div className='form-group'>
              <input
                value={this.state.specValue}
                onChange={this.handleSpecValueChange}
                placeholder={this.props.isNameAlter ? '规格名' : '规格值'}
                style={{width: '336px'}}
                className='form-control'
                type='text'
                ref={(n) => { this.value_noe = n }}
              />
            </div>
            <div className='btn-group'>
              <button className='btn btn-primary btn-bordered' onClick={this.updateSpec}>确定</button>
            </div>
            <a href='#' onClick={(e) => { e.preventDefault(); this.props.close() }}><i className='iconpepe-close' /></a>
          </div>
          <div className='popup__arraw' />
        </div>
      </div>
    )
  }
}

class SpecAdd extends PureComponent {
  constructor(props) {
    super(props)
    this.addSpec = this.addSpec.bind(this)
    this.requesting = false
  }

  addSpec(e) {
    e.preventDefault()

    const spec_key_name = this.spec_node.value.trim()
    const spec_value_name = this.spec_value_node.value.trim()

    const found = _.find(this.props.all_specs, x => x.spec_key_name === spec_key_name)

    if (spec_key_name.length > 0 && spec_value_name.length > 0 && !this.requesting) {
      this.requesting = true
      if (found != null) {
        io.updateSpec(found.spec_key_id, {spec_value_list: [spec_value_name]})
          .then(res => {
            this.spec_node.value = ''
            this.spec_value_node.value = ''
            this.requesting = false

            this.props.onUpdateSpec(res.data)
            this.props.close()
          })
          .catch(err => {
            this.requesting = false
            utils.fail(err)
          })
      } else {
        io.addSpec({spec_key_name, spec_value_list: [ spec_value_name ]})
          .then(res => {
            this.spec_node.value = ''
            this.spec_value_node.value = ''
            this.requesting = false

            this.props.onChange(res.data)
            this.props.close()
          })
          .catch(err => {
            this.requesting = false
            utils.fail(err)
          })
      }
    }
  }

  render() {
    if (!this.props.open) return null
    return (
      <div className='spec-add'>
        <div className='popup'>
          <div className='form-inline'>
            <div className='form-group'>
              <input placeholder='规格名' className='form-control' type='text' ref={(n) => { this.spec_node = n }} />
            </div>
            <div className='form-group'>
              <input placeholder='规格值' className='form-control' type='text' ref={(n) => { this.spec_value_node = n }} />
            </div>
            <div className='btn-group'>
              <button className='btn btn-primary btn-bordered' onClick={this.addSpec}>确定</button>
            </div>
            <a href='#' onClick={(e) => { e.preventDefault(); this.props.close() }}><i className='iconpepe-close' /></a>
          </div>
          <div className='popup__arraw' />
        </div>
      </div>
    )
  }
}

class SpecListItem extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      alterIndex: null,
      isNameAlter: false,
    }

    this.openSpecUpdate = this.openSpecUpdate.bind(this)
    this.closeSpecUpdate = this.closeSpecUpdate.bind(this)
    this.openSpecAlter = this.openSpecAlter.bind(this)
    this.closeSpecAlter = this.closeSpecAlter.bind(this)
    this.openSpecNameAlter = this.openSpecNameAlter.bind(this)
    this.closeSpecNameAlter = this.closeSpecNameAlter.bind(this)
  }

  resetOpenState() {
    this.setState({
      open: false,
      alterIndex: null,
      isNameAlter: false,
    })
  }

  openSpecUpdate(e) {
    e.preventDefault()
    this.resetOpenState()
    this.setState({
      open: true,
    })
  }

  closeSpecUpdate() {
    this.setState({
      open: false,
    })
  }

  openSpecAlter(e) {
    e.preventDefault()
    this.resetOpenState()
    this.setState({
      alterIndex: Number(e.target.dataset.index),
    })
  }

  closeSpecAlter(e) {
    this.setState({
      alterIndex: null,
    })
  }

  openSpecNameAlter(e) {
    e.preventDefault()
    this.resetOpenState()
    this.setState({
      isNameAlter: true,
    })
  }

  closeSpecNameAlter(e) {
    this.setState({
      isNameAlter: false,
    })
  }

  render() {
    const {spec_key_id, spec_key_name, spec_value_list, product_id = 0} = this.props
    return (
      <li>
        {product_id > 0 ? null : (
          <a href='#'
            className='product-spec__remove'
            onClick={(e) => { e.preventDefault(); this.props.onRemove(spec_key_id) }}
          >
            <i className='glyphicon glyphicon-trash' />
          </a>
        )}
        <div className='product-spec__value-list'>
          <div className='popup-wrap'>
            <span className='product-spec__title' onClick={this.openSpecNameAlter}>{spec_key_name}</span>
            <SpecUpdate
              open={this.state.isNameAlter}
              close={this.closeSpecNameAlter}
              initSpecValue={spec_key_name}
              isUpdateFields
              spec_key_id={spec_key_id}
              isNameAlter={this.state.isNameAlter}
              onChange={this.props.onChange}
            />
          </div>
          {spec_value_list.map((value, index) => (
            <div className='popup-wrap' key={value.spec_value_name}>
              <span className='btn btn-sm btn-primary product-spec__value'
                data-index={index}
                onClick={this.openSpecAlter}>{value.spec_value_name}</span>
              <SpecUpdate
                open={this.state.alterIndex === index}
                close={this.closeSpecAlter}
                initSpecValue={value.spec_value_name}
                spec_key_id={spec_key_id}
                spec_value_id={value.spec_value_id}
                onChange={this.props.onChange}
              />
            </div>
          ))}
          <div className='popup-wrap'>
            <a href='#' className='product-spec__value-add' onClick={this.openSpecUpdate}>添加</a>
            <SpecUpdate
              open={this.state.open}
              close={this.closeSpecUpdate}
              spec_key_id={spec_key_id}
              onChange={this.props.onChange}
            />
          </div>
        </div>
      </li>
    )
  }
}

class ProductSpec extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      all_specs: this.props.all_specs,
      open_add_specs: false,
    }

    this.openSpec = this.openSpec.bind(this)
    this.onAddSpec = this.onAddSpec.bind(this)
    this.onUpdateSpec = this.onUpdateSpec.bind(this)
    this.onRemove = this.onRemove.bind(this)
  }

  openSpec(e) {
    e.preventDefault()
    this.setState({
      open_add_specs: true,
    })
  }

  onAddSpec(data) {
    const specs = [...this.state.all_specs, {
      spec_key_id: data.spec_key_id,
      spec_key_name: data.spec_key_name,
      spec_value_list: data.spec_value_list,
    }]
    this.setState({
      all_specs: specs,
    })
    this.props.onChange(specs)
  }

  onUpdateSpec(data) {
    var newSpecs = [...this.state.all_specs]
    _.each(newSpecs, (spec) => {
      if (spec.spec_key_id === data.spec_key_id) {
        spec.spec_value_list = [...data.spec_value_list]
        spec.spec_key_name = data.spec_key_name
      }
    })
    this.setState({
      all_specs: newSpecs,
      open_add_specs: false,
    })
    this.props.onChange(newSpecs)
  }

  onRemove(id) {
    const newSpecs = this.state.all_specs.filter((item) => item.spec_key_id !== id)
    this.setState({
      all_specs: newSpecs,
    })
    this.props.onChange(newSpecs)
  }

  renderSpecAdd() {
    if (this.state.all_specs.length >= this.props.limit || this.props.product_id > 0) {
      return null
    }

    return (
      <div className='product-spec__action'>
        <div className='popup-wrap'>
          <a
            href='#'
            className='btn btn-primary btn-bordered icon-action'
            onClick={this.openSpec}
          >
            <i className='iconpepe-plus' />添加规格项目
          </a>
          <SpecAdd
            all_specs={this.state.all_specs}
            open={this.state.open_add_specs}
            close={() => { this.setState({open_add_specs: false}) }}
            onChange={this.onAddSpec}
            onUpdateSpec={this.onUpdateSpec}
          />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='product-spec'>
        <ul>
          {this.state.all_specs.map((item) =>
            <SpecListItem
              key={item.spec_key_id}
              {...item}
              onChange={this.onUpdateSpec}
              onRemove={this.onRemove}
              product_id={this.props.product_id}
            />)}
        </ul>
        {this.renderSpecAdd()}
      </div>
    )
  }
}

ProductSpec.defaultProps = {
  all_specs: [],
  product_id: 0,
  limit: 3,
  onChange() {},
}

export default ProductSpec
