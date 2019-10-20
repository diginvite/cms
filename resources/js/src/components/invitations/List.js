import React from 'react';
import {Table, Button, Icon} from 'semantic-ui-react';

const InvitationList = props => {
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
              <Table.HeaderCell textAlign='center'>Phone</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Action</Table.HeaderCell>
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
                    <Table.Cell textAlign='center'>{data.phone}</Table.Cell>
                    <Table.Cell textAlign='center'>
                      <Button size="tiny"  circular icon='trash' color='red' onClick={() => props.onAction(i, data, 'destroy')}/>
                    </Table.Cell>
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

export default InvitationList;