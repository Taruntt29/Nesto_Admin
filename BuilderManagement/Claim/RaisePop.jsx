import { Button, Container, Form, Modal } from "react-bootstrap";
const RaisePop = (props) => {
  const onSubmitHandler = () => {
    props.onHide(false);
    props.onChange(true);
  };
  return (
    <>
      <Modal
        {...props}
        onHide={() => {
          props.onChange(false);
        }}
        size="lg"
        animation={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="builder-details_modal">
          <Modal.Title className="">
            <span className="builder-details_modal_heading">Write Answer</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container className=" dashboard__wrapper">
            <Form className="profile__form ps-2">
              <Form.Group className="mb-4" controlId="email">
                <Form.Control
                  className="rounded-0 d-flex justify-content-start"
                  as="textarea"
                  placeholder="Lorem Ipsum"
                  // value={comments}
                  // onChange={(e) => {
                  //   console.log(e.target.value);
                  //   setComments(e.target.value);
                  // }}
                  style={{
                    fontFamily: "Bahnschrift",
                    height: "241px",
                    background: "#F8F8F8",
                  }}
                />
              </Form.Group>
            </Form>
          </Container>
          <div className="builder-details_btn_div d-flex gap-2">
            <Button
              variant="transparent"
              type="button"
              className="builder-details_btn"
              onClick={onSubmitHandler}
            >
              Next
            </Button>
            <Button
              variant="transparent"
              type="button"
              className="builder-details_btn"
              //   onClick={onSubmitHandler}
            >
              Reset
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default RaisePop;
