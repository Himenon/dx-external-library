import * as React from "react";

export interface Props {
  name: string;
}

export const Component: React.FC<Props> = (props) => {
  return (
    <p>{props.name}</p>
  );
};
