import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

export const CommentPopup = ({ openModal, handleModal, addComments }) => {
  const [Comment, setComment] = useState("");
  const handleCloseModal = () => {
    handleModal();
  };
  const handleComment = (e) => {
    let comment = e.target.value;
    setComment(comment);
  };

  const handleAddComments = (e) => {
    e.preventDefault();
    addComments(Comment);
    handleCloseModal();
  };

  return (
    <>
      <Modal show={openModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddComments}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                onChange={handleComment}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Comment
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
