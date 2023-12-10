import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MouseEvent } from "react";
import { fetchUsers } from "../services/authentication";

type User = {
  email: string;
  username: string;
  _id: string;
};

type Usersy = {
  users: User[];
};

export const MapUsers = ({ users }: Usersy) => {
  return users.map((user: User) => (
    <>
      <div key={uuidv4()}>{user.email}</div>
      <div key={uuidv4()}>{user.username}</div>
      <div className="text-orange-600" key={uuidv4()}>
        {user._id}
      </div>
      <br />
    </>
  ));
};

const UsersDisplay = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchUsers();
      // console.log(data);
      setUsers(data);
    })();
  }, []);

  const RefreshOnClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    (async () => {
      const data = await fetchUsers();
      setUsers(data);
    })();
  };

  return (
    <>
      <h1 className="my-20 text-center text-7xl">Random</h1>
      {users ? (
        <MapUsers users={users} />
      ) : (
        <h1 className="my-20 text-center text-7xl">NESU</h1>
      )}

      <button
        onClick={RefreshOnClick}
        className="m-12 rounded border-b-4 border-red-700 bg-red-500 px-4 py-2 text-2xl font-bold text-white hover:border-red-500 hover:bg-red-400"
      >
        Refresh List
      </button>
    </>
  );
};

export default UsersDisplay;
