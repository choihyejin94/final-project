import Feed from "../components/Feed";

export default function Home() {
  return (
    <div>
      <div>
        <div className="flex justify-end mb-2">
          <button className="border bg-black text-white rounded p-2 mr-5 text-lg hover:bg-white hover:text-black hover:border-black cursor-pointer">
            Writing
          </button>
        </div>
        <Feed />
        <Feed />
        <Feed />
      </div>
    </div>
  );
}