import React from 'react';
import { Table, Button, Icon, Card } from 'semantic-ui-react';
import Moment from 'react-moment';
import {Link}  from 'react-router-dom';

const CoupleList = props => {
  const extra = (i, data) => (
    <center>
      <Button.Group>
        <Button color="blue" onClick={() => props.onAction(i, data, 'show')}>View</Button>
        <Button.Or />
        <Button color="green" onClick={() => props.onAction(i, data, 'edit')}>Edit</Button>
        <Button.Or />
        <Button color="red" onClick={() => props.onAction(i, data, 'destroy')}>Delete</Button>
      </Button.Group>
    </center>
  )

  return(
    <React.Fragment>
      <Card.Group>
            {
              props.data.map((data, i) => {
                return(
                  <Card
                    image={data.image}
                    header={data.name}
                    meta={`Anak ke ${data.child} dari pasangan ${data.father} dan ${data.mother}`}
                    description={data.description}
                    extra={extra(i, data)}
                  />
                )
              })
            }
      </Card.Group>
    </React.Fragment>
  )
}

export default CoupleList;