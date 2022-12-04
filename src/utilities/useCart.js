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

export { getFromCart };
