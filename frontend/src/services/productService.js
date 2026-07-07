import { supabase } from "./supabase";
import { sendStockAlert, checkStockAlert, getUserEmail } from "./resend";

/**
 * Get all products
 * @returns {Promise<array>} Array of products
 */
export async function getProducts() {
  try {
    const { data, error } = await supabase
      .from("inventory_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

/**
 * Get single product by ID
 * @param {string} id - Product ID
 * @returns {Promise<object>} Product data
 */
export async function getProductById(id) {
  try {
    const { data, error } = await supabase
      .from("inventory_items")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

/**
 * Add new product
 * @param {object} product - Product data
 * @returns {Promise<object>} Created product
 */
export async function addProduct(product) {
  try {
    const { data, error } = await supabase
      .from("inventory_items")
      .insert([product])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

/**
 * Update product and trigger stock alerts if needed
 * @param {string} id - Product ID
 * @param {object} updates - Updated product data
 * @returns {Promise<object>} Updated product
 */
export async function updateProduct(id, updates) {
  try {
    // Get current product data first
    const currentProduct = await getProductById(id);
    const oldStock = Number(currentProduct.stock);
    const newStock = Number(updates.stock);

    // Check if stock has changed
    if (oldStock !== newStock) {
      const alertInfo = checkStockAlert(oldStock, newStock);

      // If alert should be triggered, send email
      if (alertInfo && alertInfo.triggered) {
        const userEmail = getUserEmail();
        if (userEmail) {
          try {
            await sendStockAlert(
              alertInfo.type,
              updates.name || currentProduct.name,
              newStock,
              userEmail,
              alertInfo.threshold
            );
            console.log(`${alertInfo.type} alert sent for ${updates.name || currentProduct.name}`);
          } catch (alertError) {
            console.warn("Could not send alert email:", alertError.message);
            // Continue with product update even if email fails
          }
        }
      }
    }

    // Update product in database
    const { data, error } = await supabase
      .from("inventory_items")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

/**
 * Delete product
 * @param {string} id - Product ID
 * @returns {Promise<void>}
 */
export async function deleteProduct(id) {
  try {
    const { error } = await supabase
      .from("inventory_items")
      .delete()
      .eq("id", id);

    if (error) throw error;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

/**
 * Get low stock products
 * @returns {Promise<array>} Products with low stock
 */
export async function getLowStockProducts() {
  try {
    const { data, error } = await supabase
      .from("inventory_items")
      .select("*")
      .lt("stock", 10)
      .order("stock", { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching low stock products:", error);
    throw error;
  }
}
