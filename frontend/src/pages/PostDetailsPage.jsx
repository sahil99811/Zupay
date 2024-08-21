import PostDetails from '../components/postdetails/PostDetails'
import style from '../styles/pages/CommonCss.module.css'

export default function PostDetailsPage() {
  return (
    <div className={style.container}>
      <div className={style.maincontent}>
        <PostDetails/>
      </div>
    </div>
  )
}
