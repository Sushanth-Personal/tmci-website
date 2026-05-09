import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WorkbenchWidget from './components/WorkbenchWidget'
import WhatsAppButton from './components/WhatsAppButton'
import { useAdminStore } from './store/adminStore'

const Home = lazy(() => import('./pages/Home'))
const Blogs = lazy(() => import('./pages/Blogs'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const AdminLogin = lazy(() => import('./admin/AdminLogin'))
const AdminLayout = lazy(() => import('./admin/AdminLayout'))
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'))
const AdminSections = lazy(() => import('./admin/AdminSections'))
const AdminBlogs = lazy(() => import('./admin/AdminBlogs'))
const AdminBlogEdit = lazy(() => import('./admin/AdminBlogEdit'))
const AdminFAQs = lazy(() => import('./admin/AdminFAQs'))
const AdminWorkbench = lazy(() => import('./admin/AdminWorkbench'))
const NotFound = lazy(() => import('./pages/NotFound'))

const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full" />
  </div>
)

function ProtectedRoute({ children }) {
  const session = useAdminStore(s => s.session)
  const loading = useAdminStore(s => s.loading)
  if (loading) return <Loader />
  return session ? children : <Navigate to="/admin/login" replace />
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <WorkbenchWidget />
      <WhatsAppButton />
    </>
  )
}

export default function App() {
  const init = useAdminStore(s => s.init)
  useEffect(() => { init() }, [])

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/blogs" element={<PublicLayout><Blogs /></PublicLayout>} />
        <Route path="/blogs/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="sections" element={<AdminSections />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="blogs/new" element={<AdminBlogEdit />} />
          <Route path="blogs/edit/:id" element={<AdminBlogEdit />} />
          <Route path="faqs" element={<AdminFAQs />} />
          <Route path="workbench" element={<AdminWorkbench />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
