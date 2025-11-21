import Navbar from "./Navbar.jsx";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        {children}
      </div>
    </>
  );
};

export default MainLayout;
