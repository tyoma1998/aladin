import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ApiService from "services/api";
import history from "history/history";
import { getRoutePath } from "helpers/path";
import { ROUTES } from "router/routes";
import st from "./CheckEventPage.module.css";

function CheckEventPage() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  const loadEvent = async (id) => {
    setIsLoading(true);
    const currentData = await ApiService.getEvent(id);
    setData(currentData);
    setIsLoading(false);
  };

  const handleAnswerQuestion = async (value) => {
    setIsLoading(true);
    await ApiService.answerEvent({ id, data: { value } });
    history.push(getRoutePath(ROUTES.checkEvent.path, { id: +id + 1 }));
    setIsLoading(false);
  };

  useEffect(() => {
    loadEvent(id);
  }, [id]);

  if (+id >= 5) {
    return (
      <div className={st.containerThank}>
        <span className={st.thankText}>Спасибо за ваше участие!!!</span>
      </div>
    );
  }

  return (
    <div className={st.container}>
      <div className={st.containerQustion}>
        <span className={st.qustionText}>
          {!isLoading ? data?.question : "Loading..."}
        </span>
      </div>
      <div className={st.containerButton}>
        <button
          className={st.buttonDeath}
          disabled={isLoading}
          onClick={() => handleAnswerQuestion(false)}
        >
          Убить
        </button>
        <button
          className={st.buttonSpare}
          disabled={isLoading}
          onClick={() => handleAnswerQuestion(true)}
        >
          Пощадить
        </button>
      </div>
      {/* <div>
        <button
          disabled={isLoading}
          onClick={() =>
            history.push(getRoutePath(ROUTES.checkEvent.path, { id: id + 1 }))
          }
        >
          Убить
        </button>
      </div> */}
    </div>
  );
}

export default CheckEventPage;
