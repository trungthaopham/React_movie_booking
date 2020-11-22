
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css';
import Header from './Components/Header';
import Home from './Pages/AdminPages/Home';
import Login from './Pages/AdminPages/Login';
import "./sass/app.scss";
import "./sass/pages/index.scss";


function App() {
  return (
    <Router>
      <div className="App" >
        <Header></Header>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/login" component={Login}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
