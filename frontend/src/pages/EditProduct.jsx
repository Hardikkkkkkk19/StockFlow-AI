import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct, getProductById } from "../services/productService";
import Slidebar from "../components/Slidebar";
import TopBar from "../components/TopBar";

function EditProduct() {
  const { id } = useParams();
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
  const [message, setMessage] = useState("");

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    try {
      const product = await getProductById(id);
      setForm(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      setMessage("Failed to load product");
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setMessage(""); // Clear message when user makes changes
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await updateProduct(id, {
        name: form.name,
        category: form.category,
        price: form.price,
        stock: form.stock,
        description: form.description,
        image: form.image,
      });

      alert("Product Updated Successfully");
      navigate("/products");
    } catch (error) {
      console.error("Update error:", error);
      setMessage(error.message || "Failed to update product");
      alert("Error: " + (error.message || "Failed to update product"));
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

          <h1>Edit Product</h1>

          <form className="product-form" onSubmit={handleSubmit}>

            <input
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />

            <input
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="primary-btn"
            >
              Update Product
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditProduct;