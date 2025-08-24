import { Outlet } from "react-router"
import CommonLayout from "./component/common/commonLayout"
import HeroSection from "./component/layout/HeroSection"


function App() {
 
return (
<CommonLayout>
  <Outlet></Outlet>
  <HeroSection></HeroSection>
</CommonLayout>
)

}

export default App
