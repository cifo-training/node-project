export class NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
}
const navItems = [
  {
    displayName: 'Dashboard',
    iconName: 'home',
    route: 'home',
  },
{
    displayName: 'Usuarios',
    iconName: 'assignment_ind',
    route: 'customers',
    /* children: [
      {
        displayName: 'Customers List',
        iconName: 'group',
        route: 'customers'
      }
    ] */
  },
  {
    displayName: 'Media',
    iconName: 'account_balance',
    route: 'media',
  },
  {
    displayName: 'Planes',
    iconName: 'assignment',
    route: 'products/plans',
  },
  {
    displayName: 'Programas',
    iconName: 'view_list',
    route: 'products/packs',
  },
  {
    displayName: 'Camps',
    iconName: 'local_play',
    route: 'suppliers',
    /* children: [
      {
        displayName: 'Suppliers List',
        iconName: 'group',
        route: 'suppliers'
      }
    ] */
  },
  {
    displayName: 'Competiciones',
    iconName: 'star',
    route: 'stock',
    /* children: [
      {
        displayName: 'Stock Order',
        iconName: 'shopping_cart',
        route: 'stock'
      }
    ] */
  },
  {
    displayName: 'Ranking',
    iconName: 'emoji_events',
    route: 'ranking',
  },
  {
    displayName: 'Free Pass',
    iconName: 'emoji_flags',
    route: 'freePass',
  },
  {
    displayName: 'To-Do',
    iconName: 'playlist_add_check',
    route: 'todoes',
  },

];
export default navItems;
