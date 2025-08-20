import React, { useEffect, useState } from "react";

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
import Container from "../Container";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [location, setLocation] = useState("");
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
    <Container>
      <div className="grid lg:grid-cols-2 gap-12 items-center md:py-10 py-5">
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

                {/* <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Enter delivery location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 h-12 border-0 bg-gray-50 focus-visible:ring-orange-500"
                  />
                </div> */}

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
            <div className="md:w-96 md:h-96 w-80 h-80 mx-auto bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl">
              <div className="md:w-80 md:h-80 w-60 h-60 bg-white rounded-full flex items-center justify-center shadow-inner">
                <div className="text-8xl animate-bounce">
                  {foodImages[currentImageIndex]}
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <Card className="absolute md:-top-4 md:-left-4 -top-2 -left-2 shadow-xl animate-float border-0">
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
              className="absolute md:-bottom-4 md:-right-4 -bottom-2 -right-2 shadow-xl animate-float border-0"
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
              className="absolute md:top-1/2 md:-right-8 -top-2 -right-2 shadow-xl animate-float border-0"
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
    </Container>
  );
};

export default Hero;
