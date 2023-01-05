import React from "react";
import { Container, Carousel } from "react-bootstrap";
import ordrupgaard from "../assets/img/ordrupgaard.jpg";
import ropox from "../assets/img/ropox.jpg";
import lyngby from "../assets/img/lyngby.jpg";
import plum from "../assets/img/plum.png";
import hjertesikker from "../assets/img/hjertesikker.jpg";
import proselection from "../assets/img/proselection.png";
import absalon from "../assets/img/absalon.jpg";

const CasesClients = () => {
  return (
    <section id="casesclients">
      <Container
        fluid
        style={{
          paddingTop: "5rem",
          backgroundColor: "#FF629A",
          width: 1577,
          height: 900,
          textAlign: "center",
          fontFamily: "primary-font",
        }}
      >
        <h1 style={{ fontSize: 55 }}>Our cases</h1>
        <Carousel
          style={{
            marginTop: "5rem",
          }}
        >
          <Carousel.Item>
            <img src={ordrupgaard} className="w-50" />
            <Carousel.Caption>
              <h2>Ordrupgaard</h2>
              <p>Webshop</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img src={ropox} className="w-50" />
            <Carousel.Caption>
              <h2>Ordrupgaard</h2>
              <p>Webshop</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img src={absalon} className="w-50" />
            <Carousel.Caption>
              <h2>Ordrupgaard</h2>
              <p>Webshop</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img src={proselection} className="w-50" />
            <Carousel.Caption>
              <h2>Ordrupgaard</h2>
              <p>Webshop</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img src={hjertesikker} className="w-50" />
            <Carousel.Caption>
              <h2>Ordrupgaard</h2>
              <p>Webshop</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img src={lyngby} className="w-25" />
            <Carousel.Caption>
              <h2>Ordrupgaard</h2>
              <p>Webshop</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img src={plum} className="w-50" />
            <Carousel.Caption>
              <h2>Ordrupgaard</h2>
              <p>Webshop</p>
            </Carousel.Caption>
          </Carousel.Item>

          {/* <Carousel.Item>
            <Carousel.Caption>
              <h2>Ordrupgaard</h2>
              <p>Webshop</p>
            </Carousel.Caption>
          </Carousel.Item> */}
        </Carousel>
      </Container>
    </section>
  );
};

export default CasesClients;
