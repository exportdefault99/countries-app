import './CapitalCountry.scss';

const CapitalCountry = ({ capital }) => {

  const hasMultipleCapitals = capital.length > 1;

  const content = <span>{hasMultipleCapitals ? capital.join(', ') : capital[0]}</span>

  return (  
    <p className="cap">Capital{hasMultipleCapitals && 's'}: {content}</p>
  );
}
 
export default CapitalCountry;