export const isLoggedIn = () => {
    return Object.keys(JSON.parse(localStorage.getItem("user")) || []).length > 0
      ? true
      : false;
};