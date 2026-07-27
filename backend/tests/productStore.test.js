const test = require('node:test');
const assert = require('node:assert/strict');
const { addFallbackProduct, removeFallbackProduct, getNextProductId } = require('../productStore');

test('creates a new product id based on existing items', () => {
  const products = [{ id: 1 }, { id: 2 }];
  assert.equal(getNextProductId(products), 3);
});

test('adds and removes fallback products', () => {
  const products = [];
  const added = addFallbackProduct(products, {
    name: 'Test Product',
    image: '/img.png',
    category: 'Test',
    new_price: 10,
    old_price: 20,
  });

  assert.equal(added.id, 1);
  assert.equal(products.length, 1);

  const removed = removeFallbackProduct(products, 1);
  assert.equal(removed, true);
  assert.equal(products.length, 0);
});
