import React, { useEffect, useState } from 'react';
import NavBar from "../components/Navbar";
import PokeCard from "../components/PokeCards";
import { Container, Grid } from '@mui/material';
import axios from 'axios';

export const Home = () => {
    const [pokemons, setPokemons] = useState([]);
    useEffect(() => {
        getPokemons()
    }, [] )
    const getPokemons = () =>{
        var endpoints = [];
        for(var i = 1; i <=50; i++){
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        };
        axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res)).catch((e) => console.log(e));
        
    }

    const pokemonFilter = (name) => {
        var filteredPokemons = [];
        if(name === ""){
            getPokemons();
        }
        for(var i in pokemons){
            if(pokemons[i].data.name.includes(name)){
                filteredPokemons.push(pokemons[i]);
            }
        }

        setPokemons(filteredPokemons);
    }

    return(
        <div>
            <NavBar filter={pokemonFilter}/>
            <Container maxWidth="xl">
                <Grid container spacing={2}>
                    {pokemons.map((pokemon, key) => (
                    <Grid item xs={3} key={key}>
                        <PokeCard name={pokemon.data.name} image={pokemon.data.sprites.front_default}/>
                    </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}
