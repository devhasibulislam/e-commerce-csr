import React from "react";
import GreyText from "../GreyText";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BlogCard from "../cards/BlogCard";

const Blogs = () => {
  // carousel data
  const blogs = [
    {
      image: "/assets/blogs/blog1.jpeg",
      title: "Sagittis vitae et leo duis ut diam quam nulla porttitor",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis sint autem nesciunt, laudantium quia tempore delect",
      user: "Jameson Dick",
      date: "May 20, 2021",
    },
    {
      image: "/assets/blogs/blog2.jpeg",
      title: "Sagittis vitae et leo duis ut diam quam nulla porttitor",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis sint autem nesciunt, laudantium quia tempore delect",
      user: "Jameson Dick",
      date: "May 20, 2021",
    },
    {
      image: "/assets/blogs/blog3.jpeg",
      title: "Sagittis vitae et leo duis ut diam quam nulla porttitor",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis sint autem nesciunt, laudantium quia tempore delect",
      user: "Jameson Dick",
      date: "May 20, 2021",
    },
    {
      image: "/assets/blogs/blog4.webp",
      title: "Sagittis vitae et leo duis ut diam quam nulla porttitor",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis sint autem nesciunt, laudantium quia tempore delect",
      user: "Jameson Dick",
      date: "May 20, 2021",
    },
    {
      image: "/assets/blogs/blog1.jpeg",
      title: "Sagittis vitae et leo duis ut diam quam nulla porttitor",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis sint autem nesciunt, laudantium quia tempore delect",
      user: "Jameson Dick",
      date: "May 20, 2021",
    },
    {
      image: "/assets/blogs/blog2.jpeg",
      title: "Sagittis vitae et leo duis ut diam quam nulla porttitor",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis sint autem nesciunt, laudantium quia tempore delect",
      user: "Jameson Dick",
      date: "May 20, 2021",
    },
    {
      image: "/assets/blogs/blog3.jpeg",
      title: "Sagittis vitae et leo duis ut diam quam nulla porttitor",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis sint autem nesciunt, laudantium quia tempore delect",
      user: "Jameson Dick",
      date: "May 20, 2021",
    },
    {
      image: "/assets/blogs/blog4.webp",
      title: "Sagittis vitae et leo duis ut diam quam nulla porttitor",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis sint autem nesciunt, laudantium quia tempore delect",
      user: "Jameson Dick",
      date: "May 20, 2021",
    },
    {
      image: "/assets/blogs/blog1.jpeg",
      title: "Sagittis vitae et leo duis ut diam quam nulla porttitor",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis sint autem nesciunt, laudantium quia tempore delect",
      user: "Jameson Dick",
      date: "May 20, 2021",
    },
    {
      image: "/assets/blogs/blog2.jpeg",
      title: "Sagittis vitae et leo duis ut diam quam nulla porttitor",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis sint autem nesciunt, laudantium quia tempore delect",
      user: "Jameson Dick",
      date: "May 20, 2021",
    },
  ];

  // carousel configuration
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
      partialVisibilityGutter: 40,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="bg-[#f7f7f9] container mx-auto py-20 lg:px-20 md:px-10 px-4  rounded-3xl">
      <h1 className="lg:text-4xl md:text-2xl text-xl font-semibold mb-4">
        The latest news. <GreyText>From the Canim blog</GreyText>
      </h1>
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        arrows={true}
        infinite={true}
        className="py-4 discover_carousel"
      >
        {blogs?.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </Carousel>
    </section>
  );
};

export default Blogs;
