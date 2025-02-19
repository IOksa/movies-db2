import { useEffect } from "react";
import {connect} from "react-redux"
import {Movie, fetchMovies} from "../../reducers/movies";
import { RootState } from "../../store";
import MovieCard from "./MovieCard";
import { useAppDispatch } from "../../hooks";
import { Container, Grid, LinearProgress, Typography } from "@mui/material";

interface MoviesProps{
    movies: Movie[];
    loading: boolean;
}

function Movies({movies, loading}:MoviesProps){
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchMovies());

    }, [dispatch]);

    return (
        <Container sx={{py:8}} maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>Now playing</Typography>
                {loading ? (<LinearProgress color="secondary"/>) : (
                <Grid container spacing={4}>
                    {movies.map(m=>( 
                    <Grid item key={m.id} xs={12} sm={6} md={4}>         
                        <MovieCard 
                            key={m.id} 
                            id={m.id} 
                            title={m.title} 
                            popularity={m.popularity} 
                            overview={m.overview}
                            poster_path={m.poster_path}
                            release_date={m.release_date}
                            vote_average={m.vote_average}
                            vote_count={m.vote_count}
                            image={m.image}
                            />
                    </Grid>   
                    ))}
                </Grid>
            )}
        </Container>
    )
}

const mapStateToProps = (state: RootState)=>({
    movies: state.movies.top,
    loading: state.movies.loading
})

const connector = connect(mapStateToProps);

export default connector(Movies);