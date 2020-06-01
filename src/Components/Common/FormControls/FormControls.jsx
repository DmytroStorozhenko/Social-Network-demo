import React from 'react';
import classes from './FormControls.module.css'
import {Field} from "redux-form";

const FormControl = ({element, input, meta: {touched, error}, ...props}) => {

    const hasError = touched && error;

    return (
        <div className={classes.formControl + ' ' + (hasError ? classes.error : '')}>
            <div>
                {React.createElement(`${element}`, {...input, ...props})}
            </div>
            <div>
                {hasError && <span>{error}</span>}
            </div>
        </div>
    )
}

export const Textarea = (props) => {
    return <FormControl element={'textarea'} {...props}/>
}

export const Input = (props) => {
    return <FormControl element={'input'} {...props}/>

}

export const createField = (placeholder, name, component, validate, props = {}, text = '') =>
    (
        <div>
            <Field placeholder={placeholder}
                   name={name}
                   component={component}
                   validate={validate}
                   {...props}/> {text}
        </div>
    )


/*const FormControl = ({input, meta, children, ...props}) => {

    const hasError = meta.touched && meta.error;

    return (
        <div className={classes.formControl + ' ' + (hasError ? classes.error : '')}>
            <div>
                {props.children}
            </div>
            <div>
                {hasError &&  <span>{meta.error}</span>}
            </div>
        </div>
    )
}

export const Textaarea = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>

}*/
