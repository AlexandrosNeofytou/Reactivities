import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Grid, Image } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { LoadingComponent } from "../../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";





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
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={selectedActivity}/>
                <ActivityDetailedInfo activity={selectedActivity}/>
                <ActivityDetailedChat/>
            </Grid.Column>

            <Grid.Column width={6}>
                <ActivityDetailedSidebar/>
                
            </Grid.Column>
        </Grid>
    );
});