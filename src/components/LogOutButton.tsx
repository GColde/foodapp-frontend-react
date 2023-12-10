import { useForm } from "react-hook-form";
import { useAppDispatch } from "../app/store";
import { setSessionId } from "../Slices/loginSlice";

const LogOutButton = () => {
  const dispatch = useAppDispatch();
  const { handleSubmit } = useForm();
  const onSubmitLogOut = async () => {
    if (localStorage.getItem("SESSION-ID") != null) {
      dispatch(setSessionId(undefined));
      localStorage.removeItem("SESSION-ID");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitLogOut)}>
      <button
        className="my-4 w-96 max-w-xl rounded-sm bg-orange-500 py-4 font-bold text-white hover:bg-orange-600"
        type="submit"
      >
        LOGOUT
      </button>
    </form>
  );
};

export default LogOutButton;
