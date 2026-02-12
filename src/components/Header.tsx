"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-green-600">
          البحث الذكى
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-semibold text-gray-700">
          <Link href="/products" className="hover:text-green-600 transition">
            التطبيقات
          </Link>

          <Link href="/videos" className="hover:text-green-600 transition">
            الفيديوهات
          </Link>

          <Link href="/hardware-store" className="hover:text-green-600 transition">
            متجر الهاردوير
          </Link>
        </nav>

        {/* WhatsApp Button (Desktop Only) */}
        <a
          href="https://wa.me/201021732703?text=مرحبًا،%20أرغب%20في%20الاستفسار"
          target="_blank"
          className="hidden md:block bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition"
        >
          واتساب
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-2xl text-gray-700"
        >
          ☰
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}
      >
        <div className="p-6 flex justify-between items-center border-b">
          <span className="text-lg font-bold text-green-600">
            القائمة
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col p-6 gap-6 font-semibold text-gray-700">

          <Link
            href="/products"
            onClick={() => setIsOpen(false)}
            className="hover:text-green-600 transition"
          >
            التطبيقات
          </Link>

          <Link
            href="/videos"
            onClick={() => setIsOpen(false)}
            className="hover:text-green-600 transition"
          >
            الفيديوهات
          </Link>

          <Link
            href="/hardware-store"
            onClick={() => setIsOpen(false)}
            className="hover:text-green-600 transition"
          >
            متجر الهاردوير
          </Link>

          <a
            href="https://wa.me/201021732703?text=مرحبًا،%20أرغب%20في%20الاستفسار"
            target="_blank"
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-center hover:bg-green-700 transition"
          >
            واتساب
          </a>
        </nav>
      </div>
    </header>
  );
}
