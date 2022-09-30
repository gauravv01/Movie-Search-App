import React,{useCallback, useEffect, useState} from 'react';
import AddMovie from './components/AddMovie';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setmovies]= useState([]);
  const [isLoading,setisLoading]=useState(false);
  const [error,seterror]=useState(null);

 const Addmoviehandler=async (movie)=>{
  const response=await fetch('https://react-http-194fd-default-rtdb.firebaseio.com/movies.json',{
    method:'POST',
    body:JSON.stringify(movie),
    headers:{'Content-Type':'application/json'}
  });
const data=await response.json();
console.log(data);
 }

 const fetchMovieshandler=useCallback(async()=>{
  setisLoading(true);
  seterror(null);
  try{
  const response=await fetch('https://react-http-194fd-default-rtdb.firebaseio.com/movies.json');
  if(!response.ok){
    throw new Error('Something went wrong!');
  }
  const fetchedresponse=await response.json();
console.log(fetchedresponse);

const loadedmovies=[];
for(const key in fetchedresponse){
  loadedmovies.push({
    id:key,
    title:fetchedresponse[key].title,
    releaseDate:fetchedresponse[key].releaseDate,
    openingText:fetchedresponse[key].openingText,
  })
};
    setmovies(loadedmovies);
  }catch(error){
seterror(error.message);
  }
setisLoading(false);
 },[])

 useEffect(()=>{
  fetchMovieshandler();
 },[fetchMovieshandler]);



  return (
    <React.Fragment>
      <section><AddMovie onAddMovie={Addmoviehandler}/></section>
      <section>
        <button onClick={fetchMovieshandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length>0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length===0 && !error && <p>Found No Movies.</p>}
        {!isLoading && movies.length===0 && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
