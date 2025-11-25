import { Search } from "lucide-react";
import WindowWrapper from "../WindowWrapper";
import WindowControls from "../WindowControls";
import { locations } from "@/constants";
import useLocationStore from "@/store/location";
import { clsx } from "clsx";
import useWindowStore from "@/store/window";

const Finder = () => {
  const { activeLocation, setActiveLocation } = useLocationStore();
    const { openWindow } = useWindowStore();

  function openItem(item: any ) {
     if(item.fileType === "pdf") {
       return openWindow("resume");
     }
     if(item.kind === "folder") {
       return setActiveLocation(item);
     }
     if(['fig','url'].includes(item.fileType) && item.href) {
       return window.open(item.href, '_blank');
     }

     openWindow(`${item.fileType}${item.kind}`,item);
  }
  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>
      <div className="bg-white flex h-full">
        <div className="sidebar">
          <div>
            <h3>Favourites</h3>
            <ul>
              {Object.values(locations).map((item) => (
                <li
                  key={item.id}
                  className={clsx(
                    item.id === activeLocation.id ? "active" : "not-active"
                  )}
                  onClick={() => setActiveLocation(item as any)}
                >
                  <img src={item.icon} alt={item.name} className="w-4" />
                  <p className="text-sm font-medium truncate">{item.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Work</h3>
            <ul>
              {locations.work.children.map((item) => (
                <li
                  key={item.id}
                  className={clsx(
                    item.id === activeLocation.id ? "active" : "not-active"
                  )}
                  onClick={() => setActiveLocation(item as any)}
                >
                  <img src={item.icon} alt={item.name} className="w-4" />
                  <p className="text-sm font-medium truncate">{item.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ul className="content">
          {activeLocation.children.map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
