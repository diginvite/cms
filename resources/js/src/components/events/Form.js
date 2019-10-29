import React from 'react';
import { Button, Header, Image, Modal, Icon, Item, Form, Input, List, Grid} from 'semantic-ui-react';
import PlacesAutocomplete, {geocodeByAddress,getLatLng} from 'react-places-autocomplete';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditCouple = props => {
  let nameError;
  if (props.nameError) {
    nameError = { 
      content: 'Please enter name', 
      pointing: 'below',
      }
  }else{
    nameError: false
  }

  let startDateError;
  if (props.motherError) {
    startDateError = { 
      content: 'Please enter start date', 
      pointing: 'below',
      }
  }else{
    startDateError: false
  }

  let endDateError;
  if (props.childOfError) {
    endDateError = { 
      content: 'Please enter enter end date', 
      pointing: 'below',
      }
  }else{
    endDateError: false
  }

  let addressError;
  if (props.addressError) {
    addressError = { 
      content: 'Please enter enter address', 
      pointing: 'below',
      }
  }else{
    addressError: false
  }

  return(
    <Modal open={props.open}>
      <Modal.Header>Event Form</Modal.Header>
      <Modal.Content>
          <Form onSubmit={(e) => props.onSubmit(e)}>
            <Form.Input
              error={nameError}
              fluid
              label='Name'
              placeholder='Ex. Akad'
              onChange={(e, meta) => props.onChange(e, meta)}
              value={props.name}
              name="name"
            />
            <Form.Group widths="equal">
              &nbsp;&nbsp;&nbsp;
              <DatePicker
                selected={props.startDate}
                onChange={(date) => props.onDateChange(date, 'startDate')}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy HH:mm"
                name="startDate"
                customInput={<Form.Input
                  style={{width:'300px'}}
                  error={startDateError}
                  fluid
                  label='Satrt Date'
                  placeholder='Ex. Akad'
                />}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <DatePicker
                selected={props.endDate}
                onChange={(date) => props.onDateChange(date, 'endDate')}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy HH:mm"
                customInput={<Form.Input
                  style={{width:'300px'}}
                  error={startDateError}
                  fluid
                  label='End Date'
                />}
              />
            </Form.Group>
            <Form.TextArea
              error={addressError}
              label='Address' 
              placeholder='Ex. Jalan Kebangsaan' 
              name="address"
              value={props.address}
              onChange={(e, meta) => props.onChange(e, meta)}
            />
            <PlacesAutocomplete
              value={props.location}
              onChange={(e) => props.onLocationChange(e)}
              onSelect={(e) => props.onSelect(e)}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <>
                  <Input fluid icon='search' placeholder='Search...' {...getInputProps()} label='Location'
                placeholder='Ex. Jakarta'/>
                  <List divided relaxed>
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      return (
                        <List.Item {...getSuggestionItemProps(suggestion)}>
                          <List.Icon name='marker' size='large' verticalAlign='middle' />
                          <List.Content>
                            <List.Header as='a'>{suggestion.description}</List.Header>
                          </List.Content>
                        </List.Item>
                      );
                    })}
                  </List>
              </>
              )}
            </PlacesAutocomplete>
            <Form.TextArea
              label='Other Information (Optional)' 
              placeholder='Other Information (Optional)' 
              name="description"
              value={props.description}
              onChange={(e, meta) => props.onChange(e, meta)}
            />
            <Button type='submit' primary><Icon name='save' />Save</Button>
          </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button size="tiny" onClick={() => props.onHide()}><Icon name="times circle"/>Close</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default EditCouple;
