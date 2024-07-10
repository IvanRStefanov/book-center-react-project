export default function SectionContact() {
  return (
    <section className="section-contact">
      <div className="shell">
        <div className="section__content">
          <div className="section__media">
            <div className="section__img">
              <img src="./src/assets/svgs/quill.svg" alt="" />
            </div>
          </div>

          <div className="section__main">
            <header className="section__head">
              <h2>Give us your feedback</h2>
            </header>
            
            <div className="section__form">
              <div className="form">
                <form action="">

                  <div className="form__body">
                    <div className="form__row">
                      <label htmlFor="firstName" className="form__label">First name</label>

                      <div className="form__controls">
                        <input type="text" className="field" id="firstName" />
                      </div>
                    </div>

                    <div className="form__row">
                      <label htmlFor="lasttName" className="form__label">Last name</label>

                      <div className="form__controls">
                        <input type="text" className="field" id="lasttName" />
                      </div>
                    </div>

                    <div className="form__row">
                      <label htmlFor="email" className="form__label">Email</label>

                      <div className="form__controls">
                        <input type="email" className="field" id="email" required />
                      </div>
                    </div>

                    <div className="form__row">
                      <label htmlFor="message" className="form__label">Message</label>

                      <div className="form__controls">
                        <textarea name="message" id="message" className="textarea"></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="form__actions">
                    <input type="submit" value="Submit" className="form__btn"></input>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}