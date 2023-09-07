
import Note from './note'
import { Fragment } from 'react';
import DefaultLayout from "@/layouts/default-loggedin";
import Search  from './search'
import useSWR from 'swr'


// This component is to compile the search results and generate the view for the user
function SearchResults(props) {
    const {search_id} = props;
    const requestUrl = 'http://localhost:5000/search/'+search_id;

        const {data, error} = useSWR(requestUrl,(url) => fetch(url, { 
          headers: 
          { "Access-Control-Allow-Origin": "*",
           "Access-Control-Allow-Credentials" : "true",
           "Access-Control-Allow-Methods" : "GET,DELETE,PATCH,POST,PUT,OPTIONS",
           "mode": 'cors',
           "Access-Control-Allow-Headers" : "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"}
           }).then(res => res.json()));
        console.log("data = " + data) 
        if (error) {
            return (
                <p>Failed to Load</p>
            );
        }
        if (!data) {
            return (<p>...Loading</p>);
        }

        if (data.success) {
          return (
            <Fragment>
                <DefaultLayout>
                    <Search></Search>
                    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                      {data.notes.map(
                          note => <Note key={note.title}
                              title={note.title}
                              id={note.note_id}
                              created_by={note.created_by_user_id} />)}
                    </div>
                </DefaultLayout>
                
            </Fragment>
            );
        } else {
          return (
            <Fragment>
                <DefaultLayout>
                    <Search></Search>
                    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                     Note Not Found
                    </div>
                </DefaultLayout>
                
            </Fragment>
            );
        }
}

export default SearchResults;