import React, { useState, useEffect } from 'react';
import {Button} from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";
import {Card, CardBody, Chip} from "@nextui-org/react";
import Draggable from "react-draggable";
import {Spacer} from "@nextui-org/react";
import CommentForm from '../components/comment-form'

let note_id_gb = ''
let currentuser_gb = ''


// this component is resposible for generating a view where a user can see the notes of all callobarating members
// user has option to edit his own notes, and provide comments to other users
function CollborativeNoteView(props) {
    const {user, description, currentuser, note_id, fullContent} = props
    const [postContent, setPostContent] = useState(description);
    
    


    note_id_gb = note_id;
    currentuser_gb = currentuser;
    
    console.log("currentuser: "+currentuser)
    console.log("User comment" + fullContent[user+"-comment"])
    let comments = ''
    if (fullContent[user+"-comment"]) {
        comments = fullContent[user+"-comment"]
    }
    const [postCommentContent, setPostCommentContent] = useState(comments);


        if (user.includes("-comment")) {
            return;
        }
        return (
            <Draggable>
                <Card classname="bg-[#FF71D7] max-w-[610px]" key={note_id} >  
                    <ul>
                    <li>
                    <Spacer y={1} />
                    <Chip>{user}</Chip>
                    <Spacer y={2} />
                    </li>
                    {user == currentuser? (
                        // This Card body will have generate the view for the note for Logged in User
                    <CardBody className="" isBlurred>
                        <li >
                            
                            <div className="max-w-large w-full">
                                <form  classname="flex flex-col gap-4" action='/api/updatenote' method='POST'>
                                    <input hidden={true} name="note_id" id="note_id" type="text" defaultValue={note_id}></input>
                                    <input hidden={true} name="updated_by_user" id="updated_by_user" type="text" defaultValue={user}></input>
                                    
                                        <Textarea 
                                            minRows={6}                                       
                                            labelPlacement="outside"
                                            onChange={e => changeTextAndSendUpdate(e)}
                                            className="max-w-large w-full"
                                            variant="bordered"
                                            value = {postContent} name="content" id="content">
                                        </Textarea>  
                                    <div className="flex gap-2 inline-block">   
                                        <Button size="sm" color="primary" type="submit" className=" justify-end inline-block">
                                                Save
                                        </Button>
                                    
                                    </div>
                                    </form>
                                    <Spacer y={4} />
                                    <div className="max-w-sm">
                                        <p>Comments:</p>
                                            <Textarea    
                                                minRows={2}                                     
                                                labelPlacement="outside"
                                                className=""
                                                variant="bordered"
                                                value = {postCommentContent} name="content" id="content">
                                            </Textarea>
                                    </div>

                            </div>
                        </li>
                        </CardBody>
                        // This Card body will have generate the  view for the notes by others users
                        ) : 
                        <li>
                            <CardBody className="">
                            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                <Textarea 
                                    minRows={6}
                                    labelPlacement="outside"
                                    className="max-w-large w-full"
                                    variant="bordered"
                                    value = {description} name="content" id="content">
                                </Textarea>
                                
                            </div>
                            <Spacer y={12} />
                            <div className="max-w-sm">
                                <p>Comments:</p>
                                <form classname="flex flex-col gap-4" action='/api/updatenotecomment' method='POST'>
                                    <input hidden={true} name="note_id" id="note_id" type="text" defaultValue={note_id}></input>
                                    <input hidden={true} name="updated_by_user" id="updated_by_user" type="text" defaultValue={user}></input>
                                    <input hidden={true} name="current_user" id="current_user" type="text" defaultValue={currentuser}></input>
                                    <Textarea    
                                        minRows={2}                                     
                                        labelPlacement="outside"
                                        //onChange={e => setPostContent(e.target.value)} 
                                        onChange={e => setPostCommentContent(e.target.value)}
                                        className="max-w-sm w-full"
                                        variant="bordered"
                                        value = {postCommentContent} name="content" id="content">
                                    </Textarea>
                                    <Button color="secondary" type="submit" size="sm" className="inline-block ">
                                        Comment
                                    </Button>
                                </form>
                            </div>
                            </CardBody>
                            </li>
                    } 
                        
                    </ul>
            
            </Card>
            </Draggable>
        );

function changeTextAndSendUpdate(e ) {
    setPostContent(e.target.value)
    if (note_id) {
        const note_id = note_id_gb
        const content = e.target.value
        const updated_by_user = currentuser_gb
        const jsonreq = JSON.stringify({
                content : content,
                updated_by_user: updated_by_user
            })
        console.log(jsonreq)
        console.log(note_id)
        try {
        sendRequestToPythonAPI('http://localhost:5000/updatenote/'+note_id, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: jsonreq
        });
            
        } catch (error) {
            console.error('Error during update:', error);
        }
    } 
}
function sendRequestToPythonAPI(url, options) {
    try {
    const response = fetch(url, options);
    
  }
    catch (error) {
      console.error('Error during API request:', error);
      //throw error; // Rethrow the error to be handled higher up the call stack
  }
  }
        
}




export default CollborativeNoteView;
