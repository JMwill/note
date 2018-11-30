import _ from 'lodash'
import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

import config from '../../config'
import {scrollTop} from '../../utils'

import Empty from '../../components/empty'
import Paginator from '../../components/paginator'

import CategoryTable from './table'
import * as actions from './redux'

const defaultLimit = config.getAppConfig('limit')

class CategoryList extends PureComponent {
  constructor(props) {
    super(props)
    this.go = this.go.bind(this)
  }

  componentDidMount() {
    this.props.getCategoryList({
      params: {
        offset: 0,
        limit: defaultLimit + 1,
        category_type: this.props.type,
      },
    })
  }

  go(offset) {
    scrollTop()

    let actualLimit = defaultLimit
    let actualOffset = offset

    if (offset === 0) { // first page
      actualLimit += 1
    } else if (offset + defaultLimit >= this.props.meta.total_count) { // last page
      actualLimit += 1
      actualOffset -= 1
    } else {
      actualLimit += 2
      actualOffset -= 1
    }

    const newParams = {
      ...this.props.params,
      limit: actualLimit,
      offset: actualOffset,
    }

    this.props.getCategoryList({
      params: newParams,
    })
  }

  render() {
    const {
      objects,
      meta,
      category_status_dirty,
      category_priorities,

      changePriority,
      reloadCategoryList,
      updateCategoryStatus,
      type,
    } = this.props

    if (objects === null) return null

    if (_.result(objects, 'length') === 0) {
      return (
        <Empty />
      )
    }

    let offset = meta.offset
    if (meta.offset !== 0) {
      offset += 1
    }

    const hasPrev = (offset - defaultLimit >= 0)
    const hasNext = (offset + defaultLimit < meta.total_count)

    const newMeta = {
      ...meta,
      offset,
      limit: defaultLimit,
    }

    return (
      <div className='shelf-list-container'>
        <CategoryTable
          type={type}
          category_status_dirty={category_status_dirty}
          priorities={category_priorities}
          items={objects}
          hasPrev={hasPrev}
          hasNext={hasNext}
          onChangePriority={changePriority}
          reloadCategoryList={reloadCategoryList}
          onUpdateCategoryStatus={updateCategoryStatus}
        />
        <div className='pagination-wrap'>
          <Paginator
            {...newMeta}
            go={this.go}
          />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    ...state.category_list,
    category_priorities: state.category_priorities,
    category_status_dirty: state.category_status_dirty,
  }),
  actions
)(CategoryList)
