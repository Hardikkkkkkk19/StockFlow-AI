import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import Slidebar from "../components/Slidebar";
import TopBar from "../components/TopBar";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Analytics() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAnalytics();
  }, []);

  async function getAnalytics() {
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

  const totalStock = products.reduce(
    (sum, item) => sum + Number(item.stock),
    0
  );

  const totalValue = products.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.stock),
    0
  );

  const lowStock = products.filter(
    (item) => Number(item.stock) < 10
  ).length;

  const categoryCount = {};

  products.forEach((item) => {
    categoryCount[item.category] =
      (categoryCount[item.category] || 0) + 1;
  });

  const barData = {
    labels: Object.keys(categoryCount),
    datasets: [
      {
        label: "Products",
        data: Object.values(categoryCount),
        backgroundColor: "#7c3aed",
      },
    ],
  };

  const pieData = {
    labels: Object.keys(categoryCount),
    datasets: [
      {
        data: Object.values(categoryCount),
        backgroundColor: [
          "#7c3aed",
          "#2563eb",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#06b6d4",
        ],
      },
    ],
  };

  return (
    <div className="dashboard-layout">

      <Slidebar />

      <div className="dashboard-content">

        <TopBar />

        <div className="dashboard-main">

          <h1 className="dashboard-title">Analytics</h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div className="dashboard-box">
              <h3>Total Products</h3>
              <h2>{totalProducts}</h2>
            </div>

            <div className="dashboard-box">
              <h3>Total Stock</h3>
              <h2>{totalStock}</h2>
            </div>

            <div className="dashboard-box">
              <h3>Inventory Value</h3>
              <h2>₹{totalValue}</h2>
            </div>

            <div className="dashboard-box">
              <h3>Low Stock</h3>
              <h2>{lowStock}</h2>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
            }}
          >
            <div className="dashboard-box">
              <Bar data={barData} />
            </div>

            <div className="dashboard-box">
              <Pie data={pieData} />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;