import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityList from "./ActivityList";
import { useEffect } from "react";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import ActivityFilters from "./ActivityFilters";



export default observer(function  ActivityDashboard() {

       
    const {activityStore}=useStore();
    
    const {loadActivities,activityRegistry}=activityStore


    useEffect(() => {
        if(activityRegistry.size==0)
        {
            loadActivities() 
        }
    }, [loadActivities,activityRegistry]);
  
  
  

    if (activityStore.initialLoading) {
        return (<LoadingComponent content='loading....' ></LoadingComponent>)
      }
  
    return (
       
        <Grid>
            <Grid.Column width="10">
                <ActivityList></ActivityList>
            </Grid.Column>
            <Grid.Column width="6">
                <ActivityFilters/>
            </Grid.Column>
        </Grid>

    );
});