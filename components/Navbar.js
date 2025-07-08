"use client"

import Link from 'next/link'
import {
    MagnifyingGlassIcon,
    ShoppingCartIcon,
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon,
    SparklesIcon,
    UserIcon,
    ArrowRightStartOnRectangleIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useUser } from '@/hooks/useUser'

export default function Navbar() {
    const [isSubpageOpen, setIsSubpageOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

    const { user, loading, signOut } = useUser()

    const handleSignOut = async () => {
        await signOut()
        setIsUserMenuOpen(false)
    }

    // Get user initials for avatar fallback
    const getUserInitials = (name, email) => {
        if (name && name.trim()) {
            return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        }
        if (email) {
            return email[0].toUpperCase()
        }
        return 'U'
    }

    // Get user display name
    const getUserDisplayName = (user) => {
        if (user?.profile?.name) return user.profile.name
        if (user?.name) return user.name
        if (user?.email) return user.email.split('@')[0]
        return 'User'
    }

    return (
        <div className="w-full">
            {/* Main Navigation Bar */}
            <nav className="bg-white border-b border-gray-200 w-full">
                <div className="w-full px-6 lg:px-12">
                    <div className="flex items-center justify-between h-16">

                        {/* Left: Walmart Branding */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center">
                                <span className="text-lg font-bold text-black tracking-wide hover:text-gray-700 transition-colors duration-200">
                                    WALMART
                                </span>
                            </Link>
                        </div>

                        {/* Center: Search Bar with AI Button */}
                        <div className="flex-1 max-w-lg mx-8">
                            <div className="relative flex items-center">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        className="w-full pl-4 pr-12 py-2 text-sm border-2 border-black rounded-full bg-white text-black placeholder:text-gray-500 focus:ring-2 focus:ring-black focus:border-black focus:outline-none transition-all duration-200"
                                    />
                                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black transition-colors duration-200">
                                        <MagnifyingGlassIcon className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* AI Button with Icon and Tooltip */}
                                <button
                                    className="ml-2 px-3 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center"
                                    title="Search using AI"
                                >
                                    <SparklesIcon className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Right: Navigation Items */}
                        <div className="hidden md:flex items-center space-x-8">

                            {/* Main Categories */}
                            <Link href="/categories" className="text-sm font-semibold text-black hover:text-gray-600 transition-colors duration-200">
                                All Categories
                            </Link>

                            {/* Subpage Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsSubpageOpen(!isSubpageOpen)}
                                    className="flex items-center text-sm font-semibold text-black hover:text-gray-600 transition-colors duration-200"
                                >
                                    Categories
                                    <ChevronDownIcon className="h-4 w-4 ml-1" />
                                </button>

                                {/* Subpage Dropdown Menu */}
                                {isSubpageOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border-2 border-black z-50">
                                        <div className="py-2">
                                            <Link href="/electronics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-black hover:text-white rounded-lg mx-2">Electronics</Link>
                                            <Link href="/clothing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-black hover:text-white rounded-lg mx-2">Clothing & Accessories</Link>
                                            <Link href="/home-garden" className="block px-4 py-2 text-sm text-gray-700 hover:bg-black hover:text-white rounded-lg mx-2">Home & Garden</Link>
                                            <Link href="/grocery" className="block px-4 py-2 text-sm text-gray-700 hover:bg-black hover:text-white rounded-lg mx-2">Grocery</Link>
                                            <Link href="/pharmacy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-black hover:text-white rounded-lg mx-2">Pharmacy</Link>
                                            <Link href="/auto" className="block px-4 py-2 text-sm text-gray-700 hover:bg-black hover:text-white rounded-lg mx-2">Auto & Tires</Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Cart Icon */}
                            <Link href="/cart" className="relative p-2 text-black hover:text-gray-600 transition-colors duration-200 rounded-full hover:bg-gray-100">
                                <ShoppingCartIcon className="h-5 w-5 stroke-2" />
                                <span className="sr-only">Shopping cart</span>
                            </Link>

                            {/* User Authentication Section */}
                            {loading ? (
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full"></div>
                                    <div className="w-20 h-4 animate-pulse bg-gray-200 rounded"></div>
                                </div>
                            ) : user ? (
                                /* Logged In: User Avatar and Name */
                                <div className="relative">
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        {/* User Avatar */}
                                        {user.profile?.avatar || user.avatar ? (
                                            <img
                                                src={user.profile?.avatar || user.avatar}
                                                alt={getUserDisplayName(user)}
                                                className="w-8 h-8 rounded-full object-cover border-2 border-gray-300"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-medium">
                                                {getUserInitials(getUserDisplayName(user), user.email)}
                                            </div>
                                        )}

                                        {/* User Name */}
                                        <div className="flex items-center space-x-1">
                                            <span className="text-sm font-medium text-black max-w-24 truncate">
                                                {getUserDisplayName(user)}
                                            </span>
                                            <ChevronDownIcon className="h-4 w-4 text-gray-600" />
                                        </div>
                                    </button>

                                    {/* User Dropdown Menu */}
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border-2 border-black z-50">
                                            <div className="py-2">
                                                {/* User Info */}
                                                <div className="px-4 py-3 border-b border-gray-200">
                                                    <p className="text-sm font-medium text-black">{getUserDisplayName(user)}</p>
                                                    <p className="text-xs text-gray-600 truncate">{user.email}</p>
                                                </div>

                                                {/* Menu Items */}
                                                <Link
                                                    href="/account"
                                                    className="flex items-center mt-1 px-4 py-2 text-sm text-gray-700 hover:bg-black hover:text-white rounded-lg mx-2"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                >
                                                    <UserIcon className="h-4 w-4 mr-2" />
                                                    My Account
                                                </Link>
                                                <Link
                                                    href="/account/orders"
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-black hover:text-white rounded-lg mx-2"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                >
                                                    <ShoppingCartIcon className="h-4 w-4 mr-2" />
                                                    My Orders
                                                </Link>
                                                <Link
                                                    href="/wishlist"
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-black hover:text-white rounded-lg mx-2"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                >
                                                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                                    Wishlist
                                                </Link>

                                                {/* Divider */}
                                                <div className="border-t border-gray-200 my-2"></div>

                                                {/* Sign Out */}
                                                <button
                                                    onClick={handleSignOut}
                                                    className="w-51 flex items-center px-4 py-2 text-sm text-gray-700 hover:text-white hover:bg-red-600 rounded-lg mx-2"
                                                >
                                                    <ArrowRightStartOnRectangleIcon className="h-4 w-4 mr-2" />
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* Not Logged In: Login Button */
                                <Link href="/login" className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 transition-colors duration-200 rounded-full">
                                    Log In
                                </Link>
                            )}

                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-black hover:text-gray-600 rounded-full hover:bg-gray-100"
                        >
                            {isMobileMenuOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
                        </button>

                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200">
                        <div className="px-6 py-4 space-y-4">                            

                            {/* Mobile User Section */}
                            {loading ? (
                                <div className="flex items-center p-2">
                                    <div className="w-10 h-10 animate-pulse bg-gray-200 rounded-full mr-3"></div>
                                    <div className="flex-1">
                                        <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                                        <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                                    </div>
                                </div>
                            ) : user ? (
                                /* Mobile Logged In User */
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="flex items-center mb-3">
                                        {/* Enhanced Mobile Avatar */}
                                        {user.profile?.avatar || user.avatar ? (
                                            <img
                                                src={user.profile?.avatar || user.avatar}
                                                alt={getUserDisplayName(user)}
                                                className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 mr-3"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
                                                {getUserInitials(getUserDisplayName(user), user.email)}
                                            </div>
                                        )}

                                        {/* Enhanced Mobile User Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-black truncate">
                                                {getUserDisplayName(user)}
                                            </p>
                                            <p className="text-xs text-gray-600 truncate">{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Link href="/account" className="block text-sm font-medium text-black p-2 rounded-lg hover:bg-gray-200">My Account</Link>
                                        <Link href="/account/orders" className="block text-sm text-gray-700 p-2 rounded-lg hover:bg-black hover:text-white">My Orders</Link>
                                        <Link href="/wishlist" className="block text-sm text-gray-700 p-2 rounded-lg hover:bg-black hover:text-white">Wishlist</Link>
                                        <button
                                            onClick={handleSignOut}
                                            className="block w-full text-left text-sm text-gray-700 p-2 rounded-lg hover:bg-red-600 hover:text-white"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* Mobile Not Logged In */
                                <Link href="/login" className="block text-sm font-medium text-white bg-black p-3 rounded-xl hover:bg-gray-800 text-center">
                                    Log In
                                </Link>
                            )}

                            {/* Mobile Navigation Links */}
                            <div className="space-y-3">
                                <Link href="/categories" className="block text-sm font-semibold text-black p-2 rounded-lg hover:bg-gray-100">All Categories</Link>
                                <div className="space-y-2 pl-4">
                                    <Link href="/electronics" className="block text-sm text-gray-700 p-2 rounded-lg hover:bg-black hover:text-white">Electronics</Link>
                                    <Link href="/clothing" className="block text-sm text-gray-700 p-2 rounded-lg hover:bg-black hover:text-white">Clothing & Accessories</Link>
                                    <Link href="/home-garden" className="block text-sm text-gray-700 p-2 rounded-lg hover:bg-black hover:text-white">Home & Garden</Link>
                                    <Link href="/grocery" className="block text-sm text-gray-700 p-2 rounded-lg hover:bg-black hover:text-white">Grocery</Link>
                                    <Link href="/pharmacy" className="block text-sm text-gray-700 p-2 rounded-lg hover:bg-black hover:text-white">Pharmacy</Link>
                                    <Link href="/auto" className="block text-sm text-gray-700 p-2 rounded-lg hover:bg-black hover:text-white">Auto & Tires</Link>
                                </div>
                                <Link href="/cart" className="flex items-center text-sm font-medium text-black p-2 rounded-lg hover:bg-gray-100">
                                    <ShoppingCartIcon className="h-4 w-4 mr-2 stroke-2" />
                                    Cart
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    )
}
