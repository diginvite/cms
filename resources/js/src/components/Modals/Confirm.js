import React from './node_modules/react';
import { Modal, Button, Icon } from './node_modules/semantic-ui-react';

const ModalConfirm = (props) => {
  return (
    <React.Fragment>
      <Modal size="tiny" open={true}>
        <Modal.Header>{props.header}</Modal.Header>
        <Modal.Content>
          <p>{props.content}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button size="tiny" onClick={() => props.onHide()}><Icon name="times circle"/>Cancel</Button>
          <Button size="tiny" onClick={() => props.onAction(props.data, props.index)} primary><Icon name="check circle"/>Yes</Button>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  )
}

export default ModalConfirm;