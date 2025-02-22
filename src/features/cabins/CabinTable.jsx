// import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
//Styling

function CabinTable() {
  const [searchparams] = useSearchParams();
  const { cabins, isLoading } = useCabins();
  if (isLoading) return <Spinner />;
  //filter
  let FilterValue = searchparams.get("discount") || "all";
  console.log(FilterValue);

  let filterCabins;
  if (FilterValue === "all") filterCabins = cabins;
  if (FilterValue === "no-discount")
    filterCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (FilterValue === "with-discount")
    filterCabins = cabins.filter((cabin) => cabin.discount > 0);

  //sortby
  const sortby = searchparams.get("sortby") || "startDate-asc";
  const [field, direction] = sortby.split("-");

  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filterCabins.sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return (aValue - bValue) * modifier; // Numeric sort
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue) * modifier; // String sort
    }
  });

  console.log(modifier, sortedCabins);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>cabin</div>
          <div>capacity</div>
          <div>price</div>
          <div>discount</div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
