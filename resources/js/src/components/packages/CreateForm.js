import React from 'react';
import { Button, Checkbox, Form, Icon } from 'semantic-ui-react';

const CreateForm = props => {
  let nameError;
  if (props.nameError) {
    nameError = { 
      content: 'Please enter package name', 
      pointing: 'below',
      }
  }else{
    nameError: false
  }

  return(
    <React.Fragment>
      <Form onSubmit={(e) => props.onSubmit(e)}>
        <Form.Input
          error={nameError}
          fluid
          label='Package Name'
          placeholder='Ex. Premium'
          onChange={(e) => props.onChange(e)}
          value={props.name}
          name="name"
        />
        <Form.TextArea
          label='Description' 
          placeholder='Tell us more about this pacakge' 
          name="description"
          value={props.description}
          onChange={(e) => props.onChange(e)}
        />
        <Button type='submit' primary><Icon name='save' />Save</Button>
      </Form>
    </React.Fragment>
  )
}

export default CreateForm;