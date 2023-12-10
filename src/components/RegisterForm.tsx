import { useForm, SubmitHandler } from "react-hook-form";
import { register, registerUser } from "../services/authentication";

export default function RegisterForm() {
  const { register, handleSubmit } = useForm<register>();
  const onSubmit: SubmitHandler<register> = async (data) => {
    await registerUser(data);
  };

  return (
    <>
      <form
        className="flex flex-col justify-center gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="mb-7 mt-2 text-4xl font-bold leading-5">Register</h3>
        <div className="my-0 flex w-full flex-col gap-1 text-lg font-bold">
          Email Address
          <input
            className="w-full max-w-xl border border-neutral-600 px-4 py-3 placeholder:font-light"
            placeholder="yourname@exmample.com"
            // defaultValue="colde123@gmail.com"
            {...register("email")}
          />
        </div>
        <div className="flex w-full flex-col gap-1 text-lg font-bold">
          Username
          <input
            className="w-full max-w-xl border border-neutral-600 px-4 py-3 placeholder:font-light"
            placeholder="Name yourself"
            // defaultValue="Registers New Name"
            {...register("username")}
          />
        </div>
        <div className="flex w-full flex-col gap-1 text-lg font-bold">
          Password
          <input
            className="w-full max-w-xl border border-neutral-600 px-4 py-3 placeholder:font-light"
            placeholder="Enter your password"
            // defaultValue="123"
            {...register("password", { required: true })}
          />
        </div>

        <div>
          <button
            className="my-4 w-96 max-w-xl rounded-sm bg-orange-500 py-4 font-bold text-white hover:bg-orange-600"
            type="submit"
          >
            REGISTER
          </button>
        </div>
      </form>
    </>
  );
}
