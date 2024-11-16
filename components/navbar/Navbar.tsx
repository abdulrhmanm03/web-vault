import Logo from "./Logo";
import NavRightSide from "./NavRightSide";

export default function Navbar() {
  return (
    <nav className="mb-10 flex justify-between items-center">
      <Logo />
      <NavRightSide />
    </nav>
  );
}
