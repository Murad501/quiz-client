import { Inter } from "next/font/google";
import RootLayout from "../../components/Layouts/RootLayout";
import { BiSolidCategoryAlt } from "react-icons/bi";
import QuizCategories from "@/components/UI/Home/QuizCategories";
// import QuizCategories from "@/components/UI/Home/QuizCategories";

const inter = Inter({ subsets: ["latin"] });

const HomePage = () => {
  const categories = [
    {
      id: 1,
      categoryName: "gender",
      title: "Gender",
      image:
        "https://media.proprofs.com/images/QM/user_images/2503852/New%20Project%20(99).png",
    },
    {
      id: 2,
      categoryName: "movie",
      title: "Movie Trivia",
      image:
        "https://media.proprofs.com/images/QM/user_images/2503852/New%20Project%20-%202020-07-23T162411_213.jpg",
    },
    {
      id: 3,
      categoryName: "emotion",
      title: "Emotions and Feelings",
      image:
        "https://media.proprofs.com/images/QM/user_images/2503852/New%20Project%20(97)(234).jpg",
    },
    {
      id: 4,
      categoryName: "mental health",
      title: "Mental Health Awareness",
      image:
        "https://media.proprofs.com/images/QM/user_images/2503852/New%20Project%20(48)(570).jpg",
    },
  ];
  return (
    <main
      className={`flex flex-col items-center justify-between max-w-5xl mx-auto py-10 ${inter.className}`}
    >
      {/* hero section */}
      <div>
        <h3 className="text-[#4d4d4d] text-2xl mb-5">Best Online Quizzes</h3>
        <p className="text-[#737373] mb-5">
          Keeping yourself entertained and educated is just a quiz away. Want to
          have some fun or learn about a topic? Curated to learn while having
          fun, our online quizzes are an excellent source of knowledge and
          entertainment. Take a quiz today to discover amazing facts about
          yourself or the world.
        </p>
        <p className="text-[#737373]">
          Have 5 minutes to kill or the entire weekend to do something fun?
          These online quizzes on a variety of topics from TV shows, trivia,
          sports, movies, music, and fashion to psychology, anime, art,
          technology, and more are perfect for you! Take quizzes with your
          friends to see who wins, or get bragging rights as the top-ranked
          player in our quiz community. So let’s begin!
        </p>
      </div>

      <div className="my-10 w-full">
        <button className="flex items-center justify-start gap-2 font-semibold text-[#4d4d4d] border-b border-gray-500 py-2 pr-5">
          <BiSolidCategoryAlt /> All
        </button>
      </div>

      {/* featured quiz */}
      <section>
        <QuizCategories categories={categories} />
      </section>
    </main>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
