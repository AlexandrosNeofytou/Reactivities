import { useField } from "formik";
import { Form, Label, Select } from "semantic-ui-react";

interface Props
{
    placeholder:string;
    name:string;
    label?:string;
    options:{text:string; value:string}[];
}

export function MySelectInput(props:Props)
{
    const [field,meta,helper]=useField(props.name);

    return (
    
        <Form.Field error={meta.touched && meta.error}>
            <label>{props.label}</label>
            <Select options={props.options} 
                clearable

                value={field.value || null}
                onChange={(_,d)=>{helper.setValue(d.value)}}
                onBlur={()=>helper.setTouched(true)}
                placeholder={props.placeholder}
            >


            </Select>
            {meta.touched && meta.error && 
            <Label basic color="red">{meta.error}</Label>}
        </Form.Field>
    )
}