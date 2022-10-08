import "../config"
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import { Container, Navbar, Nav} from "react-bootstrap"

export const TopBar = () => {
    const [user, setUser] = useState({ loggedIn: null })
    useEffect(() => fcl.currentUser.subscribe(setUser), [])

    const login=(useDapper) => () => {
        if (useDapper) {
            fcl.config.put("discovery.wallet", "https://accounts.meetdapper.com/fcl/authn-restricted")
        } else {
            fcl.config.put("discovery.wallet", "https://fcl-discovery.onflow.org/authn")
        }
        fcl.logIn()
    }

    return (
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Hello FCL</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
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
                  <Nav.Link onClick={login(true)}>Login Dapper</Nav.Link>
                  <Nav.Link onClick={login(false)}>Login Other</Nav.Link>
              </Navbar.Collapse>

          }


        </Container>
      </Navbar>

    )
}