import React, {Component} from 'react'
import ReactQuill, {Quill} from 'react-quill'
import io from '../io'
import utils from '../utils'
import $ from 'jquery'

const Parchment = Quill.import('parchment')

class IndentAttributor extends Parchment.Attributor.Style {
  add(node, value) {
    if (value === 0) {
      this.remove(node)
      return true
    } else {
      return super.add(node, `${value}em`)
    }
  }
}

let indentStyle = new IndentAttributor('indent', 'text-indent', {
  scope: Parchment.Scope.BLOCK,
  whitelist: ['1em', '2em', '3em', '4em'],
})

let alignStyle = Quill.import('attributors/style/align')
let sizeStyle = Quill.import('attributors/style/size')
let fontStyle = Quill.import('attributors/style/font')
let colorStyle = Quill.import('attributors/style/color')
let backgroundStyle = Quill.import('attributors/style/background')
let directionStyle = Quill.import('attributors/style/direction')

Quill.register(alignStyle, true)
Quill.register(sizeStyle, true)
Quill.register(fontStyle, true)
Quill.register(indentStyle, true)
Quill.register(colorStyle, true)
Quill.register(backgroundStyle, true)
Quill.register(directionStyle, true)

const modules = {
  toolbar: {
    container: [
      [{'header': [1, 2, 3, 4, false]}, {'size': ['10px', false, '18px', '32px']}, {'font': []}],
      [{'color': []}, {'background': []}, 'bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        {'align': []},
        {'list': 'ordered'},
        {'list': 'bullet'},
        {'indent': '-1'},
        {'indent': '+1'},
        {'direction': 'rtl'},
      ],
      ['link', 'image'],
      ['clean'],
    ],
    handlers: {},
  },
}

class Editor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: props.content,
    }

    this.uploadImage = this.uploadImage.bind(this)
    this.openFileSelectBox = this.openFileSelectBox.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    const $node = $(this.quill_node)
    $(document).on('scroll', () => {
      const $header = $node.find('.ql-toolbar')
      const headerHeight = $header.height()
      const ot = $node.eq(0).offset().top
      const h = $node.height()
      const wt = $(document).scrollTop()
      if (wt >= ot + 70 && wt <= ot - headerHeight + h) {
        $header.css({
          top: '70px',
          position: 'fixed',
          backgroundColor: 'white',
          width: '600px',
          zIndex: '9999',
        })
        $node.css({
          paddingTop: '70px',
        })
      } else {
        $header.removeAttr('style')
        $node.removeAttr('style')
      }
    })
  }

  componentWillUnmount() {
    $(document).off('scroll')
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.content,
    })
  }

  openFileSelectBox(toolbar) {
    this.quill = toolbar.quill
    this.inputElement.click()
  }

  uploadImage(e) {
    let files = e.target.files
    if (files.length < 0) return

    if (files[0].type.indexOf('image') === -1) {
      return
    }

    utils.getBase64(files[0], result => {
      io.uploadImg({
        content: result,
      })
        .then(res => {
          const cursorPosition = this.quill.getSelection().index
          this.quill.insertEmbed(cursorPosition, 'image', res.data.url)
          this.quill.setSelection(cursorPosition + 1)
        })
    })

    this.inputElement.value = ''
  }

  onChange(value) {
    this.props.onChange(value)
  }

  render() {
    let self = this
    modules.toolbar.handlers = {
      image: function() { self.openFileSelectBox(this) },
    }

    return (
      <div className='pull-left js-scrolling-container' ref={node => (this.quill_node = node)}>
        <ReactQuill
          value={this.state.text}
          className='editor'
          modules={modules}
          onChange={this.onChange}
          scrollingContainer='body'
        />
        <input
          type='file'
          onChange={this.uploadImage}
          ref={input => (this.inputElement = input)}
          style={{visibility: 'hidden'}}
        />
      </div>
    )
  }
}

Editor.defaultProps = {
  content: '',
  onChange() {},
}

export default Editor
