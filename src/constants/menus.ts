import { getPermissions } from './permissions'

export function getMenus() {
  const { IS_ADMIN, IS_CLIENT } = getPermissions()
  
  return [
    {
      name: 'home',
      icon: 'fa-solid fa-house',
      label: 'Home',
      visible: IS_ADMIN || IS_CLIENT
    },
    {
      name: 'redirections',
      icon: 'fa-solid fa-link',
      label: 'Redirections',
      visible: IS_ADMIN || IS_CLIENT
    },
    {
      name: 'users',
      icon: 'fa-solid fa-user',
      label: 'Users',
      visible: IS_ADMIN
    }
  ]
}
