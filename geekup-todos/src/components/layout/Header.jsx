import logo from "../../assets/geekup-logo.svg";
import gmailLogo from "../../assets/gmail-logo.svg";
import linkedInLogo from "../../assets/linkedin-logo.svg";

export default function Header() {
  return (
    <div className="border-b drop-shadow-sm">
      <header className="container py-6 flex justify-between items-center">
        <img
          src={logo}
          alt="Geek Up logo"
          decoding="async"
          loading="eager"
          className="w-40"
        />
        <h1 className="uppercase font-mono tracking-widest text-xl font-bold">
          Technical Assessment - Todo
        </h1>
        <ul className="grid gap-1">
          <li className="flex gap-2 items-center">
            <img
              src={gmailLogo}
              alt="Gmail logo"
              className="w-6"
              role="presentation"
            />
            <a
              href="mailto:tmphat1312@gmail.com"
              className="underline underline-offset-2"
            >
              tmphat1312@gmail.com
            </a>
          </li>
          <li className="flex gap-2 items-center">
            <img
              src={linkedInLogo}
              alt="LinkedIn logo"
              className="w-6"
              role="presentation"
            />
            <a
              href="https://www.linkedin.com/in/tmphat1312/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              tmphat1312
            </a>
          </li>
        </ul>
      </header>
    </div>
  );
}
