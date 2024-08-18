import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../../app/models/activities";
import { ChangeEvent, useState } from "react";

interface Probs
{
    closeForm:()=>void;
    acitvity:Activity | undefined;
    createOrEdit:(activity:Activity)=>void;
}

export function ActivityForm({createOrEdit,closeForm,acitvity:selectedActivity}:Probs)
{
    const initialState:Activity= selectedActivity ?? {
        category:"",
        city:"",
        date:"",
        description:"",
        id:"",
        title:"",
        venue:"",
    };

    const [activity,setActivity]=useState<Activity>(initialState);
    
    function handleSubmit()
    {
        createOrEdit(activity);
    }


    function handleInputChange(event:ChangeEvent<HTMLInputElement  | HTMLTextAreaElement>)
    {
        const {value,name}=event.target;

        setActivity({...activity,[name]:value})
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder="Title" name="title" value={activity.title} onChange={handleInputChange}></Form.Input>
                <Form.TextArea placeholder="Descrition" name="description" value={activity.description} onChange={handleInputChange}></Form.TextArea>
                <Form.Input placeholder="Category" name="category" value={activity.category} onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder="Date" name="date" value={activity.date} onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder="City" name="city" value={activity.city} onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder="Venue" name="venue" value={activity.venue} onChange={handleInputChange}></Form.Input>
                <Button floated="right" positive type="submit" content="Submit"/>
                <Button floated="right" type="button" content="Cancel" onClick={closeForm}/>

                
            </Form>
        </Segment>
    );
}