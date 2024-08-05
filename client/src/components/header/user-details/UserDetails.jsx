import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../../contexts/UserContext';

import styles from './UserDetails.module.scss'
import { useQuery } from '@tanstack/react-query';
import { getUserPostedBooksCount } from '../../../services/booksService';
import { getUserReviewedBooks } from '../../../services/reviewBookSService';
import { getUserReadBooks } from '../../../services/readBooksService';

export default function UserDetails({
	onClose,
	onLogout
}) {
	const UserCTX = useContext(UserContext);
	const userId = UserCTX.user._id;

	const { data: userPostedBooks } = useQuery({
		queryKey: ['userPostedBooks'],
		queryFn: () => {
			return getUserPostedBooksCount(userId)
		}
	});

	const { data: userReviewedBooks } = useQuery({
		queryKey: ['userReviewedBooks'],
		queryFn: () => {
			return getUserReviewedBooks(userId)
		}
	});

	const { data: userReadBooks } = useQuery({
		queryKey: ['userReadBooks'],

		queryFn: () => {
			return getUserReadBooks(userId);
		}
	});

	return (
		<div className={styles['modal-user-details']}>
			<div className={styles.modal__bg} onClick={onClose}></div>

			<div className={styles.modal__content}>
				<div className={styles['modal__content-inner']}>
					<button className={styles['modal__close-btn']} onClick={onClose}></button>

					<div className={styles['modal__user-img']}>
						<img src={UserCTX.user.imageUrl} alt="Your photo" />
					</div>

					<div className={styles['modal__user-body']}>
						<ul>
							<li>
								<span>Name:</span> {UserCTX.user.firstName} {UserCTX.user.lastName}
							</li>

							<li>
								<span>Email:</span> {UserCTX.user.email}
							</li>
							<li>
								<span>Books Added:</span> {userPostedBooks}
							</li>

							<li>
								<span>Books Reviewed:</span> {userReviewedBooks?.length}
							</li>

							<li>
								<span>Books Read:</span> {userReadBooks?.length}
							</li>
						</ul>
					</div>

					<div className={styles['modal__user-actions']}>
						<button className={styles['modal__btn']} onClick={onLogout}>Logout</button>
						<Link className={styles['modal__btn']} to="/my-account" onClick={onClose}>Account details</Link>
					</div>
				</div>
			</div>
		</div>
	);
}