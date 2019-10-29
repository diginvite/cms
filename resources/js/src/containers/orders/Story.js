import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { Tab, Button, Icon } from 'semantic-ui-react';
import readXlsxFile from 'read-excel-file';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {storePost, updatePost, destroyPost} from '../../actions/order-action'

import ModalConfirm from '../../components/modals/Confirm';
import PostList from '../../components/posts/List';
import PostForm from '../../components/posts/Form';

class Story extends Component {
  constructor(props){
    super(props)
    this.state = {
      form: false,
      formEdit: false,
      index: null,
      id: '',
      file: '',
      alert: null,
      title: '',
      titleError: false,
      date: '',
      dateError: false,
      description: '',
      descriptionError: false,
      stories: [],
    }
  }

  componentDidMount(){
    this.setState({stories: this.props.order.stories})
  }

  onChange(e, {name, value}){
    this.setState({[name]: value}, () => {
      if (name === 'title') {
        if (value === '') {
          this.setState({titleError: true})
        }else{
          this.setState({titleError: false})
        }
      }
      if (name === 'date') {
        if (value === '') {
          this.setState({dateError: true})
        }else{
          this.setState({dateError: false})
        }
      }
      if (name === 'description') {
        if (value === '') {
          this.setState({descriptionError: true})
        }else{
          this.setState({descriptionError: false})
        }
      }
    })
  }

  onSubmit(){
    if (this.state.title === '') {
      this.setState({titleError: true})
    }else{
      if (this.state.date === '') {
        this.setState({dateError: true})
      }else{
        if (this.state.description === '') {
          this.setState({descriptionError: true})
        }else{
          const data = {
            title: this.state.title,
            date: this.state.date,
            description: this.state.description,
            type: 'story',
            orderId: this.props.order.id
          }
          this.props.storePost(data).then(() => {
            toast.success("Data saved !", {
              position: toast.POSITION.TOP_RIGHT
            });
            this.setState({
              title: '',
              date: '',
              description: '',
              stories: this.props.order.stories
            })
          })      
        }
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
    let stories = this.state.stories;
    let storiesFiltered = stories.filter(function(story) {
      return story.id !== data.id;
    });
    this.props.destroyPost(data).then(() => {
      toast.success("Data deleted !", {
        position: toast.POSITION.TOP_RIGHT
      });
      this.setState({stories: storiesFiltered, alert: null})
    })
  }

  onEdit(i, data){
    this.setState({
      formEdit: true,
      index: i,
      id: data.id,
      title: data.title,
      date: data.date,
      description: data.description,
    })
  }

  onUpdate(){
    if (this.state.title === '') {
      this.setState({titleError: true})
    }else{
      if (this.state.date === '') {
        this.setState({dateError: true})
      }else{
        if (this.state.description === '') {
          this.setState({descriptionError: true})
        }else{
          const data = {
            id: this.state.id,
            title: this.state.title,
            date: this.state.date,
            description: this.state.description
          }
          this.props.updatePost(data).then(() => {
            toast.success("Data saved !", {
              position: toast.POSITION.TOP_RIGHT
            });
            let stories = this.state.stories;
            stories[this.state.index] = data;
            this.setState({stories: stories})
          })
        }
      }
    }  
  }

  onHide(){
    this.setState({
      formEdit: false,
      title: '',
      date: '',
      description: '',
    })
  }

  render(){
    return(
      <>
        <Button type='button' primary onClick={() => this.setState({form: true})}><Icon name="plus circle" /> Add</Button>
        <br/>
        <br/>
        <PostList
          data={this.state.stories}
          onAction={(i, data, flag) => this.onAction(i, data, flag)}
        />
        <PostForm
          quote={false}
          open={this.state.form}
          title={this.state.title}
          titleError={this.state.titleError}
          date={this.state.date}
          dateError={this.state.dateError}
          description={this.state.description}
          descriptionError={this.state.descriptionError}
          onHide={() => this.setState({form: false})}
          onChange={(e, meta) => this.onChange(e, meta)}
          onSubmit={(e) => this.onSubmit(e)}
        />
        <PostForm
          quote={false}
          open={this.state.formEdit}
          title={this.state.title}
          titleError={this.state.titleError}
          date={this.state.date}
          dateError={this.state.dateError}
          description={this.state.description}
          descriptionError={this.state.descriptionError}
          onHide={() => this.onHide()}
          onChange={(e, meta) => this.onChange(e, meta)}
          onSubmit={(e) => this.onUpdate(e)}
        />
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
    storePost: storePost,
    destroyPost: destroyPost,
    updatePost: updatePost
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Story));