// components/PopularProductsSection.js
"use client"

import Link from 'next/link'
import Image from 'next/image'
import {
    StarIcon,
    ArrowRightIcon,
    HeartIcon,
    ShoppingCartIcon,
    ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'

export default function PopularProductsSection() {
    // Sample popular products data for first section (8 products for 2x4 grid)
    const popularProducts1 = [
        {
            id: 1,
            name: 'iPhone 15 Pro',
            price: '$999.99',
            originalPrice: '$1099.99',
            rating: 4.8,
            image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400',
            badge: 'Bestseller'
        },
        {
            id: 2,
            name: 'MacBook Air M2',
            price: '$1199.99',
            originalPrice: '$1399.99',
            rating: 4.9,
            image: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=400',
            badge: 'Popular'
        },
        {
            id: 3,
            name: 'iPad Pro 12.9"',
            price: '$799.99',
            originalPrice: '$999.99',
            rating: 4.7,
            image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400',
            badge: 'Deal'
        },
        {
            id: 4,
            name: 'AirPods Pro 2',
            price: '$199.99',
            originalPrice: '$249.99',
            rating: 4.6,
            image: 'https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=400',
            badge: 'Trending'
        },
        {
            id: 9,
            name: 'Apple Watch Series 9',
            price: '$349.99',
            originalPrice: '$429.99',
            rating: 4.7,
            image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
            badge: 'New'
        },
        {
            id: 10,
            name: 'Samsung Galaxy Buds',
            price: '$129.99',
            originalPrice: '$179.99',
            rating: 4.5,
            image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
            badge: 'Deal'
        },
        {
            id: 13,
            name: 'Sony WH-1000XM5',
            price: '$349.99',
            originalPrice: '$399.99',
            rating: 4.8,
            image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
            badge: 'Popular'
        },
        {
            id: 14,
            name: 'Google Pixel 8',
            price: '$699.99',
            originalPrice: '$799.99',
            rating: 4.6,
            image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400',
            badge: 'New'
        }
    ]

    // Sample popular products data for second section (8 products for 2x4 grid)
    const popularProducts2 = [
        {
            id: 5,
            name: 'Samsung 65" QLED TV',
            price: '$899.99',
            originalPrice: '$1199.99',
            rating: 4.8,
            image: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=400',
            badge: 'Deal'
        },
        {
            id: 6,
            name: 'Ninja Air Fryer',
            price: '$89.99',
            originalPrice: '$129.99',
            rating: 4.7,
            image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=400',
            badge: 'Popular'
        },
        {
            id: 7,
            name: 'Dyson Hair Dryer',
            price: '$329.99',
            originalPrice: '$429.99',
            rating: 4.9,
            image: 'https://images.pexels.com/photos/3373745/pexels-photo-3373745.jpeg?auto=compress&cs=tinysrgb&w=400',
            badge: 'Premium'
        },
        {
            id: 8,
            name: 'KitchenAid Mixer',
            price: '$279.99',
            originalPrice: '$349.99',
            rating: 4.8,
            image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=400',
            badge: 'Bestseller'
        },
        {
            id: 11,
            name: 'Instant Pot 8Qt',
            price: '$99.99',
            originalPrice: '$149.99',
            rating: 4.6,
            image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=400',
            badge: 'Popular'
        },
        {
            id: 12,
            name: 'Vitamix Blender',
            price: '$399.99',
            originalPrice: '$549.99',
            rating: 4.9,
            image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=400',
            badge: 'Premium'
        },
        {
            id: 15,
            name: 'Nespresso Machine',
            price: '$159.99',
            originalPrice: '$199.99',
            rating: 4.5,
            image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=400',
            badge: 'Deal'
        },
        {
            id: 16,
            name: 'Robot Vacuum',
            price: '$299.99',
            originalPrice: '$399.99',
            rating: 4.7,
            image: 'https://images.pexels.com/photos/4239140/pexels-photo-4239140.jpeg?auto=compress&cs=tinysrgb&w=400',
            badge: 'Trending'
        }
    ]

    const getBadgeColor = (badge) => {
        switch (badge.toLowerCase()) {
            case 'bestseller': return 'bg-orange-500'
            case 'popular': return 'bg-blue-500'
            case 'deal': return 'bg-red-500'
            case 'trending': return 'bg-purple-500'
            case 'premium': return 'bg-gray-800'
            case 'new': return 'bg-green-500'
            default: return 'bg-gray-500'
        }
    }

    const ProductCard = ({ product }) => (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group flex-shrink-0" style={{ width: 'calc(25% - 6px)' }}>
            <div className="aspect-[4/3] relative">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                />

                {/* Improved Badge */}
                <div className={`absolute top-1 left-1 ${getBadgeColor(product.badge)} text-white px-1.5 py-0.5 rounded-full text-xs font-bold`}>
                    {product.badge}
                </div>

                {/* Improved Wishlist Button */}
                <button className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow duration-200">
                    <HeartIcon className="h-3.5 w-3.5 text-gray-600 hover:text-red-500" />
                </button>
            </div>

            <div className="p-2">
                <h3 className="text-xs font-medium text-black mb-1 line-clamp-2 leading-tight">{product.name}</h3>

                {/* Improved Rating */}
                <div className="flex items-center gap-1 mb-1">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon
                                key={i}
                                className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-500">({product.rating})</span>
                </div>

                <div className="flex items-center gap-1 mb-1.5">
                    <span className="text-xs font-bold text-black">{product.price}</span>
                    <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                </div>

                <button className="w-full bg-black text-white py-1 px-2 rounded-full hover:bg-gray-800 transition-colors duration-200 text-xs font-medium">
                    Add to Cart
                </button>
            </div>
        </div>
    )

    return (
        <div className="max-w-8xl mx-auto bg-white">
            {/* Ultra Compact Section Header */}
            <section id="popular-products" className="w-full px-6 lg:px-12 py-3">
                <div className="w-full">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <ArrowTrendingUpIcon className="h-5 w-5 text-black" />
                            <div>
                                <h2 className="text-lg font-bold text-black">Popular Products</h2>
                                <p className="text-xs text-gray-600">Trending items loved by our customers</p>
                            </div>
                        </div>

                        <Link href="/popular" className="text-xs text-black hover:text-gray-600 font-medium">
                            View All →
                        </Link>
                    </div>

                    {/* First Section: 2x4 Products Left, Compact Explore Image Right */}
                    <div className="flex flex-col lg:flex-row gap-3 mb-4">

                        {/* Left Side: 2x4 Product Flex Layout */}
                        <div className="flex-1 lg:flex-[2]">
                            <div className="flex flex-wrap gap-2">
                                {popularProducts1.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Compact Explore More Image */}
                        <div className="flex-1 lg:flex-[1]">
                            <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl overflow-hidden h-full min-h-[140px] flex items-center justify-center">
                                <Image
                                    src="https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=600"
                                    alt="Explore Electronics"
                                    fill
                                    className="object-cover opacity-30"
                                />

                                <div className="relative z-10 text-center text-white p-2">
                                    <h3 className="text-sm font-bold mb-1">Explore Electronics</h3>
                                    <p className="text-xs mb-2 opacity-90">
                                        Latest tech gadgets
                                    </p>

                                    <Link
                                        href="/electronics"
                                        className="inline-flex items-center px-3 py-1 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 text-xs"
                                    >
                                        Shop Now
                                        <ArrowRightIcon className="ml-1 h-3 w-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Second Section: Compact Explore Image Left, 2x4 Products Right */}
                    <div className="flex flex-col lg:flex-row gap-3">

                        {/* Left Side: Compact Explore More Image */}
                        <div className="flex-1 lg:flex-[1]">
                            <div className="relative bg-gradient-to-br from-green-500 to-teal-600 rounded-xl overflow-hidden h-full min-h-[140px] flex items-center justify-center">
                                <Image
                                    src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
                                    alt="Explore Home & Kitchen"
                                    fill
                                    className="object-cover opacity-30"
                                />

                                <div className="relative z-10 text-center text-white p-2">
                                    <h3 className="text-sm font-bold mb-1">Home & Kitchen</h3>
                                    <p className="text-xs mb-2 opacity-90">
                                        Premium appliances
                                    </p>

                                    <Link
                                        href="/home-kitchen"
                                        className="inline-flex items-center px-3 py-1 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 text-xs"
                                    >
                                        Shop Now
                                        <ArrowRightIcon className="ml-1 h-3 w-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: 2x4 Product Flex Layout */}
                        <div className="flex-1 lg:flex-[2]">
                            <div className="flex flex-wrap gap-2">
                                {popularProducts2.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Minimal Bottom CTA Strip */}
                    <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-semibold text-black">Can't find what you're looking for?</h3>
                                <p className="text-xs text-gray-600">Browse our complete catalog</p>
                            </div>
                            <div className="flex gap-2">
                                <Link href="/categories" className="px-2 py-1 border border-black text-black rounded-full hover:bg-black hover:text-white transition-all duration-200 text-xs font-medium">
                                    Categories
                                </Link>
                                <Link href="/search" className="px-2 py-1 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200 text-xs font-medium flex items-center">
                                    <ShoppingCartIcon className="h-3 w-3 mr-1" />
                                    Search
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}
