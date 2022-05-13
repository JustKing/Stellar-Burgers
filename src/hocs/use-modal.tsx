import { Component, ComponentType, SyntheticEvent } from 'react';
import Modal from '../components/modal/modal';

type Props = {
  openModal: boolean;
  callback: Function;
};

const useModal = (WrappedComponent: ComponentType) =>
  class UseModal extends Component<Props> {
    handleOpenModal = (e: SyntheticEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      this.props.callback();
    };

    render() {
      return (
        <div style={{ overflow: 'hidden' }}>
          {this.props.openModal && (
            <Modal header="Детали ингредиента" handleOpenModal={this.handleOpenModal}>
              <WrappedComponent />
            </Modal>
          )}
        </div>
      );
    }
  };

export default useModal;
