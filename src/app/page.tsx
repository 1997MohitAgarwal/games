"use client";
import { useState, useEffect } from "react";
import {
  FaHeart,
  FaUser,
  FaWallet,
  FaGamepad,
  FaHome,
  FaStar,
  FaGift,
  FaCog,
  FaFire,
  FaRegStar,
  FaCoins,
  FaTools,
  FaGift as FaBonus,
  FaDice,
  FaFish,
  FaTableTennis,
  FaChessKing,
  FaCrown,
} from "react-icons/fa";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Game {
  id: number;
  category: string;
  name: string;
}

const dummyCategories = [
  { name: "Slots", icon: <FaDice /> },
  { name: "JILI", icon: <FaRegStar /> },
  { name: "Bingo", icon: <FaTableTennis /> },
  { name: "Fish", icon: <FaFish /> },
  { name: "EVO", icon: <FaChessKing /> },
  { name: "WM", icon: <FaGift /> },
];

const dummyGames: Game[] = [
  ...dummyCategories.flatMap(({ name }, index) =>
    Array.from({ length: 8 }, (_, i) => ({
      id: index * 9 + i,
      category: name,
      name: `${name} Game ${i + 1}`,
    }))
  ),
];

const carouselImages = [
  "https://media.istockphoto.com/id/854509336/photo/dark-purple-casino-games.webp?a=1&b=1&s=612x612&w=0&k=20&c=kuEm1u5uUrgIGA8dqFUqlSCzxvTc7YYCg5rCAbfgFcA=",
  "https://plus.unsplash.com/premium_photo-1698525808858-d5ef5f190e45?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1615680022647-99c397cbcaea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function GameUI() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Slots");
  const [games, setGames] = useState<Game[]>([]);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState<number>(0);

  useEffect(() => {
    setGames(dummyGames.filter((game) => game.category === selectedCategory));
  }, [selectedCategory]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex(
        (prevIndex) => (prevIndex + 1) % carouselImages.length
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Top Navigation */}
      <div className="bg-gray-800 p-3 flex justify-between items-center">
        <div className="flex">
          <FaCrown className="mr-1 text-3xl" />
          <h1 className="text-xl font-bold mt-1">INPH</h1>
        </div>
        <div>
          <Button className="bg-white text-yellow-600 px-3 py-1 rounded" aria-label="Login">
            Login
          </Button>
          <Button className="bg-red-500 text-white px-3 py-1 rounded ml-2" aria-label="Register">
            Register
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative text-center font-bold text-lg" style={{ height: "200px" }}>
        <Image
          src={carouselImages[currentCarouselIndex]}
          alt="Realtime Cashback"
          width={100}
          height={100}
          className="w-full h-full object-cover object-center rounded-lg"
        />
      </div>

      {/* News Ticker */}
      <div className="overflow-hidden bg-gray-800 p-4 text-white text-lg">
        <div className="whitespace-nowrap animate-marquee text-lg">
          <div className="inline-flex items-center mr-24">
            <FaCoins color="yellow" className="mr-2" />
            <span>Huge cashback offers, check them out now!</span>
          </div>
          <div className="inline-flex items-center mr-24">
            <FaFire color="orange" className="mr-2" />
            <span>Win big with our Slots and Bingo games!</span>
          </div>
          <div className="inline-flex items-center mr-24">
            <FaGift color="yellow" className="mr-2" />
            <span>Exclusive VIP bonuses for our top players!</span>
          </div>
        </div>
      </div>

      {/* Top Menu Bar */}
      <div className="flex gap-2 p-2 bg-gray-700 justify-around text-sm">
        {[{
          name: "Hot Games",
          icon: <FaFire />,
          color: "text-orange-600"
        }, {
          name: "My Favorite",
          icon: <FaStar />,
          color: "text-yellow-800"
        }, {
          name: "Cashback",
          icon: <FaCoins />,
          color: "text-yellow-600"
        }, {
          name: "Services",
          icon: <FaTools />,
          color: "text-yellow-700"
        }, {
          name: "Bonus",
          icon: <FaBonus />,
          color: "text-yellow-600"
        }].map((item) => (
          <Button
            key={item.name}
            className={`px-3 py-1 ${item.color} rounded flex items-center gap-2`}
            aria-label={`Navigate to ${item.name}`}
          >
            {item.icon}
          </Button>
        ))}
      </div>

      <div className="flex flex-1">
        {/* Sidebar Categories */}
        <div className="w-1/5 bg-gray-800 rounded-xl mt-4 pt-4 px-4 pb-0">
          {dummyCategories.map((cat) => (
            <div
              key={cat.name}
              className={`flex flex-col items-center mb-3 justify-center p-3 rounded-full lg:rounded-sm cursor-pointer ${selectedCategory === cat.name ? "bg-yellow-500" : "bg-gray-700"}`}
              onClick={() => setSelectedCategory(cat.name)}
              aria-label={`Select ${cat.name} category`}
            >
              {cat.icon}
              <p className="text-xs mt-1">{cat.name}</p>
            </div>
          ))}
        </div>

        {/* Games Grid */}
        <div className="w-4/5 grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {games.map((game) => (
            <div
              key={game.id}
              className="relative cursor-pointer bg-gray-700 p-2 rounded-md transition-transform transform hover:scale-95 hover:shadow-lg hover:bg-gray-600"
            >
              <Image
                src="https://media.istockphoto.com/id/693041112/photo/online-casino-concept-laptop-roulette-slot-machine-chips-and-cards.jpg?s=612x612&w=0&k=20&c=vYa8kEnpczH2309Jy7hNshl4I1UOgIq5a-f4LvblCzg="
                alt={game.name}
                className="w-full object-contain rounded"
                width={100}
                height={100}
              />
              <h2 className="text-xs text-center mt-2">{game.name}</h2>
              <FaHeart className="absolute top-3 right-3 text-md text-red-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-yellow-500 p-4 mt-4 flex justify-around text-white text-2xl space-x-4 cursor-pointer">
        <FaHome aria-label="Home" />
        <FaStar aria-label="Favorites" />
        <FaGift aria-label="Bonus" />
        <FaUser aria-label="Profile" />
        <FaCog aria-label="Settings" />
      </div>
    </div>
  );
}
