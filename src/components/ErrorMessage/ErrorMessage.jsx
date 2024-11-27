import img from './error.gif';

import styles from './ErrorMessage.module.scss';

const ErrorMessage = ({children}) => {

  return (
    <div className={styles.root}>
      <img
        className={styles.img}
        src={img}
        alt="Error"
      />
      {children}
    </div>
  );
}

export default ErrorMessage;