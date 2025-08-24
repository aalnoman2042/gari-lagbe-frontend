import { Outlet } from "react-router"
import CommonLayout from "./component/common/commonLayout"
import HeroSection from "./component/layout/HeroSection"
import Faq from "./component/layout/Faq"


function App() {
 
return (
<CommonLayout>
  <Outlet></Outlet>
  <HeroSection></HeroSection>
  <Faq></Faq>
</CommonLayout>
)

}

export default App
