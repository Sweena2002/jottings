import Link from 'next/link'
import { getCookie } from 'cookies-next';
import {Card, CardBody,Input,Button,Textarea} from "@nextui-org/react";
import DefaultLayout from "@/layouts/default-loggedin";
import { title, subtitle } from "@/components/primitives";
import React, { useState } from 'react';

// Page to create a New Note
export default function HomePage( {username} ) {
    const [postContent, setPostContent] = useState("Start Taking your note");
    
    return (
        <DefaultLayout>
           
        {username ?
        <>
            <h2 className={title({ color: "violet" })} >Hi {username}</h2>
            <form className="justify-center items-center flex flex-col gap-1" action='/api/createnote' method='POST'>
                <Input className="max-w-sm"  minLength="3" name="title" id="title" type="text" placeholder='Note Title' isRequired /><br/>
                
                <Textarea className="max-w-lg max-h-lg" id="notedata" minRows={200} maxRows={20} name="notedata" placeholder='Start typing your notes' rows="4" cols="50"/><br/>
                <Input className="max-w-xs"  minLength="3" name="tags" id="tags" type="text" placeholder='tags' /><br/>
                <div className="flex gap-2 justify-start">
                <Button color="primary" type="submit">
                    Create note
                </Button>
                </div>
            </form>
        </>:
        <>
            <h2>Log in</h2>
            <Link href="/login">Login</Link><br/>
            <Link href="/signup">Signup</Link>
        </>
        }
        </DefaultLayout>
    );
}

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    var username = getCookie('username', { req, res });
    if (username == undefined){
        username = false;
    }
    return { props: {username} };
};