import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";


export default function NavBar() {


    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to="">
                    <img src="/assets/logo.png" alt="" style={{marginRight:'10px'}} />
                    Reactivities
                </Menu.Item>

                <Menu.Item name="Activities" as={NavLink} to="/activities" />
                <Menu.Item name="Errors" as={NavLink} to="/errors" />


                <Menu.Item>
                    <Button as={NavLink} to="/createActivity" positive content="Create Activity"></Button>
                </Menu.Item>

                
                <Menu.Item>
      
                </Menu.Item>
            </Container>
        </Menu>
    );
}

