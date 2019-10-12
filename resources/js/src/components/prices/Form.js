import React from 'react'
import { Button, Header, Image, Modal, Form, Icon, Checkbox } from 'semantic-ui-react'

const PriceForm = (props) => (
  <React.Fragment>
    <Modal trigger={<Button primary size="small"><Icon name="plus circle"/> Add</Button>} closeIcon>
      <Modal.Header>Price Form</Modal.Header>
      <Modal.Content>
          <Form>
            <Form.Field>
              <label>Price</label>
              <input placeholder='Ex. 10000' type="number"/>
            </Form.Field>
            <Form.Field>
              <label>Selling Price</label>
              <input placeholder='Ex. 10000' type="number"/>
            </Form.Field>
            <Form.Field>
              <label>Implement Date</label>
              <input placeholder='Ex. 2019-10-10' type="date"/>
            </Form.Field>
          </Form>
      </Modal.Content>
      <Modal.Actions>
      {/* <Button type='submit' size="tiny" onClick={() => props.onHide()}><Icon name="times circle"/>Cancel</Button> */}
      <Button type='submit' size="tiny" onClick={() => props.onSumbit()} primary><Icon name="save"/>Save</Button>
      </Modal.Actions>
    </Modal>
  </React.Fragment>
)

export default PriceForm;