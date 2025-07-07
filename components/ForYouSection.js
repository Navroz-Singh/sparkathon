// components/ForYouSection.js
"use client"

import Link from 'next/link'
import Image from 'next/image'
import {
    StarIcon,
    HeartIcon,
    EyeIcon,
    ClockIcon,
    SparklesIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'

export default function ForYouSection() {
    // Sample personalized products data
    const personalizedProducts = [
        {
            id: 1,
            name: 'Apple AirPods Pro',
            price: '$199.99',
            originalPrice: '$249.99',
            rating: 4.8,
            reviews: 1204,
            image: 'https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=400',
            reason: 'Based on your recent searches',
            badge: 'Trending',
            isWishlisted: false
        },
        {
            id: 2,
            name: 'Samsung Galaxy Watch',
            price: '$179.99',
            originalPrice: '$229.99',
            rating: 4.6,
            reviews: 856,
            image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=400',
            reason: 'Similar to items you viewed',
            badge: 'Deal',
            isWishlisted: true
        },
        {
            id: 3,
            name: 'Sony Noise Cancelling Headphones',
            price: '$149.99',
            originalPrice: '$199.99',
            rating: 4.7,
            reviews: 692,
            image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
            reason: 'Frequently bought together',
            badge: 'Popular',
            isWishlisted: false
        },
        {
            id: 4,
            name: 'Instant Pot Pressure Cooker',
            price: '$79.99',
            originalPrice: '$129.99',
            rating: 4.9,
            reviews: 2341,
            image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=400',
            reason: 'Based on your purchase history',
            badge: 'Best Seller',
            isWishlisted: false
        },
        {
            id: 5,
            name: 'Nike Running Shoes',
            price: '$89.99',
            originalPrice: '$119.99',
            rating: 4.5,
            reviews: 534,
            image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
            reason: 'Recommended for you',
            badge: 'New',
            isWishlisted: true
        },
        {
            id: 6,
            name: 'Dyson V11 Vacuum Cleaner',
            price: '$399.99',
            originalPrice: '$499.99',
            rating: 4.8,
            reviews: 423,
            image: 'https://images.pexels.com/photos/4239140/pexels-photo-4239140.jpeg?auto=compress&cs=tinysrgb&w=400',
            reason: 'Similar to your wishlist items',
            badge: 'Premium',
            isWishlisted: false
        }
    ]

    const getBadgeColor = (badge) => {
        switch (badge.toLowerCase()) {
            case 'trending': return 'bg-purple-500'
            case 'deal': return 'bg-red-500'
            case 'popular': return 'bg-blue-500'
            case 'best seller': return 'bg-orange-500'
            case 'new': return 'bg-green-500'
            case 'premium': return 'bg-gray-800'
            default: return 'bg-gray-500'
        }
    }

    return (
        <section className="w-full px-6 lg:px-12 py-8 bg-white">
            <div className="max-w-8xl mx-auto">

                {/* Section Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <SparklesIcon className="h-6 w-6 text-black" />
                        <div>
                            <h2 className="text-2xl font-bold text-black">For You</h2>
                            <p className="text-sm text-gray-600">Personalized recommendations based on your activity</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/recommendations" className="text-sm text-black hover:text-gray-600 font-medium">
                            View All →
                        </Link>
                        <button className="text-sm text-gray-600 hover:text-black border border-gray-300 px-3 py-1 rounded-full hover:border-black transition-colors duration-200">
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Personalized Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {personalizedProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group">

                            {/* Product Image Container */}
                            <div className="aspect-square relative">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                                />

                                {/* Badge */}
                                <div className={`absolute top-2 left-2 ${getBadgeColor(product.badge)} text-white px-2 py-1 rounded-full text-xs font-bold`}>
                                    {product.badge}
                                </div>

                                {/* Wishlist Button */}
                                <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow duration-200">
                                    {product.isWishlisted ? (
                                        <HeartSolid className="h-4 w-4 text-red-500" />
                                    ) : (
                                        <HeartIcon className="h-4 w-4 text-gray-600 hover:text-red-500" />
                                    )}
                                </button>

                                {/* Quick View on Hover */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                                    <button className="opacity-0 group-hover:opacity-100 bg-white text-black px-3 py-1 rounded-full text-xs font-medium transition-opacity duration-200 flex items-center gap-1">
                                        <EyeIcon className="h-3 w-3" />
                                        Quick View
                                    </button>
                                </div>
                            </div>

                            {/* Product Information */}
                            <div className="p-3">
                                {/* Personalization Reason */}
                                <div className="flex items-center gap-1 mb-2">
                                    <ClockIcon className="h-3 w-3 text-gray-400" />
                                    <span className="text-xs text-gray-500">{product.reason}</span>
                                </div>

                                {/* Product Name */}
                                <h3 className="text-sm font-medium text-black mb-2 line-clamp-2 leading-tight">
                                    {product.name}
                                </h3>

                                {/* Rating and Reviews */}
                                <div className="flex items-center gap-1 mb-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-500">({product.reviews})</span>
                                </div>

                                {/* Pricing */}
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-sm font-bold text-black">{product.price}</span>
                                    <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                                    <span className="text-xs text-green-600 font-medium">
                                        {Math.round((1 - parseFloat(product.price.slice(1)) / parseFloat(product.originalPrice.slice(1))) * 100)}% off
                                    </span>
                                </div>

                                {/* Add to Cart Button */}
                                <button className="w-full bg-black text-white py-2 px-3 rounded-full hover:bg-gray-800 transition-colors duration-200 text-xs font-medium">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Personalization Controls */}
                <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-black mb-1">Improve your recommendations</h3>
                            <p className="text-xs text-gray-600">Help us show you more relevant products</p>
                        </div>
                        <div className="flex gap-2">
                            <Link href="/preferences" className="text-xs text-black hover:text-gray-600 border border-gray-300 px-3 py-1 rounded-full hover:border-black transition-colors duration-200">
                                Update Preferences
                            </Link>
                            <Link href="/browsing-history" className="text-xs text-gray-600 hover:text-black px-3 py-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
                                View History
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
