// import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import styled from "styled-components";
import SortBy from "../../ui/SortBy";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter
        filterKey="discount"
        options={[
          {
            value: "all",
            label: "All",
          },
          {
            value: "no-discount",
            label: "No Discount",
          },
          {
            value: "with-discount",
            label: "With Discount",
          },
        ]}
      />

      <SortBy
        options={[
          {
            value: "name-asc",
            label: "Sort By Name (A to Z)",
          },
          {
            value: "name-desc",
            label: "Sort By Name (Z to A)",
          },
          {
            value: "regularPrice-asc",
            label: "Sort By Price (Low first)",
          },
          {
            value: "regularPrice-desc",
            label: "Sort By Price (high first)",
          },
          {
            value: "maxCapacity-asc",
            label: "Sort By Capacity (Low first)",
          },
          {
            value: "maxCapacity-desc",
            label: "Sort By Capacity (High first)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperation;
