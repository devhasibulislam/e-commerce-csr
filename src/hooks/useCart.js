function addToCart(product, quantity) {
  const cart = getFromCart();
  product.quantity = quantity;
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getFromCart() {
  const cart = localStorage.getItem("cart");
  let items = null;

  if (cart) {
    items = JSON.parse(cart);
  } else {
    items = [];
  }

  return items;
}

function removeFromCart(id) {
  const products = getFromCart();
  const cart = products.filter((product) => product._id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
}

export { addToCart, getFromCart, removeFromCart };
