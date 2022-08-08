import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useQuery, dehydrate, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { wrapper } from "../redux/Store";
import AdminSidebar from "../components/AdminSidebar";

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const at = store.getState().Tokens.at;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ["admin"],
    async () =>
      await (
        await axios.post(
          "http://localhost:4313/admin/me",
          { body: JSON.stringify({}) },
          {
            headers: {
              a_auth: `at ${at}`,
            },
          }
        )
      ).data
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});

const AdminDashboardLayout = ({ children }) => {
  const at = useSelector((state) => state.Tokens.at);

  const { data, isLoading, isError } = useQuery(["admin"], () =>
    axios.post(
      "http://localhost:4313/admin/me",
      { body: JSON.stringify({}) },
      {
        headers: {
          a_auth: `at ${at}`,
        },
      }
    )
  );
  const router = useRouter();

  console.log(data);

  useEffect(() => {
    // console.log(at);
    if (!at || !at.length) router.push("/admin/login");
  }, []);

  return (
    <div className="w-full min-h-screen">
      <div className="grid grid-cols-4">
        <div className="col-span-1">
          {isError ? (
            <div>
              We are sorry. Something went wrong and we can't show you the
              result
            </div>
          ) : isLoading ? (
            <div className="animate-spin w-16 h-16 m-16 rounded-full border-[10px] border-transparent border-b-[10px] border-b-red-800 mx-auto"></div>
          ) : (
            <AdminSidebar data={data} />
          )}
        </div>
        <div className="col-span-3">{children}</div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
