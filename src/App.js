import {useEffect , useState} from 'react';
import MovieCard from './MovieCard';

import './App.css'
import SearchItem from './search.svg';





const App =() =>{
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    const searchMovies = async (title) =>{
        const response = await fetch(`https://www.omdbapi.com?apikey=${process.env.REACT_APP_SECRET_NAME}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('superman')
    }, []);

    return(
        <div className='app' >
            <h1>MovieLand</h1>

            <div className='search'>
                <input
                placeholder='Search for movies'
                value={searchTerm}
                onChange={(e)=> {setSearchTerm(e.target.value)
                    searchMovies(e.target.value);
                }}
                />
                <img
                    src={SearchItem}
                    alt='Search'
                    onClick={()=>searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length>0
                ? (
                    <div className='container'>
                        {movies.map((movie)=> (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                ):
                (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )
            }

        </div>
    );
}

export default App
