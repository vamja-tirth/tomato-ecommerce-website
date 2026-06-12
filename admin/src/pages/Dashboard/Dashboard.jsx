import React, { useEffect, useState, useCallback } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const Dashboard = ({ url }) => {
  const [metrics, setMetrics] = useState({
    totalItems: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    todayRevenue: 0,
  });

  const [monthlySales, setMonthlySales] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const [foodsRes, ordersRes, usersRes] = await Promise.all([
        axios.get(`${url}/api/food/list`),
        axios.get(`${url}/api/order/list`),
        axios.get(`${url}/api/user/list`),
      ]);

      let tItems = 0;
      let tOrders = 0;
      let tUsers = 0;
      let tRevenue = 0;
      let todayRev = 0;
      const salesData = Array(12).fill(0).map((_, i) => ({
        name: new Date(0, i).toLocaleString('en', { month: 'short' }),
        sales: 0
      }));

      if (foodsRes.data.success) {
        tItems = foodsRes.data.data.length;
      }
      
      if (usersRes.data.success) {
        tUsers = usersRes.data.data.length;
      }

      if (ordersRes.data.success) {
        const orders = ordersRes.data.data;
        tOrders = orders.length;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        orders.forEach(order => {
          if (order.payment) {
            tRevenue += order.amount;
            
            const orderDate = new Date(order.date);
            if (orderDate >= today) {
              todayRev += order.amount;
            }

            const monthIndex = orderDate.getMonth();
            salesData[monthIndex].sales += order.amount;
          }
        });
      }

      setMetrics({
        totalItems: tItems,
        totalOrders: tOrders,
        totalUsers: tUsers,
        totalRevenue: tRevenue,
        todayRevenue: todayRev,
      });

      setMonthlySales(salesData);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Error loading dashboard data");
    }
  }, [url]);

  useEffect(() => {
    const loadData = async () => {
      await fetchData();
    }
    loadData();
  }, [fetchData]);

  const monthlyTarget = 20000;
  const currentMonth = new Date().getMonth();
  const currentMonthRevenue = monthlySales[currentMonth]?.sales || 0;
  const targetPercentage = Math.min((currentMonthRevenue / monthlyTarget) * 100, 100).toFixed(2);


  return (
    <div className='dashboard add flex-col'>
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome back! Here is what's happening with your store today.</p>
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <div className="card-icon users-icon">
            👥
          </div>
          <div className="card-info">
            <p className="card-title">Customers</p>
            <h3>{metrics.totalUsers.toLocaleString()}</h3>
            <span className="trend up">↑ +2.5%</span>
          </div>
        </div>

        <div className="card">
          <div className="card-icon orders-icon">
            📦
          </div>
          <div className="card-info">
            <p className="card-title">Orders</p>
            <h3>{metrics.totalOrders.toLocaleString()}</h3>
            <span className="trend up">↑ +5.2%</span>
          </div>
        </div>
        
        <div className="card">
          <div className="card-icon items-icon">
             🍔
          </div>
          <div className="card-info">
            <p className="card-title">Food Items</p>
            <h3>{metrics.totalItems.toLocaleString()}</h3>
            <span className="trend neutral">- 0.0%</span>
          </div>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-container main-chart">
          <div className="chart-header">
            <h3>Monthly Sales</h3>
            <span className="dots">⋮</span>
          </div>
          <div className="chart-area">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#666'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#666'}} />
                <Tooltip cursor={{fill: '#f5f5f5'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}/>
                <Bar dataKey="sales" fill="#4a5ce4" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container target-chart">
          <div className="chart-header">
            <h3>Monthly Target</h3>
            <span className="dots">⋮</span>
          </div>
          <p className="target-subtitle">Target you've set for each month</p>
          
          <div className="progress-circle">
            <svg viewBox="0 0 36 36" className="circular-chart blue">
              <path className="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path className="circle"
                strokeDasharray={`${targetPercentage}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="percentage-text">
              <h2>{targetPercentage}%</h2>
              <span>+10%</span>
            </div>
          </div>

          <div className="target-info">
             <p>You earn ₹{metrics.todayRevenue.toLocaleString()} today, it's higher than last month. Keep up your good work!</p>
          </div>

          <div className="target-stats">
             <div className="stat-item">
               <span className="stat-label">Target</span>
               <span className="stat-value">₹20K ↓</span>
             </div>
             <div className="stat-item">
               <span className="stat-label">Revenue</span>
               <span className="stat-value">₹{(metrics.totalRevenue/1000).toFixed(1)}K ↑</span>
             </div>
             <div className="stat-item">
               <span className="stat-label">Today</span>
               <span className="stat-value">₹{(metrics.todayRevenue/1000).toFixed(1)}K ↑</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
