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

export function Films () {
    const [films, setFilms] = useState([]);
  
    useEffect(() => {
      axios.get('https://swapi.dev/api/films/')
        .then((res) => {
          console.log(res.data.results);
          setFilms(res.data.results);
        });
    }, [setFilms]);
  
    const toFilm = useCallback((film, index) => <FilmListItem film={film.title} idf={index + 1} />);
  
    return (
      <div>{ films.map(toFilm) }</div>
    );
  }
  
  function FilmListItem ({film, idf}) {
    return (
      <Link to={`/${idf}`} key={idf}>
        <Wrapper>{film}</Wrapper>
      </Link>
    );
  }
  
  export function Film (props) {
    const [film, setFilm] = useState();
    let { filmId } = useParams();
  
    useEffect(() => {
      axios.get(`https://swapi.dev/api/films/${filmId}/`)
        .then((res) => {
          console.log(res);
          setFilm(res.data);
        });
    }, [setFilm]);
  
    if (!film) {
      return <div>Loading...!</div>;
    }
  
    return (
      <Info>
        <Link to="/films">Back</Link>
        <div>title: { film.title }</div>
        <div>episode_id: { film.episode_id }</div>
        <div>opening_crawl: { film.opening_crawl }</div>
        <div>director: { film.director }</div>
      </Info>
    );
  }

  export function FilmsButton() {
    return(
      <Router>
        <Switch>
          <Route path='/films' component={Films}/>
          <Route path='/:filmId' component={Film}/>
        </Switch>
      </Router>
    )
  }