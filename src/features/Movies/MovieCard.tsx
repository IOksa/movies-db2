import {Link as RouterLink} from "react-router-dom";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

interface MovieCardProps{
    id: number,
    title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    image?: string;
}

const MovieCard =({id, title, overview, popularity,  release_date, vote_average, vote_count, image = "/movie-thumb.png"}: MovieCardProps)=>{

    return(
        <Card sx={{height: "100%", display: "flex", flexDirection: "column"}}>
            <CardMedia component="div" image={image} sx={{pt: "56.25%"}}/>
              <CardContent sx={{flexGrow: 1}}>
                <Typography variant="h5" gutterBottom>{title}</Typography>
                <Typography variant="button" display="block" mt={2}>{popularity}</Typography>
                <Typography variant="body2" color="text.secondary">{overview}</Typography>
                <Typography variant="h6" gutterBottom>{release_date} </Typography>
                <Typography variant="h6" gutterBottom>{vote_average} </Typography>
                <Typography variant="h6" gutterBottom>{vote_count} </Typography>
            </CardContent>
            <CardActions>
                <Button component={RouterLink} to={`/movies/${id}`} color="secondary">
                    Details
                </Button>
            </CardActions>
        </Card>
        
        );

}

export default MovieCard;