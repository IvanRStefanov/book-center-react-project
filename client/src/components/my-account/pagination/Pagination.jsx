import styles from './Pagination.module.scss'

export default function Pagination({
    paginationParemeter,
    setNumberToSkip,
    numberToSkip,
    maxCount,
}) {
    const numberOfPagesToDisplay = Math.ceil(maxCount / paginationParemeter);
    const currentPageToDisplay = (numberToSkip / paginationParemeter) + 1;
    const isDisabledPrevButton = (numberToSkip + paginationParemeter) === paginationParemeter;
    const isDisabledNextButton = ((numberToSkip / paginationParemeter) + 1) >= numberOfPagesToDisplay;

    return (
        <div className={styles.pagination}>
            <button
                className={styles["pagination__btn"]}
                onClick={
                    () => setNumberToSkip((oldNumberOfBooksToSkip) => oldNumberOfBooksToSkip - paginationParemeter)
                }
                disabled={isDisabledPrevButton}
            >
            </button>

            <span className={styles["pagination__count"]}>
                {currentPageToDisplay} / {Math.ceil(maxCount / paginationParemeter)}
            </span>

            <button
                className={`${styles["pagination__btn"]} ${styles["pagination__btn--next"]}`}
                onClick={
                    () => setNumberToSkip((oldNumberOfBooksToSkip) => oldNumberOfBooksToSkip + paginationParemeter)
                }
                disabled={isDisabledNextButton}
            >
            </button>
        </div>
    );
}