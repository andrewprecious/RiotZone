import { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import SinglePostStyles from "./singlePost.module.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import RelatedPosts from "../../components/relatedPosts/RelatedPosts";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { URL } from "../../App";
import ReactMarkdown from "react-markdown";

const SinglePost = () => {
  const [post, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  // console.log(location);
  // console.log(location.pathname.split("/"););

  const id = location.pathname.split("/")[2]; // grabs post id

  useEffect(() => {
    document.title = "Runway Riot | Single Post Page";
  }, []);

  // get single post
  useEffect(() => {
    const getSinglePosts = async () => {
      try {
        const res = await axios.get(`${URL}/blog/post/${id}`);
        // console.log(res.data);
        setLoading(false);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getSinglePosts();
  }, [id]);

  return (
    <div
      className={`${SinglePostStyles.singlePostPage}  ${appStyles.bgSmokyStone}`}
    >
      <Navbar />
      <section
        className={`${SinglePostStyles.singlePostLayout} ${appStyles.blogLayout} ${appStyles.container}`}
      >
        <div className={`${SinglePostStyles.left}`}>
          <div
            className={`${SinglePostStyles.caption} ${appStyles.flex} ${appStyles.bgWhite}`}
          >
            <h1 className={`${appStyles.robotoBlack} ${appStyles.textDark}`}>
              {loading ? "loading..." : post.title}
            </h1>
          </div>

          {loading ? (
            "loading..."
          ) : (
            <div
              className={`${SinglePostStyles.postContent} ${appStyles.mt20}`}
            >
              <img src={post.image} width="100%" height="300px" alt="pic" />
              <div className={`${SinglePostStyles.postInfo}`}>
                <p
                  className={`${appStyles.opacity5} ${appStyles.robotoThinItalic}`}
                  style={{ color: "red", fontWeight: "bold" }}
                >
                  {post.category.map((cat, index) => (
                    <span key={index} style={{ marginRight: "8px" }}>
                      {cat}
                    </span>
                  ))}
                </p>
                <p
                  className={`${appStyles.opacity5} ${appStyles.robotoThinItalic}`}
                >
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                {/* <p className={`${SinglePostStyles.actions} ${appStyles.flex2}`}>
                  <Link to="#">Edit</Link>
                  <Link to="#">Delete</Link>
                </p> */}
              </div>
              <div>
                <ReactMarkdown>{post.body}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        {/* related posts */}
        {loading ? (
          "loading..."
        ) : (
          <div className={`${SinglePostStyles.right}`}>
            <RelatedPosts RelatedPost={post.category[0]} />
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default SinglePost;
