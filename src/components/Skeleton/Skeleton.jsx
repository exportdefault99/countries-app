import './Skeleton.scss';

const Skeleton = () => {

  return (
    <div className="root">
      <p className="country__select">Please select a country to see information</p>
      <div className="skeleton">
        <div className="pulse skeleton__header">
          <div className="pulse skeleton__circle"></div>
          <div className="pulse skeleton__mini"></div>
        </div>
        <div className="pulse skeleton__block"></div>
        <div className="pulse skeleton__block"></div>
        <div className="pulse skeleton__block"></div>
      </div>
    </div>
  );
}

export default Skeleton;