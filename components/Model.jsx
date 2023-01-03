import { useState } from "react";
import { Button, Container } from "@mui/material";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "20%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "40%",
  },
};

function Model() {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  return (
    <Container maxWidth="sm">
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setEditModalIsOpen(true);
        }}
      >
        モーダル開く
      </Button>
      <Modal isOpen={editModalIsOpen} style={customStyles}>
        <div>
        <button type="button" className="">
          Male
        </button>
        <button type="button" className="">
          Female
        </button>
        </div>
      </Modal>
    </Container>
  );
}

export default Model;