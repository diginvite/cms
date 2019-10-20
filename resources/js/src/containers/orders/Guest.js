import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';

import GuestList from '../../components/guests/List';

class Guest extends Component {
  render(){
    return(
      <>
        <GuestList
          data={this.props.order.guests}
        />
      </>
    )
  }
}

function mapStateToProps(state){
  return {
    order: state.order.order,
  };
};
function mapDispatchToProps(dispatch){
  return bindActionCreators({
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Guest));