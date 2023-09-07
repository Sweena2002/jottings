import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import DefaultLayoutLoggedin from "@/layouts/default-loggedin";
import { getCookie } from 'cookies-next';
import {Tabs,Tab,Card, CardBody,Input,Button,Tooltip} from "@nextui-org/react";
import React, { Component } from 'react';
import { useRouter } from 'next/router'
import {Image} from "@nextui-org/react"
import Notephoto from '../public/rm.jpg'
import FlashingText from '@/components/flashing-text';


// The index page handles both logged in and a new user scenario
export default function IndexPage({username}) {
	const router = useRouter()
    const { msg } = router.query
	const homeurl='/'+username

	if(username) {
		return(
			<DefaultLayoutLoggedin>
				<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
					
					<h1 className={title({ color: "yellow" })}>Hi {username}</h1>
					<h3 className= "text-blue-500 text-2xl">
						For RealTime Collaborative Note Taking Experience.
					</h3>
					<div>
      					<FlashingText />
    				</div>
					<Button><Link href={homeurl}>Go to My Dashboard</Link><br/></Button>
					
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
			{msg ?
				<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <h3 className={title({ color: "red", size: 'sm' })}>{msg}</h3>
				</section>
            :
                <></>
            }
			
			
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			
				<div className="inline-block max-w-lg text-center justify-center">
									
					<h1 className={title()}>Welcome to&nbsp;</h1>
					<h1 className={title({ color: "violet" })}>Jottings&nbsp;</h1>
					<br />
					
					<Tabs 
						aria-label="Options">
       						<Tab key="Login" title="Login">
							   <form className="flex flex-col gap-4"  action='/api/login' method='POST'>
							   <Input isRequired label="Username" name="username" id="username" placeholder="username" type="text" minLength="3" />
								<Input
									isRequired
									label="Password"
									name="password"
									placeholder="Enter your password"
									type="password"
									id="password"
									minLength="5"
								/>
									<div className="flex gap-2 justify-end">
										<Button fullWidth color="primary" type="submit">
											Login
										</Button>
									</div>
								</form>
							</Tab>
							<Tab key="sign-up" title="Sign up">
             		 			<form className="flex flex-col gap-4 h-[300px]" method='POST' action='/api/signup'>
									<Input isRequired label="Username" name="username" id="username" placeholder="Enter your username" type="text" minLength="3"/>
									<Input isRequired label="Email" name="email" id="email" placeholder="Enter your email" type="email" minLength="10"/>
									<Input
										isRequired
										label="Password"
										name="password"
										placeholder="Enter your password"
										type="password"
										id = "password"
										minLength="5"
										/>
									<div className="flex gap-2 justify-end">
										<Button fullWidth color="primary" type = 'submit'>
											Sign up
										</Button>
									</div>
								</form>
							</Tab>
					</Tabs>
			
				</div>
								
			</section>
					
		</DefaultLayout>
	);
}
export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    var username = getCookie('username', { req, res });
	
	if(!username) return {props: {username:false}}
    return { props: {username:username} };
};
