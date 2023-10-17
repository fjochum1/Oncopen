import React from "react";
import { useAuth } from "auth-context/auth.context";

import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";
import LogOut from "views/Auth/LogOut.js";
import PatientRecord from 'views/Dashboard/Patients/PatientRecord/index';
import PatientProfile from 'views/Dashboard/Patients/PatientProfile/index';
import CarePathway from 'views/Dashboard/Patients/CarePathway/index';
import G8 from "views/Dashboard/Tools/G8";
import ARF from "views/Dashboard/Tools/ARF.js";

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
            name: "Tools",
            category: "tools",
            state: "pageCollapse",
            views: [
                {
                    path: "/G8",
                    name: "G8",
                    icon: <PersonIcon color="inherit" />,
                    secondaryNavbar: true,
                    component: G8,
                    layout: "/patient",
                },
				{
					path: "/ARF",
					name: "Acute Renal Failure",
					secondaryNavbar: true,
					component: ARF,
					layout: "/patient",
				}
            ],
        },
		{
			name: "Account pages",
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
