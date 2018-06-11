import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import $ from 'jquery'
require('bootstrap')

const ModalContainer = ComponsedComponent => class extends React.Component {
  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    $(this.r).modal({
      show: true,
      backdrop: false,
      keyboard: false,
    })
  }

  handleClose() {
    $(this.r).modal('hide')
    this.props.close()
  }

  render() {
    let modalHeader = null
    if (this.props.header) {
      modalHeader = (
        <div className='modal-header'>
          {this.props.headerCloseBtn && (
            <button className='close' onClick={this.handleClose}>
              <i className='iconpepe-close' />
            </button>
          )}
          <h4 className='modal-title'>{this.props.title}</h4>
        </div>
      )
    }

    return (
      <div>
        <div className='modal fade' ref={r => (this.r = r)} >
          <div className={`modal-dialog modal-${this.props.size}`}>
            <div className='modal-content'>
              {modalHeader}
              <div className='modal-body'>
                <ComponsedComponent {...this.props} close={this.handleClose} />
              </div>
            </div>
          </div>
        </div>
        <div className='modal-backdrop fade in' />
      </div>
    )
  }
}

/**
 * 模态窗口容器
 * @param  {[type]}  options.component 组件
 * @param  {[type]}  options.args 组件参数
 * @param  {String}  options.title     标题
 * @param  {Boolean} options.header    是否显示模态窗口头部（含关闭按钮）
 * @param  {String}  options.size。    模态尺寸：sm, md, lg
 * @return {[type]}                    销毁函数
 */
function modal({component, args = {}, title = '', header = true, size = 'md', headerCloseBtn = true}) {
  let dom = document.createElement('div')
  document.body.appendChild(dom)

  function close() {
    setTimeout(() => {
      if (dom === null) return
      unmountComponentAtNode(dom)
      document.body.removeChild(dom)
      dom = null
    }, 100)
  }

  const Container = ModalContainer(component)

  render(
    <Container
      {...args}
      close={close}
      title={title}
      header={header}
      size={size}
      headerCloseBtn={headerCloseBtn}
    />,
    dom
  )

  return close
}

export default modal
