import utils from '../utils'
import io from '../io'
import alert from './alert'

const notShowPages = [
  /merchant-dashboard\/miniapp\/$/,
]
const notShowBuyServiceBtnPages = [
  /merchant-dashboard\/miniapp\/$/,
]

window.addEventListener('load', function headerInit() {
  const serviceEndNotice =
`<div class="notice__buy-service">体验期已结束，请
  <a target="__blank" href="/pepe/merchant-dashboard/payment-plan/">购买服务</a>
</div>`
  const $ = document.querySelector.bind(document)

  function getNotice(plan_type, time) {
    let timeNotice = serviceEndNotice
    let tagNotice = '体验版'
    switch (plan_type) {
      case 'professional':
        tagNotice = '专业版'
        timeNotice = `（${utils.toFriendlyDate(time, true)} 到期）`
        break
      case 'trail':
        timeNotice = `（${utils.toFriendlyDate(time, true)} 体验到期）`
    }
    return {tagNotice, timeNotice}
  }

  function checkBuyServiceBtn() {
    let buyService = document.querySelector('.header__buy-service')

    for (let i = 0; i < notShowBuyServiceBtnPages.length; i++) {
      if (notShowBuyServiceBtnPages[i].test(window.location.href)) {
        return
      }
    }
    utils.className.rmClass(buyService, 'hidden')
  }

  function checkHeaderNotice() {
    let noticeTagElm = $('.notice__tag')
    let noticeTimeElm = $('.notice__time')
    let noticeContainer = $('.header__notice')
    let plan_type, valid_until

    io.getMiniapp()
      .then(({data}) => {
        valid_until = data.valid_until
        if (valid_until) {
          plan_type = data.plan_type
          utils.className.addClass(noticeTagElm, 'serving-notice')
        }
      })
      .catch(err => {
        alert(err)
      })
      .then(() => {
        let {tagNotice, timeNotice} = getNotice(plan_type, valid_until)
        noticeTimeElm.innerHTML = timeNotice
        noticeTagElm.innerHTML = tagNotice

        for (let i = 0; i < notShowPages.length; i++) {
          if (notShowPages[i].test(window.location.href)) {
            return
          }
        }
        utils.className.rmClass(noticeContainer, 'hidden')
      })
  }

  // main
  checkBuyServiceBtn()
  checkHeaderNotice()

  // release
  window.removeEventListener('load', headerInit)
})
