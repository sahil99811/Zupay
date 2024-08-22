import { useState } from 'react';
import toast from 'react-hot-toast';
import { createPost } from '../services/Post';
import {useSelector} from 'react-redux'
const usePostForm = (closeModal) => {
  const {token}=useSelector(state=>state.auth)
  const [formState, setFormState] = useState({
    title: '',
    thumbnail: '',
    content: '',
    category: '',
  });
  const [points, setPoints] = useState([]);
  const [currentPoint, setCurrentPoint] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddPoint = () => {
    if (currentPoint.trim()) {
      setPoints((prevPoints) => [...prevPoints, currentPoint]);
      setCurrentPoint('');
    }
  };

  const handleRemovePoint = (index) => {
    setPoints((prevPoints) => prevPoints.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState,points,token);
    if (!formState.title || !formState.thumbnail || !formState.content || !formState.category) {
      toast.error('Please fill in all fields');
      return;
    }

    // Add points to formState before submitting
    try {
      // Assuming `createPost` is an async function to post the data
      await createPost({...formState,points},token);
      toast.success('Post created successfully');
      closeModal();
    } catch (error) {
      toast.error('An error occurred while creating the post',error);
    }
  };

  return {
    formState,
    points,
    currentPoint,
    handleChange,
    handleAddPoint,
    handleRemovePoint,
    handleSubmit,
    setCurrentPoint, // For updating `currentPoint` in the component
  };
};

export default usePostForm;
