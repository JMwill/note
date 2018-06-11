import React, {PureComponent} from 'react'

export default class ProductPreview extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      platform: 'mobile',
    }
    this.originLink = `https://ifanr.in/product/detail/${this.props.id}/`
    this.viewPCPage = this.viewPCPage.bind(this)
    this.viewMobilePage = this.viewMobilePage.bind(this)
  }

  viewPCPage() {
    this.setState({
      platform: 'pc',
    })
  }

  viewMobilePage() {
    this.setState({
      platform: 'mobile',
    })
  }

  render() {
    let {platform} = this.state
    return (
      <div className='product-preview-modal'>
        <div className='btn-group'>
          <a
            className='btn btn-default btn-sm btn-bordered'
            href={`${this.originLink}?platform=${platform}`} target='_blank'>新开网页查看</a>
          <button
            type='button'
            className='btn btn-default btn-sm btn-bordered'
            onClick={this.viewMobilePage}
          >查看移动端页面</button>
          <button
            type='button'
            className='btn btn-default btn-sm btn-bordered'
            onClick={this.viewPCPage}
          >查看 PC 端页面</button>
        </div>
        <div className={`product-preview-container ${platform}`}>
          <iframe
            allowFullScreen
            className='product-preview-iframe'
            src={`${this.originLink}?platform=${platform}`} />
        </div>
      </div>
    )
  }
}
