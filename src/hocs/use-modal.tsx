import { Component, ComponentType, SyntheticEvent } from 'react';
import Modal from '../components/modal/modal';
import { ingredients } from '../interfaces/ingredients';

type Props = {
  openModal: boolean;
  onClose: Function;
  header?: string;
  ingredient?: ingredients.ingredient;
};

const useModal = (WrappedComponent: ComponentType<{ ingredient?: ingredients.ingredient }>) =>
  class extends Component<Props> {
    handleOpenModal = (e: SyntheticEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      this.props.onClose();
    };

    render() {
      return (
        <div style={{ overflow: 'hidden' }}>
          {this.props.openModal && (
            <Modal header={this.props.header} onClose={this.props.onClose}>
              {this.props.ingredient ? <WrappedComponent ingredient={this.props.ingredient} /> : <WrappedComponent />}
            </Modal>
          )}
        </div>
      );
    }
  };

export default useModal;
