import React from "react";

export default function SynoLoop(props) {
  if (props) {
    return <li>{props.synonym}</li>;
  } else {
    return null;
  }
}
