import React from 'react';
import { Container } from 'semantic-ui-react';
import AirQuality from './AirQuality';

function App() {
  return (
    <div>
      <h1>Air Quality Assessment</h1>
    <Container style={{ marginTop: '3rem',marginLeft:'3rem' }}>
      <AirQuality />
    </Container>
    </div>
  );
}

export default App;