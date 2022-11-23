import { useSession } from "next-auth/react";
import Link from "next/link";
import Router from "next/router";
import React, { FC, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const Protected: FC<Props> = ({ children}): JSX.Element => {
  const { status, data:session } = useSession();

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
      </div>
    );
  return <div>loading</div>
};

export default Protected;