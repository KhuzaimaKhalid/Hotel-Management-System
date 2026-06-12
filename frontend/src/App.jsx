import { Route, Routes } from "react-router-dom"
import Loginpage from "./Loginpage"

import Forgotpassword from "./Forgotpassword"
import Billing from "./Guestpanel/Billing"
import Confirmation from "./Guestpanel/Confrimation"
import Feedbacks from "./Guestpanel/Feedbacks"
import Invoicepage from "./Guestpanel/Invoicepage"
import Booking from "./Guestpanel/Booking"
import Admindashboard from "./adminpanel/Admindashboard"
import Adminbillingpage from "./adminpanel/Adminbillingpage"
import Adminbookrooms from "./adminpanel/Adminbookrooms"
import Adminuser from "./adminpanel/Adminuser"
import Adminuserdetail from "./adminpanel/Adminuserdetail"
import Adminviewroom from "./adminpanel/Adminviewroom"
import Adminaddroom from "./adminpanel/Adminaddroom"
import Adminupdateroom from "./adminpanel/Adminupdateroom"
import Signup from "./Signup"
import StaffHousekeepingTasks from "./adminpanel/Staffhousekeepingtasks"
import StaffServiceRequests from "./adminpanel/Staffservicerequests"
import StaffNotifications from "./adminpanel/Staffnotifications"
import AdminNotifications from "./adminpanel/Adminnotifications"
import AdminServices from "./adminpanel/Adminservices"
import Home from "./Guestpanel/Home";
import About from "./Guestpanel/About";
import OurRoom from "./Guestpanel/Ourroom";
import Gallery from "./Guestpanel/Gallery";
import Blog from "./Guestpanel/Blog";
import ContactUs from "./Guestpanel/Contact";


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/confirm" element={<Confirmation />} />
        <Route path="/feedback" element={<Feedbacks />} />
        <Route path="/invoice" element={<Invoicepage />} />
        <Route path="/admindashboard" element={<Admindashboard />} />
        <Route path="/adminaddroom" element={<Adminaddroom />} />
        <Route path="/adminbilling" element={<Adminbillingpage />} />
        <Route path="/bookrooms" element={<Adminbookrooms />} />
        <Route path="/adminuser" element={<Adminuser />} />
        <Route path="/adminuserdetails/:id" element={<Adminuserdetail />} />
        <Route path="/adminviewrooms" element={<Adminviewroom />} />
        <Route path="/adminupdateroom/:id" element={<Adminupdateroom />} />

        <Route path="/staffhousekeeping" element={<StaffHousekeepingTasks />} />
        <Route path="/staffservicerequests" element={<StaffServiceRequests />} />
        <Route path="/staffnotifications" element={<StaffNotifications />} />

        <Route path="/adminnotifications" element={<AdminNotifications />} />
        <Route path="/adminservices" element={<AdminServices />} />

        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/our-room" element={<OurRoom />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </>
  )
}

export default App
