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
  const [isAnsweredQuestion, setIsAnsweredQuestion] = useState(false);

  const loadEvent = async (id) => {
    setIsLoading(true);
    const currentData = await ApiService.getEvent(id);
    setData(currentData);
    setIsLoading(false);
  };

  const handleAnswerQuestion = async (value) => {
    setIsLoading(true);
    await ApiService.answerEvent({ id, data: { value } });
    setIsAnsweredQuestion(true);
    setIsLoading(false);

    if (+id === 3) {
      handleNextQuestion();
    }
  };

  const handleNextQuestion = () => {
    history.push(getRoutePath(ROUTES.checkEvent.path, { id: +id + 1 }));
    setIsAnsweredQuestion(false);
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
    loadEvent(id);

    if (isAnsweredQuestion) {
      setIsAnsweredQuestion(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (+id >= 4) {
    return (
      <div className={st.containerThank}>
        <span className={st.thankText}>Спасибо за ваше участие!!!</span>
      </div>
    );
  }

  if (isAnsweredQuestion) {
    return (
      <div className={st.allContainer}>
        <div className={st.imgHolde}>
          <img
            src="https://sun9-25.userapi.com/impf/RNqWLcsA9tZaPpecjUWatQapmVvvsIus1JQBrg/cQilw6t3MI4.jpg?size=750x536&quality=96&sign=298f4b5b603c6d7b8ee25e9ae8b9fa3f&type=album"
            alt="Img"
            className={st.holderImg}
          />
        </div>
        <div className={st.containerInfo}>
          <span className={st.thankText}>
            Спасибо за ваш ответ, для перехода к следующему вопросу нажмите на
            кнопку ниже
          </span>
          <button
            className={st.buttonNext}
            disabled={isLoading}
            onClick={() => handleNextQuestion()}
          >
            Перейти к следующему вопросу
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={st.allContainer}>
      <div className={st.imgHolde}>
        <img
          src="https://sun9-25.userapi.com/impf/RNqWLcsA9tZaPpecjUWatQapmVvvsIus1JQBrg/cQilw6t3MI4.jpg?size=750x536&quality=96&sign=298f4b5b603c6d7b8ee25e9ae8b9fa3f&type=album"
          alt="Img"
          className={st.holderImg}
        />
      </div>
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
            {getTextFalse(id)}
          </button>
          <button
            className={st.buttonSpare}
            disabled={isLoading}
            onClick={() => handleAnswerQuestion(true)}
          >
            {getTextTrue(id)}
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
    </div>
  );
}

export default CheckEventPage;
