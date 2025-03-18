import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Test_page() {
  const handleClick = () => {
    toast.success("تمت العملية بنجاح! 🎉"); // إشعار نجاح
  };

  return (
    <div>
      <h1>مرحبًا بك في تطبيقي</h1>
      <button onClick={handleClick}>اضغط هنا</button>
      <ToastContainer />
    </div>
  );
}

export default Test_page;