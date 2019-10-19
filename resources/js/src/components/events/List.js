import React from 'React';
import {List, Icon} from 'semantic-ui-react';
import Moment from 'react-moment';
import moment from 'moment';

const EventList = (props) => {
  return(
    <List divided relaxed>
      {
        props.data.map((data, i) => {
          return(
            <List.Item key={i}>
              <List.Icon name='marker' size='large' verticalAlign='middle' />
              <List.Content onClick={() => props.onAction(i, data, 'edit')}>
                <List.Header as='a'>{data.name} </List.Header>
                <List.Description as='a'>{data.address}</List.Description>
                <List.Description as='a'>
                  <Moment format="dddd, DD MMMM YYYY HH:mm">
                    {data.startDate}
                  </Moment>
                  &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;
                  <Moment format="dddd, DD MMMM YYYY HH:mm">
                    {data.endDate}
                  </Moment>
                </List.Description>
                <List.Description as='a'>{data.description}</List.Description>
              </List.Content>
              <span>
              <List.Content className="text-right">
                <Icon size="small" circular inverted color='red' name='trash' onClick={() => props.onAction(i, data, 'destroy')}/>
              </List.Content>
              </span>
            </List.Item>
          )
        })
      }
    </List>
  )
}

export default EventList;