import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { ChangeEvent, useState } from "react";

const URL_LOGIN = "http://localhost:8080/users/";

type Inputs = {
  id: string;
  username: string;
};

export default function NameUpdateForm() {
  const { register, handleSubmit } = useForm<Inputs>();
  const [id, setId] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setId(value);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const resp = await axios.patch(`${URL_LOGIN}${id}`, data);
      console.log(resp.data);
      console.log(`${URL_LOGIN}${id}`);
    } catch (error) {
      console.log(error);
    }

    console.log(data);
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="mx-3 bg-slate-300"
        // defaultValue="6548369da9cc2d151a9d130f"
        onChange={handleChange}
        value={id}
      />
      <input
        className="bg-slate-300"
        defaultValue="I am new name"
        {...register("username", { required: true })}
      />
      <div>
        <button
          className="rounded-md bg-red-500 hover:bg-red-600"
          type="submit"
        >
          CHANGE NAME
        </button>
      </div>
    </form>
  );
}
