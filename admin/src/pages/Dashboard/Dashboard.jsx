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
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ url }) => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    totalItems: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    todayRevenue: 0,
  });

  const [timeframe, setTimeframe] = useState('Monthly');
  const [chartDataOptions, setChartDataOptions] = useState({
    Daily: [],
    Monthly: [],
    Yearly: []
  });

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

      // Initialize chart bins
      const mData = Array(12).fill(0).map((_, i) => ({
        name: new Date(0, i).toLocaleString('en', { month: 'short' }),
        sales: 0
      }));

      // Calculate Monday of the current week
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      const dayOfWeek = todayDate.getDay();
      const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const mondayDate = new Date(todayDate);
      mondayDate.setDate(todayDate.getDate() - daysSinceMonday);

      const dData = Array(7).fill(0).map((_, i) => {
         const d = new Date(mondayDate);
         d.setDate(mondayDate.getDate() + i);
         return {
           name: d.toLocaleString('en', { weekday: 'short' }),
           dateString: d.toDateString(),
           sales: 0
         }
      });

      const currentYear = new Date().getFullYear();
      const yData = [
        { name: (currentYear - 2).toString(), sales: 0, year: currentYear - 2 },
        { name: (currentYear - 1).toString(), sales: 0, year: currentYear - 1 },
        { name: currentYear.toString(), sales: 0, year: currentYear }
      ];

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

            // Monthly
            if (orderDate.getFullYear() === currentYear) {
              mData[orderDate.getMonth()].sales += order.amount;
            }

            // Daily (last 7 days)
            const orderDateString = orderDate.toDateString();
            const dItem = dData.find(d => d.dateString === orderDateString);
            if (dItem) {
              dItem.sales += order.amount;
            }

            // Yearly
            const yItem = yData.find(y => y.year === orderDate.getFullYear());
            if (yItem) {
              yItem.sales += order.amount;
            }
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

      setChartDataOptions({
        Daily: dData,
        Monthly: mData,
        Yearly: yData
      });

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

  return (
    <div className='dashboard add flex-col'>
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome back! Here is what's happening with your store today.</p>
      </div>

      <div className="dashboard-cards">
        <div className="card" onClick={() => navigate('/users')}>
          <div className="card-icon users-icon">
            👥
          </div>
          <div className="card-info">
            <p className="card-title">Customers</p>
            <h3>{metrics.totalUsers.toLocaleString()}</h3>
          </div>
        </div>

        <div className="card" onClick={() => navigate('/Orders')}>
          <div className="card-icon orders-icon">
            📦
          </div>
          <div className="card-info">
            <p className="card-title">Orders</p>
            <h3>{metrics.totalOrders.toLocaleString()}</h3>
          </div>
        </div>
        
        <div className="card" onClick={() => navigate('/list')}>
          <div className="card-icon items-icon">
             🍔
          </div>
          <div className="card-info">
            <p className="card-title">Food Items</p>
            <h3>{metrics.totalItems.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-container main-chart">
          <div className="chart-header">
            <h3>{timeframe} Sales</h3>
            <select 
              value={timeframe} 
              onChange={(e) => setTimeframe(e.target.value)} 
              className="timeframe-select"
            >
              <option value="Daily">Daily</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
          <div className="chart-area">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartDataOptions[timeframe] || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#666'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#666'}} />
                <Tooltip cursor={{fill: '#f5f5f5'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}/>
                <Bar dataKey="sales" fill="#4a5ce4" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
