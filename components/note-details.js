import useSWR from 'swr'
import CollborativeNoteView from './collaborative-note-view'
import DefaultLayout from "@/layouts/default-loggedin";
import {Spacer, Avatar, AvatarIcon} from "@nextui-org/react";
import AIGenSummary from './aigen-summary';
import Search from './search.js';

// This component is the parent for generating the detailed view of a note with all users's content and ability for AI summary and comments
// It call the CollborativeNoteView and AIGenSummary for further redering
function NoteDetails (props) {
    console.log(props);
    const { noteid, currentuser } = props;
    const requestUrl = 'http://localhost:5000/notes/bynoteid/'+noteid;
    const {data, error} = useSWR(requestUrl,(url) => fetch(url).then(res => res.json()),{refreshInterval : 80})
    
    if (data) {
        console.log(data)
    }
    
   
    if (error) {
        return (
            <p>Failed to Load</p>
        );
    }
    if (!data) {
        return (<p>...Loading</p>);
    }
    var isCurrentUserNotesPresent = false
    Object.entries(data.content).map(
        ([key, value]) => {
            if ( key == currentuser) {
                isCurrentUserNotesPresent = true
            }
        });
    if(!isCurrentUserNotesPresent){
        data.content[currentuser] = "";
    }
    const user = data.created_by_user_id
    return (
    <DefaultLayout>    
       
        <section>
        <div class=" flex mr-4 ">
            <div class="mr-4">
                <Avatar name={currentuser} size="lg" isBordered radius="lg" 
                icon={<AvatarIcon />}
                classNames={{
                  base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                  icon: "text-black/80",
                }}/>
            </div>
            <Spacer x={900} />
            <div class="max-w-full">
                <Search></Search>
            </div>
                <Spacer y={4} />
        </div>
            
        </section>
        
        <div>
        <section>
        <Spacer y={4} />
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-2">
                <p class="float-right">
                    Noteid : {data.note_id}
                </p>
                <p class="float-right">
                    Note Title : {data.title}
                </p>
                <p class="float-right">
                    Note tags : {data.tags}
                </p>
                <p class="float-right">
                    Note Created Date : {data.create_date}
                </p>
               
            </div>
        </section>
        <Spacer y={4} />
        <section>
            <AIGenSummary datanotes = {data.content}></AIGenSummary>
        </section>
        <Spacer y={4} />
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-3">
            
            {Object.entries(data.content).map(
                    ([key, value]) => 
                            <CollborativeNoteView key={key} 
                                user = {key}
                                description={value}
                                currentuser = {currentuser}
                                note_id = {data.note_id}
                                fullContent = {data.content}
                            />
                    )}
            </div>
            
        </div>
        </DefaultLayout>    
        );
}

export default NoteDetails;
