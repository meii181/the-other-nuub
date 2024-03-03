import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const AccountConfirmed = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [validToken, setValidToken] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { t } = useTranslation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get("token");

    axios
      .get(`https://the-other-nuub-backend-583b88d181b4.herokuapp.com/confirm_account.php?token=${token}`)
      .then((response) => {
        if (response.data) {
          setValidToken(true);
        } else {
          setErrorMessage(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate, validToken, search]);

  return (
    <>
      <Container>
        <Row>
          <Col sm={5} md={10} xl={12}>
            {errorMessage && <p>{errorMessage}</p>}
            <div
              className="d-flex align-items-center flex-column p-5"
              style={{ textAlign: "center", marginTop: "12rem" }}
            >
              <h1 className="mb-4" style={{ fontSize: 50 }}>
                {t("Thank you!")}
              </h1>
              <p style={{ fontSize: 30, width: "90%" }}>
                {t(
                  "Your account has been successfully verified and now you can book a meeting with us."
                )}
              </p>
              {validToken ? (
                <Button
                  href="/login"
                  className="mt-4 px-4"
                  style={{
                    fontSize: 30,
                    fontFamily: "primary-font",
                    borderBottom: "4px solid black",
                    borderRadius: 20,
                    backgroundColor: "#7F7EC7",
                  }}
                >
                  {t("Go to login")}
                </Button>
              ) : (
                <p>{t("Please wait...")}</p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AccountConfirmed;
