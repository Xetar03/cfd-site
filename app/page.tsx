"use client";

import Layout from "@/components/main/Layout";
import Hero from "@/components/homepage/Hero";
import Services from "@/components/main/Services";
import Realisations from "@/components/homepage/Realisations";
import Avis from "@/components/main/Avis";
import Contact from "@/components/main/Contact";

export default function HomePage() {
  return (
      <Layout>
        <Hero />
        <Services />
        <Realisations />
        <Avis />
        <Contact />
      </Layout>
  );
}
