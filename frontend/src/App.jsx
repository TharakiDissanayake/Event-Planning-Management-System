import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <header>Side Bar</header>
      <main>
        <Outlet/>
      </main>
    </>
  )
}
export default App;
