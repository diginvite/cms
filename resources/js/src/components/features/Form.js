import React from 'react';
import { Button, Checkbox, Form, Icon, Radio } from 'semantic-ui-react';

const FeatureForm = props => {
  let nameError;
  if (props.nameError) {
    nameError = { 
      content: 'Please enter feature name', 
      pointing: 'below',
      }
  }else{
    nameError: false
  }

  let valueTypeError;
  if (props.valueTypeError) {
    valueTypeError = { 
      content: 'Please select value type', 
      pointing: 'below',
      }
  }else{
    valueTypeError: false
  }

  const options = [
    { key: 0, text: 'Fixed', value: 0 },
    { key: 1, text: 'Flexible', value: 1 },
  ]

  return(
    <React.Fragment>
      <Form onSubmit={(e) => props.onSubmit(e)}>
        <Form.Input
          error={nameError}
          fluid
          label='Package Name'
          placeholder='Ex. Premium'
          onChange={(e, meta) => props.onChange(e, meta)}
          value={props.name}
          name="name"
        />
        <Form.TextArea
          label='Description' 
          placeholder='Tell us more about this feature' 
          name="description"
          value={props.description}
          onChange={(e, meta) => props.onChange(e, meta)}
        />
        <Form.Radio
          label="Flexibility"
          toggle
          defaultChecked={props.valueType}
          value={props.valueType}
          name="valueType"
          size="mini"
          onChange={(e, meta) => props.onChange(e, meta)}
        />
        {/* <Form.Select
          error={valueTypeError}
          fluid
          label='Value Type'
          options={options}
          placeholder='Ex. Fixed'
          value={props.valueType}
          // defaultValue={props.valueType}
          name="valueType"
          onChange={(e, meta) => props.onChange(e, meta)}
        /> */}
        <Button type='submit' primary><Icon name='save' />Save</Button>
      </Form>
    </React.Fragment>
  )
}

export default FeatureForm;