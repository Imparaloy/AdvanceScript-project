"use client";
import Hero from "@/components/Hero/Hero";
import Feature from "@/components/Feature/Feature";
import MenuSec from "@/components/Menu/Menu";




const Page = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Feature />
      <MenuSec />
      
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center border-2 rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">
            อยากลองชิมไหม?
          </h2>
          <p className="text-pink-400 text-lg mb-8">
            สั่งขนมโฮมเมดสดใหม่ได้เลยวันนี้ จัดส่งถึงบ้านคุณ
          </p>
          <a
            href="#"
            className="inline-block bg-white text-pink-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-pink-50 transition-all duration-300 shadow-lg hover:scale-105"
          >
            สั่งเลย
          </a>
        </div>
      </section>
    </div>
  );
};

export default Page;