import React from 'react';
import {Table, Button, Icon} from 'semantic-ui-react';

const PostList = props => {
  return(
    <React.Fragment>
      <div className="table-responsive">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'>No</Table.HeaderCell>
              {
                !props.quote ?
                <>
                  <Table.HeaderCell textAlign='center'>Title</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center'>Date</Table.HeaderCell>
                </>
                : null
              }
              <Table.HeaderCell textAlign='center'>Description</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              props.data.map((data, i) => {
                return(
                  <Table.Row key={i}>
                    <Table.Cell textAlign='center'>{i+1}</Table.Cell>
                    {
                      !props.quote ?
                      <>
                        <Table.Cell>{data.title}</Table.Cell>
                        <Table.Cell textAlign='center'>{data.date}</Table.Cell>
                      </>
                      : null
                    }
                    <Table.Cell>{data.description}</Table.Cell>
                    <Table.Cell textAlign='center'>
                      <Button size="tiny"  circular icon='edit' color='blue' onClick={() => props.onAction(i, data, 'edit')}/>
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

export default PostList;