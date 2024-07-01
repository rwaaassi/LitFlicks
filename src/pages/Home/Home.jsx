// import { getAdaptations } from "../../services/adaptationsApi";
import background from "../../assets/background-home-2.jpg";

const Home = () => {
  return (
    <div className="relative h-screen w-full">
      <img
        src={background}
        alt="background"
        className="h-screen w-full object-fill"
      />
      <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-60 flex flex-col items-center justify-center space-y-4">
        <p className="text-white text-3xl font-semibold">
          Welcome to LitFlicks
        </p>
        <span className="text-white text-4xl font-bold">
          Where Literature Meets Cinema
        </span>
      </div>
    </div>
  );
};
export default Home;
