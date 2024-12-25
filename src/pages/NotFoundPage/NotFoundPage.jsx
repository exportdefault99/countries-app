import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {

  return (
    <section className={styles.root}>
      <ErrorMessage>
        <p>Page not found</p>
      </ErrorMessage>
    </section>
  );
};

export default NotFoundPage;