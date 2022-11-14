import { useSession } from "next-auth/react";
import Link from "next/link";
import Router from "next/router";
import React, { FC, useContext, useEffect } from "react";
import { UserContext } from "./_app";

interface Props {
  children: React.ReactNode;
}

const Protected: FC<Props> = ({ children}): JSX.Element => {
  const { status, data:session } = useSession();
  const context = useContext(UserContext);
  console.log(context);

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/auth/signin");
  }, [status]);

  if (status === "authenticated")
    return (
      <div>
        Hola {session.user?.role}
        <Link href="/addstock">Manage Farmer</Link>
        <p>
        <Link href="/joinmarket">Join Market</Link>
        </p>
      </div>
    );
  return <div>loading</div>
};

export default Protected;