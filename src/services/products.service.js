/*
import productModel from '../models/product.model.js';

async function getAllProducts() {
  try {
    const products = await productModel.getAllProducts();
    return products; // Acá se deberían filtrar productos por ejemplo por fecha mensual si es necesario
  } catch (error) {
    console.error('Error al consultar productos:', error);
    throw error;
  }
}

async function getProductById(id) {
  try {
    const product = await productModel.getProductById(id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  } catch (error) {
    console.error(`Error al consultar producto con ID ${id}:`, error);
    throw error;
  }
}

export {
  getAllProducts,
  getProductById
};
*/