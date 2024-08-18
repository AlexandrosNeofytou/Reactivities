import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../../app/models/activities";
import { ChangeEvent, useState } from "react";
import { useStore } from "../../../../app/stores/store";

export function ActivityForm()
{
    
    const { activityStore } = useStore();
    const {selectedActivity,closeForm,createActivity,updateActivitya,loading}=activityStore;
    
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
        if(activity.id)
        {
            updateActivitya(activity);
        }
        else 
        {
            createActivity(activity);

        }
       
    }


    function handleInputChange(event:ChangeEvent<HTMLInputElement  | HTMLTextAreaElement>)
    {
        const {value,name}=event.target;

        setActivity({...activity,[name]:value})
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} >
                <Form.Input placeholder="Title" name="title" value={activity.title} onChange={handleInputChange}></Form.Input>
                <Form.TextArea placeholder="Descrition" name="description" value={activity.description} onChange={handleInputChange}></Form.TextArea>
                <Form.Input placeholder="Category" name="category" value={activity.category} onChange={handleInputChange}></Form.Input>
                <Form.Input type="date" placeholder="Date" name="date" value={activity.date} onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder="City" name="city" value={activity.city} onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder="Venue" name="venue" value={activity.venue} onChange={handleInputChange}></Form.Input>
                <Button loading={loading} floated="right" positive type="submit" content="Submit"/>
                <Button loading={loading} floated="right" type="button" content="Cancel" onClick={closeForm}/>

                
            </Form>
        </Segment>
    );
}