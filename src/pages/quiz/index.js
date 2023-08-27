import QuizCategories from "@/components/UI/Home/QuizCategories";
import RootLayout from "../../../components/Layouts/RootLayout";
import { BiSolidCategoryAlt } from "react-icons/bi";

const Quizzes = ({ quizzes }) => {
  return (
    <section className="max-w-5xl mx-auto">
      <div className="my-10 w-full">
        <button className="flex items-center justify-start gap-2 font-semibold text-[#4d4d4d] border-b border-gray-500 py-2 pr-5">
          <BiSolidCategoryAlt /> All Quizzes
        </button>
      </div>
      <div>
        <QuizCategories categories={quizzes} />
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
  const res = await fetch("http://localhost:5000/categories");
  const data = await res.json();

  return {
    props: {
      quizzes: data,
    },
  };
};
