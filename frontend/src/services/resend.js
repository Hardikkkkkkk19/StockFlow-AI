// Alert Service - No external libraries, uses native Fetch API

const LOW_STOCK_THRESHOLD = 10;
const HIGH_STOCK_THRESHOLD = 100;

/**
 * Send stock alert email
 * @param {string} type - Alert type: 'LOW_STOCK' or 'HIGH_STOCK'
 * @param {string} product - Product name
 * @param {number} stock - Current stock level
 * @param {string} email - Email to send alert to
 * @param {number} threshold - Stock threshold that triggered the alert
 * @returns {Promise<object>} Response from email service
 */
export async function sendStockAlert(type, product, stock, email, threshold) {
  if (!type || !product || !stock || !email) {
    throw new Error("Missing required parameters for stock alert");
  }

  try {
    const response = await fetch("/api/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        product,
        stock,
        email,
        threshold,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send email");
    }

    return data;
  } catch (error) {
    console.error("Error sending stock alert:", error);
    throw error;
  }
}

/**
 * Check if stock level should trigger an alert
 * @param {number} oldStock - Previous stock level
 * @param {number} newStock - New stock level
 * @returns {object} Alert info or null
 */
export function checkStockAlert(oldStock, newStock) {
  // Check for LOW_STOCK alert
  if (newStock < LOW_STOCK_THRESHOLD && oldStock >= LOW_STOCK_THRESHOLD) {
    return {
      type: "LOW_STOCK",
      threshold: LOW_STOCK_THRESHOLD,
      triggered: true,
    };
  }

  // Check for HIGH_STOCK alert
  if (newStock > HIGH_STOCK_THRESHOLD && oldStock <= HIGH_STOCK_THRESHOLD) {
    return {
      type: "HIGH_STOCK",
      threshold: HIGH_STOCK_THRESHOLD,
      triggered: true,
    };
  }

  return null;
}

/**
 * Get user email from local storage
 * @returns {string} User email or null
 */
export function getUserEmail() {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.email || null;
    }
  } catch (error) {
    console.error("Error reading user email:", error);
  }
  return null;
}

export const THRESHOLDS = {
  LOW_STOCK: LOW_STOCK_THRESHOLD,
  HIGH_STOCK: HIGH_STOCK_THRESHOLD,
};
