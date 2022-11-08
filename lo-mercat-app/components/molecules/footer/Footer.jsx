import Link from 'next/link';

import Container  from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Styles from 'styles/components/footer.module.scss';

const Footer = () => {
	return (
        <Container fluid as='footer' className={Styles.web}>
            {/* Information */}
            <Row>
                <Col>
                    <h1>{"Lo Mercat"}</h1>
                </Col>
                <Col>
                    <h2>{"Platform"}</h2>
                    <nav>
                        <Link href="/terms-of-service">{"Terms of service"}</Link>
                        <Link href="/data-protection">{"Data protection"}</Link>
                    </nav>
                </Col>
                <Col>
                    <h2>{"Authors"}</h2>
                    <nav>
                        <Link href="https://github.com/CristianColavito">{"Cristian"}</Link>
                        <Link href="https://github.com/ColoDidac">{"Didac"}</Link>
                        <Link href="https://github.com/JoanPalau">{"Joan"}</Link>
                        <Link href="https://github.com/josalhor">{"Josep Mª"}</Link>
                    </nav>
                </Col>
                <Col>
                    <h2>{"Project"}</h2>
                    <nav>
                        <Link href="https://github.com/users/JoanPalau/projects/3/">{"Project Board"}</Link>
                        <Link href="https://github.com/JoanPalau/lo-mercat">{"Source Code"}</Link>
                        <Link href="https://github.com/JoanPalau/lo-mercat/wiki">{"Wiki"}</Link>
                    </nav>
                </Col>
            </Row>
            {/* Copyright row */}
            <div className={Styles.copyright}>
                {"© Copyright: lo-mercat"}
            </div>
        </Container >
	);
}

export default Footer;