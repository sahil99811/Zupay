import { useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import style from '../../styles/components/common/NavBar.module.css'; 
import navbar from '../../assets/navbar.png';
import logo from '../../assets/logo.png';
import searchbar from '../../assets/searchbar.png';
import { useDispatch } from 'react-redux';
import { setToken } from '../../slices/authSlice';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();

  const matchRoute = useCallback(route => {
    return route === location.pathname;
  }, [location.pathname]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prevState => !prevState);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const onSearch = useCallback(() => {
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
  }, [search, navigate]);

  const onEnterHandler = useCallback((event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  }, [onSearch]);
  const logoutHandler=()=>{
    localStorage.clear();
    dispatch(setToken(null));
     
  }
  const onChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  return (
    <header className={style.container}>
      <div className={style.heading}>
        <div className={style.logoContainer}>
          <img src={logo} alt='logo' />
          <button className={style.hamburger} onClick={toggleMobileMenu}>
            <img src={navbar} alt="Open Menu" className={style.navbarImage} />
          </button>
        </div>
        <div className={style.inputContainer}>
          <input
            type="text"
            placeholder="Search for Blogs..."
            className={style.search}
            value={search}
            onChange={onChangeHandler}
            onKeyDown={onEnterHandler}
          />
          <img 
            src={searchbar} 
            alt='search bar' 
            className={style.searchIcon}
            onClick={onSearch}
          />
        </div>
      </div>

      <div className={`${style.navlink} ${isMobileMenuOpen ? style.mobileMenuOpen : ''}`}>
        <Link 
          to='/' 
          style={matchRoute('/') ? { color: 'rgb(239, 113, 55)' } : undefined} 
          onClick={closeMobileMenu}
        >
          <span>Home</span>
        </Link>
        <Link 
          to='/createpost' 
          style={matchRoute('/createpost') ? { color: 'rgb(239, 113, 55)' } : undefined} 
          onClick={closeMobileMenu}
        >
          <span>Create Post</span>
        </Link>
        <Link 
          to='/posts' 
          style={matchRoute('/posts') ? { color: 'rgb(239, 113, 55)' } : undefined} 
          onClick={closeMobileMenu}
        >
          <span>Your Posts</span>
        </Link>
        <Link onClick={logoutHandler}>
          <span>Logout</span>
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
