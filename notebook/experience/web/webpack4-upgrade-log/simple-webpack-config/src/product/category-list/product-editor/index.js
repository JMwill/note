import React, {PureComponent} from 'react'

import Editor from './editor'
import io from '../../../io'

class ShelfProductEditor extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      include: 0,
      exclude: 0,
    }

    this.ok = this.ok.bind(this)
    this.notify = this.notify.bind(this)
    this.addShelfProduct = this.addShelfProduct.bind(this)
    this.removeShelfProduct = this.removeShelfProduct.bind(this)
  }

  ok() {
    this.props.close()
    this.props.onClose()
  }

  notify(key) {
    return () => {
      const num = this.state[key]
      const newState = {}
      newState[key] = num + 1
      this.setState(newState)
    }
  }

  addShelfProduct(productIds) {
    return io.updateShelfProduct(this.props.shelf_id, {
      added_products: productIds,
    })
  }

  removeShelfProduct(productIds) {
    return io.updateShelfProduct(this.props.shelf_id, {
      deleted_products: productIds,
    })
  }

  render() {
    return (
      <div className='pepe-panel'>
        <div className='pepe-panel__bd'>
          <div className='left'>
            <Editor
              searchLabel='全部商品'
              actionLabel='添加至该货架'
              actionIcon='iconpepe-add'
              actionClass='btn-primary'
              filter={{shelf_id__neq: this.props.shelf_id}}
              limit={30}
              offset={0}
              notify={this.notify('include')}
              doAction={this.addShelfProduct}
              identifier={this.state.exclude}
            />
          </div>
          <div className='right'>
            <Editor
              searchLabel='货架内商品'
              actionLabel='从货架中移除'
              actionIcon='iconpepe-delete'
              actionClass='btn-default btn-bordered'
              filter={{shelf_id: this.props.shelf_id}}
              limit={30}
              offset={0}
              notify={this.notify('exclude')}
              doAction={this.removeShelfProduct}
              identifier={this.state.include}
            />
          </div>
        </div>
        <div className='pepe-panel__ft'>
          <button
            className='btn btn-primary'
            onClick={this.ok}>确定</button>
        </div>
      </div>
    )
  }
}

ShelfProductEditor.defaultProps = {
  shelf_id: 0,
  close() {},
  onClose() {},
}

export default ShelfProductEditor
