export function useLocalStorage() {
  const data = JSON.parse(localStorage.getItem('userData'));
  const updateLocalStorage = (key, value) => {
    data[key] = value;
    localStorage.setItem('userData', JSON.stringify(data));
  };
  if (data) {
    const { email, password, firstName, lastName, wishlist, cart } = data;
    const storedToken = localStorage.getItem('token');
    return {
      storedEmail: email,
      storedPassword: password,
      storedName: firstName,
      storedSurname: lastName,
      storedWishlist: wishlist,
      storedCart: cart,
      storedToken,
      updateLocalStorage
    };
  } else {
    return { updateLocalStorage };
  }
}
