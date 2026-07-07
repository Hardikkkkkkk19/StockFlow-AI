import { useState } from "react";
import Tesseract from "tesseract.js";

import Slidebar from "../components/Slidebar";
import TopBar from "../components/TopBar";

function Vision() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState([]);
  const [total, setTotal] = useState(0);
  const [ocrText, setOcrText] = useState("");

  async function scanReceipt() {
    if (!image) {
      alert("Select a receipt image");
      return;
    }

    setLoading(true);

    const result = await Tesseract.recognize(image, "eng");

    const text = result.data.text;
    setOcrText(text);

    const matches = text.match(/\d+\.\d{2}|\d+/g) || [];

    const nums = matches
      .map((n) => Number(n))
      .filter((n) => n > 0 && n < 100000);

    setPrices(nums);

    const sum = nums.reduce((a, b) => a + b, 0);

    setTotal(sum);

    setLoading(false);
  }

  return (
    <div className="dashboard-layout">

      <Slidebar />

      <div className="dashboard-content">

        <TopBar />

        <div className="dashboard-main">

          <h1 className="dashboard-title">
            Receipt Scanner
          </h1>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <br /><br />

          <button
            className="primary-btn"
            onClick={scanReceipt}
          >
            Scan Receipt
          </button>

          <br /><br />

          {loading && <h2>Scanning...</h2>}

          {prices.length > 0 && (

            <div className="dashboard-box">

              <h2>Detected Prices</h2>

              {prices.map((price, index) => (
                <p key={index}>
                  ₹ {price}
                </p>
              ))}

              <hr />

              <h2>Total : ₹ {total}</h2>

            </div>

          )}

          <br />

          <textarea
            value={ocrText}
            readOnly
            rows="12"
            style={{
              width: "100%",
              padding: "20px",
              borderRadius: "10px",
              background: "#151d30",
              color: "white",
            }}
          />

        </div>

      </div>

    </div>
  );
}

export default Vision;