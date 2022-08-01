import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const stepone = () => {
  const router = useRouter();

  const adminData = {
    name: "",
    phone: "",
  }

  const loginValidationSchema = Yup.object().shape({
    phone: Yup.string().min(4).required("Password required"),
  });

  const signupAdmin = (values, props) => {
    console.log(values);
    console.log(props);

    axios
      .post("http://localhost:4313/admin/login-step-one", {
        phone: values.phone,
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) router.push("/admin/login/steptwo");
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
          <Link href={"/admin/signup"}>
            <h3 className="text-sm cursor-pointer">Sign up</h3>
          </Link>
          <h3 className="text-lg font-medium border-b-2 border-blue-600 pb-1">
            Login
          </h3>
        </div>
        <Formik
          initialValues={adminData}
          validationSchema={loginValidationSchema}
          onSubmit={signupAdmin}
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
              <button
                type="submit"
                className="w-full p-2 bg-red-500 text-white hover:bg-red-600 transition-all rounded mt-4"
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

export default stepone;
