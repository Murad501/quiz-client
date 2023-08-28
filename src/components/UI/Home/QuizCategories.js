import QuizCategoryCard from "@/components/Home/QuizCategoryCard";

const QuizCategories = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-10">
      {categories?.map((category) => (
        <QuizCategoryCard category={category} key={category?.id} />
      ))}
    </div>
  );
};

export default QuizCategories;
