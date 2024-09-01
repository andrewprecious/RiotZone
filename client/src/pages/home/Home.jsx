import { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import homeStyles from "./home.module.css";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { URL } from "../../App";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    document.title = "Runway Riot | Home Page";
  }, []);

  // fetch categories from backend(api)
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(`${URL}/blog/allcategoryLimit5`);
        // console.log(res);
        // console.log(res.data);
        setCategories(res.data); //updates categories
      } catch (error) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  // fetch posts from backend(api)
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(`${URL}/blog/allPostLimit5`);
        // console.log(res);
        // console.log(res.data);
        setPosts(res.data); //updates Posts
      } catch (error) {
        console.log(err);
      }
    };
    getPosts();
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
              Categories
            </h1>
            <Link
              to="#"
              className={`${homeStyles.viewAll} ${appStyles.poppinsMediumItalic}`}
            >
              View All
            </Link>
          </div>

          {/* category card starts */}
          <div className={`${homeStyles.blogCards} ${appStyles.grid2Columns}`}>
            {/* category card1 */}
            {categories.map((category) => (
              <Link
                className={`${appStyles.textDark} ${appStyles.robotoRegular} ${appStyles.noTextDecoration}`}
                key={category._id}
                to={`/category/${category.name}`}
              >
                <div className={`${homeStyles.blogCard}`}>
                  <img
                    src={category.image}
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
                        {category.name}
                      </p>
                      <p className={`${homeStyles.datePublished}`}>
                        {/* {new Date(category.createdAt).toLocalDateString()} */}
                        {new Date(category.createdAt).toLocaleDateString()}

                        {/* {category.createdAt} */}
                      </p>
                    </div>
                    <div className={`${homeStyles.blogCardDesc}`}>
                      Runway-Riot
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

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
            {posts.map((post) => (
              <Link
                className={`${appStyles.textDark} ${appStyles.robotoRegular} ${appStyles.noTextDecoration}`}
                key={post._id}
                to={`/post/${post._id}`}
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
        </div>

        {/* right side */}
        <Sidebar />
      </section>
      {/* categories section ends */}

      <Footer />
    </div>
  );
};

export default Home;
