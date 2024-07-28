import { useContext, useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { bookGenres } from "../../utils/variables";

import UserContext from "../../contexts/UserContext";
import { updateBook } from "../../services/booksService";

export default function BookEdit() {
  const { bookId } = useParams();
  const UserCTX = useContext(UserContext)

  const book = UserCTX.postedBooks.find(postedBook => postedBook._id === bookId);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: book.name,
      author: book.author,
      imgUrl: book.imgUrl,
      description: book.description,
      genre: [...book.genre],
      price: book.price
    }
  });

  // console.log(watch())

  if (!UserCTX.user) {
    return <Navigate to={'/'} />
  }


  if (!book) {
    return <Navigate to={'/'} />
  }

  const [disableCheckbox, setDisableCheckbox] = useState(isSubmitting)
  useEffect(() => {
    setDisableCheckbox(isSubmitting)
  }, [isSubmitting])

  async function submitEditedBookHandler(data) {
    console.log({...data})
    try {
      const response = await updateBook(bookId, {
        ...data,
        price: Number(parseFloat(data.price).toFixed(2))
      });
      console.log(response);
    } catch (error) {
      
    }

    console.log(data)
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
            <form onSubmit={handleSubmit(submitEditedBookHandler)}>
              <div className="form__body">
                <div className="form__row">
                  <label htmlFor="name" className="form__label">Book name</label>

                  <div className="form__controls">
                    <input
                      type="text"
                      className="field"
                      name="name"
                      id="name"
                      disabled={isSubmitting}
                      {...register('name', {
                        required: true
                      })}
                    />
                  </div>
                </div>

                <div className="form__row">
                  <label htmlFor="author" className="form__label">Author</label>

                  <div className="form__controls">
                    <input
                      type="text"
                      className="field"
                      name="author"
                      id="author"
                      disabled={isSubmitting}
                      {...register('author', {
                        required: true
                      })}
                    />
                  </div>
                </div>

                <div className="form__row">
                  <label htmlFor="imgUrl" className="form__label">Book cover URL</label>

                  <div className="form__controls">
                    <input
                      type="text"
                      className="field"
                      name="imgUrl"
                      id="imgUrl"
                      disabled={isSubmitting}
                      {...register('imgUrl', {
                        required: true
                      })}
                    />
                  </div>
                </div>

                <div className="form__row">
                  <label htmlFor="description" className="form__label">Book description</label>

                  <div className="form__controls">
                    <textarea
                      className="textarea"
                      name="description"
                      id="description"
                      disabled={isSubmitting}
                      {...register('description', {
                        required: true
                      })}
                    />
                  </div>
                </div>

                <div className="form__row">
                  <fieldset>
                    <legend>What genre is the book?</legend>

                    <ul className="checkboxes">
                      {bookGenres.map(genre =>
                        <li key={genre}>
                          <input
                            type="checkbox"
                            id={genre}
                            name={genre}
                            value={genre}
                            disabled={disableCheckbox}
                            {...register('genre', {
                              required: true
                            })}
                          />
                          <label htmlFor={genre}>{genre}</label>
                        </li>
                      )}
                    </ul>
                  </fieldset>
                </div>

                <div className="form__row">
                  <label htmlFor="price" className="form__label">Price</label>

                  <div className="form__controls">
                    <input
                      type="number"
                      className="field"
                      name="price"
                      id="price"
                      step={.01}
                      min={0}
                      disabled={isSubmitting}
                      {...register('price', {
                        required: true
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className="form__actions">
                <button type="submit" className="form__btn" disabled={isSubmitting}>Submit changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}