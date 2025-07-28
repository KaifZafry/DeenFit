import React, { useEffect, useState } from "react";
import { FaAddressCard } from "react-icons/fa";
import { IoBagHandleSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { MdAccountBox, MdDashboard } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const AccountPage = () => {
 // const user = useSelector((state) => state.auth.user);
  const userId = localStorage.getItem("userId");
  const [orders, setOrders] = useState([]);
  const [orderdetails, setOrderdetails] = useState();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
     
      try {
        const res = await fetch(`/api/Account/getAllorderbyuserID/${userId}`);
        const json = await res.json();
        console.log(json?.orderItems)
        setLoading(false)
        setOrders(json?.orderItems || []);
        setOrderdetails(json)
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId]);

  useEffect(()=>{
    console.log(orders)
  },[orders])
 
  const handleLogout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("isLoggedIn");
  toast.success("You're Logged out")
  navigate('/')
};


   if (!userId) {
    return (
      <div className="flex items-center justify-center h-[80vh] px-4">
        <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center animate-fade-in">
          <div className="flex justify-center mb-4">
            <MdAccountBox className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            You're not logged in
          </h2>
          <p className="text-gray-500 mb-6">
            Please log in to view and manage your account.
          </p>
          <Link
            to="/login"
            className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition duration-200"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold mb-8">My account</h2>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
         <aside className="w-full md:w-1/4 my-5 me-4 border-r account-aside">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center gap-3 w-full text-left px-4 py-3  ${
                  activeTab === "dashboard" ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
              >
                <MdDashboard />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-3 w-full text-left px-4 py-3  ${
                  activeTab === "orders" ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
              >
                <IoBagHandleSharp />
                Orders
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("addresses")}
                className={`flex items-center gap-3 w-full text-left px-4 py-3  ${
                  activeTab === "addresses" ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
              ><FaAddressCard />

                Addresses
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("details")}
                className={`flex items-center gap-3 w-full text-left px-4 py-3  ${
                  activeTab === "details" ? "bg-[#000] text-white" : "hover:bg-gray-100"
                }`}
              ><MdAccountBox />
                Account details
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                <IoMdLogOut />
                Log out
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <section className="flex-1">
          {activeTab === "orders" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Orders</h3>
              {loading ? (
                <p>Loading orders...</p>
              ) : orders.length === 0 ? (
                <div className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded">
                  <span>🔔 No order has been made yet.</span>
                  <Link
                    to="/products"
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Browse products
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.orderItemID}
                      className="border p-4 rounded shadow-sm bg-white"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold">
                            Order #{order?.orderItemID} - {new Date(orderdetails?.statusHistory?.updatedAt).toLocaleDateString()}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Status: <span className={`inline-block px-2 py-1 text-xs rounded font-medium ${
                              orderdetails?.statusHistory?.statusName === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                              orderdetails?.statusHistory?.statusName === 'Processing' ? 'bg-blue-100 text-blue-700' :
                              orderdetails?.statusHistory?.statusName === 'Shipped' ? 'bg-indigo-100 text-indigo-700' :
                              orderdetails?.statusHistory?.statusName === 'Delivered' ? 'bg-green-100 text-green-700' :
                              orderdetails?.statusHistory?.statusName === 'Cancelled' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-600'
                            }`}>{orderdetails?.statusHistory?.statusName}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p>Total: ₹{orderdetails.totalAmount}</p>
                          <p className="text-xs text-gray-400">
                            {orderdetails.paymentMethod}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 border-t pt-2">
                        {orders.map((item) => (
                          <div key={item.orderItemID} className="text-sm mb-1">
                            {item.productName} × {item.quantity} = ₹{item.subtotal}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "addresses" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Addresses</h3>
              <p>Your saved addresses will appear here.</p>
            </div>
          )}

          {activeTab === "details" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Account details</h3>
              <p><strong>Phone:</strong> {orderdetails?.phone}</p>
              <p><strong>Name:</strong> {orderdetails?.customerName || "Not Provided"}</p>
            </div>
          )}

          {activeTab === "dashboard" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Dashboard</h3>
              <p>Welcome back, {orderdetails?.customerName || orderdetails?.phone} 👋</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AccountPage;
