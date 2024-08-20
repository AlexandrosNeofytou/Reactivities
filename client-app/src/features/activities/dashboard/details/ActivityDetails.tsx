import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { LoadingComponent } from "../../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";





export default observer(function ActivityDetails() {

    const {activityStore } = useStore();
    const {selectedActivity,initialLoading,loadActivity}=activityStore;
    const {id}=useParams();

    useEffect(()=>{

        if(id) {loadActivity(id);}

    },[id,loadActivity]);

    if(initialLoading || !selectedActivity)
    {
        return <LoadingComponent content="loading"></LoadingComponent>
    }

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${selectedActivity?.category}.jpg`} wrapped ui={false} />
            <CardContent>
                <CardHeader>{selectedActivity?.title}</CardHeader>
                <CardMeta>
                    <span className='date'>{selectedActivity?.date}</span>
                </CardMeta>
                <CardDescription>
                    {selectedActivity?.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <Button.Group widths={2}>
                    <Button  as={Link} to={`/manage/${id}`} color="blue" content="Edit"></Button>
                    <Button as={Link} to={`/activities`} color="grey" content="Cancel"></Button>

                </Button.Group>
            </CardContent>
        </Card>
    );
});