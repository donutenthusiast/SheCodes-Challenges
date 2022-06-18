import React from "react";

export default function SynoLoop(props) {
  if (props) {
    console.log(props.synonym);
    return <li>{props.synonym}</li>;
  } else {
    return null;
  }
}
