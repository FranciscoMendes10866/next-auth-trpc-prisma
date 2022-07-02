import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";

import { requireAuth } from "../../common/requireAuth";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Dashboard: NextPage = () => {
  const { data } = useSession();

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello, {JSON.stringify(data)}!
      </h1>
      <button
        className="btn btn-primary"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Logout
      </button>
    </>
  );
};

export default Dashboard;
