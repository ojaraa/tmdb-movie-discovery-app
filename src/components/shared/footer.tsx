import { BiLogoGmail } from "react-icons/bi";
import { IoLogoBuffer } from "react-icons/io5";
import { RiFacebookFill, RiInstagramFill, RiTwitterFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="p-4 pt-9">
      <div className="p-4 flex items-center justify-center  ">
        <div className="flex items-center justify-center flex-col">
          <Link to={`/`} className="flex gap-2 items-center text-primary">
            <IoLogoBuffer  size={20} color="#d90429"/>
            <h1 className="text-2xl font-bold !text-[#d90429]">trend</h1>
          </Link>
          <div className="flex gap-4  mt-4">
            <Link to={``}> <RiFacebookFill size={18}/></Link>
            <Link to={``}> <RiTwitterFill size={18}/></Link>
            <Link to={``}> <BiLogoGmail size={18} /></Link>
            <Link to={``}><RiInstagramFill size={18}/></Link>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center text-center mb-8">
        <div className="flex items-center gap-2 mt-4">
          <p>Designed and built by <Link to={``}> Ojara</Link> with</p>
          <a target="_blank" href="https://www.themoviedb.org/">
            {" "}
            <img src="/assets/tmdb.svg" alt="" className="w-[100px]"/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
