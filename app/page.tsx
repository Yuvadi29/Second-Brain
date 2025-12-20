"use client";

import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { Brain, Search, Clock, Shield, ArrowRight, Github } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black selection:bg-blue-500/30">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Second Brain</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="https://github.com" target="_blank">
              <Button variant="ghost" size="icon">
                <Github className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-sm font-medium">
              Revolutionize Your Knowledge Management
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Your <span className="text-gradient">Second Brain</span>,<br />
              Powered by AI.
            </h1>
            <p className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl mb-10 leading-relaxed">
              Connect your notes, documents, and thoughts. Our AI processes your personal knowledge base to provide instant answers with accurate citations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/chat">
                <Button size="lg" className="rounded-2xl group px-8">
                  Open Your Brain
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="secondary" size="lg" className="rounded-2xl px-8">
                View Documentation
              </Button>
            </div>
          </motion.div>

          {/* Feature Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32"
          >
            {[
              {
                icon: <Search className="w-6 h-6 text-blue-400" />,
                title: "Semantic Search",
                description: "Find information across all your notes using natural language, not just keywords."
              },
              {
                icon: <Clock className="w-6 h-6 text-purple-400" />,
                title: "Instant Retrieval",
                description: "Get answers to your questions in seconds, backed by your own data sources."
              },
              {
                icon: <Shield className="w-6 h-6 text-pink-400" />,
                title: "Privacy First",
                description: "Your knowledge base stays yours. Secure storage and encrypted processing."
              }
            ].map((feature, i) => (
              <motion.div key={i} variants={item}>
                <Card className="h-full text-left">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-500" />
            <span className="font-semibold">Second Brain</span>
          </div>
          <p className="text-sm text-zinc-500">
            &copy; 2025 Second Brain. Built for the modern thinker.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-zinc-500 hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="text-zinc-500 hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="text-zinc-500 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

