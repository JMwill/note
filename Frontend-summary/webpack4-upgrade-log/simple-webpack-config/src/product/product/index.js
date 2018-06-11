import _ from 'lodash/fp'
import React, {PureComponent} from 'react'
import $ from 'jquery'
import {Form, Text, Textarea} from 'react-form'
import {Link} from 'react-router-dom'

import config from '../../config'
import {scrollTop, withReactFromField, makeSimpleValidator, fail} from '../../utils'
import io from '../../io'

import alert from '../../components/alert'
import confirm from '../../components/confirm'
import Editor from '../../components/editor'
import InputAmount from '../../components/input-amount'
import InputInteger from '../../components/input-integer'
import InputLookup from '../../components/input-lookup'
import InputRadioGroup from '../../components/input-radio-group'
import lock from '../../components/lock'
import Step from '../../components/step'
import Uploader from '../../components/uploader'
import DraggableUploader from '../../components/dragable-uploader'

import shippingMethod from './shipping-method'
import Schema from './schema'
import ProductAttrEditor from './product-attr-editor'
import ProductCategoryEditor from './product-category-editor'
import ProductShelfEditor from './product-shelf-editor'
import ProductStockEditor from './product-stock-editor'
import ProductTagsEditor from './product-tags-editor'
import SalesModeSupplierEditor from './sales-mode-supplier-editor'

const EditorExt = withReactFromField(Editor)
const InputAmountExt = withReactFromField(InputAmount)
const InputIntegerExt = withReactFromField(InputInteger)
const InputLookupExt = withReactFromField(InputLookup)
const InputRadioGroupExt = withReactFromField(InputRadioGroup)
const ProductAttrEditorExt = withReactFromField(ProductAttrEditor)
const ProductShelfEditorExt = withReactFromField(ProductShelfEditor)
const ProductStockEditorExt = withReactFromField(ProductStockEditor)
const ProductTagsEditorExt = withReactFromField(ProductTagsEditor)
const UploaderExt = withReactFromField(Uploader)
const DraggableUploaderExt = withReactFromField(DraggableUploader)
const SalesModeSupplierEditorExt = withReactFromField(SalesModeSupplierEditor)
const SchemaExt = withReactFromField(Schema)

const validFields = [
  'cover_image',
  'description',
  'images',
  'priority',
  'skus',
  'summary',
  'title',
  'vendor',
  'novelty_index',
  'salesModeSupplier',
  'memo_schema',
]
const labels = {
  'skus': '至少要选择一个有效的 SKU',
}
const customRules = {
  novelty_index(val) {
    val = parseFloat(val, 10)
    if (val < 0 || val > 10) return '输入范围 0 至 10'
    return ''
  },
  salesModeSupplier(val) {
    if (!val) return '供应商未选择'
    if (val.sales_mode === 'consignment') {
      if (val.supplier == null) return '供应商未选择'
    }
  },
  memo_schema(val) {
    if (_.isEmpty(val)) return ''

    for (let i = 0; i < val.length; i++) {
      if (_.isEmpty(val[i].display_name)) return '留言名称不能为空'
    }

    const displayNameArray = _.uniq(_.map(_.prop('display_name'), val))
    if (displayNameArray.length != val.length) {
      return '留言名称不能重复'
    }
  },
}
const productValidator = makeSimpleValidator(validFields, labels, customRules)

const defaultKeys = [
  '发货时间',
  '发货地点',
  '发货类型',
  '售后时间',
  '包邮说明',
  '色差说明',
  '退换说明',
]

const productTypeDisplayName = config.makeEnumDisplayName('product_type')

class Product extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      tabs: [{id: 1, name: '设置商品品类'}, {id: 2, name: '编辑商品信息'}],
      active: props.category != null ? 2 : 1, // 如果没设置品类，默认显示品类选择
      category: props.category,
    }
    this.data = {
      shipping_rate: props.shipping_rate,
      shipping_rate_schedule: props.shipping_rate_schedule,
    }
    this.unloadShowMsg = false

    if (this.data.shipping_rate_schedule != null) {
      if (this.data.shipping_rate_schedule.charge_type === 'weight') {
        this.data.shipping_rate_schedule.sku = _.map(x => ({
          id: x.id,
          spec_list: x.spec_list,
          spec_str: x.spec_str,
          value: x.weight,
        }), props.skus)
      } else {
        this.data.shipping_rate_schedule.sku = []
      }
    }

    this.nextStep = this.nextStep.bind(this)
    this.prevStep = this.prevStep.bind(this)
    this.onCategoryChange = this.onCategoryChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onSkuChange = this.onSkuChange.bind(this)
  }

  getTabContentStyle(id) {
    return id === this.state.active ? {display: 'block'} : {display: 'none'}
  }

  nextStep() {
    if (this.state.category == null) {
      alert('请选择二级品类')
      return
    }

    this.setState({
      active: 2,
    })
  }

  prevStep() {
    if (this.props.id > 0) {
      this.setState({
        active: 1,
      })
    } else {
      confirm({
        message: '返回上一步将丢失当前录入的信息',
        ok: () => {
          this.setState({
            active: 1,
          })
        },
      })
    }
  }

  onCategoryChange(c) {
    this.setState({
      category: c,
    })
  }

  handleSubmit(value) {
    // TODO 物流方式
    if ($(':visible.FormError').length > 0) {
      setTimeout(function() {
        scrollTop('#shippingwrapAnchor', 40, true)
      }, 10)
      return
    }

    let id = this.props.id

    let postData = {...value}
    // 数据转换
    postData.shipping_rate = this.data.shipping_rate
    postData.shipping_rate_schedule = null

    if (this.data.shipping_rate_schedule != null) {
      postData.shipping_rate_schedule = {...this.data.shipping_rate_schedule}
      for (let i = 0; i < postData.shipping_rate_schedule.sku.length; i++) {
        const scheduleItem = postData.shipping_rate_schedule.sku[i]
        for (let j = 0; j < postData.skus.length; j++) {
          const skuItem = postData.skus[j]
          if (scheduleItem.spec_list === skuItem.spec_list) {
            skuItem.weight = scheduleItem.value
          }
        }
      }
      delete postData.shipping_rate_schedule.sku
    }

    postData.sales_mode = value.salesModeSupplier.sales_mode
    if (postData.sales_mode !== 'consignment') {
      postData.supplier = null
    } else {
      postData.supplier = value.salesModeSupplier.supplier
    }
    postData.shelf_ids = _.map(_.prop('id'))(value.shelf)
    // 品类
    if (this.state.category) {
      postData.category = this.state.category
    }
    if (!postData.model) {
      postData.model = null
    }
    postData.novelty_index = parseFloat(postData.novelty_index || 0, 10)

    delete postData.shelf
    delete postData.salesModeSupplier

    const unlock = lock()

    function onSuccess() {
      const {location} = this.props
      unlock()
      location.push('/product/')
    }

    function onFail(err) {
      unlock()
      fail(err)
    }

    if (!value.model) {
      value.model = null
    }

    if (id > 0) {
      io.updateProduct(id, postData)
        .then(onSuccess)
        .catch(onFail)
    } else {
      io.addProduct(postData)
        .then(onSuccess)
        .catch(onFail)
    }
  }

  onSkuChange(val) {
    if (this.shippingwrap == null) return

    const that = this
    shippingMethod(this.shippingwrap, {
      sku: val,
      shipping_rate: parseFloat(this.data.shipping_rate),
      shipping_rate_schedule: this.data.shipping_rate_schedule,
      onChange(newVal) {
        that.data.shipping_rate = newVal.shipping_rate
        that.data.shipping_rate_schedule = newVal.shipping_rate_schedule
      },
    })
  }

  onProductTypeChange(val) {
    if (val === 'virtual') {
      $('#shippingwrapAnchor').hide()
    } else {
      $('#shippingwrapAnchor').show()
    }
  }

  getDefaultValues() {
    const salesModeSupplier = {
      sales_mode: this.props.sales_mode,
      supplier: this.props.supplier,
    }

    return {
      attributes: this.props.attributes,
      discount_info: this.props.discount_info,
      cover_image: this.props.cover_image,
      description: this.props.description,
      images: this.props.images,
      model: this.props.model,
      notice: this.props.notice,
      priority: this.props.priority,
      shelf: this.props.shelf,
      skus: this.props.skus,
      status: this.props.status,
      summary: this.props.summary,
      title: this.props.title,
      vendor: this.props.vendor,
      tags: this.props.tags,
      purchase_limit: this.props.purchase_limit,
      novelty_index: this.props.novelty_index,
      product_type: this.props.product_type,
      memo_schema: this.props.memo_schema,
      search_keyword: this.props.search_keyword,
      salesModeSupplier,
    }
  }

  componentDidMount() {
    this.onSkuChange(this.props.skus)
    window.addEventListener(
      'beforeunload',
      e => (this.unloadShowMsg && (e.returnValue = '刷新页面将会丢失已选方案，确认刷新？')))
  }

  render() {
    const {
      all_specs,
      attributes,
      cover_image,
      discount_info,
      id,
      images,
      notice,
      skus,
      tags,
      product_type,
      status,
    } = this.props

    const formTitle = id > 0 ? '编辑商品' : '新增商品'

    const defaultValues = this.getDefaultValues()

    const isOffShelf = status === 'off_shelf'

    return (
      <div>
        <div className='product-wrap wrap js-wrap'>
          <div>
            <div className='detail-title'>{formTitle}</div>
            <Step tabs={this.state.tabs} active={this.state.active} />
          </div>
          <div style={this.getTabContentStyle(1)}>
            <div className='pepe-form'>
              <div className='pepe-form__bd'>
                <ProductCategoryEditor
                  onChange={this.onCategoryChange}
                  category={this.state.category}
                />
              </div>
              <div className='pepe-form__ft'>
                <button className='btn btn-primary' onClick={this.nextStep}>下一步</button>
              </div>
            </div>
          </div>
          <div style={this.getTabContentStyle(2)}>
            <Form
              defaultValues={defaultValues}
              onSubmit={this.handleSubmit}
              validate={productValidator}
              saveState={(state) => {
                const values = state.values
                this.unloadShowMsg = !_.isEqual(values, defaultValues)
              }}
              preSubmit={(values) => {
                this.unloadShowMsg = false
                return values
              }}
              onValidationFail={() => {
                setTimeout(function() {
                  scrollTop(':visible.FormError', 40, true)
                }, 50)
              }}
            >
              {({submitForm, values}) => {
                return (
                  <div>
                    <form className='pepe-form' onSubmit={submitForm}>
                      <div className='pepe-form__bd'>
                        <div className='pepe-form__bd-title'>
                          基础信息
                        </div>
                        <div className='pepe-form__group clearfix'>
                          <label className='pepe-form__label'>
                            <span className='pepe-form__required-icon'>*</span>商品名称
                          </label>
                          <div className='pepe-form__control'>
                            <Text field='title' className='form-control' placeholder='输入商品名称' />
                          </div>
                        </div>
                        <div className='pepe-form__group clearfix'>
                          <label className='pepe-form__label mt-0'>
                            <span className='pepe-form__required-icon'>*</span>商品简介
                          </label>
                          <div className='pepe-form__control'>
                            <Textarea field='summary' className='form-control' rows='4' placeholder='输入商品简介' />
                          </div>
                        </div>
                        <div className='pepe-form__group clearfix'>
                          <label className='pepe-form__label mt-0'>
                            <span className='pepe-form__required-icon'>*</span>商品类型
                          </label>
                          <div className='pepe-form__control checkbox'>
                            {id > 0 && (
                              <div>
                                {productTypeDisplayName(product_type)}
                              </div>
                            )}
                            {id === 0 && (
                              <div>
                                <InputRadioGroupExt
                                  options={[{label: '实体商品', value: 'physical'}, {label: '虚拟商品', value: 'virtual'}]}
                                  field='product_type'
                                  onChange={this.onProductTypeChange}
                                />
                                <div className='tips' style={{marginTop: '14px', fontSize: '14px', color: '#9ba4b0'}}>
                                (发布后无法修改)
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='pepe-form__group clearfix sales-mode-supplier-input-container'>
                          <label className='pepe-form__label'>
                            <span className='pepe-form__required-icon'>*</span>销售模式
                          </label>
                          <div className='pepe-form__control'>
                            <SalesModeSupplierEditorExt field='salesModeSupplier' />
                          </div>
                        </div>
                        <div className='pepe-form__group clearfix'>
                          <label className='pepe-form__label'>
                            新奇指数
                          </label>
                          <div className='pepe-form__control'>
                            <InputAmountExt
                              field='novelty_index'
                              className='form-control'
                              placeholder='输入商品新奇指数 0 至 10'
                              precise={1}
                            />
                          </div>
                        </div>
                        <div className='pepe-form__group clearfix'>
                          <label className='pepe-form__label'>
                            商品搜索关键字
                          </label>
                          <div className='pepe-form__control'>
                            <Text
                              field='search_keyword'
                              className='form-control'
                              placeholder='输入商品搜索关键字'
                            />
                          </div>
                        </div>
                        <div className='pepe-form__group clearfix'>
                          <label className='pepe-form__label' style={{marginTop: '7px'}}>
                            商品标签
                          </label>
                          <div className='pepe-form__control'>
                            <ProductTagsEditorExt field='tags' tags={tags} />
                          </div>
                        </div>
                        <div className='pepe-form__group clearfix'>
                          <label className='pepe-form__label mt-0'>
                            <span className='pepe-form__required-icon'>*</span>商品列表图
                          </label>
                          <div className='pepe-form__control'>
                            <UploaderExt
                              field='cover_image'
                              id={this.state.active}
                              imgs={cover_image}
                              width='600'
                              height='600'
                            />
                          </div>
                        </div>
                        <div className='pepe-form__group clearfix'>
                          <label className='pepe-form__label mt-0'>
                            <span className='pepe-form__required-icon'>*</span>商品轮播图
                          </label>
                          <div className='pepe-form__control'>
                            <DraggableUploaderExt
                              field='images'
                              id={this.state.active}
                              multiple
                              imgs={images}
                              width='800'
                              height='600'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='pepe-form__bd'>
                        <div className='pepe-form__bd-title'>
                          <span className='pepe-form__required-icon'>*</span>商品详情
                        </div>
                        <div className='pepe-form__group clearfix'>
                          <label className='pepe-form__label mt-0'>
                            细节描述
                          </label>
                          <div className='pepe-form__control'>
                            <EditorExt field='description' />
                          </div>
                        </div>
                        <div className='pepe-form__group clearfix'>
                          <label className='pepe-form__label'>
                            商品参数
                          </label>
                          <div className='pepe-form__control'>
                            <ProductAttrEditorExt
                              field='attributes'
                              items={attributes}
                              key_placeholder='参数名称'
                              value_placeholder='参数值'
                              name='__product_attributes'
                              key_example='如：重量'
                              value_example='如：400g'
                            />
                          </div>
                        </div>
                        <div className='pepe-form__group clearfix'>
                          <label className='pepe-form__label'>
                            商品所属品牌商
                          </label>
                          <div className='pepe-form__control'>
                            <InputLookupExt placeholder='请选择品牌商' type='VENDOR' field='vendor' />
                            <Link
                              target='__blank'
                              to='/inventory/vendor/create/'
                              className='pepe-form__link'
                            >
                              去新建
                            </Link>
                          </div>
                        </div>
                        <div className='pepe-form__group clearfix'>
                          <label className='pepe-form__label'>
                            售前须知
                          </label>
                          <div className='pepe-form__control'>
                            <ProductAttrEditorExt
                              field='notice'
                              items={notice}
                              default_key={defaultKeys}
                              key_placeholder='售前说明项'
                              value_placeholder='内容'
                              name='__product_notice'
                            />
                          </div>
                        </div>
                      </div>
                      <div className={`pepe-form__bd${isOffShelf ? '' : ' disabled'}`}>
                        <div className='pepe-form__bd-title'>
                          <span className='pepe-form__required-icon'>*</span>规格／库存
                        </div>
                        <ProductStockEditorExt
                          field='skus'
                          skus={skus}
                          all_specs={all_specs}
                          product_id={id}
                          onChange={this.onSkuChange}
                        />
                        <div className='clearfix' />
                      </div>
                      {(
                        <div className={`pepe-form__bd${isOffShelf ? '' : ' disabled'}`} id='shippingwrapAnchor'>
                          <div className='pepe-form__bd-title'>
                            <span className='pepe-form__required-icon'>*</span>物流
                          </div>
                          <div className='pepe-form__group clearfix'>
                            <label className='pepe-form__label'>
                              物流方式
                            </label>
                            <div className='pepe-form__control '>
                              <div ref={node => (this.shippingwrap = node)} />
                            </div>
                          </div>
                          <div className='clearfix' />
                        </div>
                      )}
                      <div className='pepe-form__bd'>
                        <div className='pepe-form__bd-title'>
                          其它
                        </div>
                        <div className='pepe-form__group clearfix'>
                          <label className='pepe-form__label'>
                            <span className='pepe-form__required-icon'>*</span>优先级
                          </label>
                          <div className='pepe-form__control'>
                            <InputIntegerExt field='priority' className='form-control' placeholder='请输入优先级' />
                          </div>
                        </div>
                        <div className='pepe-form__group clearfix'>
                          <label className='pepe-form__label'>
                            商品型号
                          </label>
                          <div className='pepe-form__control'>
                            <Text field='model' className='form-control' placeholder='输入商品型号' />
                          </div>
                        </div>
                        <div className='pepe-form__group clearfix'>
                          <label className='pepe-form__label'>
                            每人限购
                          </label>
                          <div className='pepe-form__control'>
                            <InputIntegerExt
                              field='purchase_limit'
                              className='form-control'
                              style={{width: '80px'}}
                            />
                            <span className='pepe-form__tips'>若为 0 则为不限购</span>
                          </div>
                        </div>
                        <div className='pepe-form__group clearfix'>
                          <label className='pepe-form__label'>
                            要求留言
                          </label>
                          <div className='pepe-form__control'>
                            <SchemaExt field='memo_schema' />
                          </div>
                        </div>
                        <div className='pepe-form__group clearfix'>
                          <label className='pepe-form__label mt-0'>
                            所属货架
                          </label>
                          <div className='pepe-form__control'>
                            <ProductShelfEditorExt field='shelf' />
                          </div>
                        </div>
                        <div className='pepe-form__group clearfix'>
                          <label className='pepe-form__label mt-0'>
                            商品状态
                          </label>
                          <div className='pepe-form__control checkbox'>
                            <InputRadioGroupExt
                              options={[{label: '已上架', value: 'in_stock'}, {label: '已下架', value: 'off_shelf'}]}
                              field='status'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='pepe-form__bd'>
                        <div className='pepe-form__bd-title'>
                          促销设置
                        </div>
                        <div className='pepe-form__group clearfix'>
                          <label className='pepe-form__label'>
                            促销信息
                          </label>
                          <div className='pepe-form__control'>
                            <ProductAttrEditorExt
                              field='discount_info'
                              items={discount_info}
                              key_placeholder='促销活动标题'
                              value_placeholder='说明'
                              name='__product_discount_info'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='pepe-form__ft'>
                        <a className='btn btn-default btn-bordered' onClick={this.prevStep}>上一步</a>
                        <button className='btn btn-primary' type='submit' style={{marginLeft: '12px'}}>提交</button>
                      </div>
                    </form>
                  </div>
                )
              }}
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

Product.defaultProps = {
  all_specs: [],
  attributes: [],
  category: null,
  cover_image: '',
  description: '',
  discount_info: [],
  free_shipping: true,
  id: 0,
  images: [],
  model: '',
  notice: [],
  novelty_index: null,
  priority: '',
  product_type: 'physical',
  purchase_limit: 0,
  sales_mode: 'consignment',
  shelf: [],
  shipping_rate: 0,
  shipping_rate_schedule: null,
  skus: [],
  status: 'off_shelf',
  summary: '',
  supplier: null,
  tags: null,
  title: '',
  vendor: null,
  memo_schema: [],
}

export default Product
