import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface Props
{
    placeholder:string;
    name:string;
    label?:string;
    row:number;
}

export function MyTextArea(props:Props)
{
    const [field,meta]=useField(props.name);

    return (
        <Form.Field error={meta.touched && meta.error}>
            <label>{props.label}</label>
            <textarea {...field} {...props} />
            {meta.touched && meta.error && 
            <Label basic color="red">{meta.error}</Label>}
        </Form.Field>
    )
}