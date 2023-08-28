import { useEffect, useState } from "react";
import RootLayout from "../../../components/Layouts/RootLayout";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdWatchLater } from "react-icons/md";
import ResultModal from "@/components/UI/Quiz/ResultModal";

const Quizzes = ({ quizzes }) => {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [navigate, setNavigate] = useState(true);
  const [quizNumber, setQuizNumber] = useState(1);
  const [quizHistory, setQuizHistory] = useState([]);
  const [openResultModal, setOpenResultModal] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(quizzes.length).fill(null)
  );

  const [isAvailable, setIsAvailable] = useState(false);

  const [isAnswered, setIsAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isSkip, setIsSkip] = useState(false);
  const currentQuiz = quizzes?.find((quiz, idx) => idx + 1 === quizNumber);

  useEffect(() => {
    const available = quizHistory?.find((quiz, idx) => idx + 1 === quizNumber);
    setIsAvailable(available);
  }, [quizHistory, quizNumber]);

  // Function to move to the next quiz
  const handleSetNextQuiz = (currentQuizIdx) => {
    if (quizzes?.length === currentQuizIdx) {
      setFinished(true);
      return;
    }
    setQuizNumber(currentQuizIdx + 1);
    setIsAnswered(false);
    setSeconds(0);
    setMinutes(1);
    setNavigate(true);
  };

  // Function to handle answering a question
  const handleAnswerQuestion = ({ option, index }) => {
    const isRightAnswer = quizzes[quizNumber - 1]?.answer === option;

    const quiz = quizzes[quizNumber - 1];

    const correctIndex = quizzes[quizNumber - 1]?.options?.indexOf(
      quiz?.answer
    );

    const details = {
      quizIdx: quizNumber - 1,
      skip: false,
      selectedIndex: index,
      correctIndex: correctIndex,
      answered: true,
      correct: isRightAnswer,
      timeOut: false,
      totalSeconds: seconds,
      totalMinutes: minutes,
    };

    const isAvailable = quizHistory?.find(
      (history) => history?.quizIdx === details?.quizIdx
    );
    if (!isAvailable) {
      setQuizHistory([...quizHistory, details]);
    }

    setSelectedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[quizNumber - 1] = index;
      return updatedOptions;
    });
    setIsAnswered(true);
    setIsSkip(false);
    setSeconds(0);
    setMinutes(0);
    setNavigate(false);
  };

  // handle quiz skip function
  const handleSkipQuestion = (currentQuizIdx) => {
    const details = {
      quizIdx: currentQuizIdx - 1,
      skip: true,
      answered: false,
      correct: false,
      timeOut: false,
      totalSeconds: seconds,
      totalMinutes: minutes,
    };

    const isAvailable = quizHistory?.find(
      (history) => history?.quizIdx === details?.quizIdx
    );
    if (!isAvailable) {
      setQuizHistory([...quizHistory, details]);
    }

    if (quizzes?.length === currentQuizIdx) {
      setFinished(true);
      return;
    }
    setQuizNumber(currentQuizIdx + 1);
    setSeconds(0);
    setMinutes(1);
  };

  // handle complete quiz
  const handleComplete = () => {
    setFinished(true);
    setOpenResultModal(true);
  };

  // handle close modal
  const handleCloseModal = () => {
    setFinished(false);
    setOpenResultModal(false);
    setQuizHistory([]);
    setQuizNumber(1);
    setMinutes(1);
    setSeconds(0);
    setIsAvailable(false),
      setSelectedOptions(Array(quizzes.length).fill(null)),
      setIsSkip(false),
      setFinished(false),
      setIsAnswered(false);
    setNavigate(true);
  };

  // clear all state when retake quiz
  const handleRetake = () => {
    setFinished(false);
    setOpenResultModal(false);
    setQuizHistory([]);
    setQuizNumber(1);
    setMinutes(1);
    setSeconds(0);
    setIsAvailable(false),
      setSelectedOptions(Array(quizzes.length).fill(null)),
      setIsSkip(false),
      setFinished(false),
      setIsAnswered(false);
    setNavigate(true);
  };

  //clear all state when navigate home page
  const handleNavigateHome = () => {
    setFinished(false);
    setOpenResultModal(false);
    setQuizHistory([]);
    setQuizNumber(1);
    setMinutes(1);
    setSeconds(0);
    setIsAvailable(false),
      setSelectedOptions(Array(quizzes.length).fill(null)),
      setIsSkip(false),
      setFinished(false),
      setIsAnswered(false);
    setNavigate(true);
  };

  // Countdown timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(interval);
        if (quizzes?.length !== quizNumber && navigate) {
          const details = {
            quizIdx: quizNumber - 1,
            skip: false,
            answered: false,
            correct: false,
            timeOut: true,
            totalSeconds: seconds,
            totalMinutes: minutes,
          };

          const isAvailable = quizHistory?.find(
            (history) => history?.quizIdx === details?.quizIdx
          );
          if (!isAvailable) {
            setQuizHistory([...quizHistory, details]);
          }

          handleSetNextQuiz(quizNumber);
        }
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
    <section>
      <div className="max-w-5xl mx-auto">
        <div className="my-5 md:my-10 w-full">
          <button className="flex items-center justify-start gap-2 font-semibold text-[#4d4d4d] border-b border-gray-500 py-2 pr-5">
            <BiSolidCategoryAlt /> All Quizzes
          </button>
        </div>

        <div className="md:p-4">
          <h1 className="text-xl md:text-3xl font-semibold my-2 md:my-5">
            {quizNumber}. {currentQuiz?.question}
          </h1>
          {/* timer */}
          <div className="flex justify-end items-center">
            <h2 className="font-semibold flex items-center gap-1 text-lg">
              <MdWatchLater />: {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </h2>
          </div>
        </div>
        {/* quiz options */}
        <div>
          <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 list-none">
            {currentQuiz.options?.map((option, index) => (
              <li
                onClick={() =>
                  !isAvailable && handleAnswerQuestion({ index, option })
                }
                key={index}
                className={`rounded-md ${
                  !isAvailable && "hover:bg-blue-100 cursor-pointer"
                } p-5  ${
                  isAvailable && isAvailable?.correctIndex === index
                    ? "bg-green-100"
                    : ""
                } ${
                  isAvailable &&
                  isAvailable?.selectedIndex === index &&
                  isAvailable?.correct === false
                    ? "bg-red-100"
                    : ""
                }`}
              >
                <label
                  className={`items-center grid grid-cols-1 ${
                    !isAvailable && "cursor-pointer"
                  }`}
                >
                  <span className="font-semibold text-lg md:text-xl text-gray-700 mb-2">
                    {index + 1}. {option}
                  </span>
                  <input
                    disabled={isAvailable}
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
        {/* skip, next quiz & complete buttons */}
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
      </div>
      {finished && (
        <ResultModal
          isOpen={openResultModal}
          onClose={handleCloseModal}
          data={quizHistory}
          handleRetake={handleRetake}
          handleHome={handleNavigateHome}
        />
      )}
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
