import _ from 'lodash'
import alert from './alert'
import Cropper from 'react-cropper'
import io from '../io'
import lock from './lock'
import modal from './modal'
import React, {PureComponent} from 'react'
import utils from '../utils'

class CropperExt extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      src: null,
      formatIndex: props.formatIndex,
    }
    this.cropImage = this.cropImage.bind(this)
    this.onChange = this.onChange.bind(this)
    this.changeFormat = this.changeFormat.bind(this)
  }

  onChange(e) {
    e.preventDefault()
    let files
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    if (files.length > 0) {
      if (!_.includes(this.props.allowExt, files[0].type)) {
        alert(`只支持 ${this.props.allowExt.join(',')} 格式`)
        return
      }
      if (files[0].size > this.props.maxSize * 1024) {
        alert('上传的图片文件大小过大')
        return
      }
      const reader = new FileReader()
      reader.onload = () => {
        this.setState({src: reader.result})
      }
      reader.readAsDataURL(files[0])
    }
  }

  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return
    }

    const {close, ok} = this.props
    const unlock = lock(this.cropper_wrap)
    io.uploadImg({content: this.cropper.getCroppedCanvas().toDataURL()})
      .then(function(res) {
        unlock()
        close()
        ok(res.data.url)
      })
      .catch(function(err) {
        unlock()
        utils.fail(err)
      })
  }

  get activeFormat() {
    const {
      formatIndex,
    } = this.state
    return this.props.formats[formatIndex] || this.props.formats[0]
  }

  changeFormat(e) {
    let formatIndex = +e.target.dataset.index || 0
    this.setState({
      formatIndex,
    })
  }

  renderCropper() {
    if (this.state.src != null) {
      return (
        <div className=''>
          <Cropper
            style={{height: 400, width: '100%'}}
            aspectRatio={this.activeFormat.width / this.activeFormat.height}
            preview='.img-preview'
            guides={false}
            src={this.state.src}
            ref={cropper => { this.cropper = cropper }}
            autoCropArea={1}
            viewMode={1}
          />
          <div className='form-group text-center' style={{marginTop: '30px'}}>
            <button className='btn btn-primary' onClick={this.cropImage}>确定</button>
          </div>
        </div>
      )
    }
    return (
      <div style={{height: '479px', backgroundColor: '#f0f0f0'}} />
    )
  }

  render() {
    return (
      <div className='row' ref={(node) => { this.cropper_wrap = node }}>
        <div className='col-xs-3'>
          <div className='form-group' style={{paddingTop: '8px', overflow: 'hidden'}}>
            <input type='file' onChange={this.onChange} />
          </div>
          <ul className='tips'>
            <li>图片格式：PNG 或 JPEG</li>
            <li>建议尺寸：{this.activeFormat.width} x {this.activeFormat.height}</li>
            <li>图片大小：{this.props.maxSize}k 以内</li>
          </ul>
        </div>
        <div className='col-xs-9'>
          {
            this.props.formats.length > 1
              ? (<div className='cropper-format'>
                {_.map(this.props.formats, (format, index) => (
                  <label className='radio-inline' key={index}>
                    <input
                      type='radio'
                      name='format'
                      id={format + index}
                      data-index={index}
                      checked={index === this.state.formatIndex}
                      value={`${format.width} x ${format.height}`}
                      onChange={this.changeFormat} />
                    {`${format.width} x ${format.height}`}
                  </label>
                ))}
              </div>)
              : null
          }
          {this.renderCropper()}
        </div>
      </div>
    )
  }
}

CropperExt.defaultProps = {
  formats: [],
  formatIndex: 0,
}

class Uploader extends PureComponent {
  constructor(props) {
    super(props)

    this.id = props.id

    let defaultState = {
      limit: props.limit || 5,
      multiple: props.multiple,
    }
    if (props.multiple) {
      defaultState.imgs = props.imgs || []
    } else {
      if (props.imgs) {
        defaultState.imgs = [props.imgs]
      } else {
        defaultState.imgs = []
      }
    }

    this.state = defaultState

    this.handleRemove = this.handleRemove.bind(this)
    this.openCropper = this.openCropper.bind(this)
    this.handleCallback = this.handleCallback.bind(this)
  }

  get formats() {
    let {formats} = this.props
    if (!formats.length) {
      formats = [{
        width: this.props.width,
        height: this.props.height,
      }]
    }
    return formats
  }

  componentWillReceiveProps(nextProps) {
    if (this.id && this.id !== nextProps.id) {
      this.setState({
        imgs: [],
      })
      this.id = nextProps.id
    }
  }

  handleRemove(src) {
    let imgs = this.state.imgs.filter(t => t !== src)
    this.setState({
      imgs,
    })
    this.handleCallback(imgs)
  }

  openCropper() {
    const that = this

    modal({
      component: CropperExt,
      args: {
        allowExt: that.props.allowExt,
        maxSize: that.props.maxSize,
        width: that.props.width,
        height: that.props.height,
        formats: that.formats,
        ok: function(src) {
          let imgs = [...that.state.imgs, src]
          that.setState({
            imgs,
          })
          that.handleCallback(imgs)
        },
      },
      header: true,
      title: '图片编辑器',
      size: 'lg',
    })
  }

  handleCallback(imgs) {
    let val = imgs
    if (!this.props.multiple) {
      val = imgs[imgs.length - 1] || ''
    }
    this.props.onChange && this.props.onChange(val)
  }

  renderImgs() {
    let imgs = this.state.imgs
    if (!this.state.multiple && imgs.length > 0) { // 防止延迟，显示多张图片
      imgs = [imgs[imgs.length - 1]]
    }

    return imgs.map((src, i) => (
      <div className='uploader__img' key={i}>
        <a
          title='查看原图'
          target='_blank'
          href={src}
          style={{backgroundImage: `url(${src})`}}
        />
        <div className='uploader__remove' onClick={() => { this.handleRemove(src) }}>
          <div className='uploader__mask' />
          <div className='uploader__label'>移除图片</div>
        </div>
      </div>
    ))
  }

  renderBtn() {
    if (!this.state.multiple && this.state.imgs.length > 0) {
      return null
    } else if (this.state.multiple && this.state.imgs.length >= this.state.limit) {
      return null
    }
    return (
      <div className='uploader__btn' title='上传图片' onClick={this.openCropper}>
        <div className='uploader__action'>
          <i className='iconpepe-upload' />
          <div className='small muted mt-10'>上传图片</div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='uploader'>
        {this.renderImgs()}
        {this.renderBtn()}
      </div>
    )
  }
}

Uploader.defaultProps = {
  maxSize: 500,
  width: 800,
  height: 600,
  allowExt: ['image/jpeg', 'image/png'],
  imgs: [],
  formats: [],
}

export default Uploader
