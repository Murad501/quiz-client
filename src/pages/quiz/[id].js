import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import RootLayout from "../../../components/Layouts/RootLayout";
import { MdWatchLater } from "react-icons/md";

const QuizDetails = ({ questions }) => {
  const router = useRouter();
  //   const { id } = router.query;
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [quizNumber, setQuizNumber] = useState(1);

  const currentQuiz = questions.find((quiz, idx) => idx + 1 === quizNumber);

  useEffect(() => {
    const interval = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(interval);
      } else if (seconds === 0) {
        setSeconds(59);
        setMinutes((prevMinutes) => prevMinutes - 1);
      } else {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  const handleSetNextQuiz = (nextQuizId) => {
    if (filteredQuestions?.length < nextQuizId) {
      return;
    }
    setQuizNumber(quizNumber + 1);
  };

  return (
    <div className="flex flex-col  mx-auto max-w-5xl">
      <div className=" p-4">
        <h1 className="text-3xl font-semibold my-5">
          {quizNumber}. {currentQuiz?.questionText}
        </h1>
        {/* <img
          src={`/images/${questions[currentQuestion].image}`}
          alt="Question"
          className="max-w-full h-auto my-4"
        /> */}
        <div className="flex justify-end items-center">
          <h2 className="font-semibold flex items-center gap-1 text-lg">
            <MdWatchLater />: {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </h2>
        </div>
        <h2 className="text-lg font-medium">{currentQuiz.question}</h2>
        <ui className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 list-none">
          {currentQuiz.answerOptions?.map((option, index) => (
            <li
              key={index}
              className={` rounded-md hover:bg-blue-100 p-5  cursor-pointer disabled`}
              //   onClick={() => handleOptionSelect(option)}
            >
              <label className="items-center grid grid-cols-1 cursor-pointer">
                <span className=" font-semibold text-xl text-gray-700 mb-2">
                  {index + 1}. {option?.answerText}
                </span>
                <input
                  disabled
                  type="radio"
                  name="quizOption"
                  className="form-radio h-4 w-4 text-blue-500"
                  value={option}
                  //   checked={selectedOption === option}
                  //   onChange={() => handleOptionSelect(option)}
                />
              </label>
            </li>
          ))}
        </ui>
      </div>
      <div className="flex justify-center items-end my-10">
        <button className="px-8 py-2 bg-green-500 text-white rounded-md ms-auto  hover:bg-green-600 cursor-pointer">
          Skip
        </button>
        <button
          onClick={() => handleSetNextQuiz(quizNumber + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md ms-auto  hover:bg-blue-600 cursor-pointer"
        >
          Next Question
        </button>
      </div>
    </div>
  );
};

export default QuizDetails;

QuizDetails.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:5000/questions");
  const questions = await res.json();

  const paths = questions.map((question) => ({
    params: { id: question.categoryId.toString() },
  }));

  return { paths, fallback: false };
};

// fetch data from db.json
export const getStaticProps = async (context) => {
  const { params } = context;
  const res = await fetch(`http://localhost:5000/questions/${params?.id}`);
  const data = await res.json();

  return {
    props: {
      questions: data,
    },
  };
};
