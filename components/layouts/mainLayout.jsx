import Footer from "../Footer";
import Header from "../Header";

const Mainlayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Mainlayout;
