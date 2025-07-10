// src/pages/AdminDashboard.jsx
import React from "react";
import AdminLayout from "../components/AdminLayout";
import StatCard from "../components/StatCard";
import ActivityItem from "../components/ActivityItem";
import TableRow from "../components/TableRow";
import {
  FiUsers,
  FiPieChart,
  FiShoppingCart,
  FiMail,
} from "react-icons/fi";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Dashboard Overview
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Users"
          value="2,456"
          change="+12%"
          icon={<FiUsers className="text-blue-500" />}
        />
        <StatCard
          title="Total Revenue"
          value="$34,245"
          change="+8%"
          icon={<FiPieChart className="text-green-500" />}
        />
        <StatCard
          title="Total Products"
          value="1,234"
          change="+5%"
          icon={<FiShoppingCart className="text-purple-500" />}
        />
        <StatCard
          title="Pending Orders"
          value="56"
          change="-2%"
          icon={<FiMail className="text-yellow-500" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm lg:col-span-2">
          <h3 className="font-medium text-gray-700 mb-4">Sales Overview</h3>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Chart will be here</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium text-gray-700 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            <ActivityItem
              time="2 mins ago"
              text="New user registered"
              color="blue"
            />
            <ActivityItem
              time="10 mins ago"
              text="Order #1234 placed"
              color="green"
            />
            <ActivityItem
              time="25 mins ago"
              text="New product added"
              color="purple"
            />
            <ActivityItem
              time="1 hour ago"
              text="System update completed"
              color="yellow"
            />
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-700">Recent Orders</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <TableRow
                orderId="#12345"
                customer="John Smith"
                date="12 Jan 2023"
                amount="$245.00"
                status="Completed"
                statusColor="green"
              />
              <TableRow
                orderId="#12346"
                customer="Sarah Johnson"
                date="12 Jan 2023"
                amount="$145.00"
                status="Processing"
                statusColor="blue"
              />
              <TableRow
                orderId="#12347"
                customer="Michael Brown"
                date="11 Jan 2023"
                amount="$320.00"
                status="Shipped"
                statusColor="purple"
              />
              <TableRow
                orderId="#12348"
                customer="Emily Davis"
                date="10 Jan 2023"
                amount="$98.00"
                status="Pending"
                statusColor="yellow"
              />
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;