import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { Tab, Search, Grid, List, Input, Modal, Button, Icon} from 'semantic-ui-react';
import PlacesAutocomplete, {geocodeByAddress,getLatLng} from 'react-places-autocomplete';
import moment from 'moment';
import Moment from 'react-moment';
import { ToastContainer, toast } from 'react-toastify';

import ModalConfirm from '../../components/Modals/Confirm';
import EventMap from '../../components/events/Map';
import EventForm from '../../components/events/Form';
import EventList from '../../components/events/List';

import {storeEvent, updateEvent, destroyEvent} from '../../actions/order-action'

class Event extends Component{
  constructor(props) {
    super(props);
    const today = moment(new Date());  

    this.state = { 
      index: null,
      name: '',
      nameError: false,
      startDate: new Date(),
      startDateError: false,
      endDate: new Date(),
      endDateError: false,
      address: '',
      addressError: false,
      location: '',
      description: '',
      isLoading: false,
      form: false,
      formEdit: false,
      events: [],
      alert: null,
    };
  }

  componentDidMount(){
    this.setState({events: this.props.order.events})
  }

  onChange(e, {name, value}){
    this.setState({[name]: value}, () => {
      if (name === 'name') {
        if (value !== '') {
          this.setState({nameError: false})
        }
      }

      if (name === 'address') {
        if (value !== '') {
          this.setState({addressError: false})
        }
      }
    })
  }

  onLocationChange(location){
    this.setState({location: location})
  }

  onDateChange(data, name){
    this.setState({[name]: data})
  }

  onSelect(location){
    this.setState({location: location});
    geocodeByAddress(location)
      .then(results => getLatLng(results[0]))
      .then((latLng) => {
        this.setState({lat: latLng['lat'], long: latLng['lng']})
        // console.log('Success', latLng)
      })
      .catch(error => console.error('Error', error));
  };

  onSubmit(e){
    e.preventDefault();
    if (this.state.name === '') {
      this.setState({nameError: true})
    }else{
      if (this.state.address === '') {
        this.setState({addressError: true})
      }else{
        const data = {
          orderId: this.props.order.id,
          name: this.state.name,
          startDate: moment(this.state.startDate).format('YYYY-MM-DD HH:mm:ss'),
          endDate: moment(this.state.endDate).format('YYYY-MM-DD HH:mm:ss'),
          address: this.state.address,
          location: this.state.location,
          lat: this.state.lat,
          long: this.state.long,
          description: this.state.description
        }
        this.props.storeEvent(data).then(() => {
          this.setState({
            name: '',
            address: '',
            location: '',
            lat: '',
            long: '',
            description: '',
            events: this.props.order.events
          })
          toast.success("Data saved !", {
            position: toast.POSITION.TOP_RIGHT
          });
        })
        // console.log(data);
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

    if(flag === 'edit'){
      this.onEdit(i, data);
    }
  }

  onEdit(i, data){
    this.setState({
      index: i,
      id: data.id,
      name: data.name,
      address: data.address,
      location: data.location,
      lat: data.lat,
      long: data.long,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      description: data.description,
      formEdit: true
    })
  }

  onHide(){
    this.setState({formEdit: false})
  }

  onUpdate(){
    if (this.state.name === '') {
      this.setState({nameError: true})
    }else{
      if (this.state.address === '') {
        this.setState({addressError: true})
      }else{
        const data = {
          id: this.state.id,
          orderId: this.props.order.id,
          name: this.state.name,
          startDate: moment(this.state.startDate).format('YYYY-MM-DD HH:mm:ss'),
          endDate: moment(this.state.endDate).format('YYYY-MM-DD HH:mm:ss'),
          address: this.state.address,
          location: this.state.location,
          lat: this.state.lat,
          long: this.state.long,
          description: this.state.description
        }
        this.props.updateEvent(data).then(() => {
          let events = this.state.events;
          events[this.state.index] = data;
          this.setState({events: events});
          toast.success("Data updated !", {
            position: toast.POSITION.TOP_RIGHT
          });
        })
        // console.log(data);
      }
    }
  }

  onDestroy(data){
    this.props.destroyEvent(data).then(() => {
      const events = this.state.events.filter(function(couple) {
        return couple.id !== data.id
      });
      toast.success("Data deleted !", {
        position: toast.POSITION.TOP_RIGHT
      });
      this.setState({events: events, alert: null})
    })
  }

  render(){
    return(
      <React.Fragment>
        <Grid columns={2} style={{height: '500px'}}>
          <Grid.Column>
            <Button primary size="small" onClick={() => this.setState({form: true})}><Icon name="plus circle" /> Add</Button>
            <EventList
              data={this.state.events}
              onAction={(i, data, flag) => this.onAction(i, data, flag)}
            />
          </Grid.Column>
          <Grid.Column>
          <br/>
          <br/>
            <EventMap
              data={this.state.events}
              onAction={(i, data, flag) => this.onAction(i, data, flag)}
            />
          </Grid.Column>
        </Grid>
        <br/>
          <br/>

        <EventForm
          open={this.state.form}
          name={this.state.name}
          nameError={this.state.nameError}
          startDate={this.state.startDate}
          startDateError={this.startDateError}
          endDate={this.state.endDate}
          endDateError={this.state.endDateError}
          address={this.state.address}
          addressError={this.state.addressError}
          location={this.state.location}
          description={this.state.description}
          onHide={() => this.setState({form: false})}
          onChange={(e, meta) => this.onChange(e, meta)}
          onLocationChange={(e) => this.onLocationChange(e)}
          onDateChange={(e, name) => this.onDateChange(e, name)}
          onSelect={(e) => this.onSelect(e)}
          onSubmit={(e) => this.onSubmit(e)}
        />
        <EventForm
          open={this.state.formEdit}
          name={this.state.name}
          nameError={this.state.nameError}
          startDate={this.state.startDate}
          startDateError={this.startDateError}
          endDate={this.state.endDate}
          endDateError={this.state.endDateError}
          address={this.state.address}
          addressError={this.state.addressError}
          location={this.state.location}
          description={this.state.description}
          onHide={() => this.onHide()}
          onChange={(e, meta) => this.onChange(e, meta)}
          onLocationChange={(e) => this.onLocationChange(e)}
          onDateChange={(e, name) => this.onDateChange(e, name)}
          onSelect={(e) => this.onSelect(e)}
          onSubmit={(e) => this.onUpdate(e)}
        />
        <ToastContainer/>
        {this.state.alert}
      </React.Fragment>
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
    storeEvent: storeEvent,
    updateEvent: updateEvent,
    destroyEvent: destroyEvent,
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Event));