import { useContext } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export default function MyAccount() {
	const UserCTX = useContext(UserContext);
	
	return (
		<section className="section-my-acc">
			<div className="shell">
				<div className="section__intro">
					<p>Hello {UserCTX.user.firstName} {UserCTX.user.lastName}, here you can find usefull information and utilities about your reviews, posted and read books.</p>
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
										<NavLink to="my-reviews">
											Reviews
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