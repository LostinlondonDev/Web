import { Category } from "../interfaces/category.interface";
import Footer from "./footer/footer";
import Header from "./header/header";



interface Props {
    children: React.ReactNode,
    categories: Category[]
}

  export default function Layout({ children ,categories }: Props) {
    return (
        <>
        <Header/>
        <main>
          {children}
        </main>
        <Footer categories={categories!}/>
        </>
        
    );
  }