import styles from './ModalDelete.module.scss'

export default function ModalDelete({
    book,
    isDeleting,
    hideAlertDeleteBook,
    deleteBookHandler
}) {
    return (
        <div className={styles['modal-delete']}>
            <div className={styles.modal__bg} onClick={hideAlertDeleteBook}></div>

            <div className={styles.modal__shell}>
                <div className={styles.modal__content}>
                    <span className={styles['modal__close-btn']} onClick={hideAlertDeleteBook}></span>

                    <div className={styles.modal__body}>
                        <div className={styles.modal__title}>
                            <h6>You are about to <strong>delete</strong><br></br>{book.name}</h6>
                        </div>

                        <div className={`${styles.modal__img} image-fit`}>
                            <span className={styles["modal__img-loading-spinner"]}></span>
                            <img src={book.imgUrl} alt="" />
                        </div>

                        <div className={styles.modal__footer}>
                            <h6>Are you sure?</h6>

                            <div className={styles.modal__actions}>
                                <button className={styles.modal__btn} onClick={deleteBookHandler}>Yes</button>
                                <button className={`${styles['modal__btn']} ${styles['modal__btn--close']}`} onClick={hideAlertDeleteBook}>No</button>
                            </div>
                        </div>
                    </div>

                    {isDeleting &&
                        <div className={styles['modal__delete-loading']}></div>
                    } 
                </div>
            </div>
        </div>
    );
}