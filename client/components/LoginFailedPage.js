import Link from "next/link";

const LoginFailedPage = ({ setIsFailedPage, setIsLoginPage }) => {
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
      <div>
        <h3 className="text-center text-xl font-medium text-blue-900 mb-4">
          Time's up
        </h3>
        <button
          onClick={() => {
            setIsFailedPage(false);
            setIsLoginPage(true);
          }}
          className="w-full p-2 text-white bg-blue-500 hover:bg-blue-600 transition-all rounded"
        >
          Go back to login page
        </button>
      </div>
    </>
  );
};

export default LoginFailedPage;
