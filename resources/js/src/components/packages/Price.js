import React from 'react';
import { Button, Image, Card, Form, Checkbox, Icon, Table} from 'semantic-ui-react';
import Moment from 'react-moment';
import moment from 'moment';
import {Link}  from 'react-router-dom';

const Price = props => {
  const currentDate = moment().format("YYYY-MM-DD");
  return(
    <React.Fragment>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign='center'>No</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Price</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Selling Price</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Implement Date</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Created at</Table.HeaderCell>
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
                  <Table.Cell textAlign='right'>{data.price}</Table.Cell>
                  <Table.Cell textAlign='right'>{data.sellingPrice}</Table.Cell>
                  <Table.Cell textAlign='center'>{data.date}</Table.Cell>
                  <Table.Cell textAlign='center'>
                      <Moment format="dddd, D MMM. YYYY" >
                        {data.createdAt}
                      </Moment>
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    {
                      data.date > currentDate ?
                      <Button size="mini" circular icon='edit' color='blue' onClick={() => props.onSave(i, data)}/>
                      : null
                    }
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

export default Price;