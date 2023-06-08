import { useState } from "react";
import { IListItem } from "../components/UI/select/Select";

export function useSelect(defaultValue : IListItem) {
  const [selected, setSelected] = useState(defaultValue || {})

  function handleSelect(option: IListItem) {
    setSelected(option)
  }

  return { selected, handleSelect }
}
