import Link from "next/link";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ResultModal = ({ isOpen, onClose, data, handleRetake, handleHome }) => {
  const totalData = data?.length;
  const totalCorrect = data?.filter((dt) => dt?.correct === true)?.length;
  const totalSkip = data?.filter((dt) => dt?.skip === true)?.length;
  const totalTimeOut = data?.filter((dt) => dt?.timeOut === true)?.length;
  const totalWrong = data?.filter(
    (dt) => dt?.skip === false && dt?.correct === false && dt?.timeOut === false
  )?.length;

  let totalSeconds = 0;
  let totalMinutes = 0;

  for (const quiz of data) {
    totalSeconds += quiz?.totalSeconds;
    totalMinutes += quiz?.totalMinutes;
  }

  const allSeconds = totalMinutes * 60 + totalSeconds;

  const availableSeconds = data?.length * 60 - allSeconds;

  const minutes = Math.floor(availableSeconds / 60);
  const seconds = availableSeconds % 60;

  return (
    <div className={`fixed inset-0 ${isOpen ? "" : "hidden"}`}>
      <div className="fixed inset-0 backdrop-blur">
        {/* The blur background */}
      </div>
      <div className="fixed inset-0 flex items-center justify-center ">
        {/* The modal content */}
        <div className="bg-white min-w-[400px]  rounded-lg shadow-lg relative px-10 pt-16 pb-10">
          <button
            className="absolute top-5 right-5 text-gray-600"
            onClick={onClose}
          >
            <AiOutlineCloseCircle className="text-2xl text-red-400 hover:text-red-500" />
          </button>
          {/* Display your data here */}
          <p className="text-xl flex items-center justify-center gap-5 mb-5">
            Time:{" "}
            <span className="text-teal-500">
              {minutes}m{seconds}s
            </span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <p className="text-xl flex items-center justify-center gap-5">
              Correct:{" "}
              <span className="text-green-500">
                {totalCorrect}/{totalData}
              </span>
            </p>
            <p className="text-xl flex items-center justify-center gap-5">
              Skip:{" "}
              <span className="text-sky-500">
                {totalSkip}/{totalData}
              </span>
            </p>
            <p className="text-xl flex items-center justify-center gap-5">
              Wrong:{" "}
              <span className="text-red-500">
                {totalWrong}/{totalData}
              </span>
            </p>
            <p className="text-xl flex items-center justify-center gap-5">
              Time Out:{" "}
              <span className="text-yellow-500">
                {totalTimeOut}/{totalData}
              </span>
            </p>
          </div>
          <div className="mt-10 flex items-center justify-center gap-5">
            <Link
              onClick={handleHome}
              className="px-5 py-2 bg-sky-500 text-white rounded-sm"
              href={"/"}
            >
              Home
            </Link>
            <Link
              onClick={handleRetake}
              className="px-5 py-2 bg-orange-500 text-white rounded-sm"
              href={"/quiz"}
            >
              Retake
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
