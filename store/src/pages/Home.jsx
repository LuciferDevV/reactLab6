import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

const API_URL = "https://6800eefcb72e9cfaf72944ea.mockapi.io/products";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    setLoading(true);
    axios.get(API_URL).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Интернет-магазин</h1>
      <ProductForm onProductAdded={fetchProducts} />
      <ProductList products={products} loading={loading} />
    </div>
  );
}

export default Home;
