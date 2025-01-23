// get user object from local storage
export default function getUser() {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return undefined;
}
