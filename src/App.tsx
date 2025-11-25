import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

import Navbar from "@/components/Navbar"; 
import Welcome from "@/components/Welcome";
import Dock from "@/components/Dock";
import Terminal from "@/components/windows/Terminal";
import SafariWindow from "@/components/windows/SafariBrowser";
import Resume from "@/components/windows/Resume";


const App = () => {
  return (
    <main>
       <Navbar/>
       <Welcome/>
       <Dock/>
       
       <Terminal/>
       <SafariWindow/>
       <Resume/>
    </main>
  )
}

export default App
