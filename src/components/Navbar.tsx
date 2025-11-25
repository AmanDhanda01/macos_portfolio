import { navIcons, navLinks } from "@/constants";
import useWindowStore from "@/store/window";
import dayjs from "dayjs";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="Logo" />
        <p className="font-bold">Aman's Portfolio </p>
        <ul>
          {navLinks.map(
            ({
              id,
              name,
              type,
            }: {
              id: number;
              name: string;
              type: string;
            }) => (
              <li key={id} onClick={() => openWindow(type)}>
                <p>{name}</p>
              </li>
            )
          )}
        </ul>
      </div>
      <div>
        <ul>
          {navIcons.map(({ id, img }: { id: number; img: string }) => (
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
