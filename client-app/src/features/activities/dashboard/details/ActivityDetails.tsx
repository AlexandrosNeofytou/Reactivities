import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";





export default function ActivityDetails() {

    const { activityStore } = useStore();
    const {selectedActivity,openForm,cancelSelectedActivity}=activityStore;

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
                    <Button onClick={() => openForm(selectedActivity?.id)} color="blue" content="Edit"></Button>
                    <Button onClick={cancelSelectedActivity} color="grey" content="Cancel"></Button>

                </Button.Group>
            </CardContent>
        </Card>
    );
}