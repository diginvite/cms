import React from 'react';
import {Form, Button, Icon} from 'semantic-ui-react';

const InvitationForm = props => {
  return(
    <>
      <Form>
        <Form.Input type='text' placeholder='Search...' action>
          <input type="file" id="input" onChange={() => props.onChange()}/>
          <Button type='submit' color='blue' onClick={() => props.onUpload()}><Icon name="cloud upload"/> Upload</Button>
          </Form.Input>
      </Form>
    </>
  )
}

export default InvitationForm;