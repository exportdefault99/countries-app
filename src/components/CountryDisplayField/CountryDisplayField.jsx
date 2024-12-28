const CountryDisplayField = ({ singularLabel, pluralLabel, data, shouldTruncate, hasWrapper }) => {

  const isArray = Array.isArray(data);
  const isMultiple = isArray && data.length > 1;

  const label = isMultiple ? pluralLabel : singularLabel;
  const content = isArray ? shouldTruncate && data.length > 3 ? `${data.slice(0, 3).join(', ')} ...` : data.join(', ') : data;

  if (hasWrapper) {
    return (
      <div>
        <p>{label}:</p>
        <span>{content}</span>
      </div>
    );
  }

  return (
    <p>{label}: <span>{content}</span></p>
  );
}

export default CountryDisplayField;