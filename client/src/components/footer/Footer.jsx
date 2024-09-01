import { useEffect, useState } from "react";
import footerStyles from "./footer.module.css";
import appStyles from "../../App.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../../App";
const Footer = () => {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);

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
      className={`${footerStyles.footer} ${appStyles.bgDark} ${appStyles.grid3Columns}`}
    >
      {/* footer left */}
      <div className={`${footerStyles.left} ${appStyles.flexColumn}`}>
        <h2 className={`${appStyles.textWhite}`}>GET IN TOUCH</h2>
        <div className={`${footerStyles.contactInfo}`}>
          <p className={`${appStyles.textWhite} ${appStyles.opacity5}`}>
            <i className="fa fa-map-marker" aria-hidden="true"></i> 123 Street,
            New York, USA
          </p>
          <p className={`${appStyles.textWhite} ${appStyles.opacity5}`}>
            <i className="fa fa-phone" aria-hidden="true"></i> +012 345 67890
          </p>
          <p className={`${appStyles.textWhite} ${appStyles.opacity5}`}>
            <i className="fa fa-envelope" aria-hidden="true"></i>{" "}
            info@example.com
          </p>
        </div>

        <div className={`${footerStyles.socialHandles}`}>
          <h2 className={`${appStyles.textWhite}`}>Follow us</h2>
          <Link>
            <i className="fa fa-facebook-official" aria-hidden="true"></i>
          </Link>
          <Link>
            <i className="fa fa-instagram" aria-hidden="true"></i>
          </Link>
          <Link>
            <i className="fa fa-twitter" aria-hidden="true"></i>
          </Link>
          <Link>
            <i className="fa fa-youtube" aria-hidden="true"></i>
          </Link>
        </div>
      </div>

      {/* footer middle */}
      <div className={`${footerStyles.middle} ${appStyles.flexColumn}`}>
        <h2 className={`${appStyles.textWhite}`}>Recent News</h2>
        {posts.map((post) => (
          <div className={`${footerStyles.recentPost}`} key={post._id}>
            <div className={`${footerStyles.top}`}>
              <p className={`${footerStyles.categoryPara}`}>Category</p>
              <p className={`${appStyles.textWhite} ${appStyles.opacity5}`}>
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>

            <p
              className={`${footerStyles.bottom} ${appStyles.textWhite} ${appStyles.opacity5}`}
            >
              {post.title}
            </p>
          </div>
        ))}
      </div>

      <div className={`${footerStyles.right} ${appStyles.flexColumn}`}>
        <h2 className={`${appStyles.textWhite}`}>Categories</h2>
        <div className={`${footerStyles.categoriesList}`}>
          {categories.map((category) => (
            <div key={category._id}>{category.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
