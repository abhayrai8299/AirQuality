import React, { useState } from 'react';
import { Container, Form, Segment, Grid, Message } from 'semantic-ui-react';

const AirQuality = () => {
  const [airQuality1, setAirQuality1] = useState(null);
  const [airQuality2, setAirQuality2] = useState(null);

  const [cityone, setCityone] = useState('');
  const [citytwo, setCitytwo] = useState('');
 
  const [error, setError] = useState(null);



  const handlecityoneChange = (event) => {
    setCityone(event.target.value);
  };

  const handlecitytwoChange = (event) => {
    setCitytwo(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const [airQuality1, airQuality2] = await Promise.all([
        fetchAirQuality(cityone),
        fetchAirQuality(citytwo)
      ]);

      setAirQuality1(airQuality1);
      setAirQuality2(airQuality2);
      setError(null);
    } catch (error) {
      setAirQuality1(null);
      setAirQuality2(null);
      setError('error while fetching data');
    }
  };

  const fetchAirQuality = async (city) => {
    const response = await fetch(`https://api.openaq.org/v1/latest?country_id=IN&city=${city}`);
  
    const data = await response.json();
     console.log("data--->>>>>",data)
    if (data.results.length > 0) {
      return data.results[0].measurements;
    } else {
      throw new Error('Air Quality is not available');
    }
  };

  return (
    <Container>
      <Segment>
        <Form onSubmit={handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="City1"
              placeholder="Enter city name"
              value={cityone}
              onChange={handlecityoneChange}
            />
            <Form.Input
              fluid
              label="City2"
              placeholder="Enter city name"
              value={citytwo}
              onChange={handlecitytwoChange}
            />
            <Form.Button primary>
              Compare Two Cities
            </Form.Button>
          </Form.Group>
        </Form>
      </Segment>

      {error && (
        <Message negative>
          <Message.Header>{error}</Message.Header>
        </Message>
      )}

      <Grid columns={2} stackable>
        <Grid.Column>
          {airQuality1 && (
            <Segment>
              <h3>Air Quality for {cityone}</h3>
              <pre>{JSON.stringify(airQuality1, null, 2)}</pre>
            </Segment>
          )}
        </Grid.Column>

        <Grid.Column>
          {airQuality2 && (
            <Segment>
              <h3>Air Quality for {citytwo}</h3>
              <pre>{JSON.stringify(airQuality2, null, 2)}</pre>
            </Segment>
          )}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default AirQuality;