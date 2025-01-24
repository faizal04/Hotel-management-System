import styled from "styled-components";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useState } from "react";
import useDeleteCabin from "./useDeleteCabin";

import { HiDuplicate } from "react-icons/hi";
import useCreateCabin from "./useCreateCabin";

//Styling
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;
const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;
const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;
const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [isFormOpen, setFormOpen] = useState(false);
  const { isLoading, deleteCabin } = useDeleteCabin();
  //eslint-disable-next-line
  const { createCabin, isCreating } = useCreateCabin();
  //eslint-disable-next-line
  const { name, maxCapacity, regularPrice, discount, description, image } =
    cabin;
  function handleDuplicate() {
    // console.log(cabinId);
    createCabin({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  }
  return (
    <>
      <TableRow>
        <Img src={cabin.image} />

        <Cabin>{cabin.name}</Cabin>
        <div>{cabin.maxCapacity}</div>
        <Price>{formatCurrency(cabin.regularPrice)}</Price>
        <Discount>{formatCurrency(cabin.discount)}</Discount>
        <div>
          <button onClick={handleDuplicate}>
            <HiDuplicate />
          </button>
          <button onClick={() => deleteCabin(cabin.id)} disabled={isLoading}>
            delete
          </button>
          <button onClick={() => setFormOpen(!isFormOpen)}>edit</button>
        </div>
        {isFormOpen && <CreateCabinForm cabinToEdit={cabin} />}
      </TableRow>
    </>
  );
}

CabinRow.propTypes = {
  cabin: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    regularPrice: PropTypes.number,
    maxCapacity: PropTypes.number,
    discount: PropTypes.number,
    id: PropTypes.number,
  }),
};

export default CabinRow;
