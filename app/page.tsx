'use client';

import { useState } from 'react';
import {
  Home,
  MapPin,
  Users,
  Zap,
  MessageCircle,
  Bell,
  Settings,
  Crown,
  Star,
  Heart,
  Clock,
  DollarSign,
  ChevronRight,
  Search,
  ArrowRight,
  Eye,
  Send,
  Menu,
  X,
} from 'lucide-react';

type Screen =
  | 'onboarding'
  | 'signin'
  | 'signup'
  | 'dashboard'
  | 'task-creation'
  | 'map-booking'
  | 'worker-profile'
  | 'watch-earn'
  | 'chat'
  | 'notifications'
  | 'settings'
  | 'subscription';

export default function TumaworksApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [userRole, setUserRole] = useState<'client' | 'worker'>('client');
  const [diamonds, setDiamonds] = useState(450);
  const [isPremium, setIsPremium] = useState(false);

  const navigate = (screen: Screen) => setCurrentScreen(screen);

  // ONBOARDING SCREEN
  const OnboardingScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-primary to-secondary flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center space-y-8 max-w-md">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg">
          <Zap className="w-10 h-10 text-accent" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">Tumaworks</h1>
          <p className="text-lg text-white/90 leading-relaxed">
            Connect with workers and tasks instantly. Earn, hire, save money.
          </p>
        </div>
        <div className="space-y-3">
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4 text-white">
            <p className="font-semibold">For Everyone</p>
            <p className="text-sm text-white/80">Get work done or find work</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4 text-white">
            <p className="font-semibold">Quick & Easy</p>
            <p className="text-sm text-white/80">Verified workers, instant booking</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4 text-white">
            <p className="font-semibold">Save & Earn</p>
            <p className="text-sm text-white/80">Rewards on every transaction</p>
          </div>
        </div>
        <button
          onClick={() => navigate('signin')}
          className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-4 rounded-full transition-all transform hover:scale-105 shadow-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );

  // SIGNIN SCREEN
  const SignInScreen = () => (
    <div className="min-h-screen bg-white pt-12 px-6 pb-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
        <p className="text-neutral-600 mb-8">Sign in to your Tumaworks account</p>

        <div className="space-y-4 mb-6">
          <input
            type="email"
            placeholder="Email address"
            className="w-full bg-muted rounded-2xl px-4 py-3 text-foreground placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-muted rounded-2xl px-4 py-3 text-foreground placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          onClick={() => navigate('dashboard')}
          className="w-full bg-primary hover:bg-primary text-white font-bold py-3 rounded-full mb-4 transition-all shadow-md"
        >
          Sign In
        </button>

        <p className="text-center text-neutral-600 mb-4">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('signup')}
            className="text-primary font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>

        <button
          onClick={() => navigate('onboarding')}
          className="w-full text-primary font-semibold py-2"
        >
          ← Back
        </button>
      </div>
    </div>
  );

  // SIGNUP SCREEN
  const SignUpScreen = () => (
    <div className="min-h-screen bg-white pt-12 px-6 pb-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">Create account</h1>
        <p className="text-neutral-600 mb-8">Join Tumaworks in seconds</p>

        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Full name"
            className="w-full bg-muted rounded-2xl px-4 py-3 text-foreground placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            placeholder="Email address"
            className="w-full bg-muted rounded-2xl px-4 py-3 text-foreground placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="tel"
            placeholder="Phone number"
            className="w-full bg-muted rounded-2xl px-4 py-3 text-foreground placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Create password"
            className="w-full bg-muted rounded-2xl px-4 py-3 text-foreground placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-start gap-3 mb-6 p-3 bg-muted rounded-xl">
          <input type="checkbox" className="mt-1" />
          <p className="text-sm text-neutral-700">
            I agree to the Terms & Privacy Policy
          </p>
        </div>

        <button
          onClick={() => navigate('dashboard')}
          className="w-full bg-primary hover:bg-primary text-white font-bold py-3 rounded-full mb-4 transition-all shadow-md"
        >
          Sign Up
        </button>

        <button
          onClick={() => navigate('signin')}
          className="w-full text-primary font-semibold py-2"
        >
          ← Back to Sign In
        </button>
      </div>
    </div>
  );

  // DASHBOARD SCREEN
  const DashboardScreen = () => (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="bg-primary text-white px-6 pt-6 pb-8 rounded-b-3xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-white/80 text-sm">Good afternoon</p>
            <h1 className="text-2xl font-bold">Sean</h1>
          </div>
          <button
            onClick={() => navigate('notifications')}
            className="relative p-2 hover:bg-white/10 rounded-full transition"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </button>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl p-4 mb-4">
          <p className="text-sm text-white/80">Available Balance</p>
          <p className="text-3xl font-bold text-white">KES 2,450</p>
          <div className="flex gap-2 mt-3">
            <button className="flex-1 bg-white/20 hover:bg-white/30 text-white rounded-full py-2 text-sm font-semibold transition">
              Withdraw
            </button>
            <button className="flex-1 bg-accent hover:bg-accent text-white rounded-full py-2 text-sm font-semibold transition">
              Add Funds
            </button>
          </div>
        </div>

        {/* Role Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setUserRole('client')}
            className={`flex-1 py-2 rounded-full font-semibold transition ${
              userRole === 'client'
                ? 'bg-white text-primary'
                : 'bg-white/20 text-white'
            }`}
          >
            Need Help
          </button>
          <button
            onClick={() => setUserRole('worker')}
            className={`flex-1 py-2 rounded-full font-semibold transition ${
              userRole === 'worker'
                ? 'bg-white text-primary'
                : 'bg-white/20 text-white'
            }`}
          >
            Find Work
          </button>
        </div>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-neutral-500" />
          <input
            type="text"
            placeholder="What do you need?"
            className="w-full bg-white rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          />
        </div>

        {/* Categories */}
        <div>
          <h2 className="font-bold text-foreground mb-3">Popular Services</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Home, label: 'Cleaning', color: 'bg-primary/10 text-primary' },
              { icon: Zap, label: 'Delivery', color: 'bg-accent/10 text-accent' },
              { icon: Users, label: 'Errands', color: 'bg-secondary/10 text-primary' },
              { icon: MapPin, label: 'Rides', color: 'bg-primary/10 text-primary' },
              { icon: Star, label: 'Repairs', color: 'bg-accent/10 text-accent' },
              { icon: Heart, label: 'Health', color: 'bg-primary/10 text-primary' },
            ].map((cat, i) => (
              <button
                key={i}
                onClick={() => navigate('task-creation')}
                className={`${cat.color} rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition`}
              >
                <cat.icon className="w-6 h-6" />
                <span className="text-xs font-semibold text-center">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Nearby Workers */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-foreground">Nearby Workers</h2>
            <button className="text-primary text-sm font-semibold">See all</button>
          </div>
          <div className="space-y-3">
            {[
              { name: 'John M.', role: 'House Cleaning', rating: 4.9, img: '👨‍🔧' },
              { name: 'Sarah K.', role: 'Delivery Expert', rating: 4.8, img: '👩‍💼' },
              { name: 'Mike D.', role: 'Handy Worker', rating: 4.7, img: '👨‍🏭' },
            ].map((worker, i) => (
              <button
                key={i}
                onClick={() => navigate('worker-profile')}
                className="w-full bg-white rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-2xl">
                    {worker.img}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">{worker.name}</p>
                    <p className="text-sm text-neutral-600">{worker.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <span className="font-semibold text-sm">{worker.rating}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Premium Promo */}
        <button
          onClick={() => navigate('subscription')}
          className="w-full bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="font-bold text-lg mb-1">Go Premium</p>
              <p className="text-sm text-white/80">Unlock exclusive benefits</p>
            </div>
            <Crown className="w-6 h-6" />
          </div>
        </button>
      </div>
    </div>
  );

  // TASK CREATION SCREEN
  const TaskCreationScreen = () => (
    <div className="min-h-screen bg-white pt-6 px-6 pb-6">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate('dashboard')}
          className="text-primary font-semibold mb-6 flex items-center gap-2"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-foreground mb-6">Describe your task</h1>

        <div className="space-y-4 mb-6">
          <textarea
            placeholder="What do you need help with? Be specific..."
            className="w-full bg-muted rounded-2xl px-4 py-3 text-foreground placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary h-24 resize-none"
          />

          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Set your budget
            </label>
            <div className="flex items-center gap-2">
              <span className="text-neutral-600">KES</span>
              <input
                type="number"
                placeholder="0"
                className="flex-1 bg-muted rounded-2xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              💡 Suggested: 500-2000 KES based on your description
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Location
            </label>
            <button className="w-full bg-muted rounded-2xl px-4 py-3 text-left text-neutral-600 hover:bg-neutral-200 transition">
              📍 Select location on map
            </button>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Preferred date & time
            </label>
            <input
              type="datetime-local"
              className="w-full bg-muted rounded-2xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <button
          onClick={() => navigate('map-booking')}
          className="w-full bg-accent hover:bg-accent text-white font-bold py-3 rounded-full transition-all shadow-md"
        >
          Find Workers
        </button>
      </div>
    </div>
  );

  // MAP & BOOKING SCREEN
  const MapBookingScreen = () => (
    <div className="min-h-screen bg-white">
      {/* Map Placeholder */}
      <div className="h-96 bg-gradient-to-b from-neutral-200 to-neutral-100 flex items-center justify-center relative">
        <button
          onClick={() => navigate('dashboard')}
          className="absolute top-6 left-6 bg-white rounded-full p-2 hover:bg-neutral-100 transition shadow-md"
        >
          ← Back
        </button>
        <div className="text-center">
          <MapPin className="w-16 h-16 text-primary mx-auto mb-2 opacity-30" />
          <p className="text-neutral-600">Map View - Nearby Workers</p>
        </div>
      </div>

      {/* Worker List */}
      <div className="px-6 py-6 space-y-3">
        <h2 className="font-bold text-foreground mb-4">Available Workers</h2>
        {[
          {
            name: 'John M.',
            distance: '0.5 km away',
            eta: '5 min',
            rating: 4.9,
            img: '👨‍🔧',
            price: 800,
          },
          {
            name: 'Sarah K.',
            distance: '0.8 km away',
            eta: '8 min',
            rating: 4.8,
            img: '👩‍💼',
            price: 600,
          },
          {
            name: 'Mike D.',
            distance: '1.2 km away',
            eta: '12 min',
            rating: 4.7,
            img: '👨‍🏭',
            price: 550,
          },
        ].map((worker, i) => (
          <button
            key={i}
            onClick={() => navigate('worker-profile')}
            className="w-full bg-muted rounded-2xl p-4 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center text-2xl">
                  {worker.img}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">{worker.name}</p>
                  <div className="flex items-center gap-3 text-xs text-neutral-600">
                    <span>{worker.distance}</span>
                    <span>ETA: {worker.eta}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="font-semibold text-sm">{worker.rating}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-primary text-lg">KES {worker.price}</span>
              <span className="text-primary font-semibold">Book →</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // WORKER PROFILE SCREEN
  const WorkerProfileScreen = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-primary text-white px-6 pt-6 pb-8">
        <button
          onClick={() => navigate('map-booking')}
          className="mb-4 text-white/80 font-semibold"
        >
          ← Back
        </button>
        <div className="flex items-end gap-4">
          <div className="w-20 h-20 bg-accent/20 rounded-2xl flex items-center justify-center text-5xl">
            👨‍🔧
          </div>
          <div>
            <h1 className="text-2xl font-bold">John Mwangi</h1>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-white" />
              <span className="font-semibold">4.9</span>
              <span className="text-white/70">(128 reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6 py-6">
        {/* Status */}
        <div className="bg-green-100 border border-green-300 rounded-2xl p-4 text-green-800">
          <p className="font-semibold">✓ Verified Professional</p>
          <p className="text-sm">Background checked and certified</p>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
            <span className="text-neutral-600">Response time</span>
            <span className="font-semibold">5 minutes</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
            <span className="text-neutral-600">Hourly rate</span>
            <span className="font-semibold">KES 800</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
            <span className="text-neutral-600">Total earnings</span>
            <span className="font-semibold">KES 54,300</span>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="font-bold text-foreground mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {['House Cleaning', 'Laundry', 'Kitchen Cleaning', 'Pet Care'].map((skill, i) => (
              <span
                key={i}
                className="bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div>
          <h3 className="font-bold text-foreground mb-3">Recent Reviews</h3>
          <div className="space-y-3">
            {[
              { author: 'Alex', rating: 5, text: 'Amazing work! Very professional.' },
              { author: 'Grace', rating: 5, text: 'Quick and reliable. Highly recommended!' },
            ].map((rev, i) => (
              <div key={i} className="bg-muted rounded-xl p-3">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold">{rev.author}</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className={`w-3 h-3 ${
                          j < rev.rating
                            ? 'text-accent fill-accent'
                            : 'text-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-neutral-700">{rev.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Book Button */}
      <div className="fixed bottom-6 left-6 right-6 max-w-md mx-auto">
        <button
          onClick={() => navigate('chat')}
          className="w-full bg-accent hover:bg-accent text-white font-bold py-4 rounded-full transition-all shadow-lg"
        >
          Book This Worker
        </button>
      </div>
    </div>
  );

  // WATCH & EARN SCREEN
  const WatchEarnScreen = () => (
    <div className="min-h-screen bg-white pt-6 px-6 pb-6">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate('dashboard')}
          className="text-primary font-semibold mb-6 flex items-center gap-2"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-foreground mb-2">Watch & Earn</h1>
        <p className="text-neutral-600 mb-8">Watch ads and earn diamonds</p>

        {/* Diamond Balance */}
        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white mb-8 text-center">
          <p className="text-white/80 mb-2">Your Diamond Balance</p>
          <p className="text-5xl font-bold mb-2">{diamonds}</p>
          <p className="text-sm text-white/70">💎 Diamonds</p>
        </div>

        {/* Video Ad Offer */}
        <div className="space-y-4 mb-8">
          <h2 className="font-bold text-foreground">Available Rewards</h2>
          {[
            { title: '30-second ad', reward: '+25 💎' },
            { title: '60-second ad', reward: '+50 💎' },
            { title: 'Banner view (24h)', reward: '+100 💎' },
          ].map((offer, i) => (
            <button
              key={i}
              onClick={() => setDiamonds(d => d + parseInt(offer.reward))}
              className="w-full bg-muted hover:bg-neutral-200 rounded-2xl p-4 flex items-center justify-between transition"
            >
              <div className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-primary" />
                <div className="text-left">
                  <p className="font-semibold text-foreground">{offer.title}</p>
                  <p className="text-xs text-neutral-600">Tap to watch</p>
                </div>
              </div>
              <span className="font-bold text-accent text-lg">{offer.reward}</span>
            </button>
          ))}
        </div>

        {/* Conversion */}
        <div className="bg-secondary/10 rounded-2xl p-6 text-center">
          <p className="font-semibold text-foreground mb-2">Convert Diamonds</p>
          <p className="text-sm text-neutral-600 mb-4">
            1 Diamond = 1 KES discount on tasks
          </p>
          <p className="text-lg font-bold text-primary">
            You can save KES {diamonds}
          </p>
        </div>
      </div>
    </div>
  );

  // CHAT SCREEN
  const ChatScreen = () => (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-primary text-white px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate('worker-profile')}
          className="text-white/80 font-semibold"
        >
          ← Back
        </button>
        <div className="text-center">
          <p className="font-semibold">John M.</p>
          <p className="text-xs text-white/70">Online now</p>
        </div>
        <button className="text-white/80">⋮</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto px-6 py-4 space-y-4">
        <div className="flex gap-3">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-lg flex-shrink-0">
            👨‍🔧
          </div>
          <div className="bg-muted rounded-2xl rounded-tl-none p-4 max-w-xs">
            <p className="text-foreground text-sm">Hi! I saw your task request. I can definitely help!</p>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <div className="bg-primary text-white rounded-2xl rounded-tr-none p-4 max-w-xs">
            <p className="text-sm">Great! When can you start?</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-lg flex-shrink-0">
            👨‍🔧
          </div>
          <div className="bg-muted rounded-2xl rounded-tl-none p-4 max-w-xs">
            <p className="text-foreground text-sm">I'm available in 10 minutes. Location?</p>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-neutral-200 px-6 py-4 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-muted rounded-full px-4 py-3 text-foreground placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="bg-accent hover:bg-accent text-white rounded-full p-3 transition">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  // NOTIFICATIONS SCREEN
  const NotificationsScreen = () => (
    <div className="min-h-screen bg-white pt-6 px-6 pb-6">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate('dashboard')}
          className="text-primary font-semibold mb-6 flex items-center gap-2"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-foreground mb-6">Notifications</h1>

        <div className="space-y-3">
          {[
            {
              title: 'Task Accepted',
              msg: 'John accepted your cleaning task',
              time: '5 min ago',
              icon: '✓',
              color: 'bg-green-100 text-green-700',
            },
            {
              title: 'New Opportunity',
              msg: 'Sarah is offering a $30 delivery task nearby',
              time: '15 min ago',
              icon: '⚡',
              color: 'bg-accent/10 text-accent',
            },
            {
              title: 'Reward',
              msg: '+50 diamonds earned from watching ads',
              time: '1 hour ago',
              icon: '💎',
              color: 'bg-blue-100 text-blue-700',
            },
            {
              title: 'Payment Received',
              msg: 'KES 2,500 from completed task',
              time: '2 hours ago',
              icon: '💰',
              color: 'bg-green-100 text-green-700',
            },
          ].map((notif, i) => (
            <button
              key={i}
              className="w-full bg-muted hover:bg-neutral-200 rounded-2xl p-4 text-left transition"
            >
              <div className="flex gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${notif.color} text-lg`}
                >
                  {notif.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">{notif.title}</p>
                  <p className="text-sm text-neutral-600 truncate">{notif.msg}</p>
                  <p className="text-xs text-neutral-500 mt-1">{notif.time}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // SETTINGS SCREEN
  const SettingsScreen = () => (
    <div className="min-h-screen bg-white pt-6 px-6 pb-6">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate('dashboard')}
          className="text-primary font-semibold mb-6 flex items-center gap-2"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-foreground mb-6">Settings</h1>

        {/* Account Section */}
        <h2 className="font-bold text-foreground mb-3 mt-6">Account</h2>
        <div className="space-y-2 mb-6">
          {[
            { label: 'Profile', icon: '👤' },
            { label: 'Payment Methods', icon: '💳' },
            { label: 'Addresses', icon: '📍' },
            { label: 'Verification', icon: '✓' },
          ].map((item, i) => (
            <button
              key={i}
              className="w-full bg-muted hover:bg-neutral-200 rounded-xl p-3 flex items-center justify-between transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium text-foreground">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-500" />
            </button>
          ))}
        </div>

        {/* Preferences Section */}
        <h2 className="font-bold text-foreground mb-3 mt-6">Preferences</h2>
        <div className="space-y-3 mb-6 bg-muted rounded-2xl p-4">
          {[
            { label: 'Notifications', active: true },
            { label: 'Dark Mode', active: false },
            { label: 'Location Services', active: true },
          ].map((pref, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-foreground font-medium">{pref.label}</span>
              <button
                className={`w-12 h-7 rounded-full transition ${
                  pref.active ? 'bg-primary' : 'bg-neutral-300'
                } flex items-center ${pref.active ? 'justify-end' : 'justify-start'} px-1`}
              >
                <div className="w-5 h-5 bg-white rounded-full" />
              </button>
            </div>
          ))}
        </div>

        {/* Support Section */}
        <h2 className="font-bold text-foreground mb-3 mt-6">Support</h2>
        <div className="space-y-2 mb-6">
          {[
            { label: 'Help Center', icon: '❓' },
            { label: 'Contact Support', icon: '💬' },
            { label: 'Terms & Privacy', icon: '📋' },
          ].map((item, i) => (
            <button
              key={i}
              className="w-full bg-muted hover:bg-neutral-200 rounded-xl p-3 flex items-center justify-between transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium text-foreground">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-500" />
            </button>
          ))}
        </div>

        <button className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-3 rounded-full transition">
          Sign Out
        </button>
      </div>
    </div>
  );

  // SUBSCRIPTION SCREEN
  const SubscriptionScreen = () => (
    <div className="min-h-screen bg-white pt-6 px-6 pb-6">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate('dashboard')}
          className="text-primary font-semibold mb-6 flex items-center gap-2"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-foreground mb-2">Premium Plans</h1>
        <p className="text-neutral-600 mb-8">Unlock exclusive features and save more</p>

        {/* Plans */}
        <div className="space-y-4 mb-8">
          {[
            {
              name: 'Individual Premium',
              price: 'KES 199',
              period: '/month',
              features: [
                '✓ Priority support',
                '✓ 10% discount on all tasks',
                '✓ Verified badge',
                '✓ Ad-free experience',
              ],
              color: 'primary',
              cta: 'Get Started',
            },
            {
              name: 'Business Premium',
              price: 'KES 499',
              period: '/month',
              features: [
                '✓ Everything in Individual',
                '✓ 20% discount on tasks',
                '✓ Team access',
                '✓ Analytics dashboard',
                '✓ Dedicated support',
              ],
              color: 'secondary',
              cta: 'Upgrade Now',
              popular: true,
            },
          ].map((plan, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 border-2 transition ${
                plan.popular
                  ? 'border-accent bg-accent/5 scale-105'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              {plan.popular && (
                <div className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-lg font-bold text-foreground mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                <span className="text-neutral-600">{plan.period}</span>
              </div>
              <div className="space-y-2 mb-6">
                {plan.features.map((feature, j) => (
                  <p key={j} className="text-sm text-neutral-700">
                    {feature}
                  </p>
                ))}
              </div>
              <button
                onClick={() => setIsPremium(true)}
                className={`w-full font-bold py-3 rounded-full transition ${
                  plan.color === 'primary'
                    ? 'bg-primary text-white hover:bg-primary'
                    : 'bg-accent text-white hover:bg-accent'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Money-back Guarantee */}
        <div className="bg-green-50 rounded-2xl p-4 text-center border border-green-200">
          <p className="text-sm text-green-800">
            <span className="font-bold">30-day money-back guarantee</span>
            <br />
            Not satisfied? Get a full refund.
          </p>
        </div>
      </div>
    </div>
  );

  // Screen Router
  const screenMap: Record<Screen, () => JSX.Element> = {
    onboarding: OnboardingScreen,
    signin: SignInScreen,
    signup: SignUpScreen,
    dashboard: DashboardScreen,
    'task-creation': TaskCreationScreen,
    'map-booking': MapBookingScreen,
    'worker-profile': WorkerProfileScreen,
    'watch-earn': WatchEarnScreen,
    chat: ChatScreen,
    notifications: NotificationsScreen,
    settings: SettingsScreen,
    subscription: SubscriptionScreen,
  };

  const CurrentScreen = screenMap[currentScreen];

  return (
    <div className="bg-background min-h-screen">
      {/* Mobile Frame */}
      <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen flex flex-col overflow-hidden">
        <CurrentScreen />
      </div>

      {/* Bottom Navigation (Dashboard only) */}
      {currentScreen === 'dashboard' && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-neutral-200 flex justify-around py-2">
          {[
            { icon: Home, label: 'Home', screen: 'dashboard' },
            { icon: MapPin, label: 'Browse', screen: 'map-booking' },
            { icon: Heart, label: 'Rewards', screen: 'watch-earn' },
            { icon: MessageCircle, label: 'Chat', screen: 'chat' },
            { icon: Settings, label: 'Profile', screen: 'settings' },
          ].map(({ icon: Icon, label, screen }, i) => (
            <button
              key={i}
              onClick={() => navigate(screen as Screen)}
              className="flex flex-col items-center gap-1 py-2 px-4 text-neutral-600 hover:text-primary transition"
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-semibold">{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
