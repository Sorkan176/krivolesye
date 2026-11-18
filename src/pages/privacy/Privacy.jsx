import './Privacy.css'

function Privacy() {
  return (
    <section className="privacy__content">
      <h1 className="text text_type_main-large privacy__title">
        Политика конфиденциальности
      </h1>

      <p className="text text_type_main-default privacy__text">
        Настоящая политика описывает принципы обработки
        и защиты персональных данных пользователей
        интернет-магазина Krivolesye.
      </p>

      <h2 className="text text_type_main-medium privacy__subtitle">
        1. Какие данные мы собираем
      </h2>

      <p className="text text_type_main-default privacy__text">
        При использовании сайта могут обрабатываться
        следующие данные:
      </p>

      <ul className="text text_type_main-default privacy__list">
        <li>Имя пользователя;</li>
        <li>Адрес электронной почты;</li>
        <li>Информация о заказах;</li>
        <li>Данные, необходимые для работы аккаунта.</li>
      </ul>

      <h2 className="text text_type_main-medium privacy__subtitle">
        2. Использование данных
      </h2>

      <p className="text text_type_main-default privacy__text">
        Данные используются для авторизации пользователей,
        управления профилем, обработки заказов и
        обеспечения работы функционала сайта.
      </p>

      <h2 className="text text_type_main-medium privacy__subtitle">
        3. Хранение и защита данных
      </h2>

      <p className="text text_type_main-default privacy__text">
        Для хранения и обработки данных используется
        Supabase. Доступ к пользовательской информации
        ограничивается соответствующими правилами
        безопасности базы данных.
      </p>

      <h2 className="text text_type_main-medium privacy__subtitle">
        4. Контакты
      </h2>

      <p className="text text_type_main-default privacy__text">
        По вопросам обработки персональных данных
        можно обратиться через страницу контактов.
      </p>
    </section>
  );
}

export default Privacy;
