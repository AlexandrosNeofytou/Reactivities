import { Message } from "semantic-ui-react";

interface Props
{
    errors:string[];
}

export default function ValidationError({errors} :Props)
{
    return (

        <Message error>
            {errors && (
                <Message.List>
                    {errors.map(message=>(<Message.Item>{message}</Message.Item>))}
                </Message.List>   
            )
            
            
            }
        </Message>
    );
}