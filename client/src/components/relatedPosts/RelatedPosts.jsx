import appStyles from "../../App.module.css";
import { useEffect, useState } from "react";
import sidebarStyles from "../sidebar/sidebar.module.css";
// import relatedPostStyle from "./related.module.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { URL } from "../../App";

const RelatedPosts = ({ RelatedPost }) => {
  const [posts, setPosts] = useState([]);

  // get related posts
  useEffect(() => {
    const getRelatedPost = async () => {
      try {
        const res = await axios.get(
          `${URL}/blog/posts/category/${RelatedPost}`
        );
        console.log(res.data);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRelatedPost();
  }, []);
  return (
    <div>
      <div className={`${sidebarStyles.right}`}>
        <div className={`${sidebarStyles.caption}  ${appStyles.bgWhite}`}>
          <h1
            className={`${sidebarStyles.catergory} ${sidebarStyles.robotoBlack} ${sidebarStyles.textDark}`}
          >
            Related Posts
          </h1>
        </div>

        <div className={`${sidebarStyles.blogCards}`}>
          {/* top stories card1 */}
          {posts.map((post) => (
            <div
              className={`${sidebarStyles.blogCard} ${sidebarStyles.topStories} ${appStyles.flex2} ${appStyles.mt20}`}
              key={post._id}
            >
              {" "}
              <img src={post.image} width="100px" height="100%" alt="pic" />
              <div className={`${sidebarStyles.blogCardInfo}`}>
                <div
                  className={`${sidebarStyles.blogCardText} ${appStyles.flex}`}
                >
                  <p
                    className={`${appStyles.robotoBoldItalic} ${sidebarStyles.categoryName}`}
                  >
                    {post.category[0]}
                  </p>
                  <p className={`${sidebarStyles.datePublished}`}>
                    {" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className={`${sidebarStyles.blogCardDesc}`}>
                  <Link
                    className={`${appStyles.textDark}`}
                    to={`/post/${post._id}`}
                  >
                    {post.title}
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* top stories card ends */}
        </div>
      </div>
    </div>
  );
};

export default RelatedPosts;
