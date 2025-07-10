import productModel from '../models/model.product.js';
import userModel from '../models/model.user.js';

async function getAllProducts() {
  try {
    const products = await productModel.getAllProducts();
    return products; // Acá se deberían filtrar productos por ejemplo por fecha mensual si es necesario
  } catch (error) {
    console.error('Error al consultar productos:', error);
    throw error;
  }
}