import WindowWrapper from "../WindowWrapper";
import WindowControls from "../WindowControls";
import { socials } from "@/constants";

const Contact = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
      </div>

      <div className="p-5 space-y-5">
        <img src="/images/adrian.jpg" alt="Adrian" className="w-20" />
        <h3>Let's Connect</h3>
        <p>Got an idea? A bug to squash? Or just wanna talk tech? I'm in</p>
        <p>amandhanda1978@gmail.com</p>

        <ul>
          {socials.map((social) => (
            <li key={social.id} style={{ backgroundColor: social.bg }}>
              <a
                href={social.link}
                target="_blank"
                rel="noreferrer noopener"
                title={social.text}
              >
                <img src={social.icon} alt={social.text} className="size-5" />
                <p>{social.text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
