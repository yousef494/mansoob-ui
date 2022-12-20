import { INavData } from '@coreui/angular';

let navItems_list = [
  {
    name: 'Home',
    url: '/home',
    icon: 'icon-home',
    roles: ['ADMIN', 'BASIC']
  },
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





/*
@Injectable({
  providedIn: "root"
})
export class NavItems {
  data: any = {};
  constructor() {}

   public navItems(role, translate){
    let navItems_array: INavData[] = [];
    navItems_list.forEach(item =>{
      if((item.roles && item.roles.indexOf(role)>-1) || item.title){
        delete item.roles;
        item['name'] = translate.data[item['name']];
        navItems_array.push(item);
      }
    });
    return navItems_array;
  }
}
*/



export function navItems(role, translate){
  let navItems_array: INavData[] = [];
  navItems_list.forEach(item =>{
    if((item.roles && item.roles.indexOf(role)>-1) || item.title){
      delete item.roles;
      item['name'] = translate.data[item['name']];
      navItems_array.push(item);
    }
  });
  return navItems_array;
}


