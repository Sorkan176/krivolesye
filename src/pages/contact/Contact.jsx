import './Contact.css'

import { useState } from 'react';

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO нужно подключить отправку сообщения

    // console.log(form);
  };

  return (
    <section className="contact__content">
      <h1 className="text text_type_main-large contact__title">Связаться с нами</h1>

      <p className="text text_type_main-default contact__text">
        Есть вопросы или предложения? Заполните форму,
        и мы постараемся ответить вам.
      </p>

      <form
        className="contact__form"
        onSubmit={handleSubmit}
      >
        <label className="text text_type_main-default contact__label">
          Имя
          <input
            className="contact__input"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ваше имя"
            required
          />
        </label>

        <label className="text text_type_main-default contact__label">
          Электронная почта
          <input
            className="contact__input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="example@mail.com"
            required
          />
        </label>

        <label className="text text_type_main-default contact__label">
          Сообщение
          <textarea
            className="contact__textarea"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Ваше сообщение"
            required
            rows={5}
          />
        </label>

        <button
          className="text text_type_main-medium contact__submit"
          type="submit"
        >
          Отправить
        </button>
      </form>
    </section>
  );
}

export default Contact;
