import * as React from 'react';
import apis from '../../apis';

export default class Welcome extends React.Component {
  public state = {
    list: []
  }

  public componentDidMount () {
    apis.getDemandList({}).then(res => {
      console.log(res);
    })
  }

  public render () {
    return (
      <div>
        Welcome
      </div>
    )
  }
}