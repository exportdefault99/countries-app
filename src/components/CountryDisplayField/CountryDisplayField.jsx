const CountryDisplayField = ({ singularLabel, pluralLabel, data, hasWrapper }) => {

  const isMultiple = Array.isArray(data) && data.length > 1;

  const text = isMultiple ? pluralLabel : singularLabel;
  const content = isMultiple ? data.join(', ') : Array.isArray(data) ? data[0] : data;

  if (hasWrapper) {
    return (
      <div>
        <p>{text}:</p>
        <span>{content}</span>
      </div>
    );
  }

  return (
    <p>{text}: <span>{content}</span></p>
  );
}
 
export default CountryDisplayField;