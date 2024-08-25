import { Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import { Fragment } from "react/jsx-runtime";



export default observer(function ActivityList() {

    const { activityStore } = useStore();

    const { groupedActivites } = activityStore;


    return (

        <>
            {groupedActivites.map(([group, activities]) => (

                <Fragment key={group}>
                    <Header sub color="teal">
                        {group}
                    </Header>
                        <Item.Group divided>
                            {activities.map((activity) =>
                                <ActivityListItem activity={activity}></ActivityListItem>
                            )}
                        </Item.Group>
                </Fragment>


            ))}

        </>


    );
});