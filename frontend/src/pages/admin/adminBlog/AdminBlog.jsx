import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminBlog.module.css";
import AdminBlogForm from "./AdminBlogForm";

export default function AdminBlog() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("https://final-project-6-hh2l.onrender.com/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("❌ Bloglar alınarkən xəta:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Bu blogu silmək istədiyinizə əminsiniz?");
    if (!confirm) return;

    try {
      await axios.delete(`https://final-project-6-hh2l.onrender.com/api/blogs/${id}`);
      alert("🗑️ Blog silindi");
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (err) {
      alert("❌ Silinmə zamanı xəta baş verdi");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className={styles.wrapper}>
      <AdminBlogForm onSuccess={fetchBlogs} />

      <h2 className={styles.heading}>Blogs</h2>
      <div className={styles.blogList}>
        {blogs.map((blog) => (
          <div key={blog._id} className={styles.blogCard}>
            <img
              src={`https://final-project-6-hh2l.onrender.com/images/${blog.image}`}
              alt={blog.title}
              className={styles.image}
            />

            <div className={styles.blogInfo}>
              <h3>{blog.title}</h3>
              <p>{blog.excerpt}</p>
              <small>Cateqory: {blog.category || "Yoxdur"}</small>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(blog._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
