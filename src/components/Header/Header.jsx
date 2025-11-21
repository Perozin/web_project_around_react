import logo from "../../images/Vector.png";
import line from "../../images/Line.png";

export function Header() {
  return (
    <header className="header">
      <div className="header__vector">
        <img
          src={logo}
          alt="Around the U.S logo"
          className="header__vector-image"
        />
      </div>

      <img
        src={line}
        alt="linha que separa o cabeçario da container main"
        className="header__line"
      />
    </header>
  );
}
