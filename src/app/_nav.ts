import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'Devices',
    url: '/device',
    icon: 'fa fa-tablet'
  },
  {
    title: true,
    name: 'Adminstration'
  },
  {
    name: 'User',
    url: '/user',
    icon: 'icon-user'
  }
];