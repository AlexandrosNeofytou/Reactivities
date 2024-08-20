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

                <Menu.Item>
                    <Button as={NavLink} to="/createActivity" positive content="Create Activity"></Button>
                </Menu.Item>
            </Container>
        </Menu>
    );
}

