import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import Moment from 'react-moment';
import {Link}  from 'react-router-dom';

const CustomerTable = props => {
  return(
    <React.Fragment>
      <div className="table-responsive">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'>No</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Domain</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Name</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Email</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Phone</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Package</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Price</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Status</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Active</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Created at</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              props.data.map((data, i) => {
                return(
                  <Table.Row key={i}>
                    <Table.Cell textAlign='center'>{i+1}</Table.Cell>
                    <Table.Cell>{data.domain}</Table.Cell>
                    <Table.Cell>{data.name}</Table.Cell>
                    <Table.Cell>{data.email}</Table.Cell>
                    <Table.Cell>{data.phone}</Table.Cell>
                    <Table.Cell textAlign='center'>{data.package.name}</Table.Cell>
                    <Table.Cell textAlign='right'>{data.amount}</Table.Cell>
                    <Table.Cell textAlign='center'>
                      {data.status ===  0 ? 'Requested' : data.status === 1 ? 'Proceed' : data.status === 2 ? 'Finished' : 'Closed'}
                    </Table.Cell>

                    <Table.Cell textAlign='center'>
                      {
                        data.active?
                        <Button size="mini"  circular icon='toggle on' color='blue' onClick={() => props.onConfirm(i, data, 'toggleActive')}/>
                        :
                        <Button size="mini"  circular icon='toggle off' color='red' onClick={() => props.onConfirm(i, data, 'toggleActive')}/>
                      }
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                      <Moment format="dddd, D MMM. YYYY" >
                        {data.created_at}
                      </Moment>
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                      <Link to={`/order/detail/${data.domain}`}>
                      <Button size="mini" circular icon='file' color='blue'/>
                      </Link>
                        <Button size="mini" circular icon='trash' color='red' onClick={() => props.onConfirm(i, data, 'destroy')}/>
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

export default CustomerTable;