import React, {ReactNode} from 'react';
import Header from "./header";
import Footer from "./footer";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className='content'>
      <Header/>
      {children}
      <Footer/>
    </div>
  );
};

export default Layout;