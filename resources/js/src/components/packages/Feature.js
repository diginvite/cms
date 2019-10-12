import React from 'react';
import { Button, Image, Card, Form, Checkbox, Icon, Table} from 'semantic-ui-react';
import Moment from 'react-moment';
import {Link}  from 'react-router-dom';

const Feature = props => {
  const options = [
    { key: 'yes', text: 'Yes', value: 'yes' },
    { key: 'no', text: 'No', value: 'no' },
  ];

  return(
    <React.Fragment>
      {/* <Card.Group>
      {
        props.data.map((data, i) => {
          return(
            <React.Fragment>
              <Card>
                <Card.Content extra>
                  <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                  />
                  <Card.Header>{data.name}</Card.Header>
                    <Card.Meta>Type : {data.value_type ? 'Flexible' : 'Fixed'}</Card.Meta>
                  <Card.Description>
                    {data.description}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  {
                    data.value_type ? 
                    <Form>
                      {
                        !data.detail.unlimited ? 
                        <Form.Field>
                        <label>Quantity</label>
                        <input placeholder='Ex. 10' value={data.detail.quantity} onChange={(e) => props.onQuantityChange(e, i)} type="number"/>
                        </Form.Field>
                        : null
                      }
                    <Form.Field>
                      <Checkbox label='Active' checked={data.detail.active} onChange={() => props.onActiveChange(i, data)}/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Checkbox label='Unlimited' checked={data.detail.unlimited} onChange={() => props.onUnlimitedChange(i, data)}/>
                    </Form.Field>
                  </Form>
                    :
                    <Form>
                    <Checkbox label='Active' checked={data.detail.active} onChange={() => props.onActiveChange(i, data)}/>
                    </Form>
                  }
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button color='blue' onClick={() => props.onSave(i, data)}>
                      <Icon name="save"/> Save
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            </React.Fragment>
          )
        })
      }
      </Card.Group> */}
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign='center'>No</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Name</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Description</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Quantity</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Active</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Unlimited</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            props.data.map((data, i) => {
              return(
                <React.Fragment>
                <Table.Row key={i}>
                  <Table.Cell textAlign='center'>{i+1}</Table.Cell>
                  <Table.Cell textAlign='center'>{data.name}</Table.Cell>
                  <Table.Cell textAlign='center'>{data.description}</Table.Cell>
                  <Table.Cell textAlign='center'>
                    {
                        !data.detail.unlimited ? 
                        <Form>
                          <Form.Field>
                            <input placeholder='Ex. 10' value={data.detail.quantity} onChange={(e) => props.onQuantityChange(e, i)} type="number"/>
                          </Form.Field>
                        </Form>
                        : "Unlimited"
                    }
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                  <Checkbox checked={data.detail.active} onChange={() => props.onActiveChange(i, data)}/>
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    <Checkbox checked={data.detail.unlimited} onChange={() => props.onUnlimitedChange(i, data)}/>
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