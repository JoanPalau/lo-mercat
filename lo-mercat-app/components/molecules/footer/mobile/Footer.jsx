import Link from 'next/link';

import Stack from 'react-bootstrap/Stack';
import { Button } from 'react-bootstrap';

import Styles from 'styles/components/footer.module.scss';

const sampleText = "Already have an account? ";

const LoginFooter = () => {
	return (
        <Stack as='footer' className={Styles.mobile} gap={2}>
            <Button className="log-in" size="lg">Sign up</Button>
            <p>{sampleText} <Link href="/auth/signIn">Sing in</Link></p>
        </Stack>
	);
}

export default LoginFooter;