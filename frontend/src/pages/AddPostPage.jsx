
import Modal from "react-modal"
import { useEffect, useState } from "react";
import AddPostForm from "../components/addpost/AddPostForm";
import { useNavigate } from "react-router-dom";
Modal.setAppElement("#root"); 
// Define custom styles for the modal
const customStyles = {
  overlay: {
      backgroundColor: 'rgba(47, 47, 47, 0.75)', // Dark semi-transparent background for the modal overlay
      zIndex: 300, // Ensure modal appears above other content
    },
  content: {
    top: "50%", // Center the modal vertically
    left: "50%", // Center the modal horizontally
    right: "auto",
    bottom: "auto",
    height: "80vh", // Set modal height to 80% of the viewport height
    width:"80vw",
    marginRight: "-50%", // Adjust margin to properly center the modal 
    transform: "translate(-50%, -50%)", // Center the modal using transform
    animation: "slideIn 1.5s ease-in-out", // Apply slide-in animation
  }
};

export default function AddPostPage() {
  const [modalIsOpen, setIsOpen] = useState(false); // State to manage modal visibility
  const navigate=useNavigate();
    function openModal() {
      setIsOpen(true); // Function to open the modal
    }

    function closeModal() {
      setIsOpen(false); // Function to close the modal
      navigate('/');
    }
    useEffect(()=>{
      openModal()
    },[])
    console.log(modalIsOpen)
  return (
    <div >
       <Modal
          isOpen={modalIsOpen} // Control modal visibility
          onRequestClose={closeModal} // Close modal when requested
          style={customStyles} // Apply custom styles to the modal
          contentLabel="Create Post modal" // Accessibility label for the modal content
        >
          <AddPostForm closeModal={closeModal}/>
        </Modal>
    </div>
  )
}
