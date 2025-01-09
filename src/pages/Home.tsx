import FeedForm from "../components/FeedForm";

export default function Home() {
  return (
    <div>
      <div>
        <div className="flex justify-end mb-2">
          <button className="border bg-black text-white rounded p-2 m-2 text-lg hover:bg-white hover:text-black hover:border-black cursor-pointer">
            Writing
          </button>
        </div>
        <FeedForm />
        <FeedForm />
        <FeedForm />
      </div>
    </div>
  );
}