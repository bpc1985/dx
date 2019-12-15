import React from 'react';
import MyTask from './components/MyTask';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={MyTask} />
        <Route exact path="/:taskId" component={MyTask} />
      </Switch>
    </React.Fragment>
  </BrowserRouter>
);

export default App;