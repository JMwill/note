import React from 'react'
import Empty from './empty'
import utils from '../utils'

const Loading = () => (
  <div className='lock'>
    <div className='loader' />
    <div className='mask' />
  </div>
)

export default (ComposedComponent, load) =>
  class DetailComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        data: null,
        loading: true,
      }
    }

    componentWillMount() {
      load()
        .then(
          res => this.setState({data: res.data, loading: false}),
          err => {
            this.setState({loading: false})
            utils.fail(err)
          },
        )
    }

    render() {
      const {loading, data} = this.state
      return (loading)
        ? <Loading />
        : (data != null)
          ? <ComposedComponent {...this.props} {...data} />
          : <Empty />
    }
  }
