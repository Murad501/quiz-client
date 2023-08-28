import Image from "next/image";
import Link from "next/link";

const QuizCategoryCard = ({ category }) => {
  return (
    <div className="max-w-xs mx-auto mb-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Link href={`/quiz`}>
          <Image
            width={200}
            height={100}
            src={category?.image}
            alt={category?.categoryName}
            className="w-full h-48 object-cover"
          />
        </Link>
        <div className="p-4">
          <h2 className="text-xs mb-2 capitalize">{category?.categoryName}</h2>
          <Link href={`/quiz`} className="text-gray-800 capitalize">
            {category?.title}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizCategoryCard;
