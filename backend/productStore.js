let memoryProducts = [];

function getNextProductId(products = memoryProducts) {
  if (!Array.isArray(products) || products.length === 0) {
    return 1;
  }

  const lastProduct = products[products.length - 1];
  return (lastProduct && typeof lastProduct.id === 'number' ? lastProduct.id : 0) + 1;
}

function addFallbackProduct(products = memoryProducts, productData) {
  const newProduct = {
    id: getNextProductId(products),
    name: productData.name,
    image: productData.image,
    category: productData.category,
    new_price: productData.new_price,
    old_price: productData.old_price,
    Date: new Date(),
    available: true,
  };

  products.push(newProduct);
  return newProduct;
}

function removeFallbackProduct(products = memoryProducts, id) {
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    return false;
  }

  products.splice(index, 1);
  return true;
}

function getProducts() {
  return memoryProducts;
}

module.exports = {
  getNextProductId,
  addFallbackProduct,
  removeFallbackProduct,
  getProducts,
};
