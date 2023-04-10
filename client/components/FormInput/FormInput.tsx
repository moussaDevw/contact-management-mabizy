import { Input } from "antd";
import React, { ChangeEventHandler, Fragment, memo } from "react";
import styles from "./styles.module.css";

interface Props {
    placeholder: string;
    type:string;
    onChange:ChangeEventHandler;
    prefix?: JSX.Element;
    value:string | number;
}

export const FormInput = memo((props:Props) => {
    const { placeholder, type, onChange, prefix, value } = props
    return (
        <Fragment>
            <Input className={styles.btn} type={type} value={value} size="large" placeholder={placeholder} onChange={onChange} prefix={prefix} />
        </Fragment>
    )
})

FormInput.displayName = "FormInput";