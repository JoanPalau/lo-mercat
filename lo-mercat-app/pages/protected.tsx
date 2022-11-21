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
  
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/auth/signin");
  }, [status]);
console.log(status);
  if (status === "authenticated")
    return (
      <div>
        Hola {session.user?.role}
        <p>
          <Link href="/addstock">Manage Farmer</Link></p>
        <p>
          <Link href="/joinmarket">Join Market</Link></p>
        <p>
          <Link href="/">Start Shopping</Link>
        </p>
        </div>
    );
  return <div>loading</div>
};

export default Protected;



