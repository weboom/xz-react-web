import * as React from 'react';
import {connect} from 'react-redux'
import { login } from '../../redux/user.redux'

const mapStateToProps = (state : any) => state;
const mapDispatchToProps = {
  login
}

class Base extends React.Component {

}

export default connect(mapStateToProps, mapDispatchToProps)(Base);