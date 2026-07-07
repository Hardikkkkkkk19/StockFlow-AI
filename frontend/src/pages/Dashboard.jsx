import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

import Slidebar from "../components/Slidebar";
import TopBar from "../components/TopBar";

function Dashboard() {

  const [products, setProducts] = useState([]);

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
  }

  const totalProducts = products.length;

  const lowStock = products.filter(
    (item) => Number(item.stock) < 10
  ).length;

  const categories = [
    ...new Set(products.map((item) => item.category)),
  ].length;

  const inventoryValue = products.reduce(
    (sum, item) =>
      sum + Number(item.price) * Number(item.stock),
    0
  );

  return (
    <div className="dashboard-layout">

      <Slidebar />

      <div className="dashboard-content">

        <TopBar />

        <main className="dashboard-main">

          <h1 className="dashboard-title">
            Dashboard
          </h1>

          <div className="dashboard-grid">

            <div className="dashboard-box">
              <h3>Total Products</h3>
              <span>{totalProducts}</span>
            </div>

            <div className="dashboard-box">
              <h3>Low Stock</h3>
              <span>{lowStock}</span>
            </div>

            <div className="dashboard-box">
              <h3>Categories</h3>
              <span>{categories}</span>
            </div>

            <div className="dashboard-box">
              <h3>Inventory Value</h3>
              <span>₹ {inventoryValue}</span>
            </div>

          </div>

          <div className="dashboard-box" style={{ marginTop: "30px" }}>

            <h2>Recent Products</h2>

            <table className="product-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Stock</th>
                </tr>
              </thead>

              <tbody>

                {products.slice(0, 5).map((product) => (

                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.stock}</td>
                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          <div className="dashboard-box" style={{ marginTop: "30px" }}>

            <h2>Low Stock Products ⚠️</h2>

            <table className="product-table">

              <thead>

                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Stock</th>
                </tr>

              </thead>

              <tbody>

                {products
                  .filter((item) => Number(item.stock) < 10)
                  .map((product) => (

                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td
                        style={{
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        {product.stock}
                      </td>
                    </tr>

                  ))}

              </tbody>

            </table>

          </div>

          <div className="dashboard-box" style={{ marginTop: "30px" }}>

            <h2>Quick Summary</h2>

            <p>📦 Total Products : {totalProducts}</p>

            <p>📂 Categories : {categories}</p>

            <p>⚠️ Low Stock Products : {lowStock}</p>

            <p>💰 Inventory Value : ₹ {inventoryValue}</p>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Dashboard;