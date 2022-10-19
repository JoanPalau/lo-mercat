import { useSession } from "next-auth/react";
import Router from "next/router";
import React, { FC, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const Protected: FC<Props> = ({ children}): JSX.Element => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/auth/signin");
  }, [status]);

  if (status === "authenticated")
    return (
      <div>Hola, estas logejat</div>
    );

  return <div>loading</div>
};

export default Protected;