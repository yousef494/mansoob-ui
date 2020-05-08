import { INavData } from '@coreui/angular';


let navItems_list = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    roles: ['ADMIN', 'BASIC']
  },
  {
    name: 'Devices',
    url: '/device',
    icon: 'fa fa-tablet',
    roles: ['ADMIN', 'BASIC']
  },
  {
    title: true,
    name: 'Adminstration'
  },
  {
    name: 'User',
    url: '/user',
    icon: 'icon-user',
    roles: ['ADMIN']
  }
];



export function navItems(role){
  let navItems_array: INavData[] = [];
  navItems_list.forEach(item =>{
    if(item.roles && item.roles.indexOf(role)>-1){
      delete item.roles;
      navItems_array.push(item);
    }
  });
  return navItems_array;
}
