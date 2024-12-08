const CapitalCountry = ({ capital }) => {

  const hasMultipleCapitals = capital.length > 1;

  return (  
    <p>
      Capital{hasMultipleCapitals && 's'}: <span>{hasMultipleCapitals ? capital.join(', ') : capital[0]}</span>
    </p>
  );
}
 
export default CapitalCountry;