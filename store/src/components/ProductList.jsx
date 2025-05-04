import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart/slice";

/**
 * Компонент отображения списка товаров.
 */
function ProductList({ products, loading }) {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Список товаров</h2>
      {loading ? (
        <Skeleton height={30} count={5} />
      ) : (
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <div>
                <strong>{product.name}</strong> — {product.price}₽
              </div>
              <button onClick={() => dispatch(addToCart(product))}>
                Добавить в корзину
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;
