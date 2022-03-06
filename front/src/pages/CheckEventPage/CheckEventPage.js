import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ApiService from "services/api";

function CheckEventPage() {
  const { id } = useParams();
  const [data, setData] = useState();

  const loadEvent = async () => {
    const currentData = await ApiService.getEvent(id);
    setData(currentData);
  };

  console.log(data);

  useEffect(() => {
    loadEvent();
  }, []);

  return <div>{data?.question || "Loading..."}</div>;
}

export default CheckEventPage;
