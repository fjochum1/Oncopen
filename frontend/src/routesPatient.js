import React from "react";
import { useAuth } from "auth-context/auth.context";

import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";
import LogOut from "views/Auth/LogOut.js";
import PatientRecord from 'views/Dashboard/PatientRecord/index';
import PatientProfile from 'views/Dashboard/PatientRecord/patientProfile';
import CarePathway from 'views/Dashboard/PatientRecord/carePathway';

import {
	PersonIcon,
	DocumentIcon,
	RocketIcon
} from "components/Icons/Icons";

export function useRoutesPatient() {
	let { user } = useAuth();
	// When user is logged in
	const authenticatedRoutes = [
		//{
		//	name: "GO BACK TO",
		//	category: "GoPatientRecord",
		//	state: "pageCollapse",
		//	views: [
		{
			path: "/patient-record",
			name: "Patient Record",
			component: PatientRecord,
			layout: "/admin",
		},
		//	],
		//},
		//{
		//	name: "PATIENT FILE",
		//	category: "patientFile",
		//	state: "pageCollapse",
		//	views: [
		{
			path: "/:id/profile",
			name: "Patient Profile",
			component: PatientProfile,
			layout: "/patient",
		},
		{
			path: "/:id/carepathway",
			name: "Care Pathway",
			component: CarePathway,
			layout: "/patient",
		},
		//	],
		//},
		{
			name: "ACCOUNT PAGES",
			category: "account",
			state: "pageCollapse",
			views: [
				{
					path: "/profile",
					name: "Profile",
					icon: <PersonIcon color="inherit" />,
					secondaryNavbar: true,
					component: Profile,
					layout: "/admin",
				},
				{
					path: "/logout",
					name: "Log out",
					component: LogOut,
					layout: "/admin",
				}
			],
		},
	];

	// When user is not logged in
	const unauthenticatedRoutes = [
		{
			name: "ACCOUNT PAGES",
			category: "account",
			state: "pageCollapse",
			views: [
				{
					path: "/signin",
					name: "Sign In",
					icon: <DocumentIcon color="#fbecce" />,
					component: SignIn,
					layout: "/auth",
				},
				{
					path: "/signup",
					name: "Sign Up",
					icon: <RocketIcon color="#fbecce" />,
					secondaryNavbar: true,
					component: SignUp,
					layout: "/auth",
				}
			],
		},
	];

	// If the user is logged in, return authenticated routes, otherwise return unauthenticated routes
	return user ? authenticatedRoutes : unauthenticatedRoutes;
}

export default useRoutesPatient;