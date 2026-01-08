// import { useDispatch } from "react-redux";
// import { login } from "../auth.thunks";

export default function Register() {
  // const dispatch = useDispatch();

  // const submit = (e) => {
  //   e.preventDefault();
  //   dispatch(
  //     login({
  //       email: e.target.email.value,
  //       password: e.target.password.value,
  //     })
  //   );
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded w-96 shadow">
        {/* <form onSubmit={submit} className="bg-white p-8 rounded w-96 shadow"> */}
        <h2 className="text-2xl mb-4 font-bold">Login</h2>
        <input
          name="email"
          className="border p-2 w-full mb-3"
          placeholder="Email"
        />
        <input
          name="password"
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Password"
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
