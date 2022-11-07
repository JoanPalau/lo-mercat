import { useSession } from 'next-auth/react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { signOut } from "next-auth/react"

function LogOut(status){
  if(status == "authenticated"){
    return <Nav.Link href="/auth/logout" onClick={()=>signOut({ callbackUrl: 'http://localhost:3000/' })}>Log Out</Nav.Link>
  }
}
function BarraNavegacio(props) {
  const { status, data:session } = useSession();
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Lo Mercat</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Registrat</Nav.Link>
            <Nav.Link href="/auth/signin">Inicia Sessio</Nav.Link>
            <NavDropdown title="Seccions" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Mercats</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Usuari</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Administració
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {LogOut(status)}
          </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BarraNavegacio;