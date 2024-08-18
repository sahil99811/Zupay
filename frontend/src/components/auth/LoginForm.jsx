import  { useState } from 'react';
import style from '../../styles/components/auth/LoginForm.module.css';
import validator from "validator";
import toast from 'react-hot-toast';

// Component for login form
export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // Function to handle input change
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Validating email format
    if (!validator.isEmail(formData.email)) {
      toast.error("Please enter a valid email");
      return;
    }
  };

  return (
    <>
      {/* Display loading indicator while loading */}
      {/* {loading && <p style={{ "position": "absolute", "marginTop": "-1.5rem", "fontSize": "2rem" }}>Loading...</p>} */}
      {/* Login form */}
      <form className={style.container} onSubmit={onSubmitHandler}>
        <div className={style.inputContainer}>
          <label className={style.label}>Email</label>
          <input
            type='email'
            className={style.input}
            name='email'
            value={formData.email}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className={style.inputContainer}>
          <label className={style.label}>Password</label>
          <input
            type='password'
            className={style.input}
            name='password'
            value={formData.password}
            onChange={onChangeHandler}
            required
          />
        </div>
        <button type='submit' className={style.button} style={{ marginTop: "15px" }}>
          Log in
        </button>
      </form>
    </>
  );
}