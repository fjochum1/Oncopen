import React from "react";
import { useAuth } from "auth-context/auth.context";
import { useHistory } from 'react-router-dom';

import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";
import FirstConsultation from 'views/Dashboard/Patients/FirstConsultation';
import PatientRecord from 'views/Dashboard/Patients/PatientRecord/index';
import PatientProfile from 'views/Dashboard/Patients/PatientProfile/index'
//import NewPatientForm from "views/Dashboard/Patients/PatientRecord/newPatientForm";
import LogOut from "views/Auth/LogOut.js";
import PatientRecord from 'views/Dashboard/PatientRecord/index';

import {
	PersonIcon,
	DocumentIcon,
	RocketIcon
} from "components/Icons/Icons";

export function useRoutes() {
	let { user } = useAuth();
    // When user is logged in
    const authenticatedRoutes = [

        {
            path: "/patient-profile/patients/:patientId",
            name: "Patient Profile",
            component: PatientProfile,
            layout: "/admin",
        },
        {
            path: "/patient-record",
            name: "Patient Record",
            component: PatientRecord,
            layout: "/admin",
        },
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

export default useRoutes;
