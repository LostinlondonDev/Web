import Footer from "./footer/footer";
import Header from "./header/header";

interface Props {
    children: React.ReactNode
  }

  export default function Layout({ children }: Props) {
    return (
        <>
        <Header/>
        <main>
          {children}
        </main>
        <Footer/>
        </>
        
    );
  }