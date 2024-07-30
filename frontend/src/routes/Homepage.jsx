
import Category from "../components/Category";
import Hero from "../components/Hero"
import Box from "../components/Box";

//main homepage component
function Homepage() {
  return (
    <>
        <Hero/>
        <div className="bg-white">
          <Category/>
        </div>
    </>
  )
}

export default Homepage