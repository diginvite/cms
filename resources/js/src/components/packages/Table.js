import React from 'react';
import { Table } from 'semantic-ui-react'

const PackageTable = props => {
  return(
    <React.Fragment>
      <div className="table-responsive">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>No</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Features</Table.HeaderCell>
              <Table.HeaderCell>Created at</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              props.data.map((data, i) => {
                return(
                  <Table.Row key={i}>
                    <Table.Cell>{i+1}</Table.Cell>
                    <Table.Cell>{data.name}</Table.Cell>
                    <Table.Cell>0</Table.Cell>
                    <Table.Cell>{data.created_at}</Table.Cell>
                    <Table.Cell></Table.Cell>
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

export default PackageTable;