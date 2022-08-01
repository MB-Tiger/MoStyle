import { useRef, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const steptwo = () => {
  const router = useRouter();

  const adminCodeData = {
    phone: "",
    numone: "",
    numtwo: "",
    numthree: "",
    numfour: "",
  }

  const timerRef = useRef({
    timerMinutes: 3,
    timerSeconds: 0,
  });

  const showTimerRef = useRef();
  const inputOne = useRef();
  const inputTwo = useRef();

  const loginValidationSchema = Yup.object().shape({
    phone: Yup.string().min(4).required("Password required"),
  });

  useEffect(() => {
    startTimer();
  }, []);

  const startTimer = () => {
    let interval = setInterval(() => {
      if (timerRef.current.timerSeconds === 0) {
        if (timerRef.current.timerMinutes !== 0) {
          timerRef.current.timerSeconds = 59;
          timerRef.current.timerMinutes = timerRef.current.timerMinutes - 1;
        } else {
          timerRef.current.timerSeconds = 0;
          timerRef.current.timerMinutes = 3;
          return clearInterval(interval);
        }
      } else {
        timerRef.current.timerSeconds = timerRef.current.timerSeconds - 1;
      }

      showTimerRef.current.innerHTML = `${
        timerRef.current.timerMinutes < 10
          ? `0${timerRef.current.timerMinutes}`
          : timerRef.current.timerMinutes
      } : ${
        timerRef.current.timerSeconds < 10
          ? `0${timerRef.current.timerSeconds}`
          : timerRef.current.timerSeconds
      }`;
      // console.log("This will run every second!");
      console.log(timerRef.current.timerMinutes);
      console.log(timerRef.current.timerSeconds);
    }, 1000);
    return () => clearInterval(interval);
  };

  const signupAdminCode = (values, props) => {
    console.log(values);
    console.log(props);

    axios
      .post("http://localhost:4313/admin/login-step-two", {
        phone: values.phone,
        code: `${values.numone}${values.numtwo}${values.numthree}${values.numfour}`,
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) router.push("/admin/dashboard/");
      })
      .catch((error) => {
        console.log(error);
        return alert("Error please open the console");
      });
  };

  return (
    <div className="w-full min-h-screen bg-white py-8">
      <div className="w-[300px] bg-white rounded shadow mx-auto p-4">
        <div className="flex space-x-4 items-baseline mb-6">
          <Link href={"/admin/signup"}>
            <h3 className="text-sm cursor-pointer">Sign up</h3>
          </Link>
          <h3 className="text-lg font-medium border-b-2 border-blue-600 pb-1">
            Login
          </h3>
        </div>
        <Formik
          initialValues={adminCodeData}
          validationSchema={loginValidationSchema}
          onSubmit={signupAdminCode}
        >
          {({ errors, touched }) => (
            <Form>
              <label className="block relative mb-4">
                <Field
                  required
                  type="text"
                  name="phone"
                  className="w-full h-9 p-2 border rounded border-gray-400"
                />
                {errors.phone && touched.phone ? (
                  <span className="text-xs text-red-600">{errors.phone}</span>
                ) : null}
                <div className="absolute top-[6px] left-2 transition-all duration-200 text-gray-500">
                  Phone
                </div>
              </label>
              <p className="text-blue-900 mb-2">Enter code</p>
              <div className="flex justify-between items-center space-x-6">
                <Field
                  type="number"
                  name="numone"
                  className="w-12 h-8 bg-gray-50 border rounded p-2 pr-1"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 1);
                  }}
                />
                <Field
                  type="number"
                  name="numtwo"
                  className="w-12 h-8 bg-gray-50 border rounded p-2 pr-1"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 1);
                  }}
                />
                <Field
                  type="number"
                  name="numthree"
                  className="w-12 h-8 bg-gray-50 border rounded p-2 pr-1"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 1);
                  }}
                />
                <Field
                  type="number"
                  name="numfour"
                  className="w-12 h-8 bg-gray-50 border rounded p-2 pr-1"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 1);
                  }}
                />
              </div>
              <p className="text-center mt-2" ref={showTimerRef}>
                {timerRef.current.timerMinutes === 3 ? "03 : 00" : null}
              </p>
              <button
                type="submit"
                className="w-full p-2 bg-red-500 text-white hover:bg-red-600 transition-all rounded mt-8"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default steptwo;
