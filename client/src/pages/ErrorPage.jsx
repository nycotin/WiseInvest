import { useRouteError } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import '../styles/index.css';

function ErrorPage() {
  const error = useRouteError();

  return (
    <Container id="error-page">
      <h2>Oops!</h2>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Container>
  );
}

export default ErrorPage;