import { useState } from "react";
import Button from "../../ui/Button";
// import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function ModalCabin() {
  const [isopen, setisopen] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          setisopen(!isopen);
        }}
      >
        Add Cabin
      </Button>
      {isopen && (
        <Modal close={setisopen}>
          <CreateCabinForm closeModal={() => setisopen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default ModalCabin;
