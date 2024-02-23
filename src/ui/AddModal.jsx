import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "./Button";
import Modal from "./Modal";

function AddModal() {
  return (
    <div>
      <Modal>
        <Modal.Open opens={"cabin-form"}>
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name={"cabin-form"}>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddModal;
