import React, { useEffect } from "react";
import "./Landing.css";
import "animate.css";
const Landing = () => {
  const [showSubheadingElement, setShowSubheadingElement] =
    React.useState(false);
  const [showButtonElement, setShowButtonElement] = React.useState(false);
  useEffect(() => {
    setTimeout(function () {
      setShowSubheadingElement(true);
    }, 2500);
    setTimeout(function () {
      setShowButtonElement(true);
    }, 3500);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          color: "#49fb35",
          alignSelf: "center",
          fontSize: "6rem",
          paddingTop: "15%",
          fontWeight: "15%",
          animation: "backInLeft",
          animationDuration: "2s",
        }}
      >
        xNFT Launchpad
      </div>
      {showSubheadingElement ? (
        <div
          style={{
            color: "rgb(255 130 0)",
            opacity: "1.5",
            alignSelf: "center",
            fontSize: "1.5rem",
            paddingTop: "2.5%",
            animation: "bounceInLeft",
            animationDuration: "1s",
          }}
        >
          🚀 One place to launch your NFTs in multiple chains! 🚀
        </div>
      ) : (
        <div> </div>
      )}
      {showButtonElement ? (
        <>
          <button
            style={{
              marginTop: "2.5%",
              position: "relative",
              alignSelf: "center",
              width: "15%",
              borderWidth: "1px",
              borderStyle: "solid",
              borderRadius: "5px",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              fontSize: "1.25rem",
              color: "white",
              fontWeight: "700",
              backgroundImage:
                "linear-gradient(to right top, #ff6e11, #fc8300, #f79700, #f2a900, #ebba12)",
              cursor: "pointer",
              animation: "fadeIn",
              animationDuration: "2s",
            }}
            onMouseEnter={(event) => {
              event.target.style.borderWidth = "2px";
              event.target.style.borderColor = "white";
              event.target.style.backgroundImage =
                "linear-gradient(to right top, #ffb311, #fc9f06, #f78a05, #f2760b, #eb6012)";
            }}
            onMouseLeave={(event) => {
              event.target.style.borderWidth = "1px";
              event.target.style.borderColor = "black";
              event.target.style.backgroundImage =
                "linear-gradient(to right top, #ff6e11, #fc8300, #f79700, #f2a900, #ebba12)";
            }}
          >
            {" "}
            <a href="/form" style={{ color: "white", textDecoration: "none" }}>
              Launch App
            </a>
          </button>

          <button
            style={{
              marginTop: "2.5%",
              position: "relative",
              alignSelf: "center",
              width: "15%",
              borderWidth: "1px",
              borderStyle: "solid",
              borderRadius: "5px",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              fontSize: "1.25rem",
              color: "white",
              fontWeight: "700",
              backgroundImage:
                "linear-gradient(to right top, #ff6e11, #fc8300, #f79700, #f2a900, #ebba12)",
              cursor: "pointer",
              animation: "fadeIn",
              animationDuration: "2s",
            }}
            onMouseEnter={(event) => {
              event.target.style.borderWidth = "2px";
              event.target.style.borderColor = "white";
              event.target.style.backgroundImage =
                "linear-gradient(to right top, #ffb311, #fc9f06, #f78a05, #f2760b, #eb6012)";
            }}
            onMouseLeave={(event) => {
              event.target.style.borderWidth = "1px";
              event.target.style.borderColor = "black";
              event.target.style.backgroundImage =
                "linear-gradient(to right top, #ff6e11, #fc8300, #f79700, #f2a900, #ebba12)";
            }}
          >
            {" "}
            <a href="/explore" style={{ color: "white", textDecoration: "none" }}>
              Explore App
            </a>
          </button>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Landing;
