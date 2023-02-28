import React, { useEffect, useState } from "react";
import { Nav, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const LanguageBar = () => {
  const { i18n } = useTranslation();
  const [state, setState] = useState(false);

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
    setState(!state);
  };

  useEffect(() => {
    const lang = localStorage.getItem("input");
    if (lang) {
      setState(JSON.parse(lang));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("input", JSON.stringify(state));
  });

  return (
    <Nav className="language ms-2 me-3">
      {state ? (
        <Button
          className="me-3 px-4 py-2"
          style={{ fontSize: 22 }}
          variant="info"
          active
          onClick={() => handleChangeLanguage("da")}
        >
          {" "}
          DA{" "}
        </Button>
      ) : (
        <Button
          className="me-3 px-4 py-2"
          style={{ fontSize: 22 }}
          variant="info"
          disabled
          onClick={() => handleChangeLanguage("da")}
        >
          {" "}
          DA{" "}
        </Button>
      )}
      {state ? (
        <Button
          className="me-4 px-4 py-2"
          style={{ fontSize: 22 }}
          variant="info"
          disabled
          onClick={() => handleChangeLanguage("en")}
        >
          {" "}
          EN{" "}
        </Button>
      ) : (
        <Button
          className="me-4 px-4 py-2"
          style={{ fontSize: 22 }}
          variant="info"
          active
          onClick={() => handleChangeLanguage("en")}
        >
          {" "}
          EN{" "}
        </Button>
      )}
    </Nav>
  );
};

export default LanguageBar;
