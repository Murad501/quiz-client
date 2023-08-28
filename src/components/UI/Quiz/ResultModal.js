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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <p className="text-xl flex items-center justify-center gap-5">
              Total Correct:{" "}
              <span className="text-green-500">
                {totalCorrect}/{totalData}
              </span>
            </p>
            <p className="text-xl flex items-center justify-center gap-5">
              Total Skip:{" "}
              <span className="text-sky-500">
                {totalSkip}/{totalData}
              </span>
            </p>
            <p className="text-xl flex items-center justify-center gap-5">
              Total Wrong:{" "}
              <span className="text-red-500">
                {totalWrong}/{totalData}
              </span>
            </p>
            <p className="text-xl flex items-center justify-center gap-5">
              Total Time Out:{" "}
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
