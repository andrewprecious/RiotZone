import { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import sidebarStyles from "./sidebar.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../../App";

const Sidebar = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getTopStories = async () => {
      try {
        const res = await axios.get(`${URL}/blog/allTopStories`);
        // console.log(res.data);
        setPosts(res.data);
      } catch (error) {
        console.log(err);
      }
    };
    getTopStories();
  }, []);

  return (
    <div>
      <div className={`${sidebarStyles.right}`}>
        <div className={`${sidebarStyles.caption}  ${appStyles.bgWhite}`}>
          <h1
            className={`${sidebarStyles.catergory} ${sidebarStyles.robotoBlack} ${sidebarStyles.textDark}`}
          >
            Top Stories
          </h1>
        </div>

        <div className={`${sidebarStyles.blogCards}`}>
          {/* top stories card1 */}
          {posts.map((post) => (
            <div
              className={`${sidebarStyles.blogCard} ${sidebarStyles.topStories} ${appStyles.flex2} ${appStyles.mt20}`}
              key={post._id}
            >
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

export default Sidebar;
