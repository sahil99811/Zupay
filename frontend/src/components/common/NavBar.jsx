
import { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import style from '../../styles/components/common/NavBar.module.css'; 
import navbar from '../../assets/navbar.png'
import logo from '../../assets/logo.png'
import searchbar from '../../assets/searchbar.png'
import { useNavigate } from 'react-router-dom';
const NavBar = () => {
  const navigate=useNavigate();
  // State to track if the mobile menu is open
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Hook to get the current location object
  const location = useLocation();

  // Function to check if the current route matches the provided route
  const matchRoute = useCallback(route=> {
    return route === location.pathname;
  }, [location.pathname]); // Dependency array includes location.pathname

  // Memoized function to toggle the mobile menu open/close state
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prevState => !prevState);
  }, []); // Empty dependency array ensures function is memoized

  // Memoized function to close the mobile menu
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []); // Empty dependency array ensures function is memoized
  const onEnterHandler=(event)=>{
    if (event.key === 'Enter') {
      navigate('/search');
      
    }
  }
  return (
    <header className={style.container}>
      {/* Header with logo and app name */}
      <div className={style.heading}>
        <div className={style.logoContainer}>
        <img src={logo} alt='logo' />
        {/* Hamburger menu button */}
        <button className={style.hamburger} onClick={toggleMobileMenu}>
          <img src={navbar} alt="Open Menu" className={style.navbarImage} />
        </button>
        </div>
        <div className={style.inputContainer} onKeyDown={onEnterHandler}>
        <input
          type="text"
          placeholder="Search for Blogs..."
          className={style.search}
        />
        <img src={searchbar} alt='search bar' />
        </div>
      </div>

      {/* Navigation links container */}
      <div className={`${style.navlink} ${isMobileMenuOpen ? style.mobileMenuOpen : ''}`}>
        {/* Home link */}
        <Link 
          to='/' 
          style={matchRoute('/') ? { color: 'rgb(239, 113, 55)' } : undefined} 
          onClick={closeMobileMenu}
        >
          <span>Home</span>
        </Link>
        
        {/* Challenges link */}
        <Link 
          to='/createpost' 
          style={matchRoute('/createpost') ? { color: 'rgb(239, 113, 55)' } : undefined} 
          onClick={closeMobileMenu}
        >
          <span>Create Post</span>
        </Link>
        
        {/* Workouts link */}
        <Link 
          to='/posts' 
          style={matchRoute('/posts') ? { color: 'rgb(239, 113, 55)' } : undefined} 
          onClick={closeMobileMenu}
        >
          <span>Your Posts</span>
        </Link>
      </div>
    </header>
  );
};

export default NavBar;