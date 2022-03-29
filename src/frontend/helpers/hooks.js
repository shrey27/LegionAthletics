export function useLocalStorage() {
  const data = JSON.parse(localStorage.getItem('userData'));
  const updateLocalStorage = (key, value) => {
    data[key] = value;
    localStorage.setItem('userData', JSON.stringify(data));
  };
  if (data) {
    const { email, password, name, surname, wishlist, cart } = data;
    const storedToken = localStorage.getItem('token');
    return {
      storedEmail: email,
      storedPassword: password,
      storedName: name,
      storedSurname: surname,
      storedWishlist: wishlist,
      storedCart: cart,
      storedToken,
      updateLocalStorage
    };
  } else {
    return { updateLocalStorage };
  }
}
