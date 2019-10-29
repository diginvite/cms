import React from 'react';
import { Button, Header, Image, Modal, Icon, Item} from 'semantic-ui-react';

const ModalShow = (props) => (
  <Modal open>
    <Modal.Header>{props.data.name}</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src={props.data.image}/>
      <Modal.Description>
        <Header>{`${props.data.firstDegree} ${props.data.name} ${props.data.lastDegree}`}</Header>
        <Item.Group>
          <Item>
          <Item.Content>
            <Item.Meta>Info</Item.Meta>
            <Item.Description>
              {`Anak ke ${props.data.child} dari pasangan ${props.data.father} dan ${props.data.mother}`}
            </Item.Description>
            <Item.Meta>About</Item.Meta>
            <Item.Description>
              {props.data.description}
            </Item.Description>
          </Item.Content>
          </Item>
        </Item.Group>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button size="tiny" onClick={() => props.onHide()}><Icon name="times circle"/>Close</Button>
    </Modal.Actions>
  </Modal>
)

export default ModalShow;
