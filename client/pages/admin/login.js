import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import LoginStepOne from "../../components/LoginStepOne";
import LoginStepTwo from "../../components/LoginStepTwo";
import LoginFailedPage from "../../components/LoginFailedPage";
import { useDispatch } from "react-redux";
import { addAdminToken } from "../../redux/TokenSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [isAccessCodePage, setIsAccessCodePage] = useState(false);
  const [isFailedPage, setIsFailedPage] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const loginAdmin = (values, props) => {
    console.log(values);
    console.log(props);

    axios
      .post("http://localhost:4313/admin/login-step-one", {
        phone: phoneNumber,
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setIsLoginPage(false);
          setIsAccessCodePage(true);
        }
      })
      .catch((error) => {
        console.log(error);
        return toast.error(`${error.response.data.msg}`, {theme: "colored"})
      });
  };

  const loginAdminCode = (values, props) => {
    console.log(values);
    console.log(props);

    axios
      .post("http://localhost:4313/admin/login-step-two", {
        phone: phoneNumber,
        code: `${values.numone}${values.numtwo}${values.numthree}${values.numfour}`,
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          dispatch(addAdminToken(response.data.token));
          router.push("/admin/dashboard/");
        }
      })
      .catch((error) => {
        console.log(error);
        return toast.error(`${error.response.data.msg}`, {theme: "colored"})
      });
  };

  return (
    <div className="w-full min-h-screen bg-white py-12">
      <div className="w-[300px] bg-white rounded shadow mx-auto p-4">
        {isLoginPage ? (
          <LoginStepOne
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            loginAdmin={loginAdmin}
          />
        ) : null}
        {isAccessCodePage ? (
          <LoginStepTwo
            loginAdminCode={loginAdminCode}
            setIsAccessCodePage={setIsAccessCodePage}
            setIsFailedPage={setIsFailedPage}
          />
        ) : null}
        {isFailedPage ? (
          <LoginFailedPage
            setIsFailedPage={setIsFailedPage}
            setIsLoginPage={setIsLoginPage}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Login;
