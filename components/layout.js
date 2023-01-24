import Footer from "./Footer";
import Header from "./header";

export default function Layout({ children, home }) {
  
  return (
    <div className="layout">
      <Header />
      <div className={home ? "home" : "layout-children"}>
        {children}
      </div>
      <Footer />
    </div>
  )
}