import React, { useEffect, useState } from 'react';
import {Textarea} from "@nextui-org/react";
import {Card, CardBody, Spinner} from "@nextui-org/react";
import Draggable from "react-draggable";
import useSWR from 'swr'


// This Component is used to generate a AI Summary response of the note content created by users
// It does so by calling a backend API and and fetching the reponse.
function AIGenSummaryView (prop) {
    const {val, datanotes} = prop;
    console.log("Data Content "+JSON.stringify(datanotes))
    let text = "";
    for(var property in datanotes) {
        text += datanotes[property];
    }
    
    const requestUrl = 'http://localhost:5000/genrateaisumdum/'+text;
    const {data, error} = useSWR(requestUrl,(url) => fetch(url).then(res => res.json()))
    console.log(val)
    if(!data){
        return(<div>AI Loading Right Now.....<Spinner size="sm" /></div>)
    }

    if(error) {
        return(<div>AI Not responding Right Now</div>)
    }

    if(data && !val) {
        return (
            <div >
                    <Draggable >
                    <Card  classname="bg-[#FF71D7] max-w-[610px]" name="summary" id="summary" >
                        <CardBody className="" >
                            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                <Textarea 
                                    labelPlacement="outside"
                                    className="max-w-large w-full"
                                    variant="bordered"
                                    value = {data.choices[0].message.content} name="content" id="content">
                                </Textarea>
                                
                            </div>
                        </CardBody>
                    </Card>
                    
                </Draggable>
                
                </div>
        )
        
    } else {
        return(<div>AI Busy Right Now</div>)
        
    }
    
}

export default AIGenSummaryView;