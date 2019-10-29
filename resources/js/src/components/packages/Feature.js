import React from 'react';
import { Button, Image, Card, Form, Checkbox, Icon, Table, Radio} from 'semantic-ui-react';
import Moment from 'react-moment';
import {Link}  from 'react-router-dom';

const Feature = props => {
  const options = [
    { key: 'yes', text: 'Yes', value: 'yes' },
    { key: 'no', text: 'No', value: 'no' },
  ];

  return(
    <React.Fragment>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign='center'>No</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Name</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Type</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Active</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Quantity</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Unlimited</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            props.data.map((data, i) => {
              return(
                <React.Fragment key={i}>
                <Table.Row  disabled={!data.active}>
                  <Table.Cell textAlign='center'>{i+1}</Table.Cell>
                  <Table.Cell textAlign='center'>{data.name}</Table.Cell>
                  <Table.Cell textAlign='center'>
                    {
                      data.value_type ?
                      'Flexible'
                      : 'Fixed'
                    }
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    {/* <Checkbox checked={data.detail.active} onChange={() => props.onActiveChange(i, data)}/> */}
                    <Radio
                      toggle
                      defaultChecked={data.detail.active}
                      value={data.detail.active}
                      size="mini"
                      onChange={() => props.onActiveChange(i, data)}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    {
                      data.value_type ?
                      !data.detail.unlimited ? 
                        <Form>
                          <Form.Field>
                            <input placeholder='Ex. 10' value={data.detail.quantity} onChange={(e) => props.onQuantityChange(e, i)} type="number"/>
                          </Form.Field>
                        </Form>
                        : "Unlimited"
                      : null
                    }
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    {
                      data.value_type ?
                      // <Checkbox checked={data.detail.unlimited} onChange={() => props.onUnlimitedChange(i, data)}/>
                      <Radio
                        toggle
                        defaultChecked={data.detail.unlimited}
                        value={data.detail.unlimited}
                        size="mini"
                        onChange={() => props.onUnlimitedChange(i, data)}
                      />
                      : null
                    }
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    <Button size="mini" circular icon='save' color='blue' onClick={() => props.onSave(i, data)}/>
                  </Table.Cell>
                </Table.Row>
              </React.Fragment>
              )
            })
          }
        </Table.Body>
      </Table>
    </React.Fragment>
  )
}

export default Feature;