import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/productService";
import Slidebar from "../components/Slidebar";
import TopBar from "../components/TopBar";

function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await addProduct(form);
      alert("Product Added Successfully");
      navigate("/products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error: " + (error.message || "Failed to add product"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard-layout">

      <Slidebar />

      <div className="dashboard-content">

        <TopBar />

        <div className="dashboard-main">

          <h1>Add Product</h1>

          <form
            className="product-form"
            onSubmit={handleSubmit}
          >

            <input
              name="name"
              placeholder="Product Name"
              onChange={handleChange}
            />

            <input
              name="category"
              placeholder="Category"
              onChange={handleChange}
            />

            <input
              name="price"
              type="number"
              placeholder="Price"
              onChange={handleChange}
            />

            <input
              name="stock"
              type="number"
              placeholder="Stock"
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
            />

            <input
              name="image"
              placeholder="Image URL"
              onChange={handleChange}
            />

            <button
              className="primary-btn"
              type="submit"
            >
              Add Product
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddProduct;