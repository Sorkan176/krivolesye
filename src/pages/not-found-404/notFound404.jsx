import './notFound404.css'
import { IoArrowRedoSharp } from "react-icons/io5";
import {Link} from "react-router-dom";

function NotFound404({notFoundText = 'Страница не найдена.'}) {
  return (
    <div className='error-container'>
      <h3 className='text text_type_main-medium error__title'>{notFoundText} Ошибка 404</h3>
      <p className='text text_type_main-default'>Кажется вы заблудились</p>
      <p className='text text_type_main-default error__advice'>Пока не стемнело, возвращайтесь назад
        <Link to='/'>
          <IoArrowRedoSharp className='error__return-arrow'></IoArrowRedoSharp>
        </Link>
      </p>
    </div>
  )
}

export default NotFound404