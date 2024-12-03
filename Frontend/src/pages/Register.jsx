import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const navigate =useNavigate()

  const changePhotoHandler = (e) => {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);

    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/users/register",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // console.log(formData)
      console.log(data)
      toast.success( data.message ||"User registered Successfully");
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setEducation("");
      setPhoto("");
      setPhotoPreview("");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Please fill required fields")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
        <form onSubmit={handleRegister}>
          <div className="font-semibold text-xl items-center text-center">
            Abhi<span className="text-blue-500">Blog</span>
          </div>
          <h1 className="text-xl font-semibold mb-6">Register</h1>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <select
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="">Select Your Education</option>
            <option value="graduate">Graduate</option>
            <option value="intermediate">Intermediate</option>
            <option value="matriculate">matriculate</option>
            <option value="illiterate">Illiterate</option>
          </select>
          <div className="flex items-center mb-4">
            <div className="photo w-20 h-20 mr-4">
              <img
                src={photoPreview ? `${photoPreview}` : "photo"}
                alt="photo"
              />
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              name=""
              id=""
              className="w-full p-2 mb-4 border rounded-md"
            />
          </div>
          <p className="text-center mb-4">
            Already registered? <Link  to={'/login'} className="text-blue-600">Login Now</Link>
          </p>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
