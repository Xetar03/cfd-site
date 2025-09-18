//app/boutique/page.tsx

"use client";

import Image from "next/image";
import { useState } from "react";
import Layout from "@/components/main/Layout";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const products: Product[] = [
  { id: 1, name: "Climatisation murale", price: 350, image: "/images/boutique/clim1.jpg" },
  { id: 2, name: "Pompe à chaleur air/eau", price: 450, image: "/images/boutique/pac1.jpg" },
  { id: 3, name: "Chaudière gaz condensation", price: 2800, image: "/images/boutique/chaudiere1.jpg" },
  { id: 4, name: "Thermostat connecté", price: 250, image: "/images/boutique/thermostat.jpg" },
];

export default function Boutique() {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    alert(`✅ ${product.name} ajouté au panier`);
  };

  return (
    <Layout>
        <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif text-[#1C4A6E] mb-8 text-center">
            Boutique équipements
        </h1>

        {/* Grille produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
            <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
                <div className="w-full aspect-[4/3] relative bg-gray-100">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain object-center"
                    />
                </div>

                <div className="p-4 flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                </h3>
                <p className="text-[#1C4A6E] font-bold text-xl mt-2">
                    {product.price} €
                </p>
                <button
                    onClick={() => addToCart(product)}
                    className="mt-4 w-full bg-[#F2B705] text-[#1C4A6E] hover:bg-[#1C4A6E] hover:text-white px-4 py-2 rounded-lg transition"
                >
                    Ajouter au panier
                </button>
                </div>
            </div>
            ))}
        </div>

        {/* Petit résumé du panier (juste pour test) */}
        {cart.length > 0 && (
            <div className="mt-12 bg-gray-100 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">🛒 Panier</h2>
            <ul className="space-y-2">
                {cart.map((item, i) => (
                <li key={i} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>{item.price} €</span>
                </li>
                ))}
            </ul>
            <p className="mt-4 font-bold text-lg">
                Total:{" "}
                {cart.reduce((total, item) => total + item.price, 0)} €
            </p>
            </div>
        )}
        </div>
    </Layout>
  );
}
