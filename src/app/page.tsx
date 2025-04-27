import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="m-4">
      <SignedOut>
        <SignInButton mode="modal">
        <Button>
          Sign In
        </Button>
        </SignInButton>
        {/* <SignUpButton mode="modal" /> */}
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>

      <Button variant={"secondary"}> Click Me</Button>
      <ModeToggle/>
    </div>
  );
}
