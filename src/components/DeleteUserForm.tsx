import { useForm, SubmitHandler } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { deleteUser } from "../services/authentication";

type Inputs = {
  id: string;
};

export default function DeleteUserForm() {
  const { handleSubmit } = useForm<Inputs>();
  const [id, setId] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setId(value);
  };

  const onSubmit: SubmitHandler<Inputs> = async () => {
    try {
      // console.log(id);
      await deleteUser(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="mx-3 bg-slate-300"
        // defaultValue="6548369da9cc2d151a9d130f"
        onChange={handleChange}
        value={id}
      />
      <div>
        <button
          className="m-2 rounded-md bg-red-500 p-1 hover:bg-red-600"
          type="submit"
        >
          DELETE THIS BY ID
        </button>
      </div>
    </form>
  );
}
