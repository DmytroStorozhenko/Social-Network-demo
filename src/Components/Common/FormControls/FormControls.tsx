import React, {FC} from 'react'
import classes from './FormControls.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form"
import {FieldValidatorType} from "../../../Utils/Validators"

type FormControlType = {
    meta: WrappedFieldMetaProps
}
export type GetStringKeys<T> = Extract<keyof T, string>

const FormControl: FC<FormControlType> = ({meta: {touched, error}, children}) => {

    const hasError = touched && error

    return (
        <div className={classes.formControl + ' ' + (hasError ? classes.error : '')}>
            <div>
                {children}
            </div>
            <div>
                {hasError && <span>{error}</span>}
            </div>
        </div>
    )
}

export const Textarea: FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input: FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>

}

export function createField<FormKeysType extends string> (
    placeholder: string | undefined,
    name: FormKeysType,
    component: FC<WrappedFieldProps>,
    validators: Array<FieldValidatorType>,
    props = {},
    text = '') {
    return (
        <div>
            <Field placeholder={placeholder}
                   name={name}
                   component={component}
                   validate={validators}
                   {...props}/> {text}
        </div>
    );
}
