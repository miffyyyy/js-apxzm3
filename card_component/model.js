export const Model = (() => {
  const users = [];

  const getUser = async (num) => {
    const response = await fetch('https://randomuser.me/api/?results=' + num); // promise.all
    const { results: users_res } = await response.json();
    return users_res;
  };

  return {
    users,
    getUser,
  };
})();
