import React from 'react'
import { Button, Header, Image, Modal, Icon, Form} from 'semantic-ui-react'

const ImageForm = (props) => {
  return(
    <Modal open={props.open}>
      <Modal.Header>{props.title}</Modal.Header>
      <Modal.Content image>
        {
          props.image === '' ?
          <Image wrapped size='medium' src='https://react.semantic-ui.com/images/wireframe/square-image.png' />
          :
          <Image wrapped size='medium' src={props.image} />
        }
        <Form onSubmit={(e) => props.onSubmit(e)}>
          <Form.Field inline>
            <Button
              size="mini"
              color='teal'
              content='Upload'
              icon='cloud upload'
              // labelPosition='left'
              primary
              onClick={() => props.onUpload()}
              type="button"
            />
            <br/>
            {
              props.imageError ?
              <Label basic color='red' pointing>
                Please Upload Image!
              </Label>
              : null
            }
          </Form.Field>
          <br/>
          <br/>
          <Form.TextArea
            label='Description (Optional)' 
            placeholder='Description (Optional)' 
            name="description"
            value={props.description}
            onChange={(e, meta) => props.onChange(e, meta)}
            style={{width:'500px'}}
            rows="5"
          />
          <Button type='submit' primary floated="right"><Icon name='save'/>Save</Button>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        {
          props.delete ?
          <Button size="tiny" onClick={() => props.onAction('i', 'data', 'destroy')} color="red"><Icon name="trash circle"/>Delete</Button>
          : null
        }
        <Button size="tiny" onClick={() => props.onHide()}><Icon name="times circle"/>Close</Button>
      </Modal.Actions>
    </Modal>
  )

}

export default ImageForm;