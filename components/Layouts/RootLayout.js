import Footer from "@/components/Shared/Footer";
import Header from "@/components/Shared/Header";

const RootLayout = ({ children }) => {
  return (
    <div className="bg-white text-black ">
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
