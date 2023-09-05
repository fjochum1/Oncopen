import React from "react";
import PropTypes from "prop-types";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ userData, children }) => {
	let [user, setUser] = React.useState(userData);

	if (typeof user === "string") {
	  try {
		user = JSON.parse(user);
	  } catch (error) {
		console.error('Error parsing user data', error);
		user = null;
	  }
	}

	return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
  };

AuthProvider.propTypes = {
  userData: PropTypes.any,
  children: PropTypes.any,
};

export const useAuth = () => React.useContext(AuthContext);
