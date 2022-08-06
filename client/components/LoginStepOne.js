import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";

const LoginStepOne = ({ phoneNumber, setPhoneNumber, loginAdmin }) => {
  const adminData = {
    phone: "",
  }

  const loginValidationSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(/^(\+98|0|0098)?9\d{9}$/, "Must enter valid number"),
  });

  return (
    <>
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
        onSubmit={loginAdmin}
      >
        {({ errors, touched }) => (
          <Form>
            <label className="block relative mb-4">
              <Field
                required
                type="text"
                name="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
    </>
  );
};

export default LoginStepOne;
