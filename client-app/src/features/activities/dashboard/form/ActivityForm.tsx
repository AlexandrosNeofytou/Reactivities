import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../../app/models/activities";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../../app/stores/store";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingComponent } from "../../../../app/layout/LoadingComponent";
import {v4 as uuid} from 'uuid';

export function ActivityForm() {
    const { id } = useParams();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, initialLoading,loadActivity } = activityStore;
    const navigate=useNavigate();

    const [activity, setActivity] = useState<Activity>({
        category: "",
        city: "",
        date: "",
        description: "",
        id: "",
        title: "",
        venue: "",
    });

    useEffect(()=>{
        if(id) 
        {
            loadActivity(id).then(activity=>setActivity(activity));
        }
    },[id,loadActivity])

    function handleSubmit() {

        if (id) {
            updateActivity(activity).then(()=>navigate(`/activities/${activity.id}`));
        }
        else {
            activity.id=uuid();

            createActivity(activity).then(()=>navigate(`/activities/${activity.id}`));;

        }

    }


    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { value, name } = event.target;

        setActivity({ ...activity, [name]: value })
    }

    if (initialLoading) {
        return <LoadingComponent content="loading"></LoadingComponent>
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} >
                <Form.Input placeholder="Title" name="title" value={activity.title} onChange={handleInputChange}></Form.Input>
                <Form.TextArea placeholder="Descrition" name="description" value={activity.description} onChange={handleInputChange}></Form.TextArea>
                <Form.Input placeholder="Category" name="category" value={activity.category} onChange={handleInputChange}></Form.Input>
                <Form.Input type="date" placeholder="Date" name="date" value={activity.date} onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder="City" name="city" value={activity.city} onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder="Venue" name="venue" value={activity.venue} onChange={handleInputChange}></Form.Input>
                <Button loading={loading} floated="right" positive type="submit" content="Submit" />
                <Button loading={loading} floated="right" type="button" content="Cancel" />


            </Form>
        </Segment>
    );
}