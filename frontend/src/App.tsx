import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Pets from './pages/Pets'
import PetDetails from './pages/PetDetails'
import NotFound from './pages/NotFound'
import Organizations from './pages/Organizations'
import About from './pages/About'
import Dashboard from './pages/Dashboard'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/pets" element={<Pets />} />
      <Route path="/pets/:id" element={<PetDetails />} />
      <Route path="/orgs" element={<Organizations />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)

export default App
