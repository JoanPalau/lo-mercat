import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/globals.scss'

import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import { SSRProvider } from 'react-bootstrap';
import React, { useState } from 'react';
import BarraNavegacio from './Components/Navbar';


const UserContext= React.createContext(null);

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  const [user, setUser] = useState(null);

  return (
    <SSRProvider>
      <div>
        <UserContext.Provider value={{user, setUser}}>
            <SessionProvider session={session}>
              <BarraNavegacio/>
                <Component {...pageProps} />
            </SessionProvider>
        </UserContext.Provider>
      </div>
    </SSRProvider>
   );
}
export {UserContext};
export default MyApp
