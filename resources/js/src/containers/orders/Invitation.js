import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { Tab, Button, Icon } from 'semantic-ui-react';
import readXlsxFile from 'read-excel-file';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {importInvitations, destroyInvitation, storeInvitation, updateInvitation} from '../../actions/order-action'

import InvitationImport from '../../components/invitations/Import';
import InvitationList from '../../components/invitations/List';
import InvitationForm from '../../components/invitations/Form';
import ModalConfirm from '../../components/modals/Confirm'

class Invitation extends Component {
  constructor(props){
    super(props)
    this.state = {
      invitations: [],
      invitationsTemp: [],
      file: '',
      alert: null,
      index: null,
      id: '',
      name: '',
      nameError: false,
      company: '',
      email: '',
      phone: '',
      form: false,
      formEdit: false,
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

  onChange2(e, {name, value}){
    this.setState({[name]: value}, () => {
      if (name === 'name') {
        if (value === '') {
          this.setState({nameError: true})
        }else{
          this.setState({nameError: false})
        }
      }
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

    if (flag === 'edit') {
      this.onEdit(i, data);
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

  onSubmit(){
    if (this.state.name === '') {
      this.setState({nameError: true})
    }else{
      const data = {
        name: this.state.name,
        company: this.state.company,
        email: this.state.email,
        phone: this.state.phone,
        orderId: this.props.order.id
      }
      this.props.storeInvitation(data).then(() => {
        toast.success("Data saved !", {
          position: toast.POSITION.TOP_RIGHT
        });
        this.setState({
          name: '',
          company: '',
          email: '',
          phone: ''
        })
      })      
    }
  }

  onEdit(i, data){
    this.setState({
      formEdit: true,
      index: i,
      id: data.id,
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
    })
  }

  onHide(){
    this.setState({
      formEdit: false,
      name: '',
      company: '',
      email: '',
      phone: ''
    })
  }

  onUpdate(){
    if (this.state.name === '') {
      this.setState({nameError: true})
    }else{
      const data = {
        id: this.state.id,
        name: this.state.name,
        company: this.state.company,
        email: this.state.email,
        phone: this.state.phone,
        orderId: this.props.order.id
      }
      this.props.updateInvitation(data).then(() => {
        toast.success("Data saved !", {
          position: toast.POSITION.TOP_RIGHT
        });
        let invitations = this.state.invitations;
        invitations[this.state.index] = data;
        this.setState({invitations: invitations})
      })      
    }
  }

  render(){
    const panes = [
      { menuItem: 'List', render: () => 
        <Tab.Pane>
          <Button type='button' primary onClick={() => this.setState({form: true})}><Icon name="plus circle" /> Add</Button>
          <br/>
          <br/>
          <InvitationList
            temp={false}
            data={this.state.invitations}
            onAction={(i, data, flag) => this.onAction(i, data, flag)}
          />
        </Tab.Pane> 
      },
      { 
        menuItem: 'Import', render: () => 
        <Tab.Pane>
          <InvitationImport
            onChange={() => this.onChange()}
            onUpload={() => this.onUpload()}
          />
          <br/>
          <InvitationList
            temp={true}
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
        <InvitationForm
          open={this.state.form}
          name={this.state.name}
          nameError={this.state.nameError}
          company={this.state.company}
          email={this.state.email}
          phone={this.state.phone}
          onHide={() => this.setState({form: false})}
          onChange={(e, meta) => this.onChange2(e, meta)}
          onSubmit={(e) => this.onSubmit(e)}
        />
        <InvitationForm
          open={this.state.formEdit}
          name={this.state.name}
          nameError={this.state.nameError}
          company={this.state.company}
          email={this.state.email}
          phone={this.state.phone}
          onHide={() => this.onHide()}
          onChange={(e, meta) => this.onChange2(e, meta)}
          onSubmit={(e) => this.onUpdate(e)}
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
    importInvitations: importInvitations,
    destroyInvitation: destroyInvitation,
    storeInvitation: storeInvitation,
    updateInvitation: updateInvitation
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Invitation));