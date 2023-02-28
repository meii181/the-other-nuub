import React from "react";
import { Button, Container, Stack } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ArrowDownCircle } from "react-bootstrap-icons";
import Services from "./Services";
import Strategy from "./Strategy";
import CasesClients from "./Cases&Clients";
import BookMeeting from "./BookMeeting";
import Contact from "./Contact";
import Navigation from "./Navigation";
import Footer from "./Footer";
import ScrollUpButton from "./ScrollUpButton";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <ScrollUpButton />
      <Navigation />
      <section
        id="home"
        className="justify-content-center"
        style={{
          marginTop: "5rem",
          marginRight: "3rem",
        }}
      >
        <Container>
          <Row>
            <Col sm={12} md={11} lg={7}>
              <h1 className="title">
                {t("Your delivered expectations at just one click away")}
              </h1>
              <p className="subtitle">
                {t(
                  "We are an enthusiastic web team, ready to solve any kind of problems based on your needs and expectations, whether you are in need of a new website or an update."
                )}
              </p>

              <Stack
                direction="horizontal"
                gap={5}
                className="call-to-action mt-5"
              >
                <Button
                  href="/login"
                  style={{
                    fontSize: 23,
                    fontWeight: "bold",
                    backgroundColor: "#7F7EC7",
                    color: "whitesmoke",
                    borderBottom: "4px solid black",
                  }}
                  className="px-3 py-2 mt-1"
                >
                  {t("Book meeting")}
                </Button>{" "}
                <p
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: 23,
                  }}
                  className="pt-2 mt-1"
                >
                  {t("or scroll down for more")}{" "}
                  <ArrowDownCircle size={25} className="ms-2" />
                </p>
              </Stack>
            </Col>

            <Col sm={12} md={10} lg={7} className=" pt-5 mx-5">
              <div className="circle"></div>
              <div className="circle_2"></div>
              <div className="circle_3"></div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />
      <Strategy />
      <CasesClients />
      <BookMeeting />
      <Contact />
      <Footer />
      <ScrollUpButton />
    </>
  );
};

export default Home;
