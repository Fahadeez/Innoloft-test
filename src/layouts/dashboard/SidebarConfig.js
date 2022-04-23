// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Main Page',
    path: '/',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'Product Details',
    path: 'product/:product/*',
    icon: getIcon('eva:pie-chart-2-fill')
  },
];

export default sidebarConfig;
