import React from "react";
import { Container, Row, Col } from "reactstrap";
const Selector = (props) => {
  const list = [...props.list];
  return (
    <Container>
      <Row className="justify-content-start">
        <Col md="2">
          <p>{props.children}:</p>
        </Col>
        <Col>
          <select onChange={(event) => props.onChange(event)}>
            {list.map((it) => (
              <option key={it} value={it}>
                {it}
              </option>
            ))}
          </select>
        </Col>
      </Row>
    </Container>
  );
};
export default Selector;
