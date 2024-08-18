import { useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activities';
import NavBar from './Navbar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from "uuid";


function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity,setSelectedActivity]=useState<Activity | undefined>();
  const [editMode,setEditMode]=useState(false);
  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/api/activities").then(response => {
      setActivities(response.data)
    })
  }, []);

  function handleOpenFrom(id?:string)
  {
    console.log(id);

    if(id)
    {
      hanldeSelectAcvitiy(id);

      setEditMode(true);

    }
    else 
    {
      hanldeCancelSelectAcvitiy();
    }
  }

  function handleFormClose()
  {
    setEditMode(false); 
  }

  function handleCreateOrEditActivity(activity:Activity)
  { 

    if(activity.id)
    {

      const updatedActivities = activities.map(x => x.id === activity.id ? activity : x);
      setActivities(updatedActivities);
    }
    else 
    {
      activity.id=uuid();
      setActivities([...activities, activity]);
    }

    setSelectedActivity(activity);

    setEditMode(false);
  }

  function hanldeSelectAcvitiy(id:string):void
  {
    setSelectedActivity(activities.find(x=>x.id===id));
  }

  function handleDeleteActivity(id:string)
  {
    setActivities([...activities.filter(x=>x.id!=id)])
  }

  function hanldeCancelSelectAcvitiy():void
  {
    setSelectedActivity(undefined);
  }




  return (
    <>
      <NavBar openForm={handleOpenFrom}/>

      <Container style={{marginTop:"7em"}}>
          <ActivityDashboard 
          deleteActivity={handleDeleteActivity}
          createOrEdit={handleCreateOrEditActivity}
          editMode={editMode}
          closeForm={handleFormClose}
          openForm={handleOpenFrom}
          activities={activities}  
          cancelSelectActivity={hanldeCancelSelectAcvitiy}
          selectActivity={hanldeSelectAcvitiy}
          selectedActivity={selectedActivity}
          />
      </Container>




    </>
  )
}

export default App
