import { useEffect, useState } from "react";
import { NavLink, Outlet, Navigate, useParams } from "react-router-dom";

export default function MyAccount({
	loggedInUser
}) {
	if (!loggedInUser) {
		return <Navigate to="/" />
	}

	return (
		<section className="section-my-acc">
			<div className="shell">
				<div className="section__intro">
					<p>Hello {loggedInUser.firstName} {loggedInUser.lastName}, here you can find usefull information and utilities about your posts, rated and read books.</p>
				</div>

				<div className="section__inner">
					<div className="section__aside">
						<div className="section__list">
							<nav>
								<ul>
									<li>
										<NavLink to="my-published-books">
											Published books
										</NavLink>
									</li>

									<li>
										<NavLink to="my-reviews-and-rates">
											Reviews & Rates
										</NavLink>
									</li>

									<li>
										<NavLink to="my-read-books">
											Read Books
										</NavLink>
									</li>
								</ul>
							</nav>
						</div>
					</div>

					<div className="section__main">
						<Outlet />
					</div>
				</div>
			</div>
		</section>
	);
}