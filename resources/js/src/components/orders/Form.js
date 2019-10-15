import React from 'react';
import { Button, Checkbox, Form, Icon } from 'semantic-ui-react';

const OrderForm = props => {
  let nameError;
  if (props.nameError) {
    nameError = { 
      content: 'Please enter name', 
      pointing: 'below',
      }
  }else{
    nameError: false
  }

  let domainError;
  if (props.domainError) {
    domainError = { 
      content: 'Please enter domain name', 
      pointing: 'below',
      }
  }else{
    domainError: false
  }

  let emailError;
  if (props.emailError) {
    emailError = { 
      content: 'Please enter email', 
      pointing: 'below',
      }
  }else{
    emailError: false
  }

  let phoneError;
  if (props.phoneError) {
    phoneError = { 
      content: 'Please enter phone number', 
      pointing: 'below',
      }
  }else{
    phoneError: false
  }

  let packageIdError;
  if (props.packageIdError) {
    packageIdError = { 
      content: 'Please select package', 
      pointing: 'below',
      }
  }else{
    packageIdError: false
  }

  let options = [];
  var sellingPrice = 0;
  for (let i = 0; i < props.packages.length; i++) {
    if (props.packages[i]["priceActive"] !== null) {
      sellingPrice = props.packages[i]["priceActive"]["sellingPrice"];
    }

    let data = {
      key: props.packages[i]["id"],
      text: props.packages[i]["name"]+' ('+sellingPrice+')',
      value: props.packages[i]["id"],
    }
    options.push(data);
  }

  return(
    <React.Fragment>
      <Form onSubmit={(e) => props.onSubmit(e)}>
        <Form.Group widths="two">
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
            error={domainError}
            fluid
            label='Domain'
            placeholder='Ex. jhondoe'
            onChange={(e, meta) => props.onChange(e, meta)}
            value={props.domain}
            name="domain"
          />
        </Form.Group>
        <Form.Group widths="three">
          <Form.Input
            error={emailError}
            fluid
            label='Email'
            placeholder='Ex. jhondoe@diginvite.com'
            onChange={(e, meta) => props.onChange(e, meta)}
            value={props.email}
            name="email"
            type="email"
          />
          <Form.Input
            error={phoneError}
            fluid
            label='Phone'
            placeholder='Ex. 08123456789'
            onChange={(e, meta) => props.onChange(e, meta)}
            value={props.phone}
            name="phone"
            type="number"
          />
          <Form.Input
            // error={nameError}
            fluid
            label='Company'
            placeholder='Ex. PT. Diginvite'
            onChange={(e, meta) => props.onChange(e, meta)}
            value={props.company}
            name="company"
          />
        </Form.Group>
        <Form.TextArea
          label='Address' 
          placeholder='Your Addrees' 
          name="address"
          value={props.address}
          onChange={(e, meta) => props.onChange(e, meta)}
        />
        <Form.TextArea
          label='Description' 
          placeholder='Tell us more about this order' 
          name="description"
          value={props.description}
          onChange={(e, meta) => props.onChange(e, meta)}
        />
        <Form.Select
          error={packageIdError}
          fluid
          label='Package'
          options={options}
          placeholder='Ex. Premium'
          value={props.packageId}
          defaultValue={props.packageId}
          name="packageId"
          onChange={(e, meta) => props.onChange(e, meta)}
        />
        <Button type='submit' primary><Icon name='save' />Save</Button>
      </Form>
    </React.Fragment>
  )
}

export default OrderForm;