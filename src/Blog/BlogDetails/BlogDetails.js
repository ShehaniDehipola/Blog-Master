import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createClient } from "contentful";
import "./blogdetails.scss";

const BlogDetails = () => {
  const client = createClient({
    space: "s9vateo5agvv",
    accessToken: "iePkrI7YcBMR-hIfqMKCW0FpTsWkQYVDaTl46Sr1c1A",
  });

  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);

  console.log(id);

  useEffect(() => {
    const getEntryById = async () => {
      try {
        const entry = await client.getEntry(id);
        console.log("Object: ", entry);
        setBlogPost(entry);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getEntryById();
  }, [id]);

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="blog-details-container">
      <div>
        <div>
          <p className="blog-details-title">{blogPost.fields.blogTitle}</p>
          <div className="blog-details-sub-topic">
            <p className="blog-content-heading-author">
              {blogPost.fields.blogAuthor}
            </p>{" "}
            <p>{formatDate(blogPost.fields.createdDate)}</p>
          </div>
        </div>
        <p className="blog-details-summary">{blogPost.fields.blogSummary}</p>
        <br></br>
        <img
          className="blog-details-img"
          src={blogPost.fields.blogImage.fields.file.url}
          alt={blogPost.fields.title}
          width="578"
          height="291"
        />
        <br />
        <br />
        <p className="blog-details-content">{blogPost.fields.blogContent}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
