import { Component, Fragment } from "react";
import { useRouter } from "next/router";
import UserDetails from '../components/user-details.js'
import { getCookie } from 'cookies-next';
import DefaultLayout from "@/layouts/default-loggedin";

// Dynamic route to a User spectif page when they log in
function UserDetailPage(props) {
    const {username} = props
    console.log("Username in userDetailspage=" + username)
    const router = useRouter();
    const uid = router.query.uid;
    console.log(router.query)

    if (!uid) {
        return (<div><h1>no event found</h1></div>); 
    }

    return (
    <Fragment>
        <DefaultLayout>
            <UserDetails user={uid} ></UserDetails>
        </DefaultLayout>
        
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

export default UserDetailPage;
