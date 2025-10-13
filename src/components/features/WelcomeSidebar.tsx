import githubIcon from "@/assets/github-icon.png";
import { Button } from "@/components/ui/button";

export function WelcomeSidebar() {
  return (
    <div className="h-container flex flex-col">
      <div className="h-full flex flex-col justify-center items-center text-white/75 font-medium text-center text-2xl font-inter">
        <h2 className="mb-8">
          Welcome to <span className="text-choras-primary font-choras">CHORAS</span>
        </h2>
        <p className="text-xl">The Community Hub for</p>
        <p className="text-xl">Open-source</p>
        <p className="text-xl">Room Acoustics Software</p>
      </div>
      <div className="flex gap-4 p-4 border-t border-stone-600">
        <Button variant="outline">
          <img src={githubIcon} alt="GitHub" className="w-5 h-5" />
          <span>Repository</span>
        </Button>
        <Button className="flex-1">Documentation</Button>
      </div>
    </div>
  );
}
