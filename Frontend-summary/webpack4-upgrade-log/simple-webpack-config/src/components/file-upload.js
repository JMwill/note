import React, {PureComponent} from 'react'
import $ from 'jquery'
import _ from 'lodash'
import alert from './alert'
import utils from '../utils'

class FileUpload extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      img: props.img,
      content: null,
    }

    this.onChange = this.onChange.bind(this)
    this.onRemove = this.onRemove.bind(this)
  }

  onChange(e) {
    var that = this
    var files = $(this.file__node)[0].files
    if (files.length > 0) {
      if (_.indexOf(this.props.accept, files[0].type) > -1) {
        utils.getBase64(files[0], function(result) {
          var parts = result.split('base64,')
          var content = null
          if (parts.length > 1) {
            content = parts[1]
          }

          that.setState({
            content,
          })

          that.props.onChange(content)
        })
      } else {
        alert('请上传 ' + this.props.accept.join(',') + ' 格式的文件')
      }
    } else {
      this.props.onChange(null)
    }
  }

  onRemove() {
    this.setState({
      content: null,
    })

    this.props.onChange(null)
  }

  render() {
    if (this.state.content) {
      return (
        <div className='uploader clearfix' >
          <div className='uploader__img'>
            <div className={this.props.img} />
            <div className='uploader__remove' onClick={this.onRemove}>
              <div className='uploader__mask' />
              <div className='uploader__label'>移除文件</div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className='uploader clearfix'>
        <label className='uploader__btn'>
          <div className='uploader__action'>
            <i className='iconpepe-upload' />
            <div className='small muted mt-10'>上传文件</div>
          </div>
          <input
            type='file'
            onChange={this.onChange}
            style={{display: 'none'}}
            ref={node => (this.file__node = node)}
          />
        </label>
      </div>
    )
  }
}

FileUpload.defaultProps = {
  img: null,
  accept: [],
  onChange() {},
}

export default FileUpload
