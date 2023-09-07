import { Fragment } from "react";
import { useRouter } from "next/router";
import NoteDetails from '../../components/note-details.js'
import { getCookie } from 'cookies-next';

// Dynamic routing to note's page
function NoteDetailPage(props) {
    const {username} = props
    console.log("Username in noteDetailsPage=" + username)
    const router = useRouter();
    const noteid = router.query.noteid;
    console.log(router.query)

    if (!noteid) {
        return (<div><h1>no Note found</h1></div>); 
    }

    return (<Fragment>
        <NoteDetails noteid={noteid} currentuser={username} ></NoteDetails>
    </Fragment>
    );
}

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    var username = getCookie('username', { req, res });
    if (username == undefined){
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }
    return { props: {username:username} };
};

export default NoteDetailPage;
