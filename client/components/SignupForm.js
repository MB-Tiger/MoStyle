import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignupForm = ({ adminData, signupAdmin }) => {
  const signupValidationSchema = Yup.object().shape({
    name: Yup.string().min(2).required("Name required"),
    phone: Yup.string().min(4).required("Password required"),
  });

  return (
    <Formik
      initialValues={adminData}
      validationSchema={signupValidationSchema}
      onSubmit={signupAdmin}
    >
      {({ errors, touched }) => (
        <Form>
          <label className="block relative mb-4">
            <Field
              required
              type="text"
              name="name"
              className="w-full h-9 p-2 border rounded border-gray-400"
            />
            {errors.name && touched.name ? (
              <span className="text-xs text-red-600">{errors.name}</span>
            ) : null}
            <div className="absolute top-[6px] left-2 transition-all duration-200 text-gray-500">
              Name
            </div>
          </label>
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
  );
};

export default SignupForm;
