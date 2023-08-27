import QuizCategoryCard from "@/components/Home/QuizCategoryCard";

const QuizCategories = ({ categories }) => {
  console.log(categories);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {categories?.map((category) => (
        <QuizCategoryCard category={category} key={category?.id} />
      ))}
    </div>
  );
};

export default QuizCategories;
