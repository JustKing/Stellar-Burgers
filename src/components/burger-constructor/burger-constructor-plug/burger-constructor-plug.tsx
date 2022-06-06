import { memo, CSSProperties } from 'react';

type Props = {
  type?: 'top' | 'bottom' | 'main';
  isLocked: boolean;
  style?: CSSProperties;
};

const BurgerConstructorElement = memo(({ type, style, isLocked }: Props) => {
  const getBunMargin = () => {
    if (isLocked) {
      return type === 'bottom' ? 'mt-2' : 'mb-2';
    }
    return '';
  };
  const text = () => (type === 'main' ? 'Выберите ингредиенты' : 'Выберите булку');

  return (
    <div className={`${getBunMargin()} flex ai-center`} style={style}>
      <span className="mr-8" />
      <div className={`constructor-element constructor-element_pos_${type}`}>
        <span className="constructor-element__row ta-center"><p className='w-100'>{text()}</p></span>
      </div>
      <span className="mr-4" />
    </div>
  );
});

export default BurgerConstructorElement;
