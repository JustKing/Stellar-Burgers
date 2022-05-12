import { memo, MouseEventHandler } from 'react';

import modalOverlayStyles from './modal-overlay.module.scss';

type Props = {
  handleClose: MouseEventHandler<HTMLDivElement>;
  children: JSX.Element;
};

const ModalOverlay = memo(({ handleClose, children }: Props) => {
  return (
    <div className={`${modalOverlayStyles.overlay} flex`} onClick={handleClose}>
      {children}
    </div>
  );
});

export default ModalOverlay;
