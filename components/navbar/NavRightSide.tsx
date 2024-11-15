import { ToggleTheme } from "../shadcn/toggle-theme";

export default function NavRightSide() {
  return (
    <div className="flex justify-end items-baseline">
      <p className="pr-6">Search</p>
      <p className="pr-6">Create</p>
      <p className="pr-6">About</p>
      <ToggleTheme />
    </div>
  );
}
