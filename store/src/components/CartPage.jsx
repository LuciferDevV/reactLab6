import { useSelector, useDispatch } from "react-redux";
import { selectCart } from "../store/cart/actions";
import { removeFromCart, updateQuantity } from "../store/cart/slice";

function CartPage() {
  const items = useSelector(selectCart);
  const dispatch = useDispatch();

  const handleChangeQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: +quantity }));
  };

  return (
    <div>
      <h2>Корзина</h2>
      {items.length === 0 ? (
        <p>Корзина пуста.</p>
      ) : (
        <ul className="cart-list">
          {items.map((item) => (
            <li key={item.id} className="cart-item">
              <span>
                {item.name} — {item.price}₽ ×
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    handleChangeQuantity(item.id, e.target.value)
                  }
                />
              </span>
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CartPage;
