import  { useState } from 'react';
import style from '../../styles/components/auth/LoginForm.module.css';
import validator from "validator";
import toast from 'react-hot-toast';
import {login} from '../../services/Auth'
import { useDispatch } from 'react-redux';
import {setToken} from '../../slices/authSlice'
// Component for login form
export default function LoginForm() {
  const dispatch=useDispatch();
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
    if(!formData.email||!formData.password){
      toast.error("Please enter all field");
      return;
    }
    if (!validator.isEmail(formData.email)) {
      toast.error("Please enter a valid email");
      return;
    }
    const result=await login(formData);
    if(result){
      dispatch(setToken(result))
    }
  };

  return (
    <>
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