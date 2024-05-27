import React from "react"

interface InputBoxProps {
    placeholder : string;
    labelText : string; 
    value : string;
    type : string;
    onChange : (event : React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputBox({placeholder,labelText,value,type,onChange} : InputBoxProps) {
    return (
        <div>
            <label>{labelText}</label>
            <input placeholder={placeholder} type={type} value={value} onChange={onChange} ></input>
        </div>
    )
}