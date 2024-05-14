import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

import { useSelector } from "react-redux";
import { selectAll } from "../heroesFilters/filtersSlice";
import { useCreateHeroMutation } from "../../api/apiSlice";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
  const [createHero, { isLoading, isError }] = useCreateHeroMutation();

  const filters = useSelector(selectAll);

  const renderOptions = (filters) => {
    if (isLoading) {
      return <option>Загрузка элементов</option>;
    } else if (isError) {
      return <option>Ошибка загрузки</option>;
    }

    if (filters && filters.length > 0) {
      // eslint-disable-next-line
      return filters.map((filter) => {
        if (filter !== "Все") {
          return (
            <option key={filter} value={filter}>
              {filter}
            </option>
          );
        }
      });
    }
  };
  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        element: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, "Миниум 2 символа")
          .matches(/^[^\d]*$/, "Поле не должно содержать только цифры")
          .required("Поле обязательно для заполнения"),
        description: Yup.string()
          .matches(/^[^\d]*$/, "Поле не должно содержать только цифры")
          .required("Поле обязательно для заполнения"),
        element: Yup.string().required("Поле обязательно для заполнения"),
      })}
      onSubmit={(values, { resetForm }) => {
        const newHero = { id: uuidv4(), ...values };
        createHero(newHero).unwrap();
        resetForm();
      }}
    >
      <Form className="border p-4 shadow-lg rounded">
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-4">
            Имя нового героя
          </label>
          <Field
            required
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="Как меня зовут?"
          />
          <ErrorMessage name="name" component="div" className="text-danger" />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label fs-4">
            Описание
          </label>
          <Field
            required
            type="text"
            name="description"
            className="form-control"
            id="description"
            placeholder="Что я умею?"
            as="textarea"
            style={{ height: "130px" }}
          />
          <ErrorMessage
            name="description"
            component="div"
            className="text-danger"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="element" className="form-label">
            Выбрать элемент героя
          </label>
          <Field
            required
            className="form-select"
            id="element"
            name="element"
            as="select"
          >
            <option value="">Выберите элемент...</option>
            {renderOptions(filters)}
          </Field>
          <ErrorMessage
            name="element"
            component="div"
            className="text-danger"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Создать
        </button>
      </Form>
    </Formik>
  );
};

export default HeroesAddForm;
