import store2 from 'store2'

const UserName = 'userName'
const PowerRoute = 'powerRoute'

export function setUserName (name) {
  return store2(UserName, name)
}
export function getUserName () {
  return store2(UserName)
}
export function removeUserName () {
  return store2.remove(UserName)
}
export function setPowerRoute (data) {
  return store2(PowerRoute, data)
}
export function getPowerRoute () {
  return store2(PowerRoute)
}
export function removePowerRoute () {
  return store2.remove(PowerRoute)
}


