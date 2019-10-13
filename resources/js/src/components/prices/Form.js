import React from 'react'
import { Button, Header, Image, Modal, Form, Icon, Checkbox } from 'semantic-ui-react'

const PriceForm = (props) => {
  let priceE;
  if (props.priceE) {
    priceE = { 
      content: 'Please enter price value', 
      pointing: 'below',
      }
  }else{
    priceE: false
  }

  let priceSellingE;
  if (props.priceSellingE) {
    priceSellingE = { 
      content: 'Please enter selling price value', 
      pointing: 'below',
      }
  }else{
    priceSellingE: false
  }

  let priceDateE;
  if (props.priceDateE) {
    priceDateE = { 
      content: 'Please enter implement date value and date must be greater than today', 
      pointing: 'below',
      }
  }else{
    priceDateE: false
  }
  
  return (
   <React.Fragment>
     {/* <Modal trigger={<Button primary size="small"><Icon name="plus circle"/> Add</Button>} closeIcon> */}
     <Modal open={props.open}>
       <Modal.Header>Price Form</Modal.Header>
       <Modal.Content>
           <Form>
            <Form.Input
              error={priceE}
              fluid
              label='Price'
              placeholder='Ex. 10000'
              onChange={(e, meta) => props.onChange(e, meta)}
              value={props.price}
              name="price"
              type="number"
            />
            <Form.Input
              error={priceSellingE}
              fluid
              label='Selling Price'
              placeholder='Ex. 10000'
              onChange={(e, meta) => props.onChange(e, meta)}
              value={props.priceSelling}
              name="priceSelling"
              type="number"
            />
            <Form.Input
              error={priceDateE}
              fluid
              label='Date'
              // placeholder='Ex. 10000'
              onChange={(e, meta) => props.onChange(e, meta)}
              value={props.priceDate}
              name="priceDate"
              type="date"
            />
           </Form>
       </Modal.Content>
       <Modal.Actions>
       <Button type='submit' size="tiny" onClick={() => props.onHide()}><Icon name="times circle"/>Cancel</Button>
       <Button type='submit' size="tiny" onClick={() => props.onSubmit()} primary><Icon name="save"/>Save</Button>
       </Modal.Actions>
     </Modal>
   </React.Fragment>
 )
}

export default PriceForm;