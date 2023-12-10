import { Link } from "react-router-dom";
import NameUpdateForm from "../components/NameUpdateForm";
import UsersDisplay from "../components/UsersDisplay";
import DeleteUserForm from "../components/DeleteUserForm";
import { userTokenCheck } from "../services/authentication";
import { useAppDispatch, useAppSelector } from "../app/store";
import { setSessionId } from "../Slices/loginSlice";
import { useEffect, useState } from "react";
import LogOutButton from "../components/LogOutButton";
import RecipesForm from "../components/RecipesForm";
import AddDynamicInput from "../components/AddDynamicInput";

type User = {
  username?: string;
};

const MainPage = () => {
  const sessionId = useAppSelector((state) => state.logIn.sessionId);
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<User>({});

  useEffect(() => {
    (async () => {
      const userData = await userTokenCheck();
      // console.log(userData);
      setUsers(userData);
      // console.log(userData);
      if (userData) {
        dispatch(setSessionId(localStorage.getItem("SESSION-ID")));
      } else {
        localStorage.removeItem("SESSION-ID");
      }
    })();
  }, []);

  return (
    <>
      <div className="text-xl text-slate-900">
        {sessionId ? (
          <div className="m-6 flex w-96 flex-col">
            <h1 className="text-center text-5xl"> {users.username}</h1>
            <LogOutButton />
          </div>
        ) : (
          <div className="m-3 flex flex-col ">
            <Link
              className=" w-fit rounded-xl p-3 text-5xl hover:bg-neutral-300"
              to="/login"
            >
              Login
            </Link>
          </div>
        )}
      </div>

      <br />
      <div className=" my-10 bg-slate-500 p-2">
        <RecipesForm />
      </div>
      <div className="text-center">
        <UsersDisplay />
        <br />
        <div className=" my-10 bg-slate-500 p-2">
          <NameUpdateForm />
        </div>
        <div className=" my-10 bg-slate-500 p-2">
          <DeleteUserForm />
        </div>
      </div>
    </>
  );
};

export default MainPage;
