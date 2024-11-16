import { ToggleTheme } from "../shadcn/toggle-theme";
import { UserButton } from "@clerk/nextjs";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function NavRightSide() {
  return (
    <div className="flex justify-end items-center">
      <Link href={"/search"} className="pr-6">
        Search
      </Link>
      <Link href={"/Create"} className="pr-6">
        Create
      </Link>
      <Link href={"/About"} className="pr-6">
        About
      </Link>

      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <ToggleTheme />
    </div>
  );
}
