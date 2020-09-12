import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams, HashRouter } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";


const Wrapper = styled.div`
  padding: 10px;
  cursor: pointer;
  color: black;
  text-align: center;
  text-decoration: none;
  &:hover {
    background-color: skyblue;
    color: white;
  }
`;

const Info = styled.div`
  padding: 20px;
  cursor: pointer;
  color: black;
  text-align: center;
`;

const Search = styled.div`
  padding: 20px;
  cursor: pointer;
  color: black;
  text-align: center;
`;

export function People () {
    const [people, setPeople] = useState([]);
    const [search, setSearch] = useState('');
  
    useEffect(() => {
      axios.get('https://swapi.dev/api/people/')
        .then((res) => {
          console.log(res.data.results);
          setPeople(res.data.results);
        });
    }, [setPeople]);
  
    const toPerson = useCallback((person, index) => <PersonListItem name={person.name} id={index + 1} />);
  
    const filteredPeople = people.filter( character => {
      return character.name.toLowerCase().includes(search.toLowerCase())
    } ) 
  
    return (
      <Search>
        <input 
          type="text" 
          placeholder="search..." 
          onChange={ e => setSearch(e.target.value) }
        />
        <br />
        <div>{ filteredPeople.map(toPerson) }</div>
      </Search>
    );
}
  
export function PersonListItem ({name, id}) {
    return (
      <Link to={`/${id}`} key={id}>
        <Wrapper>{name}</Wrapper>
      </Link>
    );
}
  
export function Person (props) {
    const [person, setPerson] = useState();
    let { personId } = useParams();
  
    useEffect(() => {
      axios.get(`https://swapi.dev/api/people/${personId}/`)
        .then((res) => {
          console.log(res);
          setPerson(res.data);
        });
    }, [setPerson]);
  
    if (!person) {
      return <div>Loading...</div>;
    }
  
    return (
      <Info>
        <Link to="/people">Back</Link>
        <div>name: { person.name }</div>
        <div>gender: { person.gender }</div>
        <div>height: { person.height }</div>
        <div>hair: { person.hair_color }</div>
      </Info>
    );
}

export function PeopleButton() {
  return(
    <Router>
      <Switch>
        <Route path='/people' component={People}/>
        <Route path='/:personId' component={Person}/>
      </Switch>
    </Router>
  )
}