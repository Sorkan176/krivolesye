export default function validateField(field, value) {
  switch (field) {
    case 'name':
      if (!value.trim()) return 'Введите имя';
      if (value.trim().length < 2) return 'Минимум 2 символа';
      return '';

    case 'email':
      if (!value.trim()) return 'Введите E-mail';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Некорректный E-mail';
      }
      return '';

    case 'password':
      if (!value) return 'Введите пароль';
      if (value.length < 6) return 'Минимум 6 символов';
      return '';

    default:
      return '';
  }
}