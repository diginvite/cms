import React, { Component } from 'react';
import {Link}  from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';

// import CategoryList from '../../components/posts/List';

// import {getPosts, destroyPost, toggleActivePost, togglePublishPost} from '../../actions/post-action';

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      createForm: false,
    }
  }

  handleDelete(data) {
    // let result = confirm("Want to delete?");
    // if (result) {
    //   this.props.destroyPost(data);
    // }    
  }

  handleToggleActive(data, i){
    // this.props.toggleActivePost(data, i);
  }

  handleTogglePublish(data, i){
    // this.props.togglePublishPost(data, i);
  }

  render() {
      return (
        <React.Fragment>
          <section className="content-header">
            <h1>
              Dashboard
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li className=""><Link to="/dashboard">Dashboard</Link></li>
              <li className="active">Feature</li>
            </ol>
          </section>
          <section className="content">
            <div className="box box-border-radius">
              <div className="box-header with-border">
                <h3 className="box-title">Feature</h3>
              </div>
              <div className="box-body">
                <div className="row">
                  <div className="col-md-12">
                    {/* <Link to="/post/create" className="btn btn-sm btn-primary button-border-radius"><i className="fa fa-plus-circle"></i> Create</Link> */}
                    {/* <CategoryList
                      data={this.props.posts}
                      onDelete={(data) => this.handleDelete(data)}
                      onPublish={(data, i) => this.handleTogglePublish(data, i)}
                      onActive={(data, i) => this.handleToggleActive(data, i)}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      );
  }
}

function mapStateToProps(state){
  return {
    // posts: state.post.posts,
  };
};
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    // getPosts: dispatch(getPosts()),
    // destroyPost: destroyPost,
    // toggleActivePost: toggleActivePost,
    // togglePublishPost: togglePublishPost,
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Index));
