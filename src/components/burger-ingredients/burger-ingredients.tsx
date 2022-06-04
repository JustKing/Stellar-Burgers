import { useMemo, useRef, useState } from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsSection from './burger-ingredients-section/burger-ingredients-section';

import { TABS } from '../../constants';

import { useContext } from 'react';

import { BurgerContext, IngredientsContext } from '../../services/burgerContext';

import { ingredients } from '../../interfaces/ingredients';

import burgerIngredientsStyles from './burger-ingredients.module.scss';

type Props = {
  offset: number;
};

const BurgerIngredients = ({ offset }: Props) => {
  const [activeTab, setActiveTabs] = useState('bun');

  const { ingredients } = useContext(IngredientsContext);
  const { burger } = useContext(BurgerContext);

  const sectionsRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLElement>(null);
  const saucesRef = useRef<HTMLElement>(null);
  const mainsRef = useRef<HTMLElement>(null);

  // #TODO - пока что неадекватит
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           setActiveTabs(entry.target.id);
  //         }
  //       });
  //     },
  //     { threshold: [0.5] }
  //   );

  //   const buns = document.querySelector<HTMLElement>('section#bun');
  //   const sauces = document.querySelector<HTMLElement>('section#sauce');
  //   const mains = document.querySelector<HTMLElement>('section#main');
  //   if (buns) {
  //     observer.observe(buns);
  //   }
  //   if (sauces) {
  //     observer.observe(sauces);
  //   }
  //   if (mains) {
  //     observer.observe(mains);
  //   }
  // }, []);

  const setCurrent = (tab: string) => {
    if (tab !== activeTab) {
      switch (tab) {
        case 'bun':
          bunsRef.current?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'sauce':
          saucesRef.current?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'main':
          mainsRef.current?.scrollIntoView({ behavior: 'smooth' });
          break;
      }
      setActiveTabs(tab);
    }
  };

  const getIngredientsRows = (ingredients: ingredients.ingredient[]): ingredients.ingredient[][] => {
    let ingredientsByRow: ingredients.ingredient[][] = [];
    for (let i = 0; i < ingredients.length / 2; i++) {
      const row = [];
      const ingredient = ingredients[i * 2];
      const nextIngredient = ingredients[i * 2 + 1];
      if (ingredient) {
        row.push(ingredient);
      }
      if (nextIngredient) {
        row.push(nextIngredient);
      }
      ingredientsByRow.push(row);
    }
    return ingredientsByRow;
  };

  const buns = useMemo(() => {
    const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
    return getIngredientsRows(buns);
  }, [ingredients]);

  const sauces = useMemo(() => {
    const sauces = ingredients.filter((ingredient) => ingredient.type === 'sauce');
    return getIngredientsRows(sauces);
  }, [ingredients]);

  const mains = useMemo(() => {
    const mains = ingredients.filter((ingredient) => ingredient.type === 'main');
    return getIngredientsRows(mains);
  }, [ingredients]);

  const ingredientsCounter = useMemo(() => {
    if (burger) {
      const ids = [...burger.main, burger.bun, burger.bun];
      return ids.reduce((acc: { [key: string]: number }, ingredient) => {
        if (ingredient) {
          acc[ingredient._id] = (acc[ingredient._id] || 0) + 1;
        }
        return acc;
      }, {});
    }
    return {};
  }, [burger]);

  return (
    <div className={`${burgerIngredientsStyles['ingredients-wrapper']} mr-5`}>
      <p className="text text_type_main-large mb-5">Соберите бургер</p>
      <div className="flex mb-10">
        {TABS.map((tab, index) => (
          <Tab value={tab.type} active={activeTab === tab.type} key={index} onClick={setCurrent}>
            {tab.title}
          </Tab>
        ))}
      </div>
      <div
        className={`${burgerIngredientsStyles.ingredients}`}
        style={{ height: `calc(100% - ${offset + 28}px)` }}
        ref={sectionsRef}
      >
        {buns && (
          <BurgerIngredientsSection
            title="Булочки"
            ingredientsByRow={buns}
            ingredientsCounter={ingredientsCounter}
            ref={bunsRef}
          />
        )}
        {sauces && (
          <BurgerIngredientsSection
            title="Соусы"
            ingredientsByRow={sauces}
            ingredientsCounter={ingredientsCounter}
            ref={saucesRef}
          />
        )}
        {mains && (
          <BurgerIngredientsSection
            title="Начинки"
            ingredientsByRow={mains}
            ingredientsCounter={ingredientsCounter}
            ref={mainsRef}
          />
        )}
      </div>
    </div>
  );
};

export default BurgerIngredients;
