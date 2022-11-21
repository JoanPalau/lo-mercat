import { Grid, Link } from "@mui/material";
import { useSession } from "next-auth/react";
// import Link from "next/link";
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
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
        >
        Hola {session.user?.name}
        <p>
        <Link href="/addstock">Manage Farmer</Link></p>
        <p>
        <Link href="/joinmarket">Join Market</Link></p>
        <p>
        <Link href="/cristian/marketinfo">Market List</Link>
        </p>
      </Grid>
    );
  return <div>loading</div>
};

export default Protected;