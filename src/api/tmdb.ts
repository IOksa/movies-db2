import configuration from "../configuration";

async function get<TBody>(relativeUrl: string): Promise<TBody>{
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${configuration.apiToken}`
        }
    };

    const response = await fetch(`${configuration.apiUrl}${relativeUrl}`, options)
    const json: TBody=await response.json();
    return json;
   
}

export interface MovieDetails{
    id: number;
    title: string;
    popularity: number;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    backdrop_path?: string;

}

interface PageResponse <TResult>{
    page: number;
    results: TResult[];

}

interface Configuration{
    images:{
        base_url: string;
    }
}


export const client = {
    async GetConfiguration (){
        return get<Configuration>("/configuration");
    },
    async GetNowPlaying(): Promise<MovieDetails[]>{
        const response =  await get<PageResponse<MovieDetails>>("/movie/now_playing?language=en-US&page=1");  
        
        return response.results;  
    
    }

}