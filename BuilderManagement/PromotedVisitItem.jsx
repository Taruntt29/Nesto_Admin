import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Property.css";
const PromotedVisitItem = (props) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState(false);
  return (
    <Row className={props.className}>
      <Col
      // as={Link}
      // to={`/builder/${props.itm._id}`}
      >
        {props.itm._id.slice(-10)}
        {/* 12345678 */}
      </Col>
      <Col>
        {props.itm.brokerId === null ? "no data Name" : props.itm.brokerId.name}
        {/* Tarun */}
      </Col>
      <Col>
        {props.itm.date}

        {/* 12/12/2023 */}
      </Col>
      <Col>
        {props.itm.visitStatus}

        {/* bought */}
      </Col>
      {/* <Col>{props.itm.visitStatus}</Col> */}

      <Col>
        {props.itm.clientName}
        {/* Sweeti */}
      </Col>

      <Col>
        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= (hover || rating) ? "on" : "off"}
                onClick={() => {
                  setRating(index);
                  // onRating();
                }}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <span className="star">&#9733; </span>
              </button>
            );
          })}
        </div>
      </Col>
    </Row>
  );
};
export default PromotedVisitItem;
