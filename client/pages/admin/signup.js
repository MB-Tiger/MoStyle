import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import SignupForm from "../../components/SignupForm";

const signup = () => {
  const router = useRouter();

  const adminData = {
    name: "",
    phone: "",
  };

  const signupAdmin = (values, props) => {
    console.log(values);
    console.log(props);

    axios
      .post("http://localhost:4313/admin/create", {
        name: values.name,
        phone: values.phone,
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) router.push("/admin/dashboard");
      })
      .catch((error) => {
        console.log(error);
        return alert("Error please open the console");
      });
  };

  return (
    <div className="w-full min-h-screen bg-white py-12">
      <div className="w-[300px] bg-white rounded shadow mx-auto p-4">
        <div className="flex space-x-4 items-baseline mb-6">
          <h3 className="text-lg font-medium border-b-2 border-blue-600 pb-1">
            Sign up
          </h3>
          <Link href={"/admin/login"}>
            <h3 className="text-sm cursor-pointer">Login</h3>
          </Link>
        </div>
        <SignupForm adminData={adminData} signupAdmin={signupAdmin} />
      </div>
    </div>
  );
};

export default signup;
