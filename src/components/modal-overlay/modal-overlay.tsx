import { memo, MouseEventHandler } from 'react';

import modalOverlayStyles from './modal-overlay.module.scss';

type Props = {
  onClose: MouseEventHandler<HTMLDivElement>;
};

const ModalOverlay = memo(({ onClose }: Props) => {
  return (
    <div className={`${modalOverlayStyles.overlay} flex`} onClick={onClose}></div>
  );
});

export default ModalOverlay;
