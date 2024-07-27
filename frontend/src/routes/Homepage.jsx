
import Category from "../components/Category";
import Hero from "../components/Hero"
import Box from "../components/Box";

//main homepage component
function Homepage() {
  return (
    <>
        <Hero/>
        <div className="bg-white">
          <div className="flex justify-between px-52 gap-10 mt-14 pt-14">
            <Box/>
            <Box/>
            <Box/>
          </div>
          <Category/>
        </div>
    </>
  )
}

export default Homepage