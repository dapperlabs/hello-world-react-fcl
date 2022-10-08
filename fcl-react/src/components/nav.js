import "../config"
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import { Container, Navbar, Nav} from "react-bootstrap"

export const TopBar = () => {
    const [user, setUser] = useState({ loggedIn: null })
    useEffect(() => fcl.currentUser.subscribe(setUser), [])

    return (
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Hello FCL</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          {/* <Nav.Link href="/ufc">UFC</Nav.Link> */}
          {/* <Nav.Link href="/nfl">NFL</Nav.Link> */}
          {/*<Nav.Link href="/nba">TopShot</Nav.Link>*/}
          {/*<Nav.Link href="/vanilla">VanillaAsh</Nav.Link>*/}
          {/* <Nav.Link href="/vanillaTS">TSToAsh1</Nav.Link> */}
          {/*<Nav.Link href="/faq">FAQ</Nav.Link>*/}
          <Nav.Link href="/hello">Hello</Nav.Link>


          </Navbar.Collapse>
          {
            user.loggedIn
              ?
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>Address: {user?.addr ?? "No Address"}</Navbar.Text>
                <Nav.Link onClick={fcl.unauthenticate}>LogOut</Nav.Link>

              </Navbar.Collapse>
              :
              <Navbar.Collapse className="justify-content-end">
                <Nav.Link onClick={fcl.logIn}>Login</Nav.Link>
                <Nav.Link onClick={fcl.signUp}>SignUp</Nav.Link>

              </Navbar.Collapse>

          }


        </Container>
      </Navbar>

    )
}