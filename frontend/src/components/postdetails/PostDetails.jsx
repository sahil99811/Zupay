import modiji from '../../assets/modiji.jpg';
import style from '../../styles/components/postdetails/PostDetails.module.css';
import send from '../../assets/send.png';
import downside from '../../assets/downside.png'
import { useState } from 'react';
export default function PostDetails() {
    const data = [0, 1, 2, 3];
    const [commentsOpen,setCommentsOpen]=useState(false);
   const onClickHandler=()=>{
      setCommentsOpen(!commentsOpen);
   }
   
    return (
        <div className={style.container}>
            <header className={style.heading}>
                <img src={modiji} className={style.thumbnail} alt="Thumbnail" />
                <div className={style.headinginfo}>
                <span className={style.impression}>Impression:0</span>
                <span className={style.createAt}>Created At:12/01/2003</span>
                </div>
            </header>
            <main className={style.mainContent}>
                <h3 className={style.title}>Best places to visit</h3>
                <span className={style.category}>Tech</span>
                <p className={style.content}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis optio sint eum! Autem, porro eius, aliquid provident nisi expedita deleniti iure architecto suscipit quis consequuntur, voluptatibus itaque error praesentium delectus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia perferendis repellendus id accusamus possimus error cupiditate vitae, magnam aspernatur velit animi numquam alias deleniti vero provident in dolorum nesciunt placeat! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur deserunt voluptates consectetur repellendus facere corrupti voluptas ullam laudantium explicabo, molestiae sit assumenda laborum commodi quia nostrum, nemo, quo doloremque neque. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic laudantium libero eos saepe nesciunt maiores dolor vero non, at sint error culpa omnis nostrum? Incidunt autem sed rerum officiis odio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi eos magnam id repellendus esse voluptas, modi, est accusamus eaque dicta amet possimus non cumque, at accusantium reprehenderit distinctio autem commodi.
                </p>
            </main>
            <section className={style.commentSection}>
                <div className={style.commentHeader}>
                    <div className={style.commentHeading}>
                       <h3>Comments</h3>
                       <img src={downside} onClick={onClickHandler}/>
                    </div>
                    {
                        commentsOpen&&<div className={style.commentsList}>
                        {data.map((val, index) => (
                            <div key={index} className={style.commentItem}>
                                <div className={style.commentText}>
                                    <p>Best blog</p>
                                    <span className={style.commentDate}>12/01/2003</span>
                                </div>
                                <span className={style.commentAuthor}>Sahil Patel</span>
                            </div>
                        ))}
                    </div>
                    }
                </div>
                <div className={style.commentInputContainer}>
                    <input type="text" placeholder="Enter Your Comment" className={style.commentInput} />
                    <img src={send} className={style.sendIcon} alt="Send" />
                </div>
            </section>
        </div>
    );
}
