import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import { useGetHeroesQuery, useDeleteHeroMutation } from "../../api/apiSlice";

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  const {
    data: heroes = [],
    isFetching,
    isLoading,
    isError,
  } = useGetHeroesQuery();

  const [deleteHero] = useDeleteHeroMutation();

  const activeFilter = useSelector((state) => state.filters.activeFilter);

  const filteredHeroes = useMemo(() => {
    const filteredHeroes = heroes.slice();

    if (activeFilter === "Все") {
      return filteredHeroes;
    } else {
      return filteredHeroes.filter((hero) => hero.element === activeFilter);
    }
  }, [heroes, activeFilter]);

  // const heroes = useSelector(filteredHeroesSelector);
  // const heroesLoadingStatus = useSelector(
  //   (state) => state.heroes.heroesLoadingStatus
  // );

  const onDelete = useCallback(
    (id) => {
      deleteHero(id);
    },
    // eslint-disable-next-line
    []
  );

  if (isLoading || isFetching) {
    return <Spinner />;
  } else if (isError) {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return arr.map(({ id, ...props }) => {
      return <HeroesListItem key={id} onDel={() => onDelete(id)} {...props} />;
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
