import { useSession } from "next-auth/react";
import Link from "next/link";
import Router, { useRouter } from "next/router";

import React, { FC, useContext, useEffect } from "react";
import { UserContext } from "./_app";

interface Props {
  children: React.ReactNode;
}

const Protected: FC<Props> = ({ children }): JSX.Element => {
  const { status, data: session } = useSession();
  const context = useContext(UserContext);
  const router = useRouter();
  const market=1;
  const redirect = () => {

    router.push('/market/'+market+'/viewproduct/');

  }
  console.log(context);

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/auth/signin");
  }, [status]);

  if (status === "authenticated")
    return (
      <div>
        Hola {session.user?.role}
        <p>
          <Link href="/addstock">Manage Farmer</Link></p>
        <p>
          <Link href="/joinmarket">Join Market</Link></p>
        <p>
          <Link href="/cristian/marketinfo">Market List</Link>
        </p>
        <p>
          <Link href="/market/1/viewproduct/ ">market Product list market 1</Link>
        </p>
        <p>
          <button onClick={redirect}>Click Me</button>
        </p>
      </div>
    );
  return <div>loading</div>
};

export default Protected;



