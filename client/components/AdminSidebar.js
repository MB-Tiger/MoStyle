import Link from "next/link";
import { useDispatch } from "react-redux";
import Logout from "../assets/svg/Logout";
import CreateProduct from "../assets/svg/CreateProduct";
import List from "../assets/svg/List";
import Dashboard from "../assets/svg/Dashboard";
import { useRouter } from "next/router";
import { deleteAdminToken } from "../redux/TokenSlice";

const AdminSidebar = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <nav className="w-full shadow-sm border rounded px-4 py-6 mx-4 my-2">
      <div className="flex items-center space-x-2 mb-4">
        <img className="w-12" src="/images/man.png" alt="admin photo" />
        <p>{data?.data.name}</p>
      </div>
      <hr />
      <ul className="space-y-5 mt-6">
        <Link href={"/admin/dashboard/"}>
          <li className="flex items-center space-x-2 text-lg font-medium hover:ml-2 transition-all cursor-pointer">
            <Dashboard />
            <span>Dashboard</span>
          </li>
        </Link>
        <Link href={"products"}>
          <li className="flex items-center space-x-2 text-lg font-medium hover:ml-2 transition-all cursor-pointer">
            <List />
            <span>Products</span>
          </li>
        </Link>
        <Link href={"createproduct"}>
          <li className="flex items-center space-x-2 text-lg font-medium hover:ml-2 transition-all cursor-pointer">
            <CreateProduct />
            <span>Create Product</span>
          </li>
        </Link>
        <li
          className="flex items-center space-x-2 text-lg font-medium hover:ml-2 transition-all cursor-pointer"
          onClick={() => {
            dispatch(deleteAdminToken());
            router.push("/admin/login");
          }}
        >
          <Logout />
          <span>Log out</span>
        </li>
      </ul>
    </nav>
  );
};

export default AdminSidebar;
