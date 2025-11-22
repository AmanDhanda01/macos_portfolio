import { navIcons, navLinks } from "@/constants";
import dayjs from "dayjs";

const Navbar = () => {
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="Logo" />
        <p className="font-bold">Aman's Portfolio </p>
        <ul>
            {navLinks.map(({id,name}:{id:number;name:string}) => (
            <li key={id}>
                <p>{name}</p>
            </li>
            ))}
        </ul>
      </div>
      <div>
         <ul>
            {navIcons.map(({id,img}:{id:number;img:string}) => (
            <li key={id}>
                <img src={img} className="icon-hover" alt="icon" />
            </li>
            ))}
         </ul>
         <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
