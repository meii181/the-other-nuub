import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ArrowUp } from "react-bootstrap-icons";

const ScrollUpButton = () => {
  const [scrollUp, setScrollUp] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 1300) {
        setScrollUp(true);
      } else {
        setScrollUp(false);
      }
    });
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="App">
      {scrollUp && (
        <Button
          style={{
            position: "fixed",
            right: 25,
            top: 630,
            padding: "1rem",
            width: 90,
            height: 90,
            backgroundColor: "#97E8F6",
            borderTop: "4px solid black",
          }}
          onClick={scrollTop}
        >
          <ArrowUp
            size={35}
            className="text-dark"
            style={{
              marginTop: "0.5rem",
            }}
          ></ArrowUp>
        </Button>
      )}
    </div>
  );
};

export default ScrollUpButton;
