// set user object in local storage
export default function setUser(userObj: object) {
  localStorage.setItem('user', JSON.stringify(userObj));
}
