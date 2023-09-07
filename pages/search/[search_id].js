import { useRouter } from "next/router";
import SearchResults from "../../components/search-results.js"


// Dynamic routing for a search result page
function SearchNotePage( props ) {
  console.log("Inside Search Page")
    
      const router = useRouter();
      const search_id = router.query.search_id;
     
      return (
        <SearchResults search_id= {search_id}/>
        );
  
};

export default SearchNotePage;