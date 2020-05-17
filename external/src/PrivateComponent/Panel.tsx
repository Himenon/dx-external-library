import * as React from "react";

export interface Props {
  title: string;
}

export const Component: React.FC<Props> = (props) => {
  return (
    <p>{props.title}</p>
  );
};
