import { 
  LayoutDashboard, 
  BarChart3, 
  Lightbulb, 
  RefreshCw, 
  Users, 
  Store, 
  Tag, 
  Layers, 
  MessageSquare, 
  Settings, 
  HelpCircle 
} from 'lucide-react';

export const NAV_ITEMS = [
  { group: 'Menu', items: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'insights', label: 'Insights', icon: Lightbulb },
    { id: 'updates', label: 'Updates', icon: RefreshCw, badge: 3 },
  ]},
  { group: 'Products', items: [
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'store', label: 'Store', icon: Store },
    { id: 'discounts', label: 'Discounts', icon: Tag },
  ]},
  { group: 'General', items: [
    { id: 'integration', label: 'Integration', icon: Layers },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help Desk', icon: HelpCircle },
  ]},
];

export interface Order {
  id: string;
  orderId: string;
  date: string;
  customer: string;
  category: string;
  status: 'Pending' | 'Completed';
  items: number;
  total: number;
}

export const RECENT_ORDERS: Order[] = [
  { id: '1', orderId: '#7832', date: 'Oct 24, 2023', customer: 'Eleanor Pena', category: 'Fashion', status: 'Completed', items: 3, total: 124.00 },
  { id: '2', orderId: '#7833', date: 'Oct 24, 2023', customer: 'Theresa Webb', category: 'Electronics', status: 'Pending', items: 1, total: 899.00 },
  { id: '3', orderId: '#7834', date: 'Oct 23, 2023', customer: 'Arlene McCoy', category: 'Home', status: 'Completed', items: 2, total: 45.50 },
  { id: '4', orderId: '#7835', date: 'Oct 23, 2023', customer: 'Jerome Bell', category: 'Fashion', status: 'Completed', items: 5, total: 340.00 },
  { id: '5', orderId: '#7836', date: 'Oct 22, 2023', customer: 'Courtney Henry', category: 'Beauty', status: 'Pending', items: 1, total: 24.99 },
];

export const CUSTOMERS = [
  { id: 1, name: 'Eleanor Pena', email: 'eleanor.pena@example.com', orders: 12, totalSpent: 1240.50, status: 'Active' },
  { id: 2, name: 'Theresa Webb', email: 'theresa.webb@example.com', orders: 8, totalSpent: 899.00, status: 'Active' },
  { id: 3, name: 'Arlene McCoy', email: 'arlene.mccoy@example.com', orders: 5, totalSpent: 450.20, status: 'Inactive' },
  { id: 4, name: 'Jerome Bell', email: 'jerome.bell@example.com', orders: 24, totalSpent: 3400.00, status: 'Active' },
  { id: 5, name: 'Courtney Henry', email: 'courtney.henry@example.com', orders: 3, totalSpent: 240.99, status: 'Active' },
];

export const PRODUCTS = [
  { id: 1, name: 'Premium Wireless Headphones', category: 'Electronics', price: 299.99, stock: 45, sales: 120 },
  { id: 2, name: 'Cotton Summer Dress', category: 'Fashion', price: 59.99, stock: 120, sales: 85 },
  { id: 3, name: 'Smart Home Hub', category: 'Electronics', price: 149.99, stock: 15, sales: 210 },
  { id: 4, name: 'Organic Face Serum', category: 'Beauty', price: 34.50, stock: 60, sales: 340 },
  { id: 5, name: 'Minimalist Wall Clock', category: 'Home', price: 45.00, stock: 8, sales: 55 },
];

export const NOTIFICATIONS = [
  { id: 1, title: 'New Order Received', message: 'Order #7832 has been placed successfully.', time: '2 mins ago', type: 'order' },
  { id: 2, title: 'Stock Alert', message: 'Smart Home Hub is running low on stock (15 left).', time: '1 hour ago', type: 'alert' },
  { id: 3, title: 'Customer Feedback', message: 'Arlene McCoy left a 5-star review on Face Serum.', time: '3 hours ago', type: 'feedback' },
  { id: 4, title: 'Payout Successful', message: 'Your weekly payout of $4,520 has been processed.', time: '5 hours ago', type: 'system' },
];
