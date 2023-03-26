import Posts from "./components/Posts";
import Users from "./components/Users";

function App() {
  return (
    <main className="row">
      <div className="col-1"></div>
      <div className="col-10">
        <div>
          <Posts />
        </div>
        <div>
          {/* <Users /> */}
        </div>
      </div>
      <div className="col-1"></div>
    </main>
  );
}

export default App;
