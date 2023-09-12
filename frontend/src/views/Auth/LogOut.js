import AuthApi from "../../api/auth";
import { useAuth } from "../../auth-context/auth.context";
import { useHistory } from "react-router-dom";
import React from 'react';

function LogOut() {
  const history = useHistory();
  const { user, setUser } = useAuth();

  // Assume AuthApi has a LogOut method to clear the session on the server side
  React.useEffect(() => {
    if (!user) {
      // If there's no user, just redirect to the sign-in page
      history.push('/auth/signin');
      return;
    }

    AuthApi.Logout({token: user.token}).then(response => {
      if (response.data.success) {
        // Clear the user from the context and redirect to the sign-in page
        setUser(null);
        history.push('/auth/signin');
      } else {
        console.error("Error logging out:", response.data.msg);
      }
    }).catch(error => {
      console.error("Error during logout:", error);
      history.push('/auth/signin');
    });
  }, [user, setUser, history]);

  return <div>Logging out...</div>;
}

export default LogOut;
