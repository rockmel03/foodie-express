import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  Play,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FoodDeliveryHero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const foodImages = ["🍕", "🍔", "🍜", "🥗", "🍣", "🌮", "🍰", "🥘"];

  const stats = [
    {
      icon: <Clock className="w-5 h-5" />,
      value: "30min",
      label: "Average Delivery",
    },
    {
      icon: <Star className="w-5 h-5" />,
      value: "4.8★",
      label: "Customer Rating",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      value: "50+",
      label: "Cities Served",
    },
  ];

  const popularCategories = [
    { name: "Pizza", emoji: "🍕", orders: "2.5k+" },
    { name: "Burgers", emoji: "🍔", orders: "1.8k+" },
    { name: "Asian", emoji: "🍜", orders: "1.2k+" },
    { name: "Healthy", emoji: "🥗", orders: "950+" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % foodImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-60 h-60 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-red-200 to-pink-200 rounded-full opacity-30"></div>
      </div>

      {/* Floating Food Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {foodImages.map((emoji, index) => (
          <div
            key={index}
            className={`absolute text-4xl transition-all duration-1000 ${
              index === currentImageIndex
                ? "opacity-100 scale-110"
                : "opacity-30 scale-90"
            }`}
            style={{
              left: `${15 + index * 10}%`,
              top: `${20 + index * 8}%`,
              animationDelay: `${index * 0.2}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              FoodieExpress
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-orange-600 font-medium"
            >
              Menu
            </Button>
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-orange-600 font-medium"
            >
              Restaurants
            </Button>
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-orange-600 font-medium"
            >
              About
            </Button>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              Sign In
            </Button>
          </div>

          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </nav>

        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Craving
                </span>
                <br />
                <span className="text-gray-800">Something</span>
                <br />
                <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                  Delicious?
                </span>
              </h1>

              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Get your favorite food delivered fresh and fast from the best
                restaurants in your city.
                <span className="font-semibold text-orange-600">
                  {" "}
                  Order now and taste the difference!
                </span>
              </p>
            </div>

            {/* Search Section */}
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="What are you craving?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 border-0 bg-gray-50 focus-visible:ring-orange-500"
                    />
                  </div>

                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Enter delivery location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10 h-12 border-0 bg-gray-50 focus-visible:ring-orange-500"
                    />
                  </div>

                  <Button className="h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                    <span className="font-semibold">Search</span>
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Popular Categories */}
            <div className="space-y-4">
              <p className="text-lg font-semibold text-gray-700">
                Popular Categories
              </p>
              <div className="flex flex-wrap gap-3">
                {popularCategories.map((category, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer hover:shadow-md transition-all duration-200 border-orange-200 hover:border-orange-400"
                  >
                    <CardContent className="p-4 flex items-center space-x-3">
                      <span className="text-2xl">{category.emoji}</span>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {category.name}
                        </p>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-orange-100 text-orange-700"
                        >
                          {category.orders} orders
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="text-center border-0 bg-white/50 backdrop-blur-sm"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-center mb-2 text-orange-500">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="h-14 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                <span className="font-semibold text-lg">Order Now</span>
                <ChevronRight className="w-6 h-6 ml-2" />
              </Button>

              <Button
                variant="outline"
                className="h-14 border-2 border-orange-500 text-orange-600 px-8 hover:bg-orange-50 bg-white/80 backdrop-blur-sm"
              >
                <Play className="w-5 h-5 mr-2" />
                <span className="font-semibold">Watch Demo</span>
              </Button>
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative">
            {/* Main Food Image Container */}
            <div className="relative">
              <div className="w-96 h-96 mx-auto bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-80 h-80 bg-white rounded-full flex items-center justify-center shadow-inner">
                  <div className="text-8xl animate-bounce">
                    {foodImages[currentImageIndex]}
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <Card className="absolute -top-4 -left-4 shadow-xl animate-float border-0">
                <CardContent className="p-4 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Fast Delivery</div>
                    <div className="text-xs text-gray-500">Under 30 mins</div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="absolute -bottom-4 -right-4 shadow-xl animate-float border-0"
                style={{ animationDelay: "1s" }}
              >
                <CardContent className="p-4 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">4.9 Rating</div>
                    <div className="text-xs text-gray-500">2.5k reviews</div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="absolute top-1/2 -right-8 shadow-xl animate-float border-0"
                style={{ animationDelay: "0.5s" }}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-1">🛵</div>
                  <div className="text-xs font-semibold">On the way!</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Trusted by thousands of food lovers
          </p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-2xl font-bold text-gray-400">McDonald's</div>
            <div className="text-2xl font-bold text-gray-400">KFC</div>
            <div className="text-2xl font-bold text-gray-400">Subway</div>
            <div className="text-2xl font-bold text-gray-400">Pizza Hut</div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
