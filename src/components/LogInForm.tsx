import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login, logInUser } from "../services/authentication";
import { useEffect } from "react";
import { setSessionId } from "../Slices/loginSlice";
import { useAppDispatch } from "../app/store";

export default function LogInForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm<login>();

  const onSubmit: SubmitHandler<login> = async (data) => {
    dispatch(setSessionId(await logInUser(data)));
    const logRes = await logInUser(data);
    console.log(logRes + " asdasdasd");
    if (logRes != undefined) {
      localStorage.setItem("SESSION-ID", logRes);
      dispatch(setSessionId(localStorage.getItem("SESSION-ID")));
      navigate("/");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("SESSION-ID") != null) {
      dispatch(setSessionId(localStorage.getItem("SESSION-ID")));
    }
  }, []);

  // console.log(watch("password")); // watch input value by passing the name of it

  return (
    <form
      className="flex flex-col justify-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="mb-7 mt-2 text-4xl font-bold leading-5">Log in</h3>
      <div className="my-0 flex w-full flex-col gap-1 text-lg font-bold">
        Email Address
        <input
          className="my-0 w-full max-w-xl border border-neutral-600 px-4 py-3 placeholder:font-light"
          placeholder="yourname@exmample.com"
          defaultValue="colde@gmail.com"
          {...register("email")}
        />
      </div>
      <div className="flex w-full flex-col gap-1 text-lg font-bold">
        Password
        <input
          className="w-full max-w-xl border border-neutral-600 px-4 py-3 placeholder:font-light"
          type="password"
          placeholder="Enter your password"
          defaultValue="123"
          {...register("password", { required: true })}
        />
      </div>

      <div>
        <button
          className="my-4 w-96 max-w-xl rounded-sm bg-orange-500 py-4 font-bold text-white hover:bg-orange-600"
          type="submit"
        >
          LOG IN
        </button>
      </div>
    </form>
  );
}
