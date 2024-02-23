import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

import AddModal from "../ui/AddModal";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddModal />
      </Row>
    </>
  );
}

export default Cabins;
