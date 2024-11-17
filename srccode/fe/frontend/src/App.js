import React from "react";
import TitleBar from "./components/TitleBar";
import LeftSide from "./components/LeftSide";
import Middle from "./components/Middle";
import RightSide from "./components/RightSide";

const App = () => {
  return (
    <div>
      <TitleBar />
      <div className="d-flex">
        <div className="col-2"><LeftSide /></div>
        <div className="col-8"><Middle /></div>
        <div className="col-2"><RightSide /></div>
      </div>
    </div>
  );
};

export default App;
