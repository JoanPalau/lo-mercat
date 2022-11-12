import { useSession } from "next-auth/react";
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
        <a href="/addstock">Manage Farmer</a>
        <p>
        <a href="/joinmarket">Join Market</a>
        </p>
      </div>
    );
  return <div>loading</div>
};

export default Protected;