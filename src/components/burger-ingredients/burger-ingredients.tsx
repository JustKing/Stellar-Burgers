import { useEffect, useMemo, useRef, useState } from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsSection from './burger-ingredients-section/burger-ingredients-section';

import { TABS } from '../../constants';
import { ingredientsApi } from '../../store/services/ingredients';

import { ingredients } from '../../interfaces/ingredients';

import burgerIngredientsStyles from './burger-ingredients.module.scss';
import { useAppSelector } from '../../hooks/use-store';

type Props = {
  offset: number;
};

const BurgerIngredients = ({ offset }: Props) => {
  const [activeTab, setActiveTabs] = useState('bun');
  const { currentData = [] } = ingredientsApi.useFetchAllIngredientsQuery([]);
  const burger = useAppSelector((state) => state.burger);
  const [bunIsIntersecting, setBunIsIntersecting] = useState(false);
  const [mainIsIntersecting, setMainIsIntersecting] = useState(false);
  const [sauceIsIntersecting, setSauceIsIntersecting] = useState(false);

  const sectionsRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLElement>(null);
  const saucesRef = useRef<HTMLElement>(null);
  const mainsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.id === 'bun') {
          setBunIsIntersecting(entry.isIntersecting);
        }
        if (entry.target.id === 'main') {
          setMainIsIntersecting(entry.isIntersecting);
        }
        if (entry.target.id === 'sauce') {
          setSauceIsIntersecting(entry.isIntersecting);
        }
      });
    });

    if (bunsRef.current !== null) {
      observer.observe(bunsRef.current);
    }
    if (saucesRef.current !== null) {
      observer.observe(saucesRef.current);
    }
    if (mainsRef.current !== null) {
      observer.observe(mainsRef.current);
    }
  }, []);

  useEffect(() => {
    if (bunIsIntersecting) {
      setActiveTabs('bun');
    }
    if (!bunIsIntersecting && sauceIsIntersecting) {
      setActiveTabs('sauce');
    }
    if (!sauceIsIntersecting && mainIsIntersecting) {
      setActiveTabs('main');
    }
  }, [bunIsIntersecting, mainIsIntersecting, sauceIsIntersecting]);

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
    const buns = currentData.filter((ingredient) => ingredient.type === 'bun');
    return getIngredientsRows(buns);
  }, [currentData]);

  const sauces = useMemo(() => {
    const sauces = currentData?.filter((ingredient) => ingredient.type === 'sauce');
    return getIngredientsRows(sauces);
  }, [currentData]);

  const mains = useMemo(() => {
    const mains = currentData.filter((ingredient) => ingredient.type === 'main');
    return getIngredientsRows(mains);
  }, [currentData]);

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
            id="bun"
          />
        )}
        {sauces && (
          <BurgerIngredientsSection
            title="Соусы"
            ingredientsByRow={sauces}
            ingredientsCounter={ingredientsCounter}
            ref={saucesRef}
            id="sauce"
          />
        )}
        {mains && (
          <BurgerIngredientsSection
            title="Начинки"
            ingredientsByRow={mains}
            ingredientsCounter={ingredientsCounter}
            ref={mainsRef}
            id="main"
          />
        )}
      </div>
    </div>
  );
};

export default BurgerIngredients;
