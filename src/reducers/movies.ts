import { client } from "../api/tmdb";
import { ActionWithPayload, createReducer } from "../redux/utils";
import { AppThunk } from "../store";

export interface Movie {
    id: number;
    title: string;
    popularity: number;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    image?: string;

}

interface MovieState { 
    top: Movie[],
    loading: boolean,
}

const initialState: MovieState = {
    top:[],
    loading: false
}

const moviesLoaded =(movies: Movie[])=>({
    type: "movies/loaded",
    payload: movies
})

const moviesLoading=()=>({
    type: "movies/loading"
})


export function fetchMovies(): AppThunk<Promise<void>>{
    return async (dispatch, getState)=>{
        dispatch(moviesLoading());

        const config = await client.GetConfiguration();
        const imageUrl = config.images.base_url;
        const results = await client.GetNowPlaying();
        const mappedResults: Movie[]=results.map((m)=>({
            id: m.id,
            title: m.title,
            popularity: m.popularity,
            overview: m.overview,
            poster_path: m.poster_path,
            release_date: m.release_date,
            vote_average: m.vote_average,
            vote_count: m.vote_count,
            image: m.backdrop_path ? `${imageUrl}w780${m.backdrop_path}` : undefined
        }));
        dispatch(moviesLoaded(mappedResults));

    }

}

const moviesReducer = createReducer<MovieState>(
    initialState,
    {
        "movies/loaded": (state, action: ActionWithPayload<Movie[]>)=>{
            return {
                ...state,
                top: action.payload,
                loading: false,
            };           
        },
        "movies/loading":(state, action)=>{
            return {
                ...state,
                loading: true,
            }
        }
    }
)


export default moviesReducer;


