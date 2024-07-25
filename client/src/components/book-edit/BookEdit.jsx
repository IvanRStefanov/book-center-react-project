import { useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import UserContext from "../../contexts/UserContext";

export default function BookEdit() {
  const { bookId } = useParams();
  const UserCTX = useContext(UserContext)
  
  if(!UserCTX.user) {
    return <Navigate to={'/'} />
  }
  
  const book = UserCTX.postedBooks.find(postedBook => postedBook._id === bookId);
  
  if(!book) {
    return <Navigate to={'/'} />
  }

  return (
    <section className="section-edit-book">
      <div className="shell section__shell">
        <div className="section__head">
          <h1>
            You are editing<br></br>{book.name}
          </h1>
        </div>

        <div className="section__form">
          <div className="form">
            <form>
              <div className="form__body">
                <div className="form__row">
                  <label htmlFor="name" className="form__label">Book name</label>

                  <div className="form__controls">
                    <input type="text" className="field" name="name" id="name" defaultValue={book.name} />
                  </div>
                </div>

                <div className="form__row">
                  <label htmlFor="author" className="form__label">Author</label>

                  <div className="form__controls">
                    <input type="text" className="field" name="author" id="author" defaultValue={book.author} />
                  </div>
                </div>

                <div className="form__row">
                  <label htmlFor="imgUrl" className="form__label">Book cover URL</label>

                  <div className="form__controls">
                    <input type="text" className="field" name="imgUrl" id="imgUrl" defaultValue={book.imgUrl} />
                  </div>
                </div>

                <div className="form__row">
                  <label htmlFor="description" className="form__label">Book description</label>

                  <div className="form__controls">
                    <textarea className="textarea" name="description" id="description" value={book.description}> </textarea>
                  </div>
                </div>

                <div className="form__row">
                  <fieldset>
                    <legend>What genre is the book?</legend>

                    <ul className="radios">
                      <li>
                        <input type="radio" id="Fantasy" name="genre" value="Fantasy" />
                        <label htmlFor="Fantasy">Fantasy</label>
                      </li>

                      <li>
                        <input type="radio" id="Fiction" name="genre" value="Fiction" />
                        <label htmlFor="Fiction">Fiction</label>
                      </li>

                      <li>
                        <input type="radio" id="Adventure" name="genre" value="Adventure" />
                        <label htmlFor="Adventure">Adventure</label>
                      </li>

                      <li>
                        <input type="radio" id="Horror" name="genre" value="Horror" />
                        <label htmlFor="Horror">Horror</label>
                      </li>

                      <li>
                        <input type="radio" id="Sci-Fi" name="genre" value="Sci-Fi" />
                        <label htmlFor="Sci-Fi">Sci-Fi</label>
                      </li>

                      <li>
                        <input type="radio" id="Comedy" name="genre" value="Comedy" />
                        <label htmlFor="Comedy">Comedy</label>
                      </li>

                      <li>
                        <input type="radio" id="Thriller" name="genre" value="Thriller" />
                        <label htmlFor="Thriller">Thriller</label>
                      </li>

                      <li>
                        <input type="radio" id="History" name="genre" value="History" />
                        <label htmlFor="History">History</label>
                      </li>

                      <li>
                        <input type="radio" id="Teen" name="genre" value="Teen" />
                        <label htmlFor="Teen">Teen</label>
                      </li>

                      <li>
                        <input type="radio" id="Mistery" name="genre" value="Mistery" />
                        <label htmlFor="Mistery">Mistery</label>
                      </li>
                    </ul>
                  </fieldset>
                </div>

                <div className="form__row">
                  <label htmlFor="price" className="form__label">Price</label>

                  <div className="form__controls">
                    <input type="number" className="field" name="price" id="price" step={.01} min={0} defaultValue={book.price} />
                  </div>
                </div>
              </div>

              <div className="form__actions">
                <input type="submit" className="form__btn" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}