import React from "react";
import { Container, Row, Col, Spinner } from "reactstrap";

const Loader = () => {
  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center mt-5" lg={12}>
          <h4 className="text-primary">Data loading...</h4>
        </Col>
        <Col className="d-flex justify-content-center" lg={12}>
          <Spinner
            color="primary"
            style={{ width: "2rem", height: "2rem" }}
            children={false}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Loader;
