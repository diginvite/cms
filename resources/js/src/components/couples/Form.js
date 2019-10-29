import React from 'react';
import { Button, Checkbox, Form, Icon, Image, Label} from 'semantic-ui-react';

const CoupleForm = props => {
  let nameError;
  if (props.nameError) {
    nameError = { 
      content: 'Please enter name', 
      pointing: 'below',
      }
  }else{
    nameError: false
  }

  let fatherError;
  if (props.fatherError) {
    fatherError = { 
      content: 'Please eneter father name', 
      pointing: 'below',
      }
  }else{
    fatherError: false
  }

  let motherError;
  if (props.motherError) {
    motherError = { 
      content: 'Please enter mother name', 
      pointing: 'below',
      }
  }else{
    motherError: false
  }

  let childOfError;
  if (props.childOfError) {
    childOfError = { 
      content: 'Please enter enter child of', 
      pointing: 'below',
      }
  }else{
    childOfError: false
  }

  return(
    <React.Fragment>
      <Form onSubmit={(e) => props.onSubmit(e)}>
        <center>
          {
            props.image === '' ?
            <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size="small" circular bordered/>
            :
            <Image src={props.image} size="small" circular bordered/>
          }
          <br/>
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
        </center>
        <Form.Group widths='equal'>
          <Form.Input
            // error={nameError}
            fluid
            label='First Degree'
            placeholder='Ex. Drs'
            onChange={(e, meta) => props.onChange(e, meta)}
            value={props.firstDegree}
            name="firstDegree"
          />
          <Form.Input
            error={nameError}
            fluid
            label='Name'
            placeholder='Ex. Jhon Doe Jr.'
            onChange={(e, meta) => props.onChange(e, meta)}
            value={props.name}
            name="name"
          />
          <Form.Input
            // error={nameError}
            fluid
            label='Last Degree'
            placeholder='Ex. S.Kom'
            onChange={(e, meta) => props.onChange(e, meta)}
            value={props.lastDegree}
            name="lastDegree"
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            error={fatherError}
            fluid
            label='Father'
            placeholder='Ex. Jhon Doe'
            onChange={(e, meta) => props.onChange(e, meta)}
            value={props.father}
            name="father"
          />
          <Form.Input
            error={motherError}
            fluid
            label='Mother'
            placeholder='Ex. Elis Doe'
            onChange={(e, meta) => props.onChange(e, meta)}
            value={props.mother}
            name="mother"
          />
          <Form.Input
            error={childOfError}
            fluid
            label='Child of'
            placeholder='Ex. 2'
            onChange={(e, meta) => props.onChange(e, meta)}
            value={props.childOf}
            name="childOf"
            type="number"
          />
        </Form.Group>
        <Form.TextArea
          label='Other Information (Optional)' 
          placeholder='Other Information (Optional)' 
          name="description"
          value={props.description}
          onChange={(e, meta) => props.onChange(e, meta)}
        />
        <Button type='submit' primary><Icon name='save' />Save</Button>
      </Form>
    </React.Fragment>
  )
}

export default CoupleForm;