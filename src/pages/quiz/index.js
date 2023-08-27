import { useEffect, useState } from "react";
import RootLayout from "../../../components/Layouts/RootLayout";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdWatchLater } from "react-icons/md";

const Quizzes = ({ quizzes }) => {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [navigate, setNavigate] = useState(false);
  const [quizNumber, setQuizNumber] = useState(1);
  const [quizHistory, setQuizHistory] = useState([
    { idx: null, correct: false, skip: false, answered: false, time: "1" },
  ]);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(quizzes.length).fill(null)
  );

  const [isAnswered, setIsAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isSkip, setIsSkip] = useState(false);
  const currentQuiz = quizzes?.find((quiz, idx) => idx + 1 === quizNumber);

  // Function to move to the next quiz
  const handleSetNextQuiz = (currentQuizIdx) => {
    if (quizzes?.length === currentQuizIdx) {
      console.log("Quiz finished");
      setFinished(true);
      return;
    }
    setQuizNumber(currentQuizIdx + 1);
    setIsAnswered(false);
    setSeconds(0);
    setMinutes(1);
  };

  // Function to handle answering a question
  const handleAnswerQuestion = (optionIndex) => {
    setSelectedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[quizNumber - 1] = optionIndex;
      return updatedOptions;
    });
    setIsAnswered(true);
    setIsSkip(false);
    setSeconds(0);
    setMinutes(0);
  };

  const handleSkipQuestion = (currentQuizIdx) => {
    if (quizzes?.length === currentQuizIdx) {
      console.log("Quiz finished");
      setFinished(true);
      return;
    }
    setQuizNumber(currentQuizIdx + 1);
    setSeconds(0);
    setMinutes(1);
  };

  const handleComplete = () => {
    setFinished(true);
  };

  useEffect(() => {
    // Countdown timer logic
    const interval = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(interval);
        if (navigate) {
          handleSetNextQuiz(quizNumber);
        } // Move to the next quiz when timer ends
      } else if (seconds === 0) {
        setSeconds(59);
        setMinutes((prevMinutes) => prevMinutes - 1);
      } else {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds, quizNumber, navigate]);

  return (
    <section className="max-w-5xl mx-auto">
      <div className="my-10 w-full">
        <button className="flex items-center justify-start gap-2 font-semibold text-[#4d4d4d] border-b border-gray-500 py-2 pr-5">
          <BiSolidCategoryAlt /> All Quizzes
        </button>
      </div>

      <div className="p-4">
        <h1 className="text-3xl font-semibold my-5">
          {quizNumber}. {currentQuiz?.question}
        </h1>
        <div className="flex justify-end items-center">
          <h2 className="font-semibold flex items-center gap-1 text-lg">
            <MdWatchLater />: {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </h2>
        </div>
      </div>
      <div>
        <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 list-none">
          {currentQuiz.options?.map((option, index) => (
            <li
              onClick={() => handleAnswerQuestion(index)}
              key={index}
              className={`rounded-md hover:bg-blue-100 p-5 cursor-pointer disabled`}
            >
              <label className="items-center grid grid-cols-1 cursor-pointer">
                <span className="font-semibold text-xl text-gray-700 mb-2">
                  {index + 1}. {option}
                </span>
                <input
                  defaultChecked={false}
                  type="radio"
                  name="quizOption"
                  className="form-radio h-4 w-4 text-blue-500"
                  value={option}
                  checked={selectedOptions[quizNumber - 1] === index}
                />
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center items-end my-10">
        {finished ? (
          <button
            onClick={handleComplete}
            className="px-8 py-2 bg-green-500 text-white rounded-md ms-auto hover:bg-green-600 cursor-pointer"
          >
            Complete
          </button>
        ) : (
          <div className="w-full flex justify-end">
            {!isAnswered && !isSkip ? (
              <button
                onClick={() => handleSkipQuestion(quizNumber)}
                className="px-8 py-2 bg-orange-500 text-white rounded-md ms-auto hover:bg-orange-600 cursor-pointer"
              >
                Skip
              </button>
            ) : (
              <button
                onClick={() => handleSetNextQuiz(quizNumber)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md ms-auto hover:bg-blue-600 cursor-pointer"
              >
                Next Question
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Quizzes;

Quizzes.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

// fetch data from db.json
export const getStaticProps = async () => {
  const res = await fetch(
    "https://quiz.saidurdev.com/api/questions?apikey=thisIsApiKey321"
  );
  const data = await res.json();

  return {
    props: {
      quizzes: data?.data,
    },
  };
};
