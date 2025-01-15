import styles from './Pagination.module.scss';

const Pagination = ({ totalPages, currentPage, isMoreThanOnePage, hasPrevPage, hasNextPage, isLoading, onPageChange }) => {

  if (!isMoreThanOnePage) {
    return null;
  }

  const prevPageButton = hasPrevPage && (
    <button className={styles.prevPage} disabled={isLoading} onClick={() => onPageChange(currentPage - 1, false)}>
      {'<'}
    </button>
  );

  const pageNumbersButtons = [...Array(totalPages)].map((_, i) => {
    const page = i + 1;
    const isActive = page === currentPage;

    return (
      <button
        key={page}
        className={isActive ? styles.active : null}
        disabled={isLoading}
        onClick={() => onPageChange(page, isActive)}
      >
        {page}
      </button>
    );
  });

  const nextPageButton = hasNextPage && (
    <button className={styles.nextPage} disabled={isLoading} onClick={() => onPageChange(currentPage + 1, false)}>
      {'>'}
    </button>
  );

  return (
    <div className={styles.pagination}>
      {prevPageButton}
      <div className={styles.pages}>
        {pageNumbersButtons}
      </div>
      {nextPageButton}
    </div>
  );
}

export default Pagination;