import React from "react";

const Selector = (props) => {
  const list = [...props.list];
  return (
    <div style={{ padding: "2px" }}>
      <p style={{ display: "inline-block" }}>{props.children}:</p>
      <select
        onChange={(event) => props.onChange(event)}
        style={{ display: "inline-block" }}
      >
        {list.map((it) => (
          <option key={it} value={it}>
            {it}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Selector;
