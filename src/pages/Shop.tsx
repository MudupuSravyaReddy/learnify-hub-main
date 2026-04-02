import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const products = [
  { id: 1, name: "LMS Pro T-Shirt", price: 29.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop", category: "Apparel" },
  { id: 2, name: "Developer Mug", price: 14.99, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300&h=300&fit=crop", category: "Accessories" },
  { id: 3, name: "Course Bundle: Web Dev", price: 129.99, image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=300&fit=crop", category: "Courses" },
  { id: 4, name: "Notebook & Pen Set", price: 19.99, image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=300&h=300&fit=crop", category: "Stationery" },
  { id: 5, name: "LMS Hoodie", price: 49.99, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop", category: "Apparel" },
  { id: 6, name: "Coding Stickers Pack", price: 9.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=300&fit=crop", category: "Accessories" },
];

export default function Shop() {
  return (
    <div className="container py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold mb-4"><span className="gradient-text">Shop</span></h1>
        <p className="text-muted-foreground max-w-md mx-auto">Gear, bundles, and resources for passionate learners.</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="group rounded-xl overflow-hidden border border-border bg-card hover:shadow-lg transition-all duration-300">
            <div className="h-48 overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-4">
              <span className="text-xs text-muted-foreground">{p.category}</span>
              <h3 className="font-heading font-semibold mt-1">{p.name}</h3>
              <div className="flex items-center justify-between mt-3">
                <span className="font-heading font-bold text-primary">${p.price}</span>
                <Button size="sm" onClick={() => toast.success(`${p.name} added to cart!`)}>
                  <ShoppingCart className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
