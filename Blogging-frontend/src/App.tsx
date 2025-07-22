
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Blogs from './pages/Blogs'
import Dashboard from './pages/Dasboard'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Update from './pages/Update'
import Write from './pages/Write'
import AI from './pages/AI'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />}/>
          <Route path="/write" element={<Write />}/>
          <Route path="/update/:id"element={<Update />}/>
          <Route path="/ai" element={<AI />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

