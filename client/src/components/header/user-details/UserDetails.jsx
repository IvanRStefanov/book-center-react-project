import { Link } from "react-router-dom";
import styles from './UserDetails.module.scss'

export default function UserDetails({
    logedInUser,
    onClose,
    onLogout
}) {
    return (
        <div className={styles['modal-user-details']}>
            <div className={styles.modal__bg} onClick={onClose}></div>

            <div className={styles.modal__content}>
                <div className={styles['modal__content-inner']}>
                    <button className={styles['modal__close-btn']} onClick={onClose}></button>
                    
                    <div className={styles['modal__user-img']}>
                        <img src={logedInUser.imageUrl} alt="Your photo" />
                    </div>

                    <div className={styles['modal__user-body']}>
                        <ul>
                            <li>
                                <span>Username:</span> {logedInUser.username}
                            </li>

                            <li>
                                <span>Email:</span> {logedInUser.email}
                            </li>
                            <li>
                                <span>Books Added:</span> {logedInUser.postedBooks.length}
                            </li>

                            <li>
                                <span>Books Rated:</span> {logedInUser.ratedBooks.length}
                            </li>

                            <li>
                                <span>Books Read:</span> {logedInUser.readBooks.length}
                            </li>
                        </ul>
                    </div>

                    <div className={styles['modal__user-actions']}>
                        <Link className={styles['modal__btn']} to="/" onClick={onLogout}>Logout</Link>
                        <Link className={styles['modal__btn']}>Account details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}