import './About.css'

function About() {
  return (
    <section className="about__content">
      <h1 className="text text_type_main-large about__title">О магазине</h1>

      <p className="text text_type_main-default about__text">
        Krivolesye — интернет-магазин мерча.
      </p>

      <p className="text text_type_main-default about__text">
        Здесь собраны товары, вдохновлённые любимыми
        историями, персонажами и обычными вещами.
        Мы стремимся создать пространство, где каждый
        сможет найти что-то близкое своим интересам.
      </p>

    </section>
  );
}

export default About;
