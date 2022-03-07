import React, { useEffect, useState } from "react";
import ApiService from "services/api";
import st from "./AllDataPages.module.css";

function AllDataPages() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  const loadEvent = async () => {
    setIsLoading(true);
    const currentData = await ApiService.getAllEvent();
    setData(currentData);
    setIsLoading(false);
  };

  useEffect(() => {
    loadEvent();
  }, []);

  return (
    <div className={st.container}>
      {!isLoading ? (
        <div>
          {data?.length > 0 &&
            data.map((item) => {
              return (
                <div>
                  {item.question}: за-
                  {item.data.filter((value) => !!value).length} против-
                  {item.data.filter((value) => !value).length}
                </div>
              );
            })}
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default AllDataPages;
