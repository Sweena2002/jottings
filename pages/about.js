
import DefaultLayout from "@/layouts/default";
import DefaultLayoutLoggedin from "@/layouts/default-loggedin";
import { getCookie } from 'cookies-next';
import React, { Component } from 'react';
// About me page
export default function IndexPage({username}) {
	
	if(username) {
		return(
			<DefaultLayoutLoggedin>
				<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
					<h3 className= "text-blue-500 text-2xl">
						
                        About Content
					</h3>
				</section>
			</DefaultLayoutLoggedin>
		)
	}
	return (
				
		<DefaultLayout>
					<div style={{
						width: '150px',
						height: '150px', 
						backgroundSize:"cover",
						backgroundImage:'rm.jpg'
						}
					}      
	    />	
			
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			
				<div className="inline-block max-w-lg text-center justify-center">
									
					
                        <h3 className= "text-blue-500 text-2xl">
                            
                            About Content
                        </h3>
					<br />
					
					
			
				</div>
								
			</section>
					
		</DefaultLayout>
	);
}
export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    var username = getCookie('username', { req, res });
	console.log(username)
	// if (username != undefined){
    //     return {
    //         redirect: {
    //             permanent: false,
    //             destination: "/"
    //         }
    //     }
    // }
	if(!username) return {props: {username:false}}
    return { props: {username:username} };
};
