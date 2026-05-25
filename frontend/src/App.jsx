import { Route, Routes } from "react-router-dom"
import Loginpage from "./Loginpage"
import Signin from "./Signin"
import Forgotpassword from "./Forgotpassword"
import Billing from "./Guestpanel/Billing"
import Confirmation from "./Guestpanel/Confrimation"
import Feedbacks from "./Guestpanel/Feedbacks"
import Invoicepage from "./Guestpanel/Invoicepage"
import Booking from "./Guestpanel/Booking"
import Admindashboard from "./adminpanel/Admindashboard"
import Adminbillingpage from "./adminpanel/Adminbillingpage"
import Adminbookrooms from "./adminpanel/Adminbookrooms"
import AdminFeedback from "./adminpanel/Adminfeedback"
import Adminuser from "./adminpanel/Adminuser"
import Adminuserdetail from "./adminpanel/Adminuserdetail"
import Adminviewroom from "./adminpanel/Adminviewroom"
import Adminaddroom from "./adminpanel/Adminaddroom"
import Adminupdateroom from "./adminpanel/Adminupdateroom"


function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<Loginpage/>} />
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/forgotpassword" element={<Forgotpassword/>}/>
      <Route path="/billing" element={<Billing/>}/>
      <Route path="/booking" element={<Booking/>}/>
      <Route path="/confirm" element={<Confirmation/>}/>
      <Route path="/feedback" element={<Feedbacks/>}/>
      <Route path="/invoice" element={<Invoicepage/>}/>
      <Route path="/admindashboard" element={<Admindashboard/>}/>
      <Route path="/adminaddroom" element={<Adminaddroom/>}/>
      <Route path="/adminbilling" element={<Adminbillingpage/>}/>
      <Route path="/bookrooms" element={<Adminbookrooms/>}/>
      <Route path="/adminfeedbacks" element={<AdminFeedback/>}/>
      <Route path="/adminuser" element={<Adminuser/>}/>
      <Route path="/adminuserdetails" element={<Adminuserdetail/>}/>
      <Route path="/adminviewrooms" element={<Adminviewroom/>}/>
      <Route path="/adminupdateroom/:id" element={<Adminupdateroom/>}/>
    </Routes>
    </>
  )
}

export default App
