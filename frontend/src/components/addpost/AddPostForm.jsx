import usePostForm from '../../hooks/usePostForm';
import PropTypes from 'prop-types';
import style from '../../styles/components/createpost/AddPostForm.module.css';

export default function AddPostForm({ closeModal }) {
  const {
    formState,
    points,
    currentPoint,
    handleChange,
    handleAddPoint,
    handleRemovePoint,
    handleSubmit,
    setCurrentPoint,
  } = usePostForm(closeModal);

  return (
    <form className={style.formContainer} onSubmit={handleSubmit}>
      <h2 className={style.heading}>Post Form</h2>
      <div className={style.formGroup}>
        <label className={style.label}>Title</label>
        <input
          type="text"
          name="title"
          value={formState.title}
          onChange={handleChange}
          className={style.input}
          placeholder="Enter post title"
        />
      </div>
      <div className={style.formGroup}>
        <label className={style.label}>Thumbnail URL</label>
        <input
          type="text"
          name="thumbnail"
          value={formState.thumbnail}
          onChange={handleChange}
          className={style.input}
          placeholder="Enter thumbnail image URL"
        />
      </div>
      <div className={style.formGroup}>
        <label className={style.label}>Category</label>
        <select
          name="category"
          value={formState.category}
          onChange={handleChange}
          className={style.select}
        >
          <option value="" disabled>Select Category</option>
          <option value="tech">Tech</option>
          <option value="news">News</option>
          <option value="sport">Sport</option>
          <option value="entertainment">Entertainment</option>
          <option value="travel">Travel</option>
          <option value="lifestyle">Lifestyle</option>
        </select>
      </div>
      <div className={style.formGroup}>
        <label className={style.label}>Description</label>
        <textarea
          name="content"
          value={formState.content}
          onChange={handleChange}
          placeholder="Enter a description..."
          className={style.content}
        />
      </div>

      <div className={style.formGroup}>
        <label className={style.label}>Points</label>
        <div className={style.pointsContainer}>
          <input
            type="text"
            value={currentPoint}
            onChange={(e) => setCurrentPoint(e.target.value)}
            className={style.input}
            placeholder="Add a point"
          />
          <button type="button" onClick={handleAddPoint} className={style.addButton}>
            Add Point
          </button>
        </div>
        <ul className={style.pointsList}>
          {points.map((point, index) => (
            <li key={index} className={style.pointItem}>
              {point}
              <button
                type="button"
                onClick={() => handleRemovePoint(index)}
                className={style.removeButton}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button type="submit" className={style.button}>
        Create Post
      </button>
    </form>
  );
}

AddPostForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
