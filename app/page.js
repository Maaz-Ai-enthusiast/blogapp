"use-client"

import BlogList from "@/components/BlogList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <div>

      <ToastContainer position="top-right" autoClose={3000}  theme="dark"/> {/* Toast container */}
<Header />
<BlogList/>
<Footer/>
    </div>
  );
}
