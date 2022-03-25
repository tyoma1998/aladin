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

  const getTextFalse = (id) => {
    if (+id === 2) {
      return "Вооружать";
    }

    if (+id === 3) {
      return "Султан";
    }

    return "Убить";
  };

  const getTextTrue = (id) => {
    if (+id === 2) {
      return "Не вооружать";
    }

    if (+id === 3) {
      return "Жасмин";
    }

    return "Пощадить";
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
              console.log(item.id);
              const textFalse = getTextFalse(item.id);
              const textTrue = getTextTrue(item.id);

              return (
                <div className={st.textCheck}>
                  {item.question}: {textTrue}-
                  {item.data.filter((value) => !!value).length} {textFalse}-
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
