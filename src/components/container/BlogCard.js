import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="p-4">
      <img
        class="relative z-10 object-cover w-full rounded-md h-96"
        src={blog.image}
        alt={blog.title}
        loading="lazy"
      />

      <div class="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow ">
        <Link
          to="/"
          class="font-semibold text-gray-800 hover:underline md:text-xl"
        >
          {blog.title}
        </Link>

        <p class="mt-3 text-sm text-gray-500 md:text-sm">{blog.description}</p>

        <p class="mt-3 text-sm text-blue-500 flex gap-x-1 items-center">
          <span>{blog.user}</span>•<span>{blog.date}</span>
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
