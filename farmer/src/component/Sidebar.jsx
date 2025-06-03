import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  TrendingUp,MapPin,
  Eye,
  Edit,
  Plus,
  Package,
  Camera,
  Users,
  DollarSign,
  BookOpen,
  Cloud,
  Droplets,
  Wind,
  Thermometer,
} from "lucide-react";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [innerTab, setInnerTab] = useState("articles");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const navItems = [
    {
      id: "overview",
      icon: <TrendingUp className="h-5 w-5" />,
      label: "Overview",
    },
    {
      id: "products",
      icon: <Package className="h-5 w-5" />,
      label: "My Products",
    },
    {
      id: "orders",
      icon: <Users className="h-5 w-5" />,
      label: "Orders & Inquiries",
    },
    {
      id: "market",
      icon: <DollarSign className="h-5 w-5" />,
      label: "Market Prices",
    },
    {
      id: "education",
      icon: <BookOpen className="h-5 w-5" />,
      label: "Learning Hub",
    },
    { id: "weather", icon: <Cloud className="h-5 w-5" />, label: "Weather" },
  ];

  return (
    <div className="flex">
      <aside className="w-64 bg-white border-r h-[calc(100vh-4rem)] shadow-sm">
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-all 
                ${
                  activeTab === item.id
                    ? "bg-green-100 text-green-700 font-semibold shadow"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">
        {activeTab === "overview" && (
          <div className="p-6 space-y-8" data-aos="fade-up">
            {/* Header */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Dashboard Overview
              </h2>
              <p className="text-sm text-gray-500">
                Welcome back, John! Here's what's happening on your farm.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Total Products",
                  value: "24",
                  subtitle: "+2 from last month",
                  icon: <Package className="h-5 w-5 text-gray-400" />,
                },
                {
                  title: "Active Orders",
                  value: "12",
                  subtitle: "+3 new today",
                  icon: <Users className="h-5 w-5 text-gray-400" />,
                },
                {
                  title: "Monthly Revenue",
                  value: "$3,240",
                  subtitle: "+15% from last month",
                  icon: <DollarSign className="h-5 w-5 text-gray-400" />,
                },
                {
                  title: "Inventory Value",
                  value: "$8,450",
                  subtitle: "Current stock value",
                  icon: <Package className="h-5 w-5 text-gray-400" />,
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-all border"
                >
                  <div className="flex items-center justify-between pb-2">
                    <div className="text-sm font-medium text-gray-700">
                      {card.title}
                    </div>
                    {card.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {card.value}
                    </div>
                    <p className="text-xs text-gray-500">{card.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity + Weather */}
            <div className="grid gap-8 md:grid-cols-2">
              {/* Recent Orders */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Recent Orders
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      customer: "Sarah Johnson",
                      product: "Organic Tomatoes",
                      amount: "$45",
                      status: "Pending",
                    },
                    {
                      customer: "Mike Chen",
                      product: "Fresh Lettuce",
                      amount: "$28",
                      status: "Confirmed",
                    },
                    {
                      customer: "Emma Davis",
                      product: "Free-range Eggs",
                      amount: "$36",
                      status: "Delivered",
                    },
                  ].map((order, i) => (
                    <div
                      key={i}
                      className="p-3 border rounded-lg bg-white flex items-center justify-between hover:shadow"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          {order.customer}
                        </p>
                        <p className="text-sm text-gray-500">{order.product}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-medium text-gray-700">
                          {order.amount}
                        </p>
                        <span
                          className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Confirmed"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Weather */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Quick Weather
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                    <div className="flex items-center gap-3">
                      <Cloud className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-medium text-gray-800">
                          Partly Cloudy
                        </p>
                        <p className="text-sm text-gray-500">Springfield, IL</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">72°F</p>
                      <p className="text-sm text-gray-500">Feels like 75°F</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-white rounded-lg border">
                      <Droplets className="h-5 w-5 mx-auto text-blue-500 mb-1" />
                      <p className="text-sm font-medium text-gray-800">65%</p>
                      <p className="text-xs text-gray-500">Humidity</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border">
                      <Wind className="h-5 w-5 mx-auto text-gray-500 mb-1" />
                      <p className="text-sm font-medium text-gray-800">8 mph</p>
                      <p className="text-xs text-gray-500">Wind</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border">
                      <Thermometer className="h-5 w-5 mx-auto text-red-500 mb-1" />
                      <p className="text-sm font-medium text-gray-800">30%</p>
                      <p className="text-xs text-gray-500">Rain</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "products" && (
  <div className="space-y-10 p-4">
    {/* Header Section */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div>
        <h2 className="text-2xl font-bold">My Products</h2>
        <p className="text-gray-500">Manage your farm products and inventory</p>
      </div>
    </div>

    {/* Product Form Section */}
    <div className="bg-white rounded-lg shadow p-6 max-w-3xl mx-auto space-y-6 border">
      <div>
        <h3 className="text-lg font-semibold">Add New Product</h3>
        <p className="text-gray-500 text-sm">Add a new product to your farm inventory</p>
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="product-name" className="block font-medium mb-1">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="e.g., Organic Tomatoes"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block font-medium mb-1">
            Category
          </label>
          <select
            id="category"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option>Select category</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="grains">Grains</option>
            <option value="livestock">Livestock</option>
            <option value="dairy">Dairy</option>
          </select>
        </div>

        {/* Price & Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block font-medium mb-1">
              Price per unit
            </label>
            <input
              id="price"
              type="number"
              placeholder="0.00"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block font-medium mb-1">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              placeholder="0"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Describe your product..."
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={3}
          />
        </div>

        {/* Upload */}
        <div>
          <label className="block font-medium mb-2">Product Photos</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
            <Camera className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">Click to upload photos</p>
          </div>
        </div>

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Add Product
        </button>
      </div>
    </div>

    {/* Product Table Section */}
    <div className="overflow-x-auto border rounded-lg shadow">
      <div className="min-w-full">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-6 bg-gray-100 text-sm font-semibold text-gray-600 px-6 py-3">
          <div>Product</div>
          <div>Category</div>
          <div>Price</div>
          <div>Stock</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-200">
          {[
            {
              name: "Organic Tomatoes",
              category: "Vegetables",
              price: "$4.50/lb",
              stock: "150 lbs",
              status: "In Stock",
              image: "/placeholder.svg?height=40&width=40",
            },
            {
              name: "Fresh Lettuce",
              category: "Vegetables",
              price: "$2.25/head",
              stock: "80 heads",
              status: "In Stock",
              image: "/placeholder.svg?height=40&width=40",
            },
            {
              name: "Free-range Eggs",
              category: "Dairy",
              price: "$6.00/dozen",
              stock: "24 dozen",
              status: "Low Stock",
              image: "/placeholder.svg?height=40&width=40",
            },
            {
              name: "Sweet Corn",
              category: "Vegetables",
              price: "$3.75/dozen",
              stock: "0 dozen",
              status: "Out of Stock",
              image: "/placeholder.svg?height=40&width=40",
            },
            {
              name: "Grass-fed Beef",
              category: "Livestock",
              price: "$12.50/lb",
              stock: "45 lbs",
              status: "In Stock",
              image: "/placeholder.svg?height=40&width=40",
            },
          ].map((product, i) => (
            <div
              key={i}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 items-center px-6 py-4 text-sm gap-y-2"
            >
              <div className="flex items-center gap-3 col-span-1 md:col-span-1">
                <img
                  src={product.image}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
                <span className="font-medium">{product.name}</span>
              </div>
              <div>{product.category}</div>
              <div className="font-medium">{product.price}</div>
              <div>{product.stock}</div>
              <div>
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                    product.status === "In Stock"
                      ? "bg-green-100 text-green-800"
                      : product.status === "Low Stock"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 border rounded hover:bg-gray-100">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 border rounded hover:bg-gray-100">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}

        {activeTab === "orders" && (
  <div className="space-y-6">
    {/* Section Header */}
    <div>
      <h2 className="text-2xl font-bold">Orders & Inquiries</h2>
      <p className="text-muted-foreground">
        Manage customer orders and respond to inquiries
      </p>
    </div>

    {/* Orders Section */}
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Orders</h3>
      <div className="overflow-x-auto">
        <div className="min-w-full border rounded-md">
          {/* Table Header (hidden on small screens) */}
          <div className="hidden sm:grid grid-cols-7 bg-gray-100 font-semibold text-sm px-4 py-2">
            <div>Order ID</div>
            <div>Customer</div>
            <div>Products</div>
            <div>Total</div>
            <div>Status</div>
            <div>Date</div>
            <div>Actions</div>
          </div>

          {/* Table Rows */}
          {[
            {
              id: "#ORD-001",
              customer: "Sarah Johnson",
              products: "Organic Tomatoes (10 lbs)",
              total: "$45.00",
              status: "Pending",
              date: "Dec 15, 2024",
            },
            {
              id: "#ORD-002",
              customer: "Mike Chen",
              products: "Fresh Lettuce (12 heads)",
              total: "$27.00",
              status: "Confirmed",
              date: "Dec 14, 2024",
            },
            {
              id: "#ORD-003",
              customer: "Emma Davis",
              products: "Free-range Eggs (6 dozen)",
              total: "$36.00",
              status: "Delivered",
              date: "Dec 13, 2024",
            },
            {
              id: "#ORD-004",
              customer: "Robert Wilson",
              products: "Sweet Corn (5 dozen)",
              total: "$18.75",
              status: "Processing",
              date: "Dec 12, 2024",
            },
          ].map((order, i) => (
            <div
              key={i}
              className="grid grid-cols-1 sm:grid-cols-7 gap-2 px-4 py-3 text-sm border-t"
            >
              <div><span className="sm:hidden font-semibold">Order ID: </span>{order.id}</div>
              <div><span className="sm:hidden font-semibold">Customer: </span>{order.customer}</div>
              <div><span className="sm:hidden font-semibold">Products: </span>{order.products}</div>
              <div><span className="sm:hidden font-semibold">Total: </span>{order.total}</div>
              <div>
                <span className="sm:hidden font-semibold">Status: </span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Confirmed"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "Processing"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div><span className="sm:hidden font-semibold">Date: </span>{order.date}</div>
              <div>
                <button className="text-sm border rounded px-2 py-1 hover:bg-gray-100">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Inquiries Section */}
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Inquiries</h3>
      {[
        {
          customer: "Lisa Anderson",
          subject: "Bulk order inquiry",
          message:
            "Hi, I'm interested in placing a bulk order for organic vegetables for my restaurant...",
          time: "2 hours ago",
          unread: true,
        },
        {
          customer: "David Brown",
          subject: "Delivery schedule",
          message:
            "Could you please let me know your delivery schedule for next week?",
          time: "1 day ago",
          unread: false,
        },
        {
          customer: "Maria Garcia",
          subject: "Product availability",
          message:
            "Do you have any grass-fed beef available for this weekend?",
          time: "2 days ago",
          unread: false,
        },
      ].map((inquiry, i) => (
        <div
          key={i}
          className={`border rounded-md p-4 ${
            inquiry.unread ? "bg-blue-50 border-blue-200" : "bg-white"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{inquiry.customer}</span>
                {inquiry.unread && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                    New
                  </span>
                )}
              </div>
              <h5 className="text-sm font-semibold text-gray-900">
                {inquiry.subject}
              </h5>
              <p className="text-sm text-gray-600">{inquiry.message}</p>
              <p className="text-xs text-gray-500">{inquiry.time}</p>
            </div>
            <button className="text-sm border rounded px-3 py-1 hover:bg-gray-100 self-start">
              Reply
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

        {activeTab === "market" && (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-2xl font-bold">Market Prices</h2>
              <p className="text-gray-500">
                Current market prices for agricultural products in your region
              </p>
            </div>

            {/* Product Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  product: "Tomatoes",
                  price: "$4.25",
                  change: "+5.2%",
                  trend: "up",
                  unit: "per lb",
                },
                {
                  product: "Lettuce",
                  price: "$2.10",
                  change: "-2.1%",
                  trend: "down",
                  unit: "per head",
                },
                {
                  product: "Corn",
                  price: "$3.80",
                  change: "+1.8%",
                  trend: "up",
                  unit: "per dozen",
                },
                {
                  product: "Beef",
                  price: "$11.50",
                  change: "+3.4%",
                  trend: "up",
                  unit: "per lb",
                },
                {
                  product: "Eggs",
                  price: "$5.75",
                  change: "-1.5%",
                  trend: "down",
                  unit: "per dozen",
                },
                {
                  product: "Milk",
                  price: "$2.25",
                  change: "+1.8%",
                  trend: "down",
                  unit: "per gallon",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-4 border rounded-md shadow-sm bg-white flex justify-between items-start"
                >
                  <div>
                    <h4 className="font-semibold text-lg">{item.product}</h4>
                    <p className="text-sm text-gray-500">{item.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{item.price}</p>
                    <p
                      className={`text-sm flex items-center justify-end gap-1 ${
                        item.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.trend === "up" ? "▲" : "▼"} {item.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Regional Trends */}
            <div className="p-6 border rounded-md shadow-sm bg-white space-y-4">
              <div>
                <h3 className="text-xl font-semibold">
                  Regional Market Trends
                </h3>
                <p className="text-sm text-gray-500">
                  Price trends for the past 30 days in Springfield, IL region
                </p>
              </div>

              {[
                {
                  product: "Organic Vegetables",
                  trend: 85,
                  color: "bg-green-500",
                },
                { product: "Dairy Products", trend: 72, color: "bg-blue-500" },
                { product: "Grains", trend: 68, color: "bg-yellow-500" },
                { product: "Livestock", trend: 91, color: "bg-red-500" },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.product}</span>
                    <span>{item.trend}% of peak price</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-2 ${item.color} transition-all duration-700 ease-in-out`}
                      style={{ width: `${item.trend}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "education" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Learning Hub</h2>
              <p className="text-muted-foreground">
                Educational resources to improve your farming practices
              </p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex gap-4">
              <button
                onClick={() => setInnerTab("articles")}
                className={`py-2 px-4 rounded ${
                  innerTab === "articles"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                Articles
              </button>
              <button
                onClick={() => setInnerTab("videos")}
                className={`py-2 px-4 rounded ${
                  innerTab === "videos"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                Videos
              </button>
              <button
                onClick={() => setInnerTab("courses")}
                className={`py-2 px-4 rounded ${
                  innerTab === "courses"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                Courses
              </button>
            </div>

            {/* Articles */}
            {innerTab === "articles" && (
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    title: "Sustainable Farming Practices for 2024",
                    author: "Dr. Sarah Miller",
                    readTime: "8 min read",
                    category: "Sustainability",
                    image: "https://media.istockphoto.com/id/2199057244/photo/local-produce-plot-of-land.jpg?s=612x612&w=0&k=20&c=qoumHZER6K02lI0XkTPzIomGDfvYyIcLO6z8o64YoDE=",
                  },
                  {
                    title: "Maximizing Crop Yield with Precision Agriculture",
                    author: "John Peterson",
                    readTime: "12 min read",
                    category: "Technology",
                    image: "https://media.istockphoto.com/id/2160078318/photo/close-up-of-a-farmer-planting-a-lettuce-seedling-on-a-community-garden.webp?b=1&s=612x612&w=0&k=20&c=QU2Mi5VKuuzFH4CnvIBtfquldzNkT83pyY0fNHVY518=",
                  },
                  {
                    title: "Organic Pest Control Methods",
                    author: "Maria Rodriguez",
                    readTime: "6 min read",
                    category: "Pest Control",
                    image: "https://media.istockphoto.com/id/958953510/photo/agricultural-worker-takes-care-of-his-estate.webp?a=1&b=1&s=612x612&w=0&k=20&c=3i-QnCLOi3iw9wLf_GIEBJvzA9dmxCWU3ghQ8c2tFWE=",
                  },
                  {
                    title: "Water Conservation Techniques",
                    author: "David Chen",
                    readTime: "10 min read",
                    category: "Water Management",
                    image: "https://plus.unsplash.com/premium_photo-1733266915738-25f252337522?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFdhdGVyJTIwQ29uc2VydmF0aW9uJTIwVGVjaG5pcXVlc3xlbnwwfHwwfHx8MA%3D%3D",
                  },
                ].map((article, i) => (
                  <div
                    key={i}
                    className="border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <span className="text-xs border px-2 py-1 rounded mb-2 inline-block text-gray-600">
                        {article.category}
                      </span>
                      <h4 className="font-medium text-lg mb-2">
                        {article.title}
                      </h4>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>By {article.author}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Videos */}
            {innerTab === "videos" && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Modern Irrigation Systems",
                    duration: "15:30",
                    views: "2.3K",
                    thumbnail: "https://media.istockphoto.com/id/108310732/photo/crop-irrigation.webp?a=1&b=1&s=612x612&w=0&k=20&c=SekGs_kz6fqGaSMB2oR-jAo0nCf5mfCOq3i_2PIgN6E=",
                  },
                  {
                    title: "Soil Health Management",
                    duration: "22:45",
                    views: "1.8K",
                    thumbnail: "https://plus.unsplash.com/premium_photo-1747132588806-7d981c4b62fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U29pbCUyMEhlYWx0aCUyME1hbmFnZW1lbnR8ZW58MHx8MHx8fDA%3D",
                  },
                  {
                    title: "Greenhouse Farming Basics",
                    duration: "18:20",
                    views: "3.1K",
                    thumbnail: "https://images.unsplash.com/photo-1727099079513-952d40de9d78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R3JlZW5ob3VzZSUyMEZhcm1pbmclMjBCYXNpY3N8ZW58MHx8MHx8fDA%3D",
                  },
                  {
                    title: "Livestock Care Best Practices",
                    duration: "25:10",
                    views: "1.5K",
                    thumbnail: "https://plus.unsplash.com/premium_photo-1682129096859-3be46dd0f2dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8TGl2ZXN0b2NrJTIwQ2FyZSUyMEJlc3QlMjBQcmFjdGljZXN8ZW58MHx8MHx8fDA%3D",
                  },
                  {
                    title: "Crop Rotation Strategies",
                    duration: "12:55",
                    views: "2.7K",
                    thumbnail: "https://media.istockphoto.com/id/91210277/photo/texture-from-green-grass.webp?a=1&b=1&s=612x612&w=0&k=20&c=eZtAv8jeME8VqD9_zniN0JNxd_PY7ll9jpMp0gDXgVo=",
                  },
                  {
                    title: "Farm Equipment Maintenance",
                    duration: "20:15",
                    views: "1.9K",
                    thumbnail: "https://images.unsplash.com/photo-1632850883408-dd47e3d435c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEZhcm0lMjBFcXVpcG1lbnQlMjBNYWludGVuYW5jZXxlbnwwfHwwfHx8MA%3D%3D",
                  },
                ].map((video, i) => (
                  <div
                    key={i}
                    className="border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium mb-1">{video.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {video.views} views
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Courses */}
            {innerTab === "courses" && (
              <div className="grid gap-4">
                {[
                  {
                    title: "Complete Guide to Organic Farming",
                    instructor: "Dr. Emily Johnson",
                    lessons: 24,
                    duration: "8 hours",
                    level: "Beginner",
                    enrolled: 1250,
                    rating: 4.8,
                  },
                  {
                    title: "Advanced Crop Management",
                    instructor: "Prof. Michael Brown",
                    lessons: 18,
                    duration: "6 hours",
                    level: "Advanced",
                    enrolled: 890,
                    rating: 4.9,
                  },
                  {
                    title: "Sustainable Agriculture Practices",
                    instructor: "Sarah Wilson",
                    lessons: 15,
                    duration: "5 hours",
                    level: "Intermediate",
                    enrolled: 2100,
                    rating: 4.7,
                  },
                ].map((course, i) => (
                  <div
                    key={i}
                    className="border rounded-lg p-6 shadow hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start flex-col sm:flex-row gap-4">
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold">
                          {course.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          By {course.instructor}
                        </p>
                        <div className="flex gap-4 text-sm text-muted-foreground flex-wrap">
                          <span>{course.lessons} lessons</span>
                          <span>{course.duration}</span>
                          <span className="border px-2 py-1 rounded">
                            {course.level}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-yellow-400">
                            ★ {course.rating}
                          </span>
                          <span>({course.enrolled} enrolled)</span>
                        </div>
                      </div>
                      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === "weather" && (
  <div className="space-y-6 px-4 md:px-8">
    {/* Header */}
    <div>
      <h2 className="text-2xl font-bold">Weather Forecast</h2>
      <p className="text-muted-foreground">Weather information for your farm location</p>
    </div>

    {/* Current Weather and Alerts */}
    <div className="grid gap-6 md:grid-cols-2">
      {/* Current Weather */}
      <div className="p-6 rounded-xl border shadow-sm bg-white">
        <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
          <MapPin className="h-5 w-5" />
          <span>Current Weather</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Springfield, IL - Updated 10 minutes ago</p>

        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Cloud className="h-16 w-16 text-blue-500" />
            <div>
              <p className="text-3xl font-bold">72°F</p>
              <p className="text-muted-foreground">Partly Cloudy</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Feels like</p>
            <p className="text-xl font-semibold">75°F</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-medium">65%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-muted-foreground">Wind Speed</p>
              <p className="font-medium">8 mph NW</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-red-500" />
            <div>
              <p className="text-sm text-muted-foreground">UV Index</p>
              <p className="font-medium">6 (High)</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Cloud className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-muted-foreground">Visibility</p>
              <p className="font-medium">10 miles</p>
            </div>
          </div>
        </div>
      </div>

      {/* Farming Alerts */}
      <div className="p-6 rounded-xl border shadow-sm bg-white">
        <h3 className="text-lg font-semibold mb-4">Farming Alerts</h3>
        <div className="space-y-4">
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-2 w-2 bg-yellow-500 rounded-full" />
              <p className="font-medium text-yellow-800">Frost Warning</p>
            </div>
            <p className="text-sm text-yellow-700">
              Temperatures may drop below 32°F tonight. Protect sensitive crops.
            </p>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-2 w-2 bg-blue-500 rounded-full" />
              <p className="font-medium text-blue-800">Irrigation Recommendation</p>
            </div>
            <p className="text-sm text-blue-700">
              Low rainfall expected. Consider watering crops in the next 2 days.
            </p>
          </div>
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <p className="font-medium text-green-800">Optimal Planting</p>
            </div>
            <p className="text-sm text-green-700">
              Weather conditions are ideal for planting winter crops this week.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* 7-Day Forecast */}
    <div className="p-6 rounded-xl border shadow-sm bg-white">
      <h3 className="text-lg font-semibold mb-4">7-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {[
          { day: "Today", icon: Cloud, high: 75, low: 58, condition: "Partly Cloudy" },
          { day: "Tue", icon: Cloud, high: 73, low: 55, condition: "Cloudy" },
          { day: "Wed", icon: Droplets, high: 68, low: 52, condition: "Light Rain" },
          { day: "Thu", icon: Cloud, high: 71, low: 54, condition: "Overcast" },
          { day: "Fri", icon: Cloud, high: 76, low: 59, condition: "Partly Cloudy" },
          { day: "Sat", icon: Cloud, high: 78, low: 61, condition: "Sunny" },
          { day: "Sun", icon: Cloud, high: 80, low: 63, condition: "Sunny" },
        ].map((forecast, i) => (
          <div key={i} className="text-center space-y-2">
            <p className="font-medium text-sm">{forecast.day}</p>
            <forecast.icon className="h-8 w-8 mx-auto text-blue-500" />
            <div>
              <p className="font-bold">{forecast.high}°</p>
              <p className="text-sm text-muted-foreground">{forecast.low}°</p>
            </div>
            <p className="text-xs text-muted-foreground">{forecast.condition}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

      </main>
    </div>
  );
};

export default Sidebar;
