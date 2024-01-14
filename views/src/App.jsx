import { useState, useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/v1/categories");
        console.log("responsev1", response);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const fetchDataNet = async () => {
      try {
        const response = await fetch("/api/v2/details", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: "John", age: 30 }),
        });
        console.log("responsev2", response);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
    fetchDataNet();
  }, []);
  return (
    <>
      <div>HELLO</div>
    </>
  );
}

export default App;
