import {Link} from "@nextui-org/react";
import {Card, CardBody, Divider} from "@nextui-org/react";


// This component id to create the Summary view of notes
function Note(props) {
    const {title, id, created_by} = props
    const noteLink = "/note/"+id
    
    return (
            <Card className="max-w-[400px] flex gap-3">
            <CardBody>
            <ul>
            <li>
                Title : {title}
            </li>
            <li>
                Creator : {created_by}
            </li>
            <li>
                <Link underline="hover" color="warning" href={noteLink} >
                ShowMore
                </Link>
            </li>
            </ul>
            </CardBody>
            </Card>
        
    );

}

export default Note;
