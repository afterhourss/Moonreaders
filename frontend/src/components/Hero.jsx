import { motion }from 'framer-motion'
import { Link } from "react-router-dom";
import Button from "./Button";



function Hero() {
  return (
    <div className="bg-white mx-24 h-[500px] flex justify-between p-40 rounded-3xl overflow-hidden items-center border-black shadow-sm">
        <div className="w-[500px] space-y-5">
            <h1 className="text-6xl font-bold">Place for the Amazing Books</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque aperiam, nobis soluta iusto porro officiis ad molestias quibusdam culpa, vitae consequatur aspernatur obcaecati iure. Quaerat.</p>
            <Link to="#"><Button text="Explore"/></Link>
        </div>
        <div>
            <motion.img drag dragConstraints={{top:0, left:0, right:0, bottom:0}} dragElastic={0.1} src="/1.png" alt="stack of books" className="w-[750px] -mt-36"/>
        </div>
    </div>
  )
}

export default Hero