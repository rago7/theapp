import React from "react";
import TitleBar from "./components/TitleBar";
import LeftSide from "./components/LeftSide";
import Middle from "./components/Middle";
import RightSide from "./components/RightSide";
import "./App.css";

const App = () => {
  return (
    <div>
      <TitleBar />
      <div className="content">
        <div className="left-side">
          <LeftSide />
        </div>
        <div className="middle">
          <Middle />
        </div>
        <div className="right-side">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default App;
