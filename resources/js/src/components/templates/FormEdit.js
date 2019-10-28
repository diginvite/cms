import React from 'react'
import { Button, Header, Image, Modal, Icon, Form, Radio} from 'semantic-ui-react'

const FormEdit = (props) => {
  let nameError;
  if (props.nameError) {
    nameError = { 
      content: 'Please enter template name', 
      pointing: 'below',
      }
  }else{
    nameError: false
  }

  let domainError;
  if (props.domainError) {
    domainError = { 
      content: 'Please enter domain', 
      pointing: 'below',
      }
  }else{
    domainError: false
  }

  return(
    <Modal open={props.open}>
      <Modal.Header>{props.title}</Modal.Header>
      <Modal.Content>
        <Form onSubmit={(e) => props.onSubmit(e)}>
          <Form.Input
            error={nameError}
            fluid
            label='Template Name'
            placeholder='Ex. Premium'
            onChange={(e, meta) => props.onChange(e, meta)}
            value={props.name}
            name="name"
          />
          <Form.Input
            error={domainError}
            fluid
            label='Template Domain'
            placeholder='Ex. Premium'
            onChange={(e, meta) => props.onChange(e, meta)}
            value={props.domain}
            name="domain"
          />
          <Radio 
            toggle 
            label='Premium'
            fluid
            onChange={(e, meta) => props.onChange(e, meta)}
            defaultChecked={props.premium}
            value={props.premium}
            name="premium"
          />
          <Form.TextArea
            label='Description' 
            placeholder='Tell us more about this feature' 
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

export default FormEdit;