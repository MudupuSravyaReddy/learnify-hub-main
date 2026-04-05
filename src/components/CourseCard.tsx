import { Star, Users, Clock, ShoppingCart, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/courses";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/lib/auth";

export default function CourseCard({ course, index = 0 }: { course: Course; index?: number }) {
  const [isInCart, setIsInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const user = getCurrentUser();

  // ✅ Load cart & favorites on refresh
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const fav = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (cart.find((item: Course) => item.id === course.id)) {
      setIsInCart(true);
    }

    if (fav.find((item: Course) => item.id === course.id)) {
      setIsFavorite(true);
    }
  }, [course.id]);

  // ✅ Add to cart
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (!cart.find((item: Course) => item.id === course.id)) {
      cart.push(course);
      localStorage.setItem("cart", JSON.stringify(cart));
      setIsInCart(true);
    }
  };

  // ✅ Toggle favorite
  const handleFavorite = () => {
    let fav = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorite) {
      fav = fav.filter((item: Course) => item.id !== course.id);
      setIsFavorite(false);
    } else {
      fav.push(course);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(fav));
  };

  // ✅ Buy now
  const handleBuyNow = () => {
    if (!user) {
      navigate(`/login?redirect=/checkout&course=${course.id}`);
    } else {
      navigate(`/checkout?course=${course.id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group rounded-xl overflow-hidden border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden h-44">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />

        {/* ❤️ Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 bg-white p-1 rounded-full shadow"
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite ? "text-red-500 fill-red-500" : "text-gray-500"
            }`}
          />
        </button>

        <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs bg-primary text-white">
          {course.category}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1">{course.title}</h3>
        <p className="text-xs text-muted-foreground mb-3">
          {course.instructor}
        </p>

        <div className="flex items-center gap-3 text-xs mb-3">
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3" /> {course.rating}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" /> {course.students}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {course.duration}
          </span>
        </div>

        <div className="flex justify-between mb-3">
          <span>${course.price}</span>
          <span>{course.level}</span>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleAddToCart} disabled={isInCart}>
            {isInCart ? "In Cart" : "Add to Cart"}
          </Button>

          <Button onClick={handleBuyNow}>
            Buy Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
