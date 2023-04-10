import { Alert } from "antd";
import React, { Fragment, MouseEventHandler, memo } from "react";

interface Props {
    message:string;
    onClose?:MouseEventHandler;
    type:"success" | "warning";
}
export const AlertInfo = memo((props:Props) => {
    const { message, onClose, type } = props
    return (
        <Fragment>
            <Alert message={message} type={type} showIcon closable onClose={onClose} />
        </Fragment>
    )
})

AlertInfo.displayName = "AlertInfo";