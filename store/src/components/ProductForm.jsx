import { useState } from "react";
import axios from "axios";

const API_URL = "https://6800eefcb72e9cfaf72944ea.mockapi.io/products";

/**
 * Компонент формы добавления нового товара.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.onProductAdded - Функция обратного вызова после добавления товара.
 * @returns {JSX.Element}
 */
function ProductForm({ onProductAdded }) {
  const [form, setForm] = useState({ name: "", price: "" });
  const [errors, setErrors] = useState({});

  /**
   * Проверяет форму на наличие ошибок.
   *
   * @returns {Object} errors - Объект с полями ошибок.
   */
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "Название обязательно";
    }

    const priceValue = parseFloat(form.price);
    if (!form.price.trim() || isNaN(priceValue)) {
      newErrors.price = "Введите корректную цену";
    } else if (priceValue <= 0) {
      newErrors.price = "Цена должна быть положительным числом";
    }

    return newErrors;
  };

  /**
   * Обрабатывает отправку формы: валидирует, отправляет запрос на API и сбрасывает форму.
   *
   * @param {React.FormEvent} e - Событие отправки формы.
   * @returns {void}
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      axios.post(API_URL, {
        name: form.name.trim(),
        price: parseFloat(form.price),
      }).then(() => {
        setForm({ name: "", price: "" });
        onProductAdded();
      });
    }
  };

  /**
   * Обновляет состояние формы при изменении ввода.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - Событие изменения ввода.
   * @returns {void}
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Добавить товар</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Название:</label>
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
        </div>
        <div>
          <label>Цена:</label>
          <input name="price" value={form.price} onChange={handleChange} />
          {errors.price && <div style={{ color: "red" }}>{errors.price}</div>}
        </div>
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
}

export default ProductForm;
