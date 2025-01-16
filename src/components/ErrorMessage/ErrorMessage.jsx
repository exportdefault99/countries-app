import img from './error.gif';

import styles from './ErrorMessage.module.scss';

const ErrorMessage = ({ children, className }) => {

  return (
    <div className={`${styles.root} ${className ? className : ''}`}>
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