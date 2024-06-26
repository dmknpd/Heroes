const HeroesListItem = ({ name, description, element, onDel }) => {
  let elementClassName;

  switch (element) {
    case "Огонь":
      elementClassName = "bg-danger bg-gradient";
      break;
    case "Вода":
      elementClassName = "bg-primary bg-gradient";
      break;
    case "Ветер":
      elementClassName = "bg-success bg-gradient";
      break;
    case "Земля":
      elementClassName = "bg-secondary bg-gradient";
      break;
    default:
      elementClassName = "bg-warning bg-gradient";
  }

  return (
    <li
      className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}
    >
      <img
        src="https://www.business2community.com/wp-content/uploads/2015/03/Identity-Question-Mark5.jpg5.jpg"
        className="img-fluid w-25 d-inline"
        alt="unknown hero"
        style={{ objectFit: "cover" }}
      />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-text">{description}</p>
      </div>
      <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
        <button
          onClick={onDel}
          type="button"
          className="btn-close btn-close"
          aria-label="Close"
        ></button>
      </span>
    </li>
  );
};

export default HeroesListItem;
