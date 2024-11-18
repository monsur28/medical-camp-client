import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const Main = () => {
  return (
    <main>
      <div className="border border-solid sticky top-0 z-[1000]">
        <Navbar></Navbar>
      </div>
      <div className="max-w-screen-xl mx-auto cinzel">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </main>
  );
};

export default Main;
