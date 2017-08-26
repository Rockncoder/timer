import React from 'react';
import {PropTypes} from 'prop-types';
import {
  Container,
  Button, ButtonGroup, Card, CardBlock, CardTitle,
} from 'reactstrap';


export const Timer = ({start, stop, reset, time, status}) => (
  <Container>
    <div>
      <Card>
        <CardBlock>
          <CardTitle>
            {time} ({status})
          </CardTitle>
          <ButtonGroup>
            <Button
              disabled={status === 'Running'}
              onClick={() => reset()}
            >
              Reset
            </Button>
            <Button
              disabled={status === 'Running'}
              onClick={() => start()}
            >
              Start
            </Button>
            <Button
              disabled={status === 'Stopped'}
              onClick={stop}
            >
              Stop
            </Button>
          </ButtonGroup>
        </CardBlock>
      </Card>
    </div>
  </Container>
);

Timer.propTypes = {
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};