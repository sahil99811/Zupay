import style from '../../styles/components/common/PostCard.module.css'
import modiji from '../../assets/modiji.jpg'
import impression from '../../assets/impression.png'
import { useNavigate } from 'react-router-dom'
export default function PostCard() {
  const navigate=useNavigate();
  const onClickHandler=()=>{
    navigate("/posts/123");
  }
  return (
    <div className={style.container} onClick={onClickHandler}>
       <img src={modiji} className={style.thumbnail}/>
       <div className={style.impression}>
         <img src={impression}  alt="Impression icon" className={style.impressionLogo}/>
         <span className={style.impressions}>55</span>
       </div>
       <div className={style.postInfo}>
        <div className={style.headingcontainer}>
         <h3 className={style.heading}>20 best vacation spot in the world</h3>
         <p className={style.info}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo eveniet quo accusamus similique provident maxime aliquam unde, minima voluptate iusto ipsum assumenda. Nulla temporibus ad similique. Quas consequuntur exercitationem quod?</p>
        </div>
        <span className={style.createdby}>Derick Jack</span>
       </div> 
    </div>
  )
}
