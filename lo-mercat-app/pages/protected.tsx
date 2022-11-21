import { useSession } from "next-auth/react";
import Link from "next/link";
import Router, { useRouter } from "next/router";

import React, { FC, useContext, useEffect } from "react";
import { UserContext } from "./_app";
import { useTranslations } from 'next-intl';
import { isMobile } from '@common/DeviceDetection';
import { NextPageContext } from 'next';

interface Props {
  children: React.ReactNode;
}

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      messages: (await import(`../messages/${context.locale}.json`)).default,
      isMobile: isMobile(context.req)
    }
  };
}

const Protected: FC<Props> = ({ children },props): JSX.Element => {
  const { status, data: session } = useSession();
  const context = useContext(UserContext);
  const router = useRouter();
  const isMobile = { props };
  const t = useTranslations("Protected");
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/auth/signin");
  }, [status]);
  console.log(status);
  if (status === "authenticated")
    return (
      <div>
        {t("txtrole")} {session.user?.role}
        <p>
          <Link href="/addstock">{t("farmermanager")}</Link></p>
        <p>
          <Link href="/joinmarket">{t("joinmarket")}</Link></p>
        <p>
          <Link href="/marketselector">{t("startshopping")}</Link>
        </p>
      </div>
    );
  return <div>{t("loading")}</div>
};

export default Protected;



