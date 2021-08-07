import React from "react";
import "../Style/RightFeed.css";
import RightBotFeed from "./RightBotFeed";
import NavbarFeed from "./NavbarFeed";

function RightFeed() {
  return (
    <div>
      <NavbarFeed />
      <RightBotFeed />
    </div>
  );
}

export default RightFeed;
