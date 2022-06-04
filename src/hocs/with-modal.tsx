import { Component, ComponentType, SyntheticEvent } from 'react';
import Modal from '../components/modal/modal';
import { ingredients } from '../interfaces/ingredients';
import { order } from '../interfaces/order';

type Props = {
  openModal: boolean;
  onClose: Function;
  header?: string;
  ingredient?: ingredients.ingredient;
  order?: order.order;
};

const withModal = (WrappedComponent: ComponentType<{ ingredient?: ingredients.ingredient; order?: order.order }>) =>
  class extends Component<Props> {
    handleOpenModal = (e: SyntheticEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      this.props.onClose();
    };

    render() {
      return (
        this.props.openModal && (
          <Modal header={this.props.header} onClose={this.props.onClose}>
            {this.props.ingredient ? (
              <WrappedComponent ingredient={this.props.ingredient} />
            ) : this.props.order ? (
              <WrappedComponent order={this.props.order} />
            ) : (
              <WrappedComponent />
            )}
          </Modal>
        )
      );
    }
  };

export default withModal;
