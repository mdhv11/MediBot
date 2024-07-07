import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Services from '../pages/Services'
import Doctors from '../pages/Doctors/Doctors'
import DoctorDetails from '../pages/Doctors/DoctorDetails'
import Chatbot from '../pages/MediBot'
import Appointment from '../pages/Appointment'

import { Routes, Route } from 'react-router-dom'


const Routers = () => {
    return <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:id' element={<DoctorDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/api/signup' element={<Signup />} />
        <Route path='/services' element={<Services />} />
        <Route path='/chatbot' element={<Chatbot />} />
        <Route path='/appointment' element={<Appointment />} />
    </Routes>
}

export default Routers