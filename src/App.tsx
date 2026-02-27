/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  Bell, 
  Settings as SettingsIcon, 
  ChevronDown, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  ChevronRight,
  Filter,
  BarChart3,
  Users,
  RefreshCw,
  Layers,
  Menu,
  X,
  Moon,
  Sun,
  LogOut,
  User,
  CreditCard,
  HelpCircle as HelpIcon,
  Package,
  TrendingUp,
  Zap,
  Globe,
  Star,
  Mail,
  Trash2,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CountUp from 'react-countup';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie
} from 'recharts';
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  Marker 
} from 'react-simple-maps';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { NAV_ITEMS, RECENT_ORDERS, CUSTOMERS, PRODUCTS, NOTIFICATIONS, type Order } from './constants';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }: { 
  activeTab: string, 
  setActiveTab: (id: string) => void,
  isOpen: boolean,
  setIsOpen: (open: boolean) => void
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={cn(
        "w-[260px] fixed left-0 top-0 h-screen bg-surface border-r border-border flex flex-col z-[70] transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
              </div>
              <span className="text-xl font-bold tracking-tight">SellPilot</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-neutral-badge rounded-lg lg:hidden"
            >
              <X className="w-5 h-5 text-muted" />
            </button>
          </div>

          <nav className="space-y-8 overflow-y-auto flex-1 -mx-2 px-2 custom-scrollbar">
            {NAV_ITEMS.map((group) => (
              <div key={group.group}>
                <h3 className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-4 px-4">
                  {group.group}
                </h3>
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => {
                            setActiveTab(item.id);
                            if (window.innerWidth < 1024) setIsOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 group",
                            isActive 
                              ? "bg-nav-active text-white shadow-lg shadow-black/10" 
                              : "text-muted hover:bg-neutral-badge hover:text-heading"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-muted group-hover:text-heading")} />
                            <span className="text-sm font-medium">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className={cn(
                              "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                              isActive ? "bg-primary text-white" : "bg-primary/10 text-primary"
                            )}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-border">
            <div className="bg-neutral-badge rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden shrink-0">
                <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">Alex Rivera</p>
                <p className="text-xs text-muted truncate">Pro Plan</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const TopBar = ({ onMenuClick, theme, toggleTheme }: { onMenuClick: () => void, theme: string, toggleTheme: () => void }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="h-20 fixed top-0 right-0 left-0 lg:left-[260px] bg-surface/80 backdrop-blur-md border-b border-border px-4 md:px-8 flex items-center justify-between z-40 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-neutral-badge rounded-lg lg:hidden"
        >
          <Menu className="w-6 h-6 text-muted" />
        </button>
        
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input 
            type="text" 
            placeholder="Search product..." 
            className="w-full bg-neutral-badge border-none rounded-full py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-full hover:bg-neutral-badge transition-colors"
        >
          {theme === 'light' ? <Moon className="w-5 h-5 text-muted" /> : <Sun className="w-5 h-5 text-muted" />}
        </button>

        <button className="hidden md:flex items-center gap-2 bg-neutral-badge hover:bg-border transition-colors px-4 py-2 rounded-full text-sm font-medium">
          <Calendar className="w-4 h-4 text-muted" />
          <span className="hidden lg:inline">Oct 14, 2023 - Oct 21, 2023</span>
          <span className="lg:hidden">Oct 14 - 21</span>
        </button>
        
        <div className="flex items-center gap-1 md:gap-2 border-l border-border pl-2 md:pl-4 relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 md:p-2.5 rounded-full hover:bg-neutral-badge transition-colors relative"
          >
            <Bell className="w-5 h-5 text-muted" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-surface" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full right-0 mt-2 w-80 bg-surface border border-border rounded-2xl shadow-xl overflow-hidden z-50"
              >
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h4 className="font-bold">Notifications</h4>
                  <button className="text-xs text-primary font-semibold">Mark all as read</button>
                </div>
                <div className="max-h-96 overflow-y-auto custom-scrollbar">
                  {NOTIFICATIONS.map(n => (
                    <div key={n.id} className="p-4 hover:bg-neutral-badge transition-colors cursor-pointer border-b border-border last:border-0">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Bell className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{n.title}</p>
                          <p className="text-xs text-muted mt-0.5">{n.message}</p>
                          <p className="text-[10px] text-muted mt-2">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-border">
                  <button className="text-xs font-bold text-muted hover:text-heading transition-colors">View all notifications</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <div 
              onClick={() => setShowProfile(!showProfile)}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-200 ml-1 md:ml-2 overflow-hidden border border-border cursor-pointer shrink-0"
            >
              <img src="https://picsum.photos/seed/admin/100/100" alt="Admin" referrerPolicy="no-referrer" />
            </div>

            <AnimatePresence>
              {showProfile && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 w-56 bg-surface border border-border rounded-2xl shadow-xl overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-border">
                    <p className="text-sm font-bold">Alex Rivera</p>
                    <p className="text-xs text-muted">alex.rivera@sellpilot.com</p>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-badge transition-colors text-sm">
                      <User className="w-4 h-4 text-muted" />
                      <span>My Profile</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-badge transition-colors text-sm">
                      <SettingsIcon className="w-4 h-4 text-muted" />
                      <span>Account Settings</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-badge transition-colors text-sm">
                      <CreditCard className="w-4 h-4 text-muted" />
                      <span>Billing & Plans</span>
                    </button>
                  </div>
                  <div className="p-2 border-t border-border">
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-danger/10 text-danger transition-colors text-sm">
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

const KPICard = ({ title, value, delta, isPositive, icon: Icon, delay }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="card flex flex-col justify-between group hover:border-primary/30 transition-colors"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-medium text-muted">{title}</span>
        <div className="p-2 bg-neutral-badge rounded-lg group-hover:bg-primary/10 transition-colors">
          <Icon className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
        </div>
      </div>
      
      <div>
        <div className="flex items-baseline gap-2 mb-1">
          <h2 className="text-3xl font-bold tracking-tighter tabular-nums">
            <CountUp end={value} prefix={title.includes('Revenue') ? '$' : ''} decimals={title.includes('Revenue') ? 2 : 0} duration={2} />
          </h2>
          <div className={cn(
            "flex items-center text-[11px] font-bold px-1.5 py-0.5 rounded-md",
            isPositive ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
          )}>
            {isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
            {delta}%
          </div>
        </div>
        <p className="text-xs text-muted">vs last month</p>
      </div>
    </motion.div>
  );
};

const RevenueChart = () => {
  const data = [
    { name: 'Mon', value: 4500 },
    { name: 'Tue', value: 3200 },
    { name: 'Wed', value: 5100 },
    { name: 'Thu', value: 2800 },
    { name: 'Fri', value: 4200 },
    { name: 'Sat', value: 3800 },
    { name: 'Sun', value: 6200 },
  ];

  return (
    <div className="card h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold">Revenue Analytics</h3>
          <p className="text-sm text-muted">Weekly sales performance</p>
        </div>
        <button className="flex items-center gap-2 text-sm font-semibold hover:bg-neutral-badge px-3 py-1.5 rounded-lg transition-colors">
          This Week <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E9EEF5" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }} 
            />
            <Tooltip 
              cursor={{ fill: '#F3F4F6', radius: 8 }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-nav-active text-white px-3 py-2 rounded-lg shadow-xl text-xs font-bold">
                      ${payload[0].value.toLocaleString()}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="value" 
              radius={[8, 8, 0, 0]} 
              barSize={40}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.name === 'Sun' ? '#6C5CE7' : '#E9EEF5'} 
                  className="transition-all duration-300"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CountryMap = () => {
  const markers = [
    { name: "USA", coordinates: [-95.7129, 37.0902], color: "#6C5CE7", percentage: "35%" },
    { name: "UK", coordinates: [-3.436, 55.3781], color: "#F27D26", percentage: "28%" },
    { name: "BD", coordinates: [90.3563, 23.685], color: "#22C55E", percentage: "24%" },
    { name: "UAE", coordinates: [53.8478, 23.4241], color: "#6B7280", percentage: "13%" },
  ];

  return (
    <div className="card h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-bold">Growth by Country</h3>
        <p className="text-sm text-muted">Top performing regions</p>
      </div>

      <div className="flex-1 relative min-h-[200px] mb-6">
        <ComposableMap projectionConfig={{ scale: 140 }}>
          <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#F3F4F6"
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#E9EEF5", outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          {markers.map(({ name, coordinates, color }) => (
            <Marker key={name} coordinates={coordinates as [number, number]}>
              <circle r={4} fill={color} stroke="#fff" strokeWidth={2} />
              <circle r={8} fill={color} opacity={0.2} />
            </Marker>
          ))}
        </ComposableMap>
      </div>

      <div className="space-y-3">
        {markers.map((m) => (
          <div key={m.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
              <span className="text-sm font-medium">{m.name}</span>
            </div>
            <span className="text-sm font-bold tabular-nums">{m.percentage}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const OrdersTable = () => {
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof Order>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const sortOptions: { label: string; value: keyof Order }[] = [
    { label: 'Order ID', value: 'orderId' },
    { label: 'Date', value: 'date' },
    { label: 'Customer', value: 'customer' },
    { label: 'Total', value: 'total' },
  ];

  const sortedOrders = [...RECENT_ORDERS]
    .filter(order => {
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
      const matchesSearch = order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           order.customer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'date') {
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h3 className="text-lg font-bold">Recent Orders</h3>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
            <input 
              type="text" 
              placeholder="Search order..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-badge border-none rounded-lg py-1.5 pl-9 pr-3 text-xs outline-none focus:ring-1 focus:ring-primary/20"
            />
          </div>
          
          <div className="flex items-center bg-neutral-badge rounded-lg p-1">
            {['All', 'Completed', 'Pending'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  "px-3 py-1 text-[10px] font-bold rounded-md transition-all",
                  statusFilter === status 
                    ? "bg-surface text-heading shadow-sm" 
                    : "text-muted hover:text-heading"
                )}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 text-xs font-semibold bg-neutral-badge hover:bg-border px-3 py-1.5 rounded-lg transition-colors"
            >
              <Filter className="w-3.5 h-3.5" />
              Sort by: <span className="text-primary capitalize">{sortField}</span>
            </button>

            <AnimatePresence>
              {showSortDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-surface border border-border rounded-xl shadow-xl z-50 p-2"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        if (sortField === option.value) {
                          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortField(option.value);
                          setSortOrder('desc');
                        }
                        setShowSortDropdown(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                        sortField === option.value ? "bg-primary/10 text-primary" : "hover:bg-neutral-badge"
                      )}
                    >
                      {option.label}
                      {sortField === option.value && (
                        <TrendingUp className={cn("w-3 h-3 transition-transform", sortOrder === 'asc' ? "rotate-180" : "")} />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-4 pt-0 px-4 w-10">
                <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
              </th>
              <th className="pb-4 pt-0 px-4 text-xs font-semibold text-muted uppercase tracking-wider">Order ID</th>
              <th className="pb-4 pt-0 px-4 text-xs font-semibold text-muted uppercase tracking-wider">Date</th>
              <th className="pb-4 pt-0 px-4 text-xs font-semibold text-muted uppercase tracking-wider">Customer</th>
              <th className="pb-4 pt-0 px-4 text-xs font-semibold text-muted uppercase tracking-wider">Category</th>
              <th className="pb-4 pt-0 px-4 text-xs font-semibold text-muted uppercase tracking-wider">Status</th>
              <th className="pb-4 pt-0 px-4 text-xs font-semibold text-muted uppercase tracking-wider">Items</th>
              <th className="pb-4 pt-0 px-4 text-xs font-semibold text-muted uppercase tracking-wider text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {sortedOrders.map((order) => (
              <tr key={order.id} className="group hover:bg-neutral-badge/50 transition-colors">
                <td className="py-4 px-4">
                  <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                </td>
                <td className="py-4 px-4 text-sm font-bold tabular-nums">{order.orderId}</td>
                <td className="py-4 px-4 text-sm text-muted">{order.date}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 overflow-hidden">
                      <img src={`https://picsum.photos/seed/${order.customer}/50/50`} alt="" referrerPolicy="no-referrer" />
                    </div>
                    <span className="text-sm font-medium">{order.customer}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-muted">{order.category}</td>
                <td className="py-4 px-4">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide",
                    order.status === 'Completed' ? "bg-success/10 text-success" : "bg-amber-100 text-amber-600"
                  )}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm tabular-nums">{order.items} items</td>
                <td className="py-4 px-4 text-sm font-bold text-right tabular-nums">${order.total.toFixed(2)}</td>
              </tr>
            ))}
            {sortedOrders.length === 0 && (
              <tr>
                <td colSpan={8} className="py-12 text-center text-muted text-sm">
                  No orders found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
        <p className="text-xs text-muted">Showing {sortedOrders.length} of {RECENT_ORDERS.length} orders</p>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-lg border border-border hover:bg-neutral-badge disabled:opacity-50" disabled>
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
          <button className="w-8 h-8 rounded-lg bg-nav-active text-white text-xs font-bold">1</button>
          <button className="w-8 h-8 rounded-lg border border-border hover:bg-neutral-badge text-xs font-bold">2</button>
          <button className="w-8 h-8 rounded-lg border border-border hover:bg-neutral-badge text-xs font-bold">3</button>
          <button className="p-1.5 rounded-lg border border-border hover:bg-neutral-badge">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Page Views ---

const DashboardView = () => {
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <KPICard title="Total Sales" value={12840} delta={12.5} isPositive={true} icon={BarChart3} delay={0.1} />
        <KPICard title="New Customer" value={452} delta={8.2} isPositive={true} icon={Users} delay={0.2} />
        <KPICard title="Return Products" value={12} delta={2.4} isPositive={false} icon={RefreshCw} delay={0.3} />
        <KPICard title="Total Revenue" value={84250.40} delta={15.8} isPositive={true} icon={ArrowUpRight} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <CountryMap />
        </div>
      </div>

      <OrdersTable />
    </div>
  );
};

const AnalyticsView = () => {
  const data = [
    { name: 'Jan', revenue: 4000, orders: 240 },
    { name: 'Feb', revenue: 3000, orders: 198 },
    { name: 'Mar', revenue: 2000, orders: 980 },
    { name: 'Apr', revenue: 2780, orders: 390 },
    { name: 'May', revenue: 1890, orders: 480 },
    { name: 'Jun', revenue: 2390, orders: 380 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card md:col-span-2">
          <h3 className="text-lg font-bold mb-6">Revenue Growth</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C5CE7" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6C5CE7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E9EEF5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#6C5CE7" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <h3 className="text-lg font-bold mb-6">Order Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Fashion', value: 400 },
                    { name: 'Electronics', value: 300 },
                    { name: 'Home', value: 300 },
                    { name: 'Beauty', value: 200 },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#6C5CE7" />
                  <Cell fill="#F27D26" />
                  <Cell fill="#22C55E" />
                  <Cell fill="#3B82F6" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomersView = () => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Customer Directory</h3>
        <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Customer
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-4 px-4 text-xs font-semibold text-muted uppercase">Customer</th>
              <th className="pb-4 px-4 text-xs font-semibold text-muted uppercase">Email</th>
              <th className="pb-4 px-4 text-xs font-semibold text-muted uppercase">Orders</th>
              <th className="pb-4 px-4 text-xs font-semibold text-muted uppercase">Total Spent</th>
              <th className="pb-4 px-4 text-xs font-semibold text-muted uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {CUSTOMERS.map(c => (
              <tr key={c.id} className="hover:bg-neutral-badge/50 transition-colors">
                <td className="py-4 px-4 text-sm font-medium">{c.name}</td>
                <td className="py-4 px-4 text-sm text-muted">{c.email}</td>
                <td className="py-4 px-4 text-sm tabular-nums">{c.orders}</td>
                <td className="py-4 px-4 text-sm font-bold tabular-nums">${c.totalSpent.toFixed(2)}</td>
                <td className="py-4 px-4">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-full uppercase",
                    c.status === 'Active' ? "bg-success/10 text-success" : "bg-neutral-badge text-muted"
                  )}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StoreView = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {PRODUCTS.map(p => (
        <div key={p.id} className="card group">
          <div className="w-full h-48 bg-neutral-badge rounded-xl mb-4 overflow-hidden relative">
            <img src={`https://picsum.photos/seed/${p.name}/400/300`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={p.name} referrerPolicy="no-referrer" />
            <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold shadow-sm">
              {p.category}
            </div>
          </div>
          <h4 className="font-bold mb-1">{p.name}</h4>
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-primary">${p.price}</span>
            <span className="text-xs text-muted">{p.stock} in stock</span>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-1 text-xs text-muted">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{p.sales} sales</span>
            </div>
            <button className="p-2 hover:bg-neutral-badge rounded-lg transition-colors">
              <MoreHorizontal className="w-4 h-4 text-muted" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const SettingsView = () => {
  return (
    <div className="max-w-4xl space-y-6">
      <div className="card">
        <h3 className="text-lg font-bold mb-6">General Settings</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted uppercase">Store Name</label>
              <input type="text" defaultValue="SellPilot Official" className="w-full bg-neutral-badge border-none rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted uppercase">Store Email</label>
              <input type="email" defaultValue="hello@sellpilot.com" className="w-full bg-neutral-badge border-none rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted uppercase">Store Description</label>
            <textarea rows={3} className="w-full bg-neutral-badge border-none rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none" defaultValue="The world's leading fashion and electronics store." />
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-bold mb-6">Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-neutral-badge rounded-xl">
            <div>
              <p className="text-sm font-bold">Two-Factor Authentication</p>
              <p className="text-xs text-muted">Add an extra layer of security to your account.</p>
            </div>
            <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-neutral-badge rounded-xl">
            <div>
              <p className="text-sm font-bold">Session Timeout</p>
              <p className="text-xs text-muted">Automatically log out after 30 minutes of inactivity.</p>
            </div>
            <div className="w-10 h-5 bg-border rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlaceholderView = ({ title }: { title: string }) => (
  <div className="card flex flex-col items-center justify-center min-h-[400px] text-center">
    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
      <Layers className="w-8 h-8 text-primary" />
    </div>
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="text-muted max-w-md">
      This page is currently under development. We're working hard to bring you the best {title.toLowerCase()} experience.
    </p>
  </div>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-8 animate-pulse">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-border rounded-2xl" />)}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-80 bg-border rounded-2xl" />
            <div className="h-80 bg-border rounded-2xl" />
          </div>
          <div className="h-96 bg-border rounded-2xl" />
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'analytics': return <AnalyticsView />;
      case 'insights': return <PlaceholderView title="Insights" />;
      case 'updates': return <PlaceholderView title="Updates" />;
      case 'customers': return <CustomersView />;
      case 'store': return <StoreView />;
      case 'discounts': return <PlaceholderView title="Discounts" />;
      case 'integration': return <PlaceholderView title="Integration" />;
      case 'feedback': return <PlaceholderView title="Feedback" />;
      case 'settings': return <SettingsView />;
      case 'help': return <PlaceholderView title="Help Desk" />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-heading selection:bg-primary/20 transition-colors duration-300">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      
      <div className="lg:pl-[260px] transition-all duration-300">
        <TopBar onMenuClick={() => setIsSidebarOpen(true)} theme={theme} toggleTheme={toggleTheme} />
        
        <main className="pt-24 md:pt-28 pb-12 px-4 md:px-8 max-w-[1600px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight capitalize">
                    {activeTab === 'dashboard' ? 'Overview' : activeTab}
                  </h1>
                  <p className="text-xs md:text-sm text-muted">Welcome back, Alex. Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <button className="flex-1 sm:flex-none bg-surface border border-border hover:bg-neutral-badge transition-colors px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-semibold flex items-center justify-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>
                  <button className="flex-1 sm:flex-none bg-primary text-white hover:bg-primary/90 transition-colors px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-semibold shadow-lg shadow-primary/20">
                    Export Data
                  </button>
                </div>
              </div>

              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
