export const navigationSections = [
  {
    id: 'favorites',
    label: 'Favorites',
    items: [
      { id: 'overview', label: 'Overview', href: '#', icon: 'Star' },
      { id: 'projects', label: 'Projects', href: '#', icon: 'Folder' },
    ],
  },
  {
    id: 'dashboards',
    label: 'Dashboards',
    items: [
      { id: 'default', label: 'Default', href: '/', icon: 'LayoutDashboard' },
      { id: 'orders', label: 'Orders', href: '/orders', icon: 'ListOrdered' },
      { id: 'ecommerce', label: 'eCommerce', href: '#', icon: 'ShoppingBag' },
      { id: 'projects-nav', label: 'Projects', href: '#', icon: 'ClipboardList' },
      { id: 'courses', label: 'Online Courses', href: '#', icon: 'GraduationCap' },
    ],
  },
  {
    id: 'pages',
    label: 'Pages',
    items: [
      {
        id: 'user-profile',
        label: 'User Profile',
        href: '#',
        icon: 'UserRound',
        children: [
          { id: 'user-overview', label: 'Overview', href: '#'},
          { id: 'user-projects', label: 'Projects', href: '#'},
          { id: 'user-campaigns', label: 'Campaigns', href: '#'},
          { id: 'user-documents', label: 'Documents', href: '#'},
          { id: 'user-followers', label: 'Followers', href: '#'},
        ],
      },
      { id: 'account', label: 'Account', href: '#', icon: 'Settings' },
      { id: 'corporate', label: 'Corporate', href: '#', icon: 'Building2' },
      { id: 'blog', label: 'Blog', href: '#', icon: 'Notebook' },
      { id: 'social', label: 'Social', href: '#', icon: 'Share2' },
    ],
  },
]



