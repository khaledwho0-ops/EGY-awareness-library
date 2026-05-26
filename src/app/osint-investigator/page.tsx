import { OsintTerminal } from "@/components/science/osint-terminal";

export const metadata = {
  title: "Live OSINT Investigator | Egyptian Misinformation Library",
  description: "Autonomous AI Swarm agent that searches the live internet and scrapes domains for threat intelligence.",
};

export default function OsintInvestigatorPage() {
  return (
    <main className="min-h-screen bg-black px-4 py-20 flex items-center justify-center">
      <OsintTerminal />
    </main>
  );
}
