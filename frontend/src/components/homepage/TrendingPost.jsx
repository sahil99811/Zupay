import { Swiper, SwiperSlide } from 'swiper/react';
import style from "../../styles/components/homepage/TrendingPost.module.css";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import impression from '../../assets/impression.png';
import PropTypes from 'prop-types';

const TrendingPost = ({ posts }) => {
  return (
    <div className={style.container}>
      <h3 className={style.heading}>Trending Posts</h3>
      <Swiper
        slidesPerView={1}
        spaceBetween={0} 
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]} 
        className={style.swiper}
      >
        {posts?.map((post, index) => (
          <SwiperSlide className={style.swiperSlide} key={index}>
            <img src={post.src} alt="" className={style.thumbnail} />
            <div className={style.details}>
              <h4>Best Coin To Invest In Best Coin To Invest In Best Coin To Invest In</h4>
              <span>Derick Jack</span>
              <div className={style.impression}>
                <img src={impression}  alt="Impression icon" />
                <span>55</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

TrendingPost.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired, 
    })
  ),
};

export default TrendingPost;
