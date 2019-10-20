import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { Tab } from 'semantic-ui-react';
import readXlsxFile from 'read-excel-file';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {importInvitations, destroyInvitation} from '../../actions/order-action'

import InvitationForm from '../../components/invitations/Form';
import InvitationList from '../../components/invitations/List';
import ModalConfirm from '../../components/modals/Confirm'

class Invitation extends Component {
  constructor(props){
    super(props)
    this.state = {
      invitations: [],
      invitationsTemp: [],
      file: '',
      alert: null,
    }
  }

  componentDidMount(){
    this.setState({invitations: this.props.order.invitations})
  }

  onChange(){
    const input = document.getElementById('input')
    readXlsxFile(input.files[0]).then((rows) => {
      let invitations = [];
      for (let i = 0; i < rows.length; i++) {
        if (i > 0) {
          const data = {
            name: rows[i][1],
            company: rows[i][2],
            email: rows[i][3],
            phone: rows[i][4],
          }
          invitations.push(data);
        }
      }
      this.setState({invitationsTemp: invitations})
    })
  }

  onUpload(){
    if (this.state.invitationsTemp.length <= 0) {
      toast.warn("Please select data before upload!", {
        position: toast.POSITION.TOP_RIGHT
      });
    }else{
      const data = {
        orderId: this.props.order.id,
        invitations: this.state.invitationsTemp
      }
      this.props.importInvitations(data).then(() => {
        toast.success("Data saved !", {
          position: toast.POSITION.TOP_RIGHT
        });
        this.setState({
          invitationsTemp: [],
          invitations: this.props.order.invitations,
        })
      });
    }
  }

  onAction(i, data, flag){
    let getContent;
    if (flag === 'destroy') {
      getContent = () => (
        <ModalConfirm
          index={i}
          data={data}
          header="Delete Data"
          content="Are you sure to delete this data?"
          onHide={() => {this.setState({alert: null})}}
          onAction={(data, index) => this.onDelete(data, index)}
        />
      );
      this.setState({alert: getContent()});
    }
  }

  onDelete(data, index){
    let invitations = this.state.invitations;
    let invitationsFiltered = invitations.filter(function(invitation) {
      return invitation.id !== data.id;
    });
    this.props.destroyInvitation(data).then(() => {
      toast.success("Data deleted !", {
        position: toast.POSITION.TOP_RIGHT
      });
      this.setState({invitations: invitationsFiltered, alert: null})
    })
  }

  onAction2(i, data, flag){
    let getContent;
    if (flag === 'destroy') {
      getContent = () => (
        <ModalConfirm
          index={i}
          data={data}
          header="Delete Data"
          content="Are you sure to delete this data?"
          onHide={() => {this.setState({alert: null})}}
          onAction={(data, index) => this.onDelete2(data, index)}
        />
      );
      this.setState({alert: getContent()});
    }
  }

  onDelete2(data, index){
    let invitations = this.state.invitationsTemp;
    let invitationsFiltered = invitations.filter(function(invitation) {
      return invitation !== data;
    });
    toast.success("Data deleted !", {
      position: toast.POSITION.TOP_RIGHT
    });
    this.setState({invitationsTemp: invitationsFiltered, alert: null})
  }

  render(){
    const panes = [
      { menuItem: 'List', render: () => 
        <Tab.Pane>
          <InvitationList
            data={this.state.invitations}
            onAction={(i, data, flag) => this.onAction(i, data, flag)}
          />
        </Tab.Pane> 
      },
      { 
        menuItem: 'Form', render: () => 
        <Tab.Pane>
          <InvitationForm
            onChange={() => this.onChange()}
            onUpload={() => this.onUpload()}
          />
          <br/>
          <InvitationList
            data={this.state.invitationsTemp}
            onAction={(i, data, flag) => this.onAction2(i, data, flag)}
          />
        </Tab.Pane> 
      },
    ]
    return(
      <>
        <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
        <ToastContainer/>
        {this.state.alert}
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
    importInvitations: importInvitations,
    destroyInvitation: destroyInvitation
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Invitation));