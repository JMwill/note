/* eslint-disable */
import * as activity from './activity'
import * as ad from './ad'
import * as media from './media'
import * as miniapp from './miniapp'
import * as miniappTheme from './miniapp-theme'
import * as miniappVersion from './miniapp-version'
import * as miniappWechatPay from './miniapp-wechat-pay'
import * as order from './order'
import * as product from './product'
import * as refund from './refund'
import * as shelf from './shelf'
import * as shelfCategory from './shelf-category'
import * as supplier from './supplier'
import * as vendor from './vendor'
import * as logistics from './logistics'
import * as supplierBill from './supplier-bill'
import * as paymentPlan from './payment-plan'
import * as category from './category'

module.exports = {
  ...paymentPlan,
  ...activity,
  ...ad,
  ...order,
  ...product,
  ...refund,
  ...shelf,
  ...shelfCategory,
  ...vendor,
  ...logistics,
  ...supplier,
  ...miniapp,
  ...miniappTheme,
  ...miniappWechatPay,
  ...miniappVersion,
  ...media,
  ...supplierBill,
  ...category,
}
