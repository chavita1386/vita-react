import * as React from "react";
import "./Badge.scss";

interface Props {
  type?: string;
  label: string;
}
const Badge: React.FC<Props> = (props) => {
  const { type = "primary", label } = props;
  return (
    <div className={`badge badge--${type ? type : "primary"}`}>{label}</div>
  );
};

export default Badge;
