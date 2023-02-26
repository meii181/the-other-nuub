import React from "react";
import useFormContext from "../../hooks/useFormContext";
import DateTime from "../pages/LoggedIntoSession/DateTime";
import Description from "../pages/LoggedIntoSession/Description";
import { Container } from "react-bootstrap";

const FormInput = () => {
  const { page } = useFormContext();

  const pageDisplay = {
    0: <DateTime />,
    1: <Description />,
  };

  return <Container>{pageDisplay[page]}</Container>;
};

export default FormInput;
