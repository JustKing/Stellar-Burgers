import { useEffect, useMemo, useRef, useState } from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsSection from './burger-ingredients-section/burger-ingredients-section';

import { TABS } from '../../constants';

import burgerIngredientsStyles from './burger-ingredients.module.scss';
import { ingredients } from '../../interfaces/ingredients';

type Props = {
  ingredients: ingredients.ingredient[];
  offset: number;
};

const BurgerIngredients = ({ ingredients, offset }: Props) => {
  const [activeTab, setActiveTabs] = useState('bun');

  const sectionsRef = useRef<HTMLDivElement>(null);
  const topOffset = useMemo(() => offset * 2 + 28, [offset]);
  const bottomOffset = 52;

  // #TODO
  // useEffect(() => {
  // const observer = new IntersectionObserver(
  //   (entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         console.log(entry.target.id)
  //         this.setState((prevState) => ({
  //           ...prevState,
  //           activeTab: entry.target.id
  //         }));
  //       }
  //     });
  //   },
  //   { threshold: [0.5] }
  // );

  // const buns = document.querySelector<HTMLElement>('section#bun');
  // const sauces = document.querySelector<HTMLElement>('section#sauce');
  // const mains = document.querySelector<HTMLElement>('section#main');
  // if (buns) {
  //   observer.observe(buns);
  // }
  // if (sauces) {
  //   observer.observe(sauces);
  // }
  // if (mains) {
  //   observer.observe(mains);
  // }
  // }, [])

  const setCurrent = (tab: string) => {
    if (tab !== activeTab) {
      const ingredientsSection = document.querySelector<HTMLElement>(`section#${tab}`);
      if (ingredientsSection) {
        setTimeout(() => {
          sectionsRef.current?.scrollTo({
            behavior: ingredientsSection ? 'smooth' : 'auto',
            top: ingredientsSection.offsetTop - topOffset || 0
          });
        }, 100);
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

  return (
    <div className={`${burgerIngredientsStyles.ingredientsWrapper} mr-5`}>
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
        style={{ height: `calc(100% - ${offset + 28 + bottomOffset}px)` }}
        ref={sectionsRef}
      >
        <BurgerIngredientsSection id="bun" title="Булочки" ingredientsByRow={buns} />
        <BurgerIngredientsSection id="sauce" title="Соусы" ingredientsByRow={sauces} />
        <BurgerIngredientsSection id="main" title="Начинки" ingredientsByRow={mains} />
      </div>
    </div>
  );
};

export default BurgerIngredients;
