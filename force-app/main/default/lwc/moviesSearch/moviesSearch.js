import { LightningElement } from 'lwc';
const DELAY = 300;
export default class MoviesSearch extends LightningElement {

    selectedValue ="";
    searchItem = "";
    loading = false;
    selectPageno = "1";
    delayTimeout;
    searchResult =[];
    selectedMovie="";

    get typeoptions() {
        return [
            { label: "None", value: ""},
            { label: "Movie", value: "movie" },
            { label: "Series", value: "series" },
            { label: "Episode", value: "episode" },
        ];
    }

    handleChange(event) {

        let {name, value} = event.target;
        this.loading = true;
        if(name === "type"){
            this.selectedValue = value; 
        }else if(name === "search"){
            this.searchItem = value; 
        }else if(name === "pageno"){
            this.selectPageno = value; 
        }
        clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(() => { 
            this.searchMovie();
        }, DELAY);
      
    }

   async searchMovie(){

    const url = `https://www.omdbapi.com/?s=${this.searchItem}&type=${this.selectedValue}&page=${this.selectPageno}&apikey=14a83144`;
       const res =  await fetch(url)
        const data = await res.json();
        this.loading = false;

        if(data.Response === "True"){
            this.searchResult= data.Search;
        }
    }

    get displaySearchResult(){
        return this.searchResult.length > 0 ? true : false;
    }

    movieSelectedHandler(event){
        this.selectedMovie = event.detail; 
    }
}