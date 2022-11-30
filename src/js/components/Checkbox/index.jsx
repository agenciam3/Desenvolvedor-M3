const Checkbox = ({name, value}) => {
  return (
    <div className="color-filter">
      <input type="checkbox" id={value} name={value} value={value}></input>
      <label className="label" htmlFor={value}>
        {name}
      </label>
    </div>
  );
};

module.exports = Checkbox;
