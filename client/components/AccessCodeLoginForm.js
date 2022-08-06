import { useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const AccessCodeLoginForm = ({
  loginAdminCode,
  showTimerRef,
  timerMinutes,
}) => {
  const inputOne = useRef();
  const inputTwo = useRef();
  const inputThree = useRef();
  const inputFour = useRef();

  const adminCodeData = {
    numone: "",
    numtwo: "",
    numthree: "",
    numfour: "",
  };

  const loginValidationSchema = Yup.object().shape({
    numone: Yup.string().min(1).required("Password required"),
    numtwo: Yup.string().min(1).required("Password required"),
    numthree: Yup.string().min(1).required("Password required"),
    numfour: Yup.string().min(1).required("Password required"),
  });

  return (
    <Formik
      initialValues={adminCodeData}
      validationSchema={loginValidationSchema}
      onSubmit={loginAdminCode}
    >
      {({ errors, touched }) => (
        <Form>
          <p className="text-blue-900 mb-2">Enter code</p>
          <div className="flex justify-between items-center space-x-6">
            <Field
              innerRef={inputOne}
              required
              type="number"
              name="numone"
              className="w-12 h-8 bg-gray-50 border rounded p-2 pr-1"
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 1);
                if (e.target.value.length == 1) inputTwo.current.focus();
              }}
            />
            <Field
              innerRef={inputTwo}
              required
              type="number"
              name="numtwo"
              className="w-12 h-8 bg-gray-50 border rounded p-2 pr-1"
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 1);
                if (e.target.value.length == 1) inputThree.current.focus();
                if (e.target.value.length == 0) inputOne.current.focus();
              }}
            />
            <Field
              innerRef={inputThree}
              required
              type="number"
              name="numthree"
              className="w-12 h-8 bg-gray-50 border rounded p-2 pr-1"
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 1);
                if (e.target.value.length == 1) inputFour.current.focus();
                if (e.target.value.length == 0) inputTwo.current.focus();
              }}
            />
            <Field
              innerRef={inputFour}
              required
              type="number"
              name="numfour"
              className="w-12 h-8 bg-gray-50 border rounded p-2 pr-1"
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 1);
                if (e.target.value.length == 0) inputThree.current.focus();
              }}
            />
          </div>
          {(errors.numone && touched.numone) ||
          (errors.numtwo && touched.numtwo) ||
          (errors.numthree && touched.numthree) ||
          (errors.numfour && errors.numfour) ? (
            <span className="text-xs text-red-600">{errors.numone}</span>
          ) : null}
          <p className="text-center mt-2" ref={showTimerRef}>
            {timerMinutes.current === 3 ? "03 : 00" : null}
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
  );
};

export default AccessCodeLoginForm;
