"use client";

import "./components.scss";

interface Props {
  children: React.ReactNode;
}

const BrokenFrameButton = ({ children }: Props) => {
  return (
    <button className="broken-frame-button">
      <div></div>
      {children}
      <div></div>
    </button>
  );
};

export default BrokenFrameButton;
