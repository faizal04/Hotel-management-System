/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import Select from "../ui/Select";
function SortBy({ options }) {
  //eslint-disable-next-line
  const [searchparams, setsearchparams] = useSearchParams();

  let sortby = searchparams.get("sortby") || "";
  function handleChange(e) {
    searchparams.set("sortby", e.target.value);
    setsearchparams(searchparams);
  }

  return (
    <Select
      options={options}
      type="white"
      value={sortby}
      onChange={handleChange}
    />
  );
}

export default SortBy;
