import React, { memo, Fragment, MouseEventHandler } from "react";
import { Button } from "antd";

type OnButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

interface Props {
    children: string;
    isDanger: boolean;
    onClick?: MouseEventHandler;
    onSubmit?:OnButtonClick;
}

export const PrimaryButton = memo((props:Props) => {
  const { children, isDanger, onClick, onSubmit } = props
  return (
    <Fragment>
      <Button type="primary" danger={isDanger} onClick={onClick} onSubmit={onSubmit} size={"large"}>
        {children}
      </Button>
    </Fragment>
  );
});

PrimaryButton.displayName = "PrimaryButton";