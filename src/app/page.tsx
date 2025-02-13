import Homecategory from "@/components/HomeCategory/Homecategory";
import Image from "next/image";

export default function Home() {

  return (
    <main>
      <div className="w-full h-[500px] relative">
        <Image className="w-full h-full object-cover" src="/download.png" alt="banner" width={1080} height={500} />
      </div>

    <Homecategory />

    </main>
  );
}
