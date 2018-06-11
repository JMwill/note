import React, {PureComponent} from 'react'

class ImgPreview extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      current: 0,
    }

    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
  }

  prev() {
    this.setState(e => ({current: e.current - 1}))
  }

  next() {
    this.setState(e => ({current: e.current + 1}))
  }

  render() {
    if (this.props.imgs.length === 0) return null

    const styles = {
      prev: {
        visibility: (this.state.current > 0 ? 'visible' : 'hidden'),
      },
      next: {
        visibility: (this.state.current < this.props.imgs.length - 1 ? 'visible' : 'hidden'),
      },
    }

    return (
      <div className='img-preview'>
        <div className='img-preview__prev' onClick={this.prev} style={styles.prev}>
          <i className='glyphicon glyphicon-chevron-left' />
        </div>
        <div className='img-preview__content'>
          <img src={this.props.imgs[this.state.current]} alt='' />
        </div>
        <div className='img-preview__next' onClick={this.next} style={styles.next}>
          <i className='glyphicon glyphicon-chevron-right' />
        </div>
      </div>
    )
  }
}

ImgPreview.defaultProps = {
  imgs: [],
}

export default ImgPreview
