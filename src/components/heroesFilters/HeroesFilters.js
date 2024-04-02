import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { useHttp } from "../../hooks/http.hook";
import { fetchFilters } from "../../actions";
import { filtersActiveButton } from "./filtersSlice";
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

  const filters = useSelector((state) => state.filters.filters);
  const activeFilter = useSelector((state) => state.filters.activeFilter);
  const filtersLoadingStatus = useSelector(
    (state) => state.filters.filtersLoadingStatus
  );

  useEffect(() => {
    dispatch(fetchFilters(request));

    // eslint-disable-next-line
  }, []);

  const renderFiltersList = (arr) => {
    return arr.map((filter, i) => {
      let filterClassName;

      switch (filter) {
        case "Огонь":
          filterClassName = "btn-danger";
          break;
        case "Вода":
          filterClassName = "btn-primary";
          break;
        case "Ветер":
          filterClassName = "btn-success";
          break;
        case "Земля":
          filterClassName = "btn-secondary";
          break;
        default:
          filterClassName = "btn-outline-dark";
      }
      return (
        <button
          key={i}
          className={classNames("btn", filterClassName, {
            active: activeFilter === filter,
          })}
          onClick={() => dispatch(filtersActiveButton(filter))}
        >
          {filter}
        </button>
      );
    });
  };

  if (filtersLoadingStatus === "loading") {
    return (
      <div style={{ display: "flex" }}>
        <Spinner />
      </div>
    );
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

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
