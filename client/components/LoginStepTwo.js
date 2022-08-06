import { useRef, useEffect } from "react";
import Link from "next/link";
import AccessCodeLoginForm from "./AccessCodeLoginForm";

const LoginStepTwo = ({
  loginAdminCode,
  setIsAccessCodePage,
  setIsFailedPage,
}) => {
  // const timerRef = useRef({
  //   timerMinutes: 3,
  //   timerSeconds: 0,
  // });
  const timerMinutes = useRef(3);
  const timerSeconds = useRef(0);

  const showTimerRef = useRef();

  useEffect(() => {
    let interval = setInterval(() => {
      if (timerSeconds.current === 0) {
        if (timerMinutes.current !== 0) {
          timerSeconds.current = 59;
          timerMinutes.current -= 1;
        } else {
          setIsAccessCodePage(false);
          setIsFailedPage(true);
          // timerSeconds.current = 0;
          // timerMinutes.current = 3;
          return clearInterval(interval);
        }
      } else {
        timerSeconds.current -= 1;
      }

      showTimerRef.current.innerHTML = `${
        timerMinutes.current < 10
          ? `0${timerMinutes.current}`
          : timerMinutes.current
      } : ${
        timerSeconds.current < 10
          ? `0${timerSeconds.current}`
          : timerSeconds.current
      }`;
      // console.log("This will run every second!");
      console.log(timerMinutes.current);
      console.log(timerSeconds.current);
      // if (timerMinutes.current == 0 && timerSeconds.current == 0) return clearInterval(interval)
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
      <AccessCodeLoginForm
        loginAdminCode={loginAdminCode}
        showTimerRef={showTimerRef}
        timerMinutes={timerMinutes}
      />
    </>
  );
};

export default LoginStepTwo;
