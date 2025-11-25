import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

import Navbar from "@/components/Navbar"; 
import Welcome from "@/components/Welcome";
import Dock from "@/components/Dock";
import Terminal from "@/components/windows/Terminal";
import SafariWindow from "@/components/windows/SafariBrowser";
import Resume from "@/components/windows/Resume";
import FinderWindow from "./components/windows/Finder";
import TextWindow from "./components/windows/Text";
import ImageWindow from "./components/windows/Image";
import ContactWindow from "./components/windows/Contact";
import Home from "./components/Home";


const App = () => {
  return (
    <main>
       <Navbar/>
       <Welcome/>
       <Dock/>
       
       <Terminal/>
       <SafariWindow/>
       <Resume/>
       <FinderWindow/>
       <TextWindow/>
       <ImageWindow/>
       <ContactWindow/>
       <Home/>
    </main>
  )
}

export default App
