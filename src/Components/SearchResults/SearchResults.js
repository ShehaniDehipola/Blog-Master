import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { createClient } from "contentful";
import "./searchresults.scss";

const SearchResults = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");

  const client = createClient({
    space: "s9vateo5agvv",
    accessToken: "iePkrI7YcBMR-hIfqMKCW0FpTsWkQYVDaTl46Sr1c1A",
  });

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        console.log(searchQuery);
        const entries = await client.getEntries({
          content_type: "blogPost",
          "fields.blogContent[match]": searchQuery,
        });
        setBlogPosts(entries.items);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setBlogPosts([]);
      }
    };
    getSearchResults();
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
      <p className="search-result-tag">
        Search Results for <b>{searchQuery}</b>
      </p>
      {blogPosts.length === 0 ? (
        <p>No blog posts found</p>
      ) : (
        <div className="blog-container">
          {blogPosts.map((post) => (
            <section key={post.sys.id} className="blog-post">
              <img
                src={post.fields.blogImage.fields.file.url}
                alt={post.fields.title}
                width="578"
                height="291"
              />
              <div className="blog-content">
                <div className="blog-content-heading">
                  <b>{post.fields.blogAuthor}</b>
                  <p>{formatDate(post.fields.createdDate)}</p>
                </div>
                <p className="blog-content-title">{post.fields.blogTitle}</p>
                <p>{truncateSummary(post.fields.blogSummary, 100)}</p>
                <Link
                  to={`/blogDetails/${post.sys.id}`}
                  className="blog-content-button"
                >
                  Read more
                </Link>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
