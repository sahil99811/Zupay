import { useState } from 'react'; // Import useState hook from React
import LoginForm from './LoginForm'; // Import LoginForm component
import SignupForm from './SignupForm'; // Import SignupForm component
import style from '../../styles/components/auth/TemplateForm.module.css'; // Import CSS module for styling
import { useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner'; // Import Oval spinner

// Component representing a template form for login and signup
export default function TemplateForm() {
  const { loading } = useSelector(state => state.auth);
  const [formType, setFormType] = useState("signup"); // State to manage form type (login/signup)

  return (
    <>
      {loading ? (
        <Oval
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{ zIndex: 500, position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, -50%)' }}
          wrapperClass=""
        />
      ) : (
        <div className={style.container}>
          <h2 className={style.heading}>BLOGEE</h2>
          <div className={style.formButton}>
            {/* Button to switch to signup form */}
            <button 
              className={`${style.button} ${formType === 'signup' && style.active }`} 
              onClick={() => setFormType('signup')}
            >
              Sign Up
            </button>
            {/* Button to switch to login form */}
            <button 
              className={`${style.button} ${formType === 'login' && style.active}`} 
              onClick={() => setFormType('login')}
            >
              Log In
            </button>
          </div>
          {/* Render SignupForm or LoginForm based on formType */}
          {formType === "signup" ? <SignupForm /> : <LoginForm />}
        </div>
      )}
    </>
  );
}
