import { useState } from "react";

export default function PublishPage() {
    const [formValues, setFormValues] = useState({});
    function changeHandler(e) {
        // console.log(e.target.name)
        // console.log(e.target.value)
        // console.log(e.target)
        setFormValues(oldValues => ({
            ...oldValues,
            [e.target.name]: e.target.type === 'checkbox'
                ? e.target.checked
                : e.target.value
        }))

        console.log(formValues)
    }

    return (
        <section className="section-publish-new-book">
            <div className="shell section__shell">
                <div className="form section__form">
                    <form>
                        <div className="form__head">
                            <h1>Publish new book</h1>
                        </div>

                        <div className="form__body">
                            <div className="form__row">
                                <label htmlFor="name" className="form__label">Book name</label>

                                <div className="form__controls">
                                    <input type="text" className="field" name="name" id="name" onChange={changeHandler} />
                                </div>
                            </div>

                            <div className="form__row">
                                <label htmlFor="author" className="form__label">Author</label>

                                <div className="form__controls">
                                    <input type="text" className="field" name="author" id="author" onChange={changeHandler} />
                                </div>
                            </div>

                            <div className="form__row">
                                <label htmlFor="imgUrl" className="form__label">Book cover URL</label>

                                <div className="form__controls">
                                    <input type="text" className="field" name="imgUrl" id="imgUrl" onChange={changeHandler} />
                                </div>
                            </div>

                            <div className="form__row">
                                <label htmlFor="description" className="form__label">Book description</label>

                                <div className="form__controls">
                                    <textarea className="textarea" name="description" id="description" onChange={changeHandler}></textarea>
                                </div>
                            </div>

                            <div className="form__row">
                                <fieldset>
                                    <legend>What genre is the book?</legend>

                                    <ul className="checkboxes">
                                        <li>
                                            <input type="checkbox" id="Fantasy" name="Fantasy" onChange={changeHandler} />
                                            <label htmlFor="Fantasy">Fantasy</label>
                                        </li>

                                        <li>
                                            <input type="checkbox" id="Fiction" name="Fiction" onChange={changeHandler} />
                                            <label htmlFor="Fiction">Fiction</label>
                                        </li>

                                        <li>
                                            <input type="checkbox" id="Adventure" name="Adventure" onChange={changeHandler} />
                                            <label htmlFor="Adventure">Adventure</label>
                                        </li>

                                        <li>
                                            <input type="checkbox" id="Horror" name="Horror" onChange={changeHandler} />
                                            <label htmlFor="Horror">Horror</label>
                                        </li>

                                        <li>
                                            <input type="checkbox" id="Sci-Fi" name="Sci-Fi" onChange={changeHandler} />
                                            <label htmlFor="Sci-Fi">Sci-Fi</label>
                                        </li>

                                        <li>
                                            <input type="checkbox" id="Comedy" name="Comedy" onChange={changeHandler} />
                                            <label htmlFor="Comedy">Comedy</label>
                                        </li>

                                        <li>
                                            <input type="checkbox" id="Thriller" name="Thriller" onChange={changeHandler} />
                                            <label htmlFor="Thriller">Thriller</label>
                                        </li>

                                        <li>
                                            <input type="checkbox" id="History" name="History" onChange={changeHandler} />
                                            <label htmlFor="History">History</label>
                                        </li>

                                        <li>
                                            <input type="checkbox" id="Teen" name="Teen" onChange={changeHandler} />
                                            <label htmlFor="Teen">Teen</label>
                                        </li>

                                        <li>
                                            <input type="checkbox" id="Mistery" name="Mistery" onChange={changeHandler} />
                                            <label htmlFor="Mistery">Mistery</label>
                                        </li>
                                    </ul>
                                </fieldset>
                            </div>

                            <div className="form__row">
                                <label htmlFor="price" className="form__label">Price</label>

                                <div className="form__controls">
                                    <input type="text" className="field" name="price" id="price" onChange={changeHandler} />
                                </div>
                            </div>
                        </div>

                        <div className="form__actions">
                            <input type="submit" className="form__btn" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}