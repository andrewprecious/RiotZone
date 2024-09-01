import appStyles from "../../App.module.css";
import homeStyles from "../home/home.module.css";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { URL } from "../../App";

// import categoryConStyles from "./categoryContents.module.css";

const CategoryContents = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const [posts, setPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log(location);

  useEffect(() => {
    document.title = "Runway Riot | Category";
  }, []);

  // getpost under category
  useEffect(() => {
    const getPostsUnderCategory = async () => {
      try {
        const res = await axios.get(`${URL}/blog/posts/category/${category}`);
        // console.log(res.data);
        setLoading(false);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
        setLoading(false);
        if (err.response && err.response.status === 404) {
          setError(err.response.data.message);
        } else {
          setError("An error occured while fetching the posts.");
        }
      }
    };
    getPostsUnderCategory();
  }, [category]);

  // recent posts
  useEffect(() => {
    const getRecentPosts = async () => {
      try {
        const res = await axios.get(`${URL}/blog/allPostLimit5`);
        setRecentPosts(res.data); //updates Posts
      } catch (error) {
        console.log(err);
      }
    };
    getRecentPosts();
  }, []);

  return (
    <div
      className={`${homeStyles.Home} ${appStyles.home} ${appStyles.bgSmokyStone}`}
    >
      <Navbar />
      {/* categories section starts */}
      <section
        className={`${homeStyles.homeLayout} ${appStyles.blogLayout} ${appStyles.container}`}
      >
        {/* left side */}
        <div className={`${homeStyles.left}`}>
          {/* left categories heading side */}
          <div
            className={`${homeStyles.caption} ${appStyles.flex} ${appStyles.bgWhite}`}
          >
            <h1
              className={`${homeStyles.catergory} ${homeStyles.robotoBlack} ${homeStyles.textDark}`}
            >
              Posts Under {category}
            </h1>
            <Link
              to="#"
              className={`${homeStyles.viewAll} ${appStyles.poppinsMediumItalic}`}
            >
              View All
            </Link>
          </div>

          {loading ? (
            <p>Loading, please wait...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div
              className={`${homeStyles.blogCards} ${appStyles.grid2Columns}`}
            >
              {posts.map((post) => (
                <Link
                  className={`${appStyles.textDark} ${appStyles.robotoRegular} ${appStyles.noTextDecoration}`}
                  to={`/post/${post._id}`}
                  key={post._id}
                >
                  <div className={`${homeStyles.blogCard}`}>
                    <img
                      src={post.image}
                      width="100%"
                      height="300px"
                      alt="pic"
                    />
                    <div
                      className={`${homeStyles.blogCardInfo} ${appStyles.flexColumn}`}
                    >
                      <div
                        className={`${homeStyles.blogCardText} ${appStyles.flex}`}
                      >
                        <p
                          className={`${appStyles.robotoBoldItalic} ${homeStyles.categoryName}`}
                        >
                          {post.category.map((name, index) => (
                            <span key={index} style={{ marginRight: "5px" }}>
                              {name}
                            </span>
                          ))}
                        </p>
                        <p className={`${homeStyles.datePublished}`}>
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={`${homeStyles.blogCardDesc}`}>
                        {post.title}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* post starts here */}
          <div
            className={`${homeStyles.caption} ${appStyles.flex} ${appStyles.bgWhite} ${appStyles.mt50}`}
          >
            <h1
              className={`${homeStyles.catergory} ${homeStyles.robotoBlack} ${homeStyles.textDark}`}
            >
              Recent Posts
            </h1>
            <Link
              to="#"
              className={`${homeStyles.viewAll} ${appStyles.poppinsMediumItalic}`}
            >
              View All
            </Link>
          </div>

          {/* post card starts */}

          <div className={`${homeStyles.blogCards} ${appStyles.grid2Columns}`}>
            {/* post card1 */}
            {recentPosts.map((post) => (
              <Link
                className={`${appStyles.textDark} ${appStyles.robotoRegular} ${appStyles.noTextDecoration}`}
                key={post._id}
              >
                <div className={`${homeStyles.blogCard}`}>
                  <img src={post.image} width="100%" height="300px" alt="pic" />
                  <div
                    className={`${homeStyles.blogCardInfo} ${appStyles.flexColumn}`}
                  >
                    <div
                      className={`${homeStyles.blogCardText} ${appStyles.flex}`}
                    >
                      <p
                        className={`${appStyles.robotoBoldItalic} ${homeStyles.categoryName}`}
                      >
                        {post.category.map((name, index) => (
                          <span key={index} style={{ marginRight: "5px" }}>
                            {name}
                          </span>
                        ))}
                      </p>
                      <p className={`${homeStyles.datePublished}`}>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`${homeStyles.blogCardDesc}`}>
                      {post.title}
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* post card ends */}
          </div>
          {/* post cards ends */}
        </div>

        {/* right side */}
        <Sidebar />
      </section>
      {/* categories section ends */}

      <Footer />
    </div>
  );
};

export default CategoryContents;
