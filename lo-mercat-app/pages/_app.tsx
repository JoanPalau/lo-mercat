import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import React, { useState } from 'react';
import BarraNavegacio from './Components/Navbar';


const UserContext= React.createContext(null);

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  const [user, setUser] = useState(null);

  return (
    <div>
      <BarraNavegacio/>
      <UserContext.Provider value={{user, setUser}}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </UserContext.Provider>
    </div>
   );
}
export {UserContext};
export default MyApp
