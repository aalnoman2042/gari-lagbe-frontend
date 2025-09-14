// import { Outlet } from "react-router"
// import CommonLayout from "./component/common/commonLayout"
// import HeroSection from "./component/layout/HeroSection"
// import Faq from "./component/layout/Faq"
// import About from "./pages/About"

// import Contact from "./pages/contact"
// import Features from "./component/layout/Features"


// function App() {
 
// return (
// <CommonLayout>
//   <Outlet></Outlet>
//   <HeroSection></HeroSection>
//   <About></About>
//   <Features></Features>
//   <Faq></Faq>
//   <Contact></Contact>
 
// </CommonLayout>
// )

// }

// export default App


import { Outlet } from "react-router";
import CommonLayout from "./component/common/commonLayout";
import HeroSection from "./component/layout/HeroSection";
import Faq from "./component/layout/Faq";
import About from "./pages/About";
import Contact from "./pages/contact";
import Features from "./component/layout/Features";



function App() {
  return (
    <CommonLayout>
      
      <Outlet />
      <HeroSection />
      <About />
      <Features />
      <Faq />
      <Contact />
    </CommonLayout>
  );
}

export default App;
