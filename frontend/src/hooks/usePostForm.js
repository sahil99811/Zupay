import { useState } from 'react';
import toast from 'react-hot-toast';

const usePostForm = (closeModal) => {
  const [formState, setFormState] = useState({
    title: '',
    thumbnail: '',
    content: '',
    category: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formState.title || !formState.thumbnail || !formState.content || !formState.category) {
      toast.error('Please fill in all fields');
      return;
    }
    closeModal()

  };

  return {
    formState,
    handleChange,
    handleSubmit,
  };
};

export default usePostForm;
