import React from 'react';
import { PeopleButton } from './People';
import { FilmsButton } from './Films';
import { BrowserRouter as Router, Switch, Route, Link, useParams, HashRouter } from "react-router-dom";
import styled from "styled-components";

const Head = styled.div`
  padding-top: 20px;
  cursor: pointer;
  color: black;
  text-align: center;
  list-style-type: none;
  li: {
    display: inline;
  }
`;

const Li = styled.div`
  text-align: center;
  text-decoration: none;
  border:solid;
  display: inline;
  padding: 10px;
  margin: 300px;
`;

function App() {
  return (
    <div>
      <Router>
            <Head>
                  <ul>
                    {/* <li><Link to='/'>Home</Link></li> */}
                    <Li><Link to='/people'>Characters</Link></Li>
                    <Li><Link to='/films'>Films</Link></Li>
                  </ul>
            </Head>
            <Switch>
              {/* <Route path='/'/> */}
              <Route path='/people' component={PeopleButton}/>
              <Route path='/films' component={FilmsButton}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
