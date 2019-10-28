import React, { Component } from 'react';
import {Link}  from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { Tab, Dimmer, Loader, Image, Segment  } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SweetAlert from 'react-bootstrap-sweetalert';

import TemplateList from '../../components/templates/List';
import TemplateEdit from '../../components/templates/FormEdit';
import TemplateForm from '../../components/templates/Form';
import Loading from '../../components/Loading';
import ModalConfirm from '../../components/modals/Confirm';

import {storeTemplate, getTemplates, toggleActiveTemplate, togglePremiumTemplate, destroyTemplate, updateTemplate} from '../../actions/template-action';

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      templates: [],
      id: '',
      index: null,
      name: '',
      nameError: false,
      domain: '',
      domianError: false,
      premium: false,
      description: '',
      data: [],
      alert: null,
      isLoading: true,
      edit: false,
    }
  }

  componentDidMount(){
    this.props.getTemplates().then(() => {
      this.setState({isLoading: false, templates: this.props.templates})
    })
  }

  onChange(e, { value, name }){
    if (name === 'premium') {
      this.setState({premium: !this.state.premium})
    }else{
      this.setState({
        [name]: value
      }, () => {
        if (name == 'name') {
          if (this.state.name == '') {
            this.setState({nameError: true})
          }else{
            this.setState({nameError: false})
          }
        }
        if (name == 'domain') {
          if (this.state.domain == '') {
            this.setState({domianError: true})
          }else{
            this.setState({domianError: false})
          }
        }
      });
    }
  }

  onSubmit(e){
    e.preventDefault();
    if (this.state.name === '') {
      this.setState({nameError: true});
    }else{
      if (this.state.domain === '') {
        this.setState({domianError: true});
      }else{
        const data = {
          name: this.state.name,
          description: this.state.description,
          domain: this.state.domain,
          premium: this.state.premium,
        }
        this.props.storeTemplate(data).then(() => {
          this.setState({name: '', description: '', domain: '', premium: false, templates: this.props.templates});
          toast.success("Data saved !", {
            position: toast.POSITION.TOP_RIGHT
          });
        });
      }
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
          onAction={(data, index) => this.onDestroy(data, index)}
        />
      );
      this.setState({alert: getContent()});
    }

    if (flag === 'toggleActive') {
      getContent = () => (
        <ModalConfirm
          index={i}
          data={data}
          header="Update Data"
          content="Are you sure to update this data?"
          onHide={() => {this.setState({alert: null})}}
          onAction={(data, index) => this.onToggleActive(data, index)}
        />
      );
      this.setState({alert: getContent()});
    }

    if (flag === 'togglePremium') {
      getContent = () => (
        <ModalConfirm
          index={i}
          data={data}
          header="Update Data"
          content="Are you sure to update this data?"
          onHide={() => {this.setState({alert: null})}}
          onAction={(data, index) => this.onTogglePremium(data, index)}
        />
      );
      this.setState({alert: getContent()});
    }

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

  onHideAlert(){
    this.setState({alert: null})
  }

  onToggleActive(data, i){
    this.onHideAlert()
    this.props.toggleActiveTemplate(i, data).then(() => {
      let templates = this.state.templates;
      templates[i].active = !templates[i].active;
      this.setState({templates: templates});
      this.onHideAlert()
      toast.success("Data updated !", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
  }

  onTogglePremium(data, i){
    this.props.togglePremiumTemplate(i, data).then(() => {
      let templates = this.state.templates;
      templates[i].premium = !templates[i].premium;
      this.setState({templates: templates});
      this.onHideAlert()
      toast.success("Data updated !", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
  }

  onDelete(data, i){
    this.props.destroyTemplate(i, data).then(() => {
      var templates = this.state.templates.filter(function(template) {
        return template.id !== data.id;
      });
      this.setState({templates: templates});
      this.onHideAlert()
      toast.success("Data deleted !", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
  }

  onEdit(i, data){
    this.setState({
      edit: true,
      name: data.name,
      domain: data.domain,
      premium: data.premium,
      description: data.description,
      index: i,
      id: data.id
    })
  }

  onUpdate(e){
    e.preventDefault();
    if (this.state.name === '') {
      this.setState({nameError: true});
    }else{
      if (this.state.domain === '') {
        this.setState({domianError: true});
      }else{
        const data = {
          name: this.state.name,
          description: this.state.description,
          domain: this.state.domain,
          premium: this.state.premium,
        }
        this.props.updateTemplate(this.state.id, data).then(() => {
          let templates = this.state.templates;
          templates[this.state.index].name = data.name;
          templates[this.state.index].description = data.description;
          templates[this.state.index].domain = data.domain;
          templates[this.state.index].premium = data.premium;
          this.setState({templates: templates});
          toast.success("Data saved !", {
            position: toast.POSITION.TOP_RIGHT
          });
        });
      }
    }
  }

  onHideFormEdit(){
    this.setState({name: '', description: '', domain: '', premium: false, edit: false});
  }

  render() {
      const panes = [
        {
          menuItem: { key: 'list', icon: 'list', content: 'List' },
          render: () => <Tab.Pane>
            <TemplateList
              data={this.state.templates}
              onAction={(i, data, flag) => this.onAction(i, data, flag)}
            />
          </Tab.Pane>,
        },
        {
          menuItem: { key: 'form', icon: 'edit', content: 'Form' },
          render: () => <Tab.Pane loading={false}>
            <TemplateForm
              name={this.state.name}
              nameError={this.state.nameError}
              domain={this.state.domain}
              domianError={this.state.domianError}
              premium={this.state.premium}
              description={this.state.description}
              onChange={(e, meta) => this.onChange(e, meta)}
              onSubmit={(e) => this.onSubmit(e)}
            />
          </Tab.Pane>,
        },
      ];
      if (this.state.isLoading) {
        return(
          <Loading/>
        )
      }
      return (
        <React.Fragment>
          <section className="content-header">
            <h1>
              Dashboard
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li className=""><Link to="/dashboard">Dashboard</Link></li>
              <li className="active">Template</li>
            </ol>
          </section>
          <section className="content">
            <div className="box box-border-radius">
              <div className="box-header with-border">
                <h3 className="box-title">Template</h3>
              </div>
              <div className="box-body">
                <div className="row">
                  <div className="col-md-12">
                    <Tab renderActiveOnly={true}  panes={panes} />
                  </div>
                </div>
              </div>
            </div>
          </section>
          {this.state.alert}
          <ToastContainer />
          <TemplateEdit
            open={this.state.edit}
            name={this.state.name}
            nameError={this.state.nameError}
            domain={this.state.domain}
            domianError={this.state.domianError}
            premium={this.state.premium}
            description={this.state.description}
            onChange={(e, meta) => this.onChange(e, meta)}
            onSubmit={(e) => this.onUpdate(e)}
            onHide={() => this.onHideFormEdit()}
          />
        </React.Fragment>
      );
  }
}

function mapStateToProps(state){
  return {
    templates: state.template.templates
  };
};
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getTemplates: getTemplates,
    storeTemplate: storeTemplate,
    toggleActiveTemplate: toggleActiveTemplate,
    togglePremiumTemplate: togglePremiumTemplate,
    destroyTemplate: destroyTemplate,
    updateTemplate: updateTemplate,
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Index));
