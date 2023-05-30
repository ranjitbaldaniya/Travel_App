import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditTour = () => {
  const [tour, setTour] = useState({});
  const userId = useParams();
  console.log("params tour", tour);

  //handleGetTour
  const handleGetTour = async () => {
    let url = `http://localhost:3001/tour/editTour/${userId.id}`;
    try {
      const response = await axios.get(url, userId);
      console.log("res", response);
      setTour(response.data);
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  useEffect(() => {
    handleGetTour();
  }, []);
  return (
    <>
      <h2>Edit User Page</h2>
    </>
  );
};

export default EditTour;
