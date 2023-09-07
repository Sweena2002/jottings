import React, { useEffect, useState } from 'react';
import {Button} from "@nextui-org/react";
import AIGenSummaryView from './aigen-summary-view'

// This component is to control the viewing of the AI Summary View Component
// It acts like a parent component with a button which opens up the child component with AI Summary View.
function AIGenSummary(props) {
    const {datanotes} = props
    
    let response = 'AI Generated Response will Appear here'

    const [postContent, setPostContent] = useState(true);
    
       
        return (
            <div>
                <div hidden={postContent} >
                    <AIGenSummaryView val={postContent} datanotes={datanotes}></AIGenSummaryView>
                </div>
            <div >
                <Button onClick={e =>onclickEvent(e)}>Generate AI Summary</Button>
            </div>
            
            </div>
        );

        function onclickEvent(e) {
            setPostContent(false) 
        }
}

export default AIGenSummary;
