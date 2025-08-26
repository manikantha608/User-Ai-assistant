import React, { useState, useEffect } from 'react'
import AdminBanner from '../components/AdminBanner'
import { useAppContext } from '../context/AppContext'

const AdminDashboard = () => {
  const { faqs, documents, allUsers } = useAppContext()
  const [stats, setStats] = useState({
    users: allUsers.length,
    faqs: faqs.length,
    documents: documents.length,
  })

  return (
    <div className="">
      <AdminBanner />

      <div className="px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
          {/* Users */}
          <div className="relative group max-w-sm w-full hover:-translate-y-0.5 transition duration-300">
            <p className="text-lg md:text-xl text-indigo-600 font-medium mb-2">
              Number of Users
            </p>
            <div className="relative">
              <img
                className="rounded-xl w-full h-46 object-cover"
                src="https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=1200&h=800&auto=format&fit=crop&q=60"
                alt="Users"
              />
              {/* Random number overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl md:text-5xl font-bold text-white bg-black/40 px-4 py-2 rounded-lg">
                  {stats.users}
                </span>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="relative group max-w-sm w-full hover:-translate-y-0.5 transition duration-300">
            <p className="text-lg md:text-xl text-indigo-600 font-medium mb-2">
              Number of FAQs
            </p>
            <div className="relative">
              <img
                className="rounded-xl w-full h-46 object-cover"
                src="https://images.unsplash.com/photo-1714974528646-ea024a3db7a7?w=1200&h=800&auto=format&fit=crop&q=60"
                alt="FAQs"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl md:text-5xl font-bold text-white bg-black/40 px-4 py-2 rounded-lg">
                  {stats.faqs}
                </span>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="relative group max-w-sm w-full hover:-translate-y-0.5 transition duration-300">
            <p className="text-lg md:text-xl text-indigo-600 font-medium mb-2">
              Number of Documents
            </p>
            <div className="relative">
              <img
                className="rounded-xl w-full h-46 object-cover"
                src="https://images.unsplash.com/photo-1713947501966-34897f21162e?w=1200&h=800&auto=format&fit=crop&q=60"
                alt="Documents"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl md:text-5xl font-bold text-white bg-black/40 px-4 py-2 rounded-lg">
                  {stats.documents}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
