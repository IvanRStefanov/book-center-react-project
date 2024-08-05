import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { bookGenres } from "../../../utils/variables";
import { updateBook } from "../../../services/booksService";

export default function BookEditForm({
  book
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: book?.name,
      author: book?.author,
      imgUrl: book?.imgUrl,
      description: book?.description,
      genre: book?.genre,
      price: book?.price
    },
    mode: 'onSubmit'
  });

  const updateBookMutation = useMutation({
    mutationFn: async (editedBookObject) => {
      return updateBook(book._id, editedBookObject)
    }
  })

  async function submitEditedBookHandler(data) {
    const queryKeysToInvalidate = ['singleBook', 'singleBookEdit']

    try {
      await updateBookMutation.mutateAsync(
        {
          ...data,
          price: Number(parseFloat(data.price).toFixed(2))
        },
        {
          onSuccess: (data) => {
            queryKeysToInvalidate.forEach(key => {
              queryClient.invalidateQueries({ queryKey: [key] })
            });
            navigate('/catalog/' + data._id);
          },
          onError: (error) => {
            if (error.message === 'Failed to fetch') {
              throw new Error(error.message);
            }
          }
        }
      )
    } catch (error) {
      console.error(error.message)
      setError('serverError', {
        type: 'serverErrMsg',
        message: error.message == 'Failed to fetch' ? 'Please try again later, there are some technical issues' : error.message,
      })
    }
  }

  function onError(errors) {
    if (errors.serverError) {
      clearErrors('serverError');
      handleSubmit(submitEditedBookHandler)();
    }
  }

  return (
    <>
      {errors.serverError
        ?
        navigate('/page-404')
        :
        <div className="form">
          <form onSubmit={handleSubmit(submitEditedBookHandler, onError)}>
            <div className="form__head">
              <h4>
                You are editing<br></br>{book.name}
              </h4>
            </div>
            <div className="form__body">
              <div className={errors.name ? "form__row form__row--err" : 'form__row'}>
                <label htmlFor="name" className="form__label">Book name</label>

                <div className="form__controls">
                  <input
                    type="text"
                    className="field"
                    name="name"
                    id="name"
                    disabled={updateBookMutation.isPending}
                    {...register('name', {
                      required: 'true',
                    })}
                  />
                </div>
              </div>

              <div className={errors.author ? "form__row form__row--err" : 'form__row'}>
                <label htmlFor="author" className="form__label">Author</label>

                <div className="form__controls">
                  <input
                    type="text"
                    className="field"
                    name="author"
                    id="author"
                    disabled={updateBookMutation.isPending}
                    {...register('author', {
                      required: true
                    })}
                  />
                </div>
              </div>

              <div className={errors.imgUrl ? "form__row form__row--err" : 'form__row'}>
                <label htmlFor="imgUrl" className="form__label">Book cover URL</label>

                <div className="form__controls">
                  <input
                    type="text"
                    className="field"
                    name="imgUrl"
                    id="imgUrl"
                    disabled={updateBookMutation.isPending}
                    {...register('imgUrl', {
                      required: true
                    })}
                  />
                </div>
              </div>

              <div className={errors.description ? "form__row form__row--err" : 'form__row'}>
                <label htmlFor="description" className="form__label">Book description</label>

                <div className="form__controls">
                  <textarea
                    className="textarea"
                    name="description"
                    id="description"
                    disabled={updateBookMutation.isPending}
                    {...register('description', {
                      required: true
                    })}
                  />
                </div>
              </div>

              <div className={errors.genre ? "form__row form__row--err" : 'form__row'}>
                <fieldset>
                  <legend>What genre is the book?{errors.genre && <strong> {errors.genre.message}</strong>}</legend>

                  <ul className="checkboxes">
                    {bookGenres.map(genre =>
                      <li key={genre}>
                        <input
                          type="checkbox"
                          id={genre}
                          name={genre}
                          value={genre}
                          disabled={updateBookMutation.isPending}
                          {...register('genre', {
                            required: '*At least one genre is required'
                          })}
                        />
                        <label htmlFor={genre}>{genre}</label>
                      </li>
                    )}
                  </ul>
                </fieldset>
              </div>

              <div className={errors.price ? "form__row form__row--err" : 'form__row'}>
                <label htmlFor="price" className="form__label">Price</label>

                <div className="form__controls">
                  <input
                    type="number"
                    className="field"
                    name="price"
                    id="price"
                    step={.01}
                    min={0}
                    disabled={updateBookMutation.isPending}
                    {...register('price', {
                      required: true
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="form__actions">
              <button
                type="submit"
                className={updateBookMutation.isPending ? "form__btn form__btn--spinner" : "form__btn"}
                disabled={updateBookMutation.isPending}
              >
                Submit changes
              </button>
            </div>
          </form>
        </div>
      }
    </>
  );
}