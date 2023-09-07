import Note from './note.js'
import {Link} from "@nextui-org/react";
import useSWR from 'swr'
import { SearchIcon } from "@/components/icons";
import { Chip, Spacer, Avatar, AvatarIcon} from "@nextui-org/react";
import DefaultLayout from "@/layouts/default-loggedin";
import { Fragment } from 'react';
import Search from './search.js';


function UserDetails (props) {

    console.log(props);
    const { user } = props;
    const requestUrl = 'http://localhost:5000/getnotes';
    console.log(requestUrl)
    const {data, error} = useSWR(requestUrl,(url) => fetch(url, { 
        headers: 
        { "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Credentials" : "true",
         "Access-Control-Allow-Methods" : "GET,DELETE,PATCH,POST,PUT,OPTIONS",
         "mode": 'cors',
         "Access-Control-Allow-Headers" : "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length,Content-MD5, Content-Type, Date, X-Api-Version"} 
        }).then(res => res.json()))
    console.log(data)
    console.log(error)
    if (data) {
        console.log(data)
    }

    // TODO make backend call to get user notes
    // Replace list with a list component
    if (error || !user) {
        return (
            <p>Failed to Load</p>
        );
    }
    if (!data) {
        return (<p>...Loading</p>);
    }
    const createNoteLink = '/note/createnote'
    const logout = '/login'

    return (
        
    
        <Fragment>
        <div className="gap-2 grid padding-unit-5xl">
        <div class=" flex mr-4 ">
            <div class="mr-4">
                <Avatar name={user} size="lg" isBordered radius="lg" 
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
        <Spacer y={4} />
            <div className="max-h-lg gap-4 justify-center padding-unit-3xl ">
                <Chip color="warning" variant="shadow">
                    <Link underline="hover" color="default" href={createNoteLink}>
                        Take A New note
                    </Link>
                </Chip>
            </div>
            <Spacer y={4} />
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                    {data.notes.map(
                        note => <Note key={note.title}
                            title={note.title}
                            id={note.note_id}
                            created_by={note.created_by_user_id} />)}
            </div>
        </div>
        </Fragment>
        );
}

export default UserDetails;

