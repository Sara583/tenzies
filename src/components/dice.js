import React from "react";
export default function Dice(props) {
  const styles = {backgroundColor: props.Hold ? "#FFC26F" : " #dfd7bf"};
  return (
    <div className="die" onClick={props.handleClick} style={styles}>
      {props.value}
    </div>
  );
}
