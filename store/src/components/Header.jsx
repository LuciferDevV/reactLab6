import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemsCount } from "../store/cart/actions";

function Header() {
  const itemCount = useSelector(selectCartItemsCount);

  return (
    <header>
      <nav>
        <Link to="/">Главная</Link> |{" "}
        <Link to="/cart">Корзина ({itemCount})</Link>
      </nav>
    </header>
  );
}

export default Header;
