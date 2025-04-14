"use client";

import {
  BookOpen,
  Users,
  Clock,
  BarChart2,
  Calendar,
  Bookmark,
  Award,
} from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const stats = [
    {
      name: "Total Books",
      value: "12,345",
      icon: BookOpen,
      change: "+12%",
      changeType: "positive",
    },
    {
      name: "Active Members",
      value: "2,543",
      icon: Users,
      change: "+5%",
      changeType: "positive",
    },
    {
      name: "Books Checked Out",
      value: "1,234",
      icon: Clock,
      change: "-3%",
      changeType: "negative",
    },
    {
      name: "Overdue Books",
      value: "87",
      icon: Calendar,
      change: "-15%",
      changeType: "positive",
    },
  ];

  const quickActions = [
    { name: "Check Out Book", icon: BookOpen, href: "/transactions/checkout" },
    { name: "Register Member", icon: Users, href: "/members/new" },
    { name: "Add New Book", icon: Bookmark, href: "/books/new" },
    { name: "Generate Report", icon: BarChart2, href: "/reports" },
  ];

  const recentActivity = [
    {
      id: 1,
      member: "Sarah Johnson",
      action: "checked out",
      book: "The Silent Patient",
      time: "10 min ago",
    },
    {
      id: 2,
      member: "Michael Chen",
      action: "returned",
      book: "Atomic Habits",
      time: "25 min ago",
    },
    {
      id: 3,
      member: "Emma Williams",
      action: "renewed",
      book: "Educated",
      time: "1 hour ago",
    },
    {
      id: 4,
      member: "David Kim",
      action: "reserved",
      book: "Dune",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-md p-6 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Librarian!</h1>
          <p className="opacity-90">
            Here's what's happening in your library today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                </div>
                <div className="p-3 rounded-full bg-indigo-50 text-indigo-600">
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <p
                className={`mt-3 text-sm ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change} from last month
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  href={action.href}
                  className="bg-white rounded-lg shadow p-5 flex flex-col items-center justify-center hover:bg-indigo-50 transition-colors duration-200 text-center"
                >
                  <action.icon className="h-8 w-8 text-indigo-600 mb-2" />
                  <span className="text-sm font-medium">{action.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-50 p-2 rounded-full text-indigo-600">
                        <Award className="h-5 w-5" />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium">
                          <span className="text-gray-900">
                            {activity.member}
                          </span>{" "}
                          <span className="text-gray-500">
                            {activity.action}
                          </span>{" "}
                          <span className="text-gray-900">{activity.book}</span>
                        </p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-3 bg-gray-50 text-right">
                <Link
                  href="/activity"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View all activity
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Collections */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Featured Collections</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                name: "New Arrivals",
                count: 42,
                color: "bg-blue-100 text-blue-800",
              },
              {
                name: "Bestsellers",
                count: 28,
                color: "bg-purple-100 text-purple-800",
              },
              {
                name: "Award Winners",
                count: 15,
                color: "bg-green-100 text-green-800",
              },
              {
                name: "Staff Picks",
                count: 36,
                color: "bg-amber-100 text-amber-800",
              },
            ].map((collection) => (
              <div
                key={collection.name}
                className={`${collection.color} rounded-lg p-4 shadow-sm`}
              >
                <h3 className="font-medium">{collection.name}</h3>
                <p className="text-sm mt-1">{collection.count} titles</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
