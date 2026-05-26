import { DeepRealUploadZone } from "@/components/science/deepreal-upload-zone";

export const metadata = {
  title: "DeepReal Media Forensics | Egyptian Misinformation Library",
  description: "Upload media to securely run Deepfake analysis through the Sightengine pipeline.",
};

export default function DeepRealUploadPage() {
  return (
    <main className="min-h-screen bg-black px-4 py-20 flex items-center justify-center">
      <DeepRealUploadZone />
    </main>
  );
}
