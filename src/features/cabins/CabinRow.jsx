import PropTypes from "prop-types";
import styled from "styled-components";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { formatCurrency } from "../../utils/helpers";

import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

//Styling

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
  //eslint-disable-next-line
  const { isLoading, deleteCabin } = useDeleteCabin();
  //eslint-disable-next-line
  const { createCabin, isCreating } = useCreateCabin();

  //eslint-disable-next-line
  const { id, name, maxCapacity, regularPrice, discount, description, image } =
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
      <Table.Row>
        <Img src={cabin.image} />

        <Cabin>{cabin.name}</Cabin>
        <div>{cabin.maxCapacity}</div>
        <Price>{formatCurrency(cabin.regularPrice)}</Price>
        <Discount>{formatCurrency(cabin.discount)}</Discount>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />

              <Menus.List id={id}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open opens="deletecabin">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="editwindow">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="deletecabin">
                <ConfirmDelete
                  resourceName="cabins"
                  disabled={isLoading}
                  onConfirm={() => {
                    deleteCabin(cabin.id);
                  }}
                />
              </Modal.Window>

              <Modal.Window name="editwindow">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
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
