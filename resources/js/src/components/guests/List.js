import React from 'react';
import {Table, Button, Icon, Label} from 'semantic-ui-react';

const GuestList = props => {
  return(
    <React.Fragment>
      <div className="table-responsive">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'>No</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Name</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Company</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Email</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Attend</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Quantity</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Wish</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              props.data.map((data, i) => {
                return(
                  <Table.Row key={i}>
                    <Table.Cell textAlign='center'>{i+1}</Table.Cell>
                    <Table.Cell>{data.name}</Table.Cell>
                    <Table.Cell textAlign='center'>{data.company}</Table.Cell>
                    <Table.Cell textAlign='center'>{data.email}</Table.Cell>
                    <Table.Cell textAlign='center'>
                      {
                        data.attend === 1 ?
                        <Label color="blue">
                          Yes
                        </Label>
                        :
                        <Label color="red">
                          No
                        </Label>
                      }
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                      <Label circular color="blue">
                        {data.qty}
                      </Label>
                    </Table.Cell>
                    <Table.Cell textAlign='center'>{data.wish}</Table.Cell>
                  </Table.Row>
                )
              })
            }
          </Table.Body>
        </Table>
      </div>
    </React.Fragment>
  )
}

export default GuestList;