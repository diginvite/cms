import React from 'react';
import { Button, Header, Image, Modal, Icon, Item, Form, Input, List, Grid} from 'semantic-ui-react';

const PostForm = props => {
  let titleError;
  if (props.titleError) {
    titleError = { 
      content: 'Please enter Title', 
      pointing: 'below',
      }
  }else{
    titleError: false
  }

  let dateError;
  if (props.dateError) {
    dateError = { 
      content: 'Please enter date', 
      pointing: 'below',
      }
  }else{
    dateError: false
  }

  let descriptionError;
  if (props.descriptionError) {
    descriptionError = { 
      content: 'Please enter Description', 
      pointing: 'below',
      }
  }else{
    descriptionError: false
  }

  return(
    <Modal open={props.open}>
      <Modal.Header>Post Form</Modal.Header>
        <Modal.Content>
          <Form onSubmit={(e) => props.onSubmit(e)}>
            {
              !props.quote ?
              <>
                <Form.Input
                  error={titleError}
                  fluid
                  label='Title'
                  placeholder='Ex. Title'
                  onChange={(e, meta) => props.onChange(e, meta)}
                  value={props.title}
                  name="title"
                />
                <Form.Input
                  error={dateError}
                  fluid
                  label='date'
                  placeholder='Ex. 2019/10/10'
                  onChange={(e, meta) => props.onChange(e, meta)}
                  value={props.date}
                  name="date"
                  type="date"
                />
              </>
              : null
            }
            <Form.TextArea
              error={descriptionError}
              label='Description' 
              placeholder='Description' 
              name="description"
              value={props.description}
              onChange={(e, meta) => props.onChange(e, meta)}
              rows="5"
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

export default PostForm;
