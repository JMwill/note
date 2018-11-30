import React from 'react'
import _ from 'lodash/fp'

const StepWrap = (children) => (
  <ul className='pepe-step-wrap'>
    {children}
  </ul>
)

const StepItem = ({id, name, className}) => (
  <li className={className} key={id}>
    <span className='pepe-step__id'>{id}</span>
    <span className='pepe-step__name'>{name}</span>
  </li>
)

const toStepProps = (active) =>
  _.map(tab => {
    let className = ['pepe-step']
    if (tab.id < active) {
      className.push('preactive')
    }
    if (tab.id === active) {
      className.push('active')
    }

    return ({
      id: tab.id,
      name: tab.name,
      className: className.join(' '),
    })
  })

const Step = ({tabs = [], active = -1}) => {
  if (tabs.length === 0) return null

  return _.pipe(
    toStepProps(active),
    _.map(StepItem),
    StepWrap
  )(tabs)
}

export default Step
