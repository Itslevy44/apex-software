import React, { useState, useEffect } from 'react';
import {
    Users,
    ShoppingBag,
    BookOpen,
    BarChart3,
    Settings,
    Search,
    Bell,
    LogOut,
    TrendingUp,
    Package,
    CheckCircle,
    AlertCircle,
    Clock,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import axios from 'axios';

const AdminDashboard = ({ user, onLogout }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalSales: 0,
        totalOrders: 0,
        activeEnrollments: 0,
        revenue: 0,
        growth: 12.5
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('apex_token');
            const headers = { 'Authorization': `Bearer ${token}` };

            // In a real app, you'd have an admin-only endpoint for these stats
            // For now, we'll simulate or fetch what we can
            const [usersRes, ordersRes, coursesRes] = await Promise.all([
                axios.get('http://127.0.0.1:8000/api/users', { headers }).catch(() => ({ data: { data: [] } })),
                axios.get('http://127.0.0.1:8000/api/orders', { headers }).catch(() => ({ data: { data: [] } })),
                axios.get('http://127.0.0.1:8000/api/courses', { headers }).catch(() => ({ data: { data: [] } }))
            ]);

            const orders = ordersRes.data.data || [];
            const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total_amount || 0), 0);

            setStats({
                totalUsers: (usersRes.data.data || []).length,
                totalSales: orders.length,
                totalOrders: orders.length,
                activeEnrollments: 42, // Mock for now
                revenue: totalRevenue,
                growth: 15.8
            });

            setRecentOrders(orders.slice(0, 5));
        } catch (error) {
            console.error('Failed to fetch admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'orders', label: 'Orders & Sales', icon: ShoppingBag },
        { id: 'courses', label: 'Course Catalog', icon: BookOpen },
        { id: 'products', label: 'Inventory', icon: Package },
        { id: 'settings', label: 'System Settings', icon: Settings },
    ];

    const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
        <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>
                    <Icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                    {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {trendValue}%
                </div>
            </div>
            <div>
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-emerald-100 hidden lg:flex flex-col">
                <div className="p-6 border-b border-emerald-100">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">A</span>
                        </div>
                        <span className="text-xl font-bold text-gray-800">Admin Panel</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id
                                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                                    : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
                                }`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-emerald-100">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="bg-white border-b border-emerald-100 p-4 sticky top-0 z-10">
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex-1 max-w-md relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search administration..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-emerald-100 rounded-xl focus:outline-none focus:border-emerald-500 transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="relative p-2 text-gray-600 hover:bg-emerald-50 rounded-lg transition-all">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                            <div className="flex items-center gap-3 pl-4 border-l border-emerald-100">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold text-gray-800">{user?.name}</p>
                                    <p className="text-xs text-emerald-600 font-medium capitalize">{user?.role || 'Administrator'}</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold">
                                    {user?.name?.[0]}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-6 md:p-8 space-y-8 overflow-y-auto">
                    {/* Welcome Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">System Overview</h2>
                        <p className="text-gray-500 mt-1">Monitor your business performance and manage operations.</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            title="Total Revenue"
                            value={`KES ${stats.revenue.toLocaleString()}`}
                            icon={TrendingUp}
                            trend="up"
                            trendValue={stats.growth}
                            color="emerald"
                        />
                        <StatCard
                            title="Total Orders"
                            value={stats.totalOrders}
                            icon={ShoppingBag}
                            trend="up"
                            trendValue={5.4}
                            color="blue"
                        />
                        <StatCard
                            title="Active Students"
                            value={stats.activeEnrollments}
                            icon={Users}
                            trend="up"
                            trendValue={8.2}
                            color="purple"
                        />
                        <StatCard
                            title="Site Traffic"
                            value="1,284"
                            icon={BarChart3}
                            trend="down"
                            trendValue={2.1}
                            color="orange"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Recent Orders Table */}
                        <div className="lg:col-span-2 bg-white rounded-2xl border border-emerald-100 shadow-sm flex flex-col">
                            <div className="p-6 border-b border-emerald-100 flex justify-between items-center">
                                <h3 className="font-bold text-gray-800">Recent Transactions</h3>
                                <button className="text-emerald-600 text-sm font-bold hover:underline">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4">Order ID</th>
                                            <th className="px-6 py-4">Customer</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Amount</th>
                                            <th className="px-6 py-4">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-emerald-50">
                                        {recentOrders.length > 0 ? recentOrders.map((order) => (
                                            <tr key={order.id} className="hover:bg-emerald-50/50 transition-all">
                                                <td className="px-6 py-4 font-medium text-gray-800">#{order.id}</td>
                                                <td className="px-6 py-4 text-gray-600">User #{order.user_id}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold flex items-center w-fit gap-1 ${order.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                                                            order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                                        }`}>
                                                        {order.status === 'completed' ? <CheckCircle size={12} /> :
                                                            order.status === 'pending' ? <Clock size={12} /> : <AlertCircle size={12} />}
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-bold text-gray-800">KES {parseFloat(order.total_amount).toLocaleString()}</td>
                                                <td className="px-6 py-4 text-gray-500 text-sm">{new Date(order.created_at).toLocaleDateString()}</td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No orders found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Quick Actions / Notifications */}
                        <div className="space-y-6">
                            <div className="bg-emerald-600 text-white p-6 rounded-2xl shadow-lg shadow-emerald-200">
                                <h3 className="font-bold text-lg mb-2">New Site Updates</h3>
                                <p className="text-emerald-100 text-sm mb-4 leading-relaxed">
                                    You have 5 new course enrollments today! Your revenue has increased by 15% this week.
                                </p>
                                <button className="w-full bg-white text-emerald-600 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-all">
                                    Check Reports
                                </button>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm">
                                <h3 className="font-bold text-gray-800 mb-4">Support Inquiries</h3>
                                <div className="space-y-4">
                                    {[1, 2].map(i => (
                                        <div key={i} className="flex gap-3">
                                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <AlertCircle size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-800 leading-tight">Ticket #842{i}</p>
                                                <p className="text-xs text-gray-500 mt-1">Payment failure reported by customer...</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
