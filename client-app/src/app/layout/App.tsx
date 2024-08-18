import { useEffect } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import NavBar from './Navbar';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { LoadingComponent } from './LoadingComponent';


function App() {

  const {activityStore}=useStore();
 


  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);



  if (activityStore.initialLoading) {
    return (<LoadingComponent content='loading....' ></LoadingComponent>)
  }

  return (
    <>
      <NavBar/>
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
     
        />
      </Container>




    </>
  )
}

export default observer(App);
