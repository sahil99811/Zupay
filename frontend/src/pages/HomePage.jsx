import style from '../styles/pages/HomePage.module.css'
import TrendingPost from "../components/homepage/trendingPost";
import PostCard from "../components/common/PostCard";

export default function HomePage() {
  const data = [{ src: "https://www.pmindia.gov.in/wp-content/uploads/2022/12/Modi-Ji-Photo-02-e1647325936821.jpg" }, { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAtp0WKIcs_WiDSqfWLfL-UlIj-OWOsHdOcQ&s" }, { src: "https://images.bhaskarassets.com/web2images/521/2023/10/21/akhilesh-yadav-5_1697873749.jpg" }];
  return (
    <div className={style.container}>
      <div className={style.maincontent}>
        <TrendingPost posts={data} />
        <div className={style.posts}>
          <h3 className={style.heading}>Top Stories</h3>
          {
            data.map((val,index)=>{
              return <PostCard key={index} />
            })
          }
        </div>
      </div>
    </div>
  );
}
