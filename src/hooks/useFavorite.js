function addToFavorites(id) {
  console.log(id);
  const favorites = getFromFavorites();
  favorites.push(id)
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function getFromFavorites() {
  const favorites = localStorage.getItem("favorites");
  let newFavorites = [];

  if (favorites) {
    newFavorites = JSON.parse(favorites);
  } else {
    newFavorites = [];
  }

  return newFavorites;
}

function removeFromFavorites(id) {
  const favorites = getFromFavorites();
  const matchedFavorites = favorites.filter((favorite) => favorite !== id);
  localStorage.setItem("favorites", JSON.stringify(matchedFavorites));
}

export { addToFavorites, getFromFavorites, removeFromFavorites };
