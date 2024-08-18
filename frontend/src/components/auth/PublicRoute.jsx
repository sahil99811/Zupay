
import { Navigate } from 'react-router-dom'; // Importing Navigate component from react-router-dom for redirection
import { useSelector } from 'react-redux'; // Importing useSelector hook to access Redux store state
import PropTypes from 'prop-types';
// Component for open routes
export default function PublicRoute({ children }) {
  const { token } = useSelector((state) => state.auth); // Accessing token from Redux store state

  // Checking if token is null
  if (token === null) {
    return children; // Render children components if token is null (user is not authenticated)
  } else {
    return <Navigate to="/" />; 
  }
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired, 
};