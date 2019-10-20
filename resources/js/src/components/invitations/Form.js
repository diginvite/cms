import React from 'react';
import { Button, Header, Image, Modal, Icon, Item, Form, Input, List, Grid} from 'semantic-ui-react';

const InvitationForm = props => {
  let nameError;
  if (props.nameError) {
    nameError = { 
      content: 'Please enter name', 
      pointing: 'below',
      }
  }else{
    nameError: false
  }

  return(
    <Modal open={props.open}>
      <Modal.Header>Invitation Form</Modal.Header>
        <Modal.Content>
          <Form onSubmit={(e) => props.onSubmit(e)}>
            <Form.Group widths="equal">
              <Form.Input
                error={nameError}
                fluid
                label='Name'
                placeholder='Ex. Jhon Doe'
                onChange={(e, meta) => props.onChange(e, meta)}
                value={props.name}
                name="name"
              />
              <Form.Input
                // error={nameError}
                fluid
                label='Company'
                placeholder='Ex. PT. ABC'
                onChange={(e, meta) => props.onChange(e, meta)}
                value={props.company}
                name="company"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                // error={nameError}
                fluid
                label='Email'
                placeholder='Ex. jhondoe@diginvite.com'
                onChange={(e, meta) => props.onChange(e, meta)}
                value={props.email}
                name="email"
                type="email"
              />
              <Form.Input
                // error={nameError}
                fluid
                label='Phone'
                placeholder='Ex. 0812345678'
                onChange={(e, meta) => props.onChange(e, meta)}
                value={props.phone}
                name="phone"
              />
            </Form.Group>
            <Button type='submit' primary><Icon name='save' />Save</Button>
          </Form>
        </Modal.Content>
      <Modal.Actions>
        <Button size="tiny" onClick={() => props.onHide()}><Icon name="times circle"/>Close</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default InvitationForm;
