import { useState } from "react";

export default function AddDynamicInput() {
  const [val, setVal] = useState([]);
  const handleAdd = () => {
    const abc = [...val, []];
    setVal(abc);
  };
  const handleChange = (onChangeValue, i) => {
    const inputdata = [...val];
    inputdata[i] = onChangeValue.target.value;
    setVal(inputdata);
  };
  const handleDelete = (i) => {
    const deleteVal = [...val];
    deleteVal.splice(i, 1);
    setVal(deleteVal);
  };
  console.log(val, "data-");
  return (
    <>
      <button onClick={() => handleAdd()}>Add</button>
      {val.map((data, i) => {
        return (
          <div>
            <input
              className="bg-slate-500 text-white"
              value={data}
              onChange={(e) => handleChange(e, i)}
            />
            <button onClick={() => handleDelete(i)}>x</button>
          </div>
        );
      })}
    </>
  );
}
