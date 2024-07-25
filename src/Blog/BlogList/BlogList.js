import React, { useEffect, useState } from "react";
import { createClient } from "contentful";
import "./bloglist.scss";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  const client = createClient({
    space: process.env.REACT_SPACE,
    accessToken: process.env.REACT_ACCESS_TOKEN,
  });

  useEffect(() => {
    const getAllEnteries = async () => {
      try {
        await client.getEntries().then((entries) => {
          console.log("Objects: ", entries);
          setBlogPosts(entries);
        });
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getAllEnteries();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateSummary = (summary, maxLength) => {
    if (summary.length > maxLength) {
      return summary.substring(0, maxLength) + "...";
    }
    return summary;
  };

  return (
    <div>
      <div className="blog-container">
        {blogPosts?.items?.map((post) => {
          console.log("Post ID:", post.sys.id); // Add this line
          return (
            <section key={post.sys.id} className="blog-post">
              <img
                src={post.fields.blogImage.fields.file.url}
                alt={post.fields.title}
                width="578"
                height="291"
              />
              <div className="blog-content">
                <div className="blog-content-heading">
                  <p className="blog-content-heading-author">
                    {post.fields.blogAuthor}
                  </p>
                  <p>{formatDate(post.fields.createdDate)}</p>
                </div>
                <p className="blog-content-title">{post.fields.blogTitle}</p>
                <p className="blog-content-summary">
                  {truncateSummary(post.fields.blogSummary, 100)}
                </p>
                <div className="read-more-btn">
                  <Link
                    to={`/blogDetails/${post.sys.id}`}
                    className="blog-content-button"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default BlogList;
