import React, {PureComponent} from 'react'
import config from '../../config'

const lv1List = config.getCategory()

class ProductCategoryEditor extends PureComponent {
  constructor(props) {
    super(props)

    const initState = {
      lv1: 0,
      lv2: 0,
    }
    if (props.category) {
      initState.lv1 = props.category.parent
      initState.lv2 = props.category.id
    }

    this.state = initState
  }

  selectLv1(id) {
    this.setState({
      lv1: id,
      lv2: 0,
    })

    this.props.onChange(null)
  }

  selectLv2(id, parent) {
    this.setState({
      lv1: parent,
      lv2: id,
    })

    this.props.onChange({
      id,
      parent,
    })
  }

  render() {
    let lv2List = []
    if (this.state.lv1 !== 0) {
      lv2List = config.getCategory(this.state.lv1)
    } else if (lv1List.length > 0) {
      lv2List = config.getCategory(lv1List[0].id)
    }

    return (
      <div className='category-wrap'>
        <div className='category-list'>
          <div className='category-list__hd'>请选择一级品类</div>
          <div className='category-list__bd'>
            <ul>
              {lv1List.map(item => (
                <li
                  key={item.id}
                  className={item.id === this.state.lv1 ? 'active' : ''}
                  onClick={() => this.selectLv1(item.id)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='category-list'>
          <div className='category-list__hd'>请选择二级品类</div>
          <div className='category-list__bd'>
            <ul>
              {lv2List.map(item => (
                <li
                  key={item.id}
                  className={item.id === this.state.lv2 ? 'active' : ''}
                  onClick={() => this.selectLv2(item.id, item.parent)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

ProductCategoryEditor.defaultProps = {
  onChange() {},
  category: null,
}

export default ProductCategoryEditor
