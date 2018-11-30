import thunk from 'redux-thunk'
import {createAction, handleActions} from 'redux-actions'
import {createStore, applyMiddleware, compose} from 'redux'
import lock from '../components/lock'
import {fail} from './error-handle'
import _ from 'lodash'

let composeEnhancers = compose
if (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
}
const middlewares = [thunk]

export function configStore(one) {
  return createStore(
    one,
    composeEnhancers(applyMiddleware(...middlewares))
  )
}

export function standardListReducer(types) {
  if (_.result(types, 'length') !== 3) throw new Error('必须提供 3 种 actionType')
  return handleActions({
    [types[0]]: (state, action) => ({
      ...state,
      loading: true,
    }),
    [types[1]]: (state, action) => ({
      ...state,
      error: null,
      loading: false,
      meta: {
        ...action.payload.res.meta,
      },
      objects: [
        ...action.payload.res.objects,
      ],
      params: {
        ...action.payload.params,
      },
    }),
    [types[2]]: (state, action) => ({
      ...state,
      error: {
        ...action.payload,
      },
      loading: false,
    }),
  }, {
    error: null,
    loading: false,
    meta: null,
    objects: null,
    params: null,
  })
}

export function standardListActionCreator(types, io, path) {
  if (_.result(types, 'length') !== 3) throw new Error('必须提供 3 种 actionType')
  return function(req = {}) {
    const {
      locking,
      params,
    } = req
    return function(dispatch, getState) {
      let one = getState()
      if (path != null) {
        one = _.result(one, path)
      }
      if (one['loading']) return

      const unlock = lock(locking)
      dispatch(createAction(types[0])(params))
      return io(params)
        .then(res => {
          unlock()
          dispatch(createAction(types[1])({
            params,
            res: res.data,
          }))
        })
        .catch(err => {
          unlock()
          dispatch(createAction(types[2])(err))
          fail(err)
        })
    }
  }
}
