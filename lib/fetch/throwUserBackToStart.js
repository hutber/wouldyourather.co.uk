import config from 'config'

export default () => {
  // TODO remove all cookies of user, if we use some;
  sessionStorage.clear()
  localStorage.clear()
  document.location.href = `${config.url}/${config.redirect}`
}
