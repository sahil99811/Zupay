
import { useSelector } from 'react-redux'; 
import { Navigate } from 'react-router-dom'; 
import PropTypes from 'prop-types';

export default function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  if (token) {
    return children;
  } else {
    return <Navigate to="/auth" />; 
  }
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, 
};