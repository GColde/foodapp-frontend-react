import { Tab } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogInForm from "../components/LogInForm";
import RegisterForm from "../components/RegisterForm";
import { useEffect } from "react";
import { useAppDispatch } from "../app/store";
import { userTokenCheck } from "../services/authentication";
import { setSessionId } from "../Slices/loginSlice";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function MyTabs() {
  return (
    <>
      <div className="m-auto text-xl text-slate-900">
        <Link to="/">Main Page</Link>
      </div>
      <div className="m-auto w-full max-w-xl px-2 py-16 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-black/10 p-1">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-3 text-lg font-medium leading-5 text-neutral-600",
                  "ring-white/60 ring-offset-2 ring-offset-orange-500 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white text-neutral-950 shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-orange-400",
                )
              }
            >
              Log in
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-3 text-lg font-medium leading-5 text-neutral-600",
                  "ring-white/60 ring-offset-2 ring-offset-orange-500 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white text-neutral-950 shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-orange-400",
                )
              }
            >
              Register
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel
              className={classNames(
                "rounded-xl bg-white p-3",
                "ring-white/60 ring-offset-2 ring-offset-gray-300 focus:outline-none focus:ring-1",
              )}
            >
              <ul>
                <li className="relative flex justify-center  rounded-md p-3">
                  <div className="flex flex-col items-center justify-center ">
                    <LogInForm />
                  </div>
                </li>
              </ul>
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                "rounded-xl bg-white p-3",
                "ring-white/60 ring-offset-2 ring-offset-gray-300 focus:outline-none focus:ring-1",
              )}
            >
              <ul>
                <li className="relative flex justify-center  rounded-md p-3">
                  <div className="flex flex-col items-center justify-center ">
                    <RegisterForm />
                  </div>
                </li>
              </ul>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
}

const LogInPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await userTokenCheck();
      if (data) {
        navigate("/");
      } else {
        dispatch(setSessionId(undefined));
      }
    })();
  }, []);

  return (
    <div className="font-nunito flex flex-row">
      <div className="hidden w-1/2 md:block md:w-1/2 ">
        <img
          className="h-screen object-cover"
          src="https://images.unsplash.com/photo-1692708639789-5da0401badd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className="w-full md:w-1/2">
        <MyTabs />
      </div>
    </div>
  );
};

export default LogInPage;
