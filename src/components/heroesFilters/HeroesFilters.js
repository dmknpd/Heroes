import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { useHttp } from "../../hooks/http.hook";
import {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  filtersActiveButton,
} from "../../actions";
import Spinner from "../spinner/Spinner";
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.filters);
  const activeFilter = useSelector((state) => state.activeButton);
  const filtersLoadingStatus = useSelector(
    (state) => state.filtersLoadingStatus
  );

  useEffect(() => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));

    // eslint-disable-next-line
  }, []);

  const filterClick = (e) => {
    dispatch(filtersActiveButton(e));
  };

  const renderFiltersList = (arr) => {
    return arr.map((filter, i) => {
      let filterClassName;
      let filterName;

      switch (filter) {
        case "fire":
          filterClassName = "btn btn-danger";
          filterName = "Огонь";
          break;
        case "water":
          filterClassName = "btn btn-primary";
          filterName = "Вода";
          break;
        case "wind":
          filterClassName = "btn btn-success";
          filterName = "Ветер";
          break;
        case "earth":
          filterClassName = "btn btn-secondary";
          filterName = "Земля";
          break;
        default:
          filterClassName = "btn btn-outline-dark";
          filterName = "Все";
      }
      return (
        <button
          key={i}
          className={classNames(filterClassName, {
            active: activeFilter === filterName,
          })}
          onClick={(e) => filterClick(e.target.innerText)}
        >
          {filterName}
        </button>
      );
    });
  };

  const elements = renderFiltersList(filters);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">{elements}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
