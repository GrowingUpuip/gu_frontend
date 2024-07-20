import Footer from "../Footer";
import Header from "../Header";

const Mainlayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Mainlayout;
