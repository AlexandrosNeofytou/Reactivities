import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activities";
import { ActivityList } from "./ActivityList";
import ActivityDetails from "./details/ActivityDetails";
import { ActivityForm } from "./form/ActivityForm";

export interface Probs {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    openForm: (id?: string) => void;
    closeForm: () => void;
    editMode:boolean;
    createOrEdit:(activity:Activity)=>void;
    deleteActivity:(id:string)=>void;

}


export function ActivityDashboard({
    activities,
    createOrEdit,
    selectedActivity,
    cancelSelectActivity,
    selectActivity,
    openForm,
    closeForm,
    editMode,
    deleteActivity
}: Probs) {
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList deleteActivity={deleteActivity} selectActivity={selectActivity} activities={activities}></ActivityList>
            </Grid.Column>
            <Grid.Column width="6">
                {
                    selectedActivity && !editMode &&
                    <ActivityDetails
                        openForm={openForm}
                        cancelSelectActivity={cancelSelectActivity}
                        activity={selectedActivity}>
                    </ActivityDetails>
                }
                { editMode && <ActivityForm createOrEdit={createOrEdit} acitvity={selectedActivity} closeForm={closeForm}></ActivityForm>}
            </Grid.Column>
        </Grid>

    );
}