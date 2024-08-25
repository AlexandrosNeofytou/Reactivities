import { Button, Header, Segment } from "semantic-ui-react";
import { Activity } from "../../../../app/models/activities";
import {useEffect, useState } from "react";
import { useStore } from "../../../../app/stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoadingComponent } from "../../../../app/layout/LoadingComponent";
import { v4 as uuid } from 'uuid';
import { Formik,Form } from "formik";
import * as yup from "yup";
import { MyTextField } from "../../../../app/common/form/MyTextField";
import { MyTextArea } from "../../../../app/common/form/MyTextArea";
import { MySelectInput } from "../../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../../app/common/form/options/categoryOptions";
import { MyDatePicker } from "../../../../app/common/form/MyDateInput";

export function ActivityForm() {
    const { id } = useParams();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, initialLoading, loadActivity } = activityStore;
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        category: "",
        city: "",
        date: null,
        description: "",
        id: "",
        title: "",
        venue: "",
    });

    function handleFormSubmit(activity:Activity)
    {
        if(id)
        {
            updateActivity(activity).then(()=>{navigate(`/activities/${activity.id}`)});
        }
        else 
        {
            const newActivity={...activity,id:uuid()}

            createActivity(newActivity).then(()=>{navigate(`/activities/${newActivity.id}`)});
        }
    }   

    const activityValidator=yup.object({
        title:yup.string().required(), 
        city:yup.string().required(), 
        date:yup.string().required("date is required").nonNullable("date is required"), 
        description:yup.string().required(), 
        venue:yup.string().required(), 
        category:yup.string().required(), 

    });

    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => setActivity(activity));
        }
    }, [id, loadActivity])



    if (initialLoading) {
        return <LoadingComponent content="loading"></LoadingComponent>
    }

    return (
        <Segment clearing>  
            <Header content="Activity Details" sub color="teal"/>

            <Formik validationSchema={activityValidator} enableReinitialize initialValues={activity} onSubmit={value => handleFormSubmit(value)}>
                {({handleSubmit,isValid,isSubmitting,dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit}>
                        <MyTextField name="title" placeholder="title"></MyTextField>
                        <MyTextArea row={3} placeholder="Descrition" name="description" />
                        <MySelectInput options={categoryOptions} placeholder="Category" name="category" />
                        <MyDatePicker name="date" placeholderText="date" showTimeSelect timeCaption="time" dateFormat={"MMMM d, yyyy h:mm aa"}/>
                        <Header content="Location Details" sub color="teal"/>
                        <MyTextField placeholder="City" name="city" />
                        <MyTextField placeholder="Venue" name="venue" />
                        <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated="right" positive type="submit" content="Submit" />
                        <Button loading={loading} floated="right" as={Link} to={"/activities"}  type="button" content="Cancel" />
                    </Form>
                )}
            </Formik>



        </Segment>
    );
}