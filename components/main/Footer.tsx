"use client";

export default function Footer() {
  return (
    <footer className="bg-[#1C4A6E] text-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 CFD - Confort toute l’année</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </footer>
  );
}