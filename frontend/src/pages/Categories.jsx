import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import Slidebar from "../components/Slidebar";
import TopBar from "../components/TopBar";

function Categories() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const { data, error } = await supabase
      .from("inventory_items")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    setProducts(data);

    const grouped = {};

    data.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = {
          name: item.category,
          products: 0,
          stock: 0,
          value: 0,
        };
      }

      grouped[item.category].products += 1;
      grouped[item.category].stock += Number(item.stock);
      grouped[item.category].value +=
        Number(item.stock) * Number(item.price);
    });

    setCategories(Object.values(grouped));
  }

  return (
    <div className="dashboard-layout">

      <Slidebar />

      <div className="dashboard-content">

        <TopBar />

        <div className="dashboard-main">

          <h1 className="dashboard-title">
            Categories
          </h1>

          <div className="dashboard-grid">

            <div className="dashboard-box">
              <h3>Total Categories</h3>
              <span>{categories.length}</span>
            </div>

            <div className="dashboard-box">
              <h3>Total Products</h3>
              <span>{products.length}</span>
            </div>

          </div>

          <div
            className="dashboard-box"
            style={{ marginTop: "30px" }}
          >

            <table className="product-table">

              <thead>

                <tr>
                  <th>Category</th>
                  <th>Products</th>
                  <th>Total Stock</th>
                  <th>Inventory Value</th>
                </tr>

              </thead>

              <tbody>

                {categories.map((category) => (

                  <tr key={category.name}>

                    <td>{category.name}</td>

                    <td>{category.products}</td>

                    <td>{category.stock}</td>

                    <td>₹ {category.value}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Categories;