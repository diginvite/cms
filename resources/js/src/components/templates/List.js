import React from 'react';
import { Table, Button, Icon, Radio } from 'semantic-ui-react';
import Moment from 'react-moment';
import {Link}  from 'react-router-dom';

const TemplateList = props => {
  return(
    <React.Fragment>
      <div className="table-responsive">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'>No</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Name</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Domain</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Premium</Table.HeaderCell>
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
                    <Table.Cell>{data.name}</Table.Cell>
                    <Table.Cell>{data.domain}</Table.Cell>
                    <Table.Cell textAlign='center'>
                      {/* <Radio
                        toggle
                        defaultChecked={data.premium}
                        value={data.premium}
                        size="mini"
                        onChange={() => props.onAction(i, data, 'togglePremium')}
                      /> */}
                      {
                        data.premium?
                        <Button size="mini"  circular icon='toggle on' color='blue' onClick={() => props.onAction(i, data, 'togglePremium')}/>
                        :
                        <Button size="mini"  circular icon='toggle off' color='red' onClick={() => props.onAction(i, data, 'togglePremium')}/>
                      }
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                      {
                        data.active?
                        <Button size="mini"  circular icon='toggle on' color='blue' onClick={() => props.onAction(i, data, 'toggleActive')}/>
                        :
                        <Button size="mini"  circular icon='toggle off' color='red' onClick={() => props.onAction(i, data, 'toggleActive')}/>
                      }
                      {/* <Radio
                        toggle
                        defaultChecked={data.active}
                        value={data.active}
                        size="mini"
                        onChange={() => props.onAction(i, data, 'toggleActive')}
                      /> */}
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                      <Moment format="dddd, D MMM. YYYY" >
                        {data.created_at}
                      </Moment>
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                      <Button size="mini" circular icon='edit' color='blue' onClick={() => props.onAction(i, data, 'edit')}/>
                      {
                        !data.active ?
                          <Button size="mini" circular icon='trash' color='red' onClick={() => props.onAction(i, data, 'destroy')}/>
                        : null
                      }
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

export default TemplateList;