"use client"

import { motion, useReducedMotion } from "framer-motion"
import { buttonVariants } from "./button"
import { ShoppingCart, Star, Heart, X } from "lucide-react"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { cn } from "../../lib/utils"

interface ProductRevealCardProps {
  name?: string
  price?: string
  originalPrice?: string
  image?: string
  description?: string
  rating?: number
  reviewCount?: number
  onAdd?: () => void
  onFavorite?: () => void
  enableAnimations?: boolean
  className?: string
}

export function ProductRevealCard({
  name = "Premium Wireless Headphones",
  price = "$199",
  originalPrice = "$299",
  image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600", // Premium headphones
  description = "Experience studio-quality sound with advanced noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
  rating = 4.8,
  reviewCount = 124,
  onAdd,
  onFavorite,
  enableAnimations = true,
  className,
}: ProductRevealCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const shouldAnimate = enableAnimations && !shouldReduceMotion

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    onFavorite?.()
  }

  const containerVariants: any = {
    rest: { 
      scale: 1,
      y: 0,
      filter: "blur(0px)",
    },
    hover: shouldAnimate ? { 
      scale: 1.03, 
      y: -8,
      filter: "blur(0px)",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        mass: 0.8,
      }
    } : {},
  }

  const imageVariants: any = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
  }

  const overlayVariants: any = {
    rest: { 
      y: "100%", 
      opacity: 0,
      filter: "blur(4px)",
    },
    hover: { 
      y: "0%", 
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 28,
        mass: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const contentVariants: any = {
    rest: { 
      opacity: 0, 
      y: 20,
      scale: 0.95,
    },
    hover: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.5,
      },
    },
  }

  const buttonVariants_motion: any = {
    rest: { scale: 1, y: 0 },
    hover: shouldAnimate ? { 
      scale: 1.05, 
      y: -2,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      }
    } : {},
    tap: shouldAnimate ? { scale: 0.95 } : {},
  }

  const favoriteVariants: any = {
    rest: { scale: 1, rotate: 0 },
    favorite: { 
      scale: [1, 1.3, 1], 
      rotate: [0, 10, -10, 0],
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    },
  }

  return (
    <motion.div
      data-slot="product-reveal-card"
      initial="rest"
      whileHover="hover"
      variants={containerVariants}
      className={cn(
        "relative w-80 rounded-2xl border border-border/50 bg-card text-card-foreground overflow-hidden",
        "shadow-lg shadow-black/5 cursor-pointer group",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="h-56 w-full object-cover"
          variants={imageVariants}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        
        {/* Favorite Button */}
        <motion.button
          onClick={handleFavorite}
          variants={favoriteVariants}
          animate={isFavorite ? "favorite" : "rest"}
          className={cn(
            "absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm border border-white/20",
            isFavorite 
              ? "bg-red-500 text-white" 
              : "bg-white/20 text-white hover:bg-white/30"
          )}
        >
          <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
        </motion.button>

        {/* Discount Badge */}
        {originalPrice && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold"
          >
            {Math.round(((parseFloat(originalPrice.replace(/[^0-9]/g, '')) - parseFloat(price.replace(/[^0-9]/g, ''))) / parseFloat(originalPrice.replace(/[^0-9]/g, ''))) * 100)}% DISKON
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4",
                  i < Math.floor(rating) 
                    ? "text-yellow-400 fill-current" 
                    : "text-muted-foreground"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {rating} ({reviewCount} ulasan)
          </span>
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <motion.h3 
            className="text-xl font-bold leading-tight tracking-tight"
            initial={{ opacity: 0.9 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {name}
          </motion.h3>
          
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">{price}</span>
            {originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Reveal Overlay */}
      <motion.div
        variants={overlayVariants}
        className="absolute inset-0 bg-background/96 backdrop-blur-xl flex flex-col justify-end"
      >
        <div className="p-6 space-y-4">
          {/* Product Description */}
          <motion.div variants={contentVariants}>
            <h4 className="font-semibold mb-2">Detail Produk</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </motion.div>

          {/* Features */}
          <motion.div variants={contentVariants}>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-muted/50 rounded-lg p-2 text-center">
                <div className="font-semibold">Original</div>
                <div className="text-muted-foreground">Kualitas Tinggi</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-2 text-center">
                <div className="font-semibold">Garansi</div>
                <div className="text-muted-foreground">Resmi 1 Tahun</div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={contentVariants} className="space-y-3">
            <motion.button
              onClick={onAdd}
              variants={buttonVariants_motion}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className={cn(
                buttonVariants({ variant: "default" }), 
                "w-full h-12 font-medium",
                "bg-gradient-to-r from-primary to-primary/90",
                "hover:from-primary/90 hover:to-primary",
                "shadow-lg shadow-primary/25"
              )}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Tambah ke Keranjang
            </motion.button>
            
            <motion.button
              variants={buttonVariants_motion}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onClick={() => setShowModal(true)}
              className={cn(
                buttonVariants({ variant: "outline" }), 
                "w-full h-10 font-medium"
              )}
            >
              Lihat Detail
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      {/* Detail Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative h-64 w-full">
                <img src={image} alt={name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{name}</h2>
                    <p className="text-primary font-bold text-xl">{price}</p>
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-5 h-5 fill-current mr-1" />
                    <span className="text-white font-medium">{rating}</span>
                  </div>
                </div>
                
                <div className="space-y-4 text-gray-300">
                  <p className="leading-relaxed">{description}</p>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <h4 className="text-white font-semibold mb-2">Spesifikasi Unggulan:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Kualitas Material Premium</li>
                      <li>Garansi Resmi 1 Tahun</li>
                      <li>Pengiriman Aman & Cepat</li>
                      <li>Desain Eksklusif</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button 
                    onClick={() => {
                      onAdd?.();
                      setShowModal(false);
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold transition-transform hover:scale-[1.02] flex items-center justify-center"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Tambah ke Keranjang Sekarang
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
