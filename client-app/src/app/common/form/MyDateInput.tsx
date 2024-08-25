import { useField } from "formik";
import DatePicker, { DatePickerProps } from "react-datepicker";
import { Form, Label } from "semantic-ui-react";



export function MyDatePicker(props: DatePickerProps) {
    const [field, meta, helper] = useField(props.name!);


    return (
        <Form.Field error={meta.touched && meta.error}>
            <DatePicker
                {...field}
                {...props}
                onChange={(date:any) => {
                   helper.setValue(date);

                }} 
                selected={(field.value && new Date(field.value)) || null}

            />
            {meta.touched && meta.error &&
                <Label basic color="red">{meta.error}</Label>}
        </Form.Field>
    )
}