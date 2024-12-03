import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie"

// Create Context
export const AuthContext = createContext();

 export const AuthProvider = ({ children }) => {
  // Local state for managing blogs
  const [blogs, setBlogs] = useState();
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false)


  // Fetch data from API using useEffect
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("token") //getting cookies from browser
        console.log("Raw cookie value:", token);

        const parsedToken = token ? JSON.parse(token):undefined;
        if(parsedToken){
        const {data} = await axios.get(
          "http://localhost:4001/api/users/my-profile",
          {
            withCredentials: true, // If you're sending cookies or authorization headers
           headers:{"Content-Type":"application/json"}
          }
        );
      
        console.log(data);
        setProfile(data); // Update state with the fetched data
        setIsAuthenticated(true)
      } 
    }catch (error) {
        console.log("Error fetching profile:", error);
      }
    };
    const fetchBlogs = async () => {
      try {
        const {data} = await axios.get(
          // "http://localhost:4001/api/blogs/all-blogs",
          "http://localhost:4001/api/blogs/all-blogs",
          {
            withCredentials: true, // If you're sending cookies or authorization headers
          }
        );
        console.log(data);
        setBlogs(data); // Update state with the fetched data
      } catch (error) {
        console.log("Error fetching blogs:", error);
      }
    };
    fetchProfile()
    fetchBlogs();
  }, []); // Empty dependency array ensures it runs only once after the component mounts

  return (
    <AuthContext.Provider value={{ blogs, profile , isAuthenticated}}>{children}</AuthContext.Provider>
  );
};

// export default AuthProvider;

// Custom hook for consuming context
export const useAuth = () => useContext(AuthContext);
