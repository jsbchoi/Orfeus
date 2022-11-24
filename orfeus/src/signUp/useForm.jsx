import { useState, useCallback } from "react";

function useForm() {
  const [data, setData] = useState([
    { id: 1 , value: "" },
    { id: 2, value: "" },
    { id: 3, value: "" },
  ]);

  const updateForm = useCallback(
    ({ target }) => {
      const arr = [...data];
      const obj = arr.find(o => o.id === Number(target.name));

      obj.value = target.value;
      setData(arr);
    },
    []
  );

  return [data, updateForm];
}

export default useForm;