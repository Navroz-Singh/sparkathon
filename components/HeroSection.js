// components/HeroSection.js
"use client"

import Link from 'next/link'
import Image from 'next/image'
import {
    ArrowRightIcon,
    TruckIcon,
    ShieldCheckIcon,
    StarIcon
} from '@heroicons/react/24/outline'

export default function HeroSection() {
    return (
        <div className="w-full bg-white">
            {/* Compact Main Hero Section */}
            <section className="w-full px-6 lg:px-12 py-8 lg:py-12">
                <div className="max-w-8xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                        {/* Left Content - Reduced back to normal proportion */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h1 className="text-3xl lg:text-4xl font-bold text-black leading-tight">
                                    Save money.<br />
                                    <span className="text-gray-600">Live better.</span>
                                </h1>

                                <p className="text-base text-gray-600 leading-relaxed max-w-md">
                                    Millions of products at everyday low prices. Free shipping on $35+
                                </p>
                            </div>

                            {/* Compact CTA Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={()=>{window.scrollTo({top: document.getElementById('featured-products').offsetTop, behavior: 'smooth'})}} // scroll to featured products section
                                    className="inline-flex items-center px-6 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors duration-200"
                                >
                                    Shop Now
                                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                                </button>

                                <button
                                    onClick={()=>{window.scrollTo({top: document.getElementById('popular-products').offsetTop, behavior: 'smooth'})}} // scroll to popular products section
                                    className="inline-flex items-center px-6 py-2 border-2 border-black text-black text-sm font-medium rounded-full hover:bg-black hover:text-white transition-all duration-200"
                                >
                                    Deals
                                </button>
                            </div>

                            {/* Compact Trust Indicators */}
                            <div className="flex items-center gap-4 text-xs text-gray-600">
                                <div className="flex items-center gap-1">
                                    <TruckIcon className="h-4 w-4" />
                                    <span>Free Shipping</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <ShieldCheckIcon className="h-4 w-4" />
                                    <span>Secure</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Much Larger Three Images Horizontally */}
                        <div className="relative">
                            <div className="grid grid-cols-3 gap-3">
                                {/* First Image - Much Larger */}
                                <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-[3/4]">
                                    <Image
                                        src="https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=600"
                                        alt="Shopping at Walmart"
                                        fill
                                        className="object-cover"
                                        priority
                                    />

                                    {/* Discount Badge */}
                                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                        70% OFF
                                    </div>
                                </div>

                                {/* Second Image - Much Larger */}
                                <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-[3/4]">
                                    <Image
                                        src="https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=600"
                                        alt="Online Shopping"
                                        fill
                                        className="object-cover"
                                    />

                                    {/* New Arrivals Badge */}
                                    <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                        NEW
                                    </div>
                                </div>

                                {/* Third Image - Much Larger */}
                                <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-[3/4]">
                                    <Image
                                        src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600"
                                        alt="Fast Delivery"
                                        fill
                                        className="object-cover"
                                    />

                                    {/* Fast Delivery Badge */}
                                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                        FAST
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Rest of the sections remain exactly the same */}
            <section className="w-full px-6 lg:px-12 py-6 bg-gray-50">
                <div className="max-w-8xl mx-auto">
                    <div className="flex overflow-x-auto gap-4 pb-2">
                        {[
                            { name: 'Electronics', image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400' },
                            { name: 'Clothing', image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=400' },
                            { name: 'Home', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400' },
                            { name: 'Grocery', image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400' },
                            { name: 'Beauty', image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400' },
                            { name: 'Sports', image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=400' }
                        ].map((category, index) => (
                            <Link
                                key={index}
                                href={`/${category.name.toLowerCase()}`}
                                className="flex-shrink-0 group cursor-pointer"
                            >
                                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 w-24">
                                    <div className="h-16 relative">
                                        <Image
                                            src={category.image}
                                            alt={category.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-2">
                                        <h3 className="text-xs font-medium text-black text-center group-hover:text-gray-600 transition-colors duration-200">
                                            {category.name}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section id="featured-products" className="w-full px-6 lg:px-12 py-8">
                <div className="max-w-8xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-black">Featured Products</h2>
                        <Link href="/all-products" className="text-sm text-black hover:text-gray-600 font-medium">
                            View All →
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {[
                            { name: 'Wireless Earbuds', price: '$49.99', originalPrice: '$79.99', rating: 4.5, image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400' },
                            { name: 'Smart Watch', price: '$199.99', originalPrice: '$299.99', rating: 4.8, image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400' },
                            { name: 'Bluetooth Speaker', price: '$39.99', originalPrice: '$59.99', rating: 4.3, image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400' },
                            { name: 'Phone Case', price: '$12.99', originalPrice: '$19.99', rating: 4.6, image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400' },
                            { name: 'Charging Cable', price: '$8.99', originalPrice: '$14.99', rating: 4.4, image: 'https://images.pexels.com/photos/163143/aspirin-bad-drugs-medication-163143.jpeg?auto=compress&cs=tinysrgb&w=400' },
                            { name: 'Power Bank', price: '$24.99', originalPrice: '$39.99', rating: 4.7, image: 'https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=400' }
                        ].map((product, index) => (
                            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                                <div className="aspect-square relative">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="p-3">
                                    <h3 className="text-sm font-medium text-black mb-1 line-clamp-2">{product.name}</h3>

                                    <div className="flex items-center gap-1 mb-2">
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

                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm font-bold text-black">{product.price}</span>
                                        <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                                    </div>

                                    <button className="w-full bg-black text-white py-1.5 px-3 rounded-full hover:bg-gray-800 transition-colors duration-200 text-xs font-medium">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
