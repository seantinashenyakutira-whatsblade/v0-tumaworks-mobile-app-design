'use client';

import { useState } from 'react';
import {
  Home, MapPin, Users, Zap, MessageCircle, Bell, Settings, Crown, Star, Heart,
  Clock, DollarSign, ChevronRight, Search, ArrowRight, Eye, Send, Menu, X,
  ShoppingBag, Wrench, Car, Briefcase, Camera, Grid, List, Tag, Share2, Phone,
  Droplets, Hammer, PenTool, Flame, ArrowLeft, Navigation, Edit3, Image as ImageIcon,
  CheckCircle, PlusCircle, Filter, Baby, ShoppingCart, WashingMachine
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
  | 'chat-list'
  | 'chat-detail'
  | 'notifications'
  | 'profile-dashboard'
  | 'subscription'
  | 'marketplace'
  | 'browse-services';

export default function TumaworksApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [userRole, setUserRole] = useState<'client' | 'worker'>('client');
  const [diamonds, setDiamonds] = useState(450);
  const [isPremium, setIsPremium] = useState(false);
  const [budget, setBudget] = useState(1500);

  const navigate = (screen: Screen) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScreen(screen);
  };

  // COMMON BUTTON STYLES for interactive hover followup effects
  const btnPrimary = "bg-primary text-white font-bold rounded-full py-4 transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30 active:translate-y-0 active:scale-95";
  const btnAccent = "bg-accent text-white font-bold rounded-full py-4 transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/30 active:translate-y-0 active:scale-95";
  const cardHover = "transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg active:scale-95 cursor-pointer";

  // ONBOARDING SCREEN
  const OnboardingScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-primary to-secondary flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center space-y-8 max-w-md w-full">
        <div className={`w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl ${cardHover}`}>
          <Zap className="w-12 h-12 text-accent animate-pulse" />
        </div>
        <div>
          <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">Tumaworks</h1>
          <p className="text-lg text-white/90 leading-relaxed font-medium">
            Connect. Hire. Sell. Instantly.
          </p>
        </div>
        <div className="space-y-4 pt-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 text-white border border-white/20 transform transition hover:bg-white/20">
            <p className="font-bold text-lg">The Super App</p>
            <p className="text-sm text-white/80 mt-1">100+ Pieceworks, Rides, Deliveries & Marketplace</p>
          </div>
        </div>
        <div className="pt-8">
          <button onClick={() => navigate('signin')} className={`w-full ${btnAccent}`}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );

  // SIGNIN SCREEN
  const SignInScreen = () => (
    <div className="min-h-screen bg-white pt-12 px-6 pb-6 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full">
        <button onClick={() => navigate('onboarding')} className="text-primary font-bold mb-8 flex items-center gap-2 hover:opacity-70 transition">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <h1 className="text-4xl font-extrabold text-foreground mb-2 tracking-tight">Welcome back</h1>
        <p className="text-neutral-500 mb-8 font-medium">Sign in to Tumaworks</p>
        <div className="space-y-4 mb-8">
          <input type="email" placeholder="Email address" className="w-full bg-neutral-100 rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition shadow-sm hover:shadow-md" />
          <input type="password" placeholder="Password" className="w-full bg-neutral-100 rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition shadow-sm hover:shadow-md" />
        </div>
        <button onClick={() => navigate('dashboard')} className={`w-full ${btnPrimary} mb-6`}>
          Sign In
        </button>
        <p className="text-center text-neutral-600 font-medium">
          Don't have an account?{' '}
          <button onClick={() => navigate('signup')} className="text-primary font-bold hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );

  // SIGNUP SCREEN
  const SignUpScreen = () => (
    <div className="min-h-screen bg-white pt-12 px-6 pb-6 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full">
        <button onClick={() => navigate('signin')} className="text-primary font-bold mb-8 flex items-center gap-2 hover:opacity-70 transition">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <h1 className="text-4xl font-extrabold text-foreground mb-2 tracking-tight">Create account</h1>
        <p className="text-neutral-500 mb-8 font-medium">Join Tumaworks in seconds</p>
        <div className="space-y-4 mb-8">
          <input type="text" placeholder="Full name" className="w-full bg-neutral-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary transition shadow-sm hover:shadow-md" />
          <input type="email" placeholder="Email address" className="w-full bg-neutral-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary transition shadow-sm hover:shadow-md" />
          <input type="tel" placeholder="Phone number" className="w-full bg-neutral-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary transition shadow-sm hover:shadow-md" />
          <input type="password" placeholder="Create password" className="w-full bg-neutral-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary transition shadow-sm hover:shadow-md" />
        </div>
        <button onClick={() => navigate('dashboard')} className={`w-full ${btnPrimary}`}>
          Sign Up
        </button>
      </div>
    </div>
  );

  // DASHBOARD SCREEN
  const DashboardScreen = () => (
    <div className="min-h-screen bg-neutral-50 pb-28">
      {/* Header */}
      <div className="bg-primary text-white px-6 pt-10 pb-10 rounded-b-[40px] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-white/80 text-sm font-medium">Good afternoon</p>
              <h1 className="text-3xl font-extrabold tracking-tight">Sean</h1>
            </div>
            <button onClick={() => navigate('notifications')} className={`relative p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all ${cardHover}`}>
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-accent rounded-full border-2 border-primary" />
            </button>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-xl">
            <p className="text-sm text-white/80 font-medium">Available Balance</p>
            <p className="text-4xl font-extrabold text-white my-2">ZMW 2,450.00</p>
            <div className="flex gap-3 mt-4">
              <button className="flex-1 bg-white/20 hover:bg-white/30 text-white rounded-full py-2 text-sm font-bold transition transform active:scale-95">Withdraw</button>
              <button className="flex-1 bg-accent text-white rounded-full py-2 text-sm font-bold transition transform hover:shadow-lg active:scale-95 hover:bg-accent/90">Add Funds</button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6 space-y-8 relative z-20 -mt-6">
        {/* Search */}
        <div className="relative shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl group">
          <Search className="absolute left-5 top-4 w-6 h-6 text-neutral-400 group-hover:text-primary transition-colors" />
          <input type="text" placeholder="What service are you looking for?" className="w-full bg-white rounded-2xl pl-14 pr-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary font-medium" />
        </div>

        {/* Popular Services Section */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-extrabold text-foreground">Popular Services</h2>
            <button onClick={() => navigate('browse-services')} className="text-primary font-bold text-sm hover:underline flex items-center">
              See all <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: Wrench, label: 'Plumber', color: 'bg-blue-100 text-blue-600' },
              { icon: Flame, label: 'Welder', color: 'bg-orange-100 text-orange-600' },
              { icon: Droplets, label: 'Cleaner', color: 'bg-teal-100 text-teal-600' },
              { icon: Car, label: 'Driver', color: 'bg-indigo-100 text-indigo-600' },
              { icon: WashingMachine, label: 'Laundry', color: 'bg-purple-100 text-purple-600' },
              { icon: Phone, label: 'Repair', color: 'bg-rose-100 text-rose-600' },
              { icon: ShoppingCart, label: 'Food', color: 'bg-yellow-100 text-yellow-600' },
              { icon: Baby, label: 'BabySit', color: 'bg-pink-100 text-pink-600' },
            ].map((cat, i) => (
              <button key={i} onClick={() => navigate('task-creation')} className={`flex flex-col items-center gap-2 group ${cardHover}`}>
                <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center shadow-md group-hover:shadow-lg transition-all`}>
                  <cat.icon className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold text-neutral-700">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Nearby Workers */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-extrabold text-foreground">Workers Nearby</h2>
            <button className="text-primary font-bold text-sm hover:underline">Filter</button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'John Mwangi', role: 'Plumber · Pipe Fitting', rating: 4.9, dist: '0.5 km', price: 'ZMW 800', img: '👨‍🔧' },
              { name: 'Sarah Chanda', role: 'Laundry & Cleaning', rating: 4.8, dist: '1.2 km', price: 'ZMW 200', img: '👩‍💼' },
              { name: 'Mike Zulu', role: 'Gadget Repair', rating: 4.7, dist: '2.0 km', price: 'ZMW 450', img: '👨‍🏭' },
            ].map((worker, i) => (
              <div key={i} onClick={() => navigate('worker-profile')} className={`bg-white rounded-3xl p-5 border border-neutral-100 flex items-center justify-between ${cardHover}`}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center text-3xl shadow-inner">
                    {worker.img}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{worker.name}</h3>
                    <p className="text-sm font-medium text-neutral-500">{worker.role}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md text-xs font-bold">{worker.dist}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 mb-1">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="font-bold">{worker.rating}</span>
                  </div>
                  <p className="font-extrabold text-primary">{worker.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // BROWSE SERVICES SCREEN (Takes you to search ahead or scroll all services / pieceworks)
  const BrowseServicesScreen = () => (
    <div className="min-h-screen bg-neutral-50 pb-28 pt-8 px-6">
      <button onClick={() => navigate('dashboard')} className="text-primary font-bold mb-6 flex items-center gap-2 hover:opacity-70 transition">
        <ArrowLeft className="w-5 h-5" /> Home
      </button>
      <h1 className="text-3xl font-extrabold text-foreground mb-4">All Services</h1>
      <div className="relative shadow-sm mb-6">
        <Search className="absolute left-4 top-4 w-5 h-5 text-neutral-400" />
        <input type="text" placeholder="Search pieceworks by name..." className="w-full bg-white rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary font-medium" />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {['All', 'Home Services', 'Rides', 'Food', 'Logistics', 'Professional'].map((t, i) => (
          <button key={i} className={`px-4 py-2 rounded-full font-bold whitespace-nowrap ${i === 0 ? 'bg-primary text-white' : 'bg-white text-neutral-600 border border-neutral-200'}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="grid gap-4 mt-2">
        {['Plumbing & Pipe Repair', 'House Deep Cleaning', 'Welding & Metalwork', 'Ride Hailing (Economy)', 'Food Delivery', 'Babysitting', 'Electronic Gadget Repair', 'Driver for Hire'].map((srv, i) => (
          <div key={i} className={`bg-white p-5 rounded-2xl shadow-sm border border-neutral-100 flex justify-between items-center ${cardHover}`}>
            <div>
              <h3 className="font-bold text-lg">{srv}</h3>
              <p className="text-sm text-neutral-500">120+ workers nearby</p>
            </div>
            <button className="bg-accent/10 text-accent font-bold px-4 py-2 rounded-xl">View</button>
          </div>
        ))}
      </div>
    </div>
  );

  // TASK CREATION / BOOKING SCREEN
  const TaskCreationScreen = () => (
    <div className="min-h-screen bg-white pt-8 px-6 pb-28">
      <div className="max-w-md mx-auto">
        <button onClick={() => navigate('dashboard')} className="text-primary font-bold mb-6 flex items-center gap-2 hover:-translate-x-1 transition-transform">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <h1 className="text-3xl font-extrabold text-foreground mb-8">Post a Request</h1>
        <div className="space-y-6">
          <div className="relative">
             <label className="text-sm font-bold text-neutral-700 mb-2 block">Service Category</label>
             <select className="w-full bg-neutral-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none font-medium appearance-none">
                <option>Plumbing</option>
                <option>Welding</option>
                <option>Cleaning</option>
                <option>Gadget Repair</option>
             </select>
          </div>
          
          <div>
            <label className="text-sm font-bold text-neutral-700 mb-2 block">Description</label>
            <textarea placeholder="e.g. My kitchen sink is leaking, need a quick fix..." className="w-full bg-neutral-100 rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary h-32 resize-none font-medium transition shadow-inner" />
          </div>

          <div className="bg-neutral-50 p-5 rounded-3xl border border-neutral-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-extrabold text-foreground block">Set Your Budget</label>
              <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-neutral-100">
                <span className="font-extrabold text-primary text-xl">ZMW {budget}</span>
              </div>
            </div>
            <input type="range" min="100" max="10000" step="50" value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="w-full accent-primary h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer" />
            <div className="flex justify-between text-xs text-neutral-400 font-bold mt-2">
              <span>ZMW 100</span>
              <span>ZMW 10,000+</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-neutral-700 mb-2 block">Location</label>
            <div className="relative group">
              <input type="text" placeholder="Search Location..." defaultValue="" className="w-full bg-neutral-100 rounded-2xl pl-12 pr-32 py-4 focus:outline-none focus:ring-2 focus:ring-primary font-medium" />
              <MapPin className="absolute left-4 top-4 w-5 h-5 text-neutral-400" />
              <button className="absolute right-2 top-2 bottom-2 bg-white text-primary border border-primary/20 rounded-xl px-3 flex items-center gap-1 text-sm font-bold shadow-sm hover:bg-primary/5 transition">
                <Navigation className="w-4 h-4" /> My Address
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button onClick={() => navigate('map-booking')} className={`w-full ${btnPrimary} shadow-xl`}>
            Find Available Workers
          </button>
        </div>
      </div>
    </div>
  );

  // MAP & BOOKING SCREEN (Workers matching criteria)
  const MapBookingScreen = () => (
    <div className="min-h-screen bg-neutral-50 pb-28">
      <div className="h-64 bg-neutral-200 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')]"></div>
        <button onClick={() => navigate('task-creation')} className="absolute top-6 left-6 bg-white/90 backdrop-blur rounded-full p-3 shadow-lg hover:scale-105 active:scale-95 transition-all">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center animate-ping absolute -inset-2"></div>
          <MapPin className="w-12 h-12 text-primary relative drop-shadow-lg" />
        </div>
      </div>
      <div className="px-6 py-6 space-y-4">
        <div className="flex justify-between items-center mb-2">
           <h2 className="font-extrabold text-2xl text-foreground">Nearby Results</h2>
           <button className="bg-white px-3 py-1.5 rounded-lg border border-neutral-200 text-sm font-bold flex items-center gap-1 shadow-sm"><Filter className="w-4 h-4"/> Filter</button>
        </div>
        {[
          { name: 'John Mwangi', role: 'Plumber', dist: '0.5 km', r: 4.9, p: 800, img: '👨‍🔧' },
          { name: 'Mike Zulu', role: 'Plumber', dist: '1.2 km', r: 4.7, p: 750, img: '👨‍🏭' },
        ].map((w, i) => (
          <div key={i} onClick={() => navigate('worker-profile')} className={`w-full bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm ${cardHover}`}>
            <div className="flex justify-between mb-4">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center text-2xl">{w.img}</div>
                <div>
                  <h3 className="font-bold text-lg">{w.name}</h3>
                  <p className="text-sm font-medium text-neutral-500">{w.role}</p>
                  <p className="text-xs font-bold text-primary mt-1">{w.dist} away</p>
                </div>
              </div>
              <div className="flex gap-1 items-start">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="font-bold">{w.r}</span>
              </div>
            </div>
            <div className="flex justify-between items-center bg-neutral-50 p-3 rounded-xl border border-neutral-100">
              <span className="font-extrabold text-lg">ZMW {w.p}</span>
              <span className="text-primary font-bold">Book Now →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // WORKER PROFILE
  const WorkerProfileScreen = () => (
    <div className="min-h-screen bg-neutral-50 pb-28">
      <div className="bg-white px-6 pt-8 pb-6 shadow-sm relative">
        <button onClick={() => navigate('map-booking')} className="mb-6 font-bold flex items-center gap-2 hover:opacity-70 transition">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <div className="flex gap-6 items-center">
           <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-5xl shadow-inner border-4 border-white">
             👨‍🔧
           </div>
           <div>
              <h1 className="text-3xl font-extrabold">John Mwangi</h1>
              <p className="text-neutral-500 font-medium text-lg">Master Plumber</p>
              <div className="flex items-center gap-2 mt-2 bg-green-50 text-green-700 px-3 py-1 rounded-lg w-max border border-green-200">
                <CheckCircle className="w-4 h-4" /> <span className="text-sm font-bold">Verified Professional</span>
              </div>
           </div>
        </div>
      </div>
      <div className="px-6 py-6 space-y-6">
         <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-100">
               <span className="text-neutral-500 text-sm font-bold">Experience</span>
               <p className="text-xl font-extrabold mt-1">5+ Years</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-100">
               <span className="text-neutral-500 text-sm font-bold">Rating</span>
               <div className="flex items-center gap-1 mt-1">
                 <Star className="w-5 h-5 text-accent fill-accent" />
                 <p className="text-xl font-extrabold">4.9 <span className="text-sm text-neutral-400">(128)</span></p>
               </div>
            </div>
         </div>
         
         <div>
            <h3 className="font-extrabold text-xl mb-3">About & Skills</h3>
            <p className="text-neutral-600 font-medium leading-relaxed mb-4">Professional plumber specializing in pipe fitting, leak repair, and complete bathroom installations. Very reliable and quick response times.</p>
            <div className="flex flex-wrap gap-2">
              {['Pipe Fitting', 'Leak Repair', 'Drainage', 'Installations'].map((s, i) => (
                <span key={i} className="bg-neutral-200 text-neutral-700 px-4 py-2 rounded-xl text-sm font-bold">{s}</span>
              ))}
            </div>
         </div>

         <div>
            <h3 className="font-extrabold text-xl mb-3">Previous Jobs</h3>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-100 flex items-center gap-4 mb-3 cursor-pointer hover:shadow-md transition">
               <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center"><Wrench className="w-6 h-6 text-neutral-500"/></div>
               <div>
                  <h4 className="font-bold">Fixed Kitchen Sink Leak</h4>
                  <p className="text-sm text-neutral-500">2 days ago · ★ 5.0</p>
               </div>
               <ChevronRight className="w-5 h-5 ml-auto text-neutral-400"/>
            </div>
         </div>

         <div className="pt-4">
            <button onClick={() => navigate('chat-detail')} className={`w-full ${btnAccent}`}>
               Contact & Book
            </button>
         </div>
      </div>
    </div>
  );

  // MARKETPLACE SCREEN (Replacing Rewards)
  const MarketplaceScreen = () => (
    <div className="min-h-screen bg-neutral-50 pb-28 pt-8 px-6">
      <h1 className="text-3xl font-extrabold text-foreground mb-4">Marketplace</h1>
      <div className="relative shadow-sm mb-6">
        <Search className="absolute left-4 top-4 w-5 h-5 text-neutral-400" />
        <input type="text" placeholder="Search goods, subscriptions, auctions..." className="w-full bg-white rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary font-medium" />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {['Cash & Carry', 'Subscriptions', 'Auctions'].map((tab, i) => (
          <button key={i} className={`px-5 py-2.5 rounded-full font-bold whitespace-nowrap shadow-sm transition ${i === 0 ? 'bg-primary text-white' : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'}`}>
            {tab}
           </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
         {[
           { n: 'Plumbing Kit Pro', p: 'ZMW 1,200', tag: 'Sale', img: '🔧' },
           { n: 'Monthly Cleaning Sub', p: 'ZMW 1,500/mo', tag: 'Subs', img: '🧽' },
           { n: 'Toolbox Vintage', p: 'Current Bid: ZMW 400', tag: 'Auction', img: '🧰' },
           { n: 'Cooking Pots Set', p: 'ZMW 850', tag: 'Sale', img: '🍲' },
         ].map((item, i) => (
           <div key={i} className={`bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 flex flex-col items-center text-center ${cardHover}`}>
              <div className="w-full h-24 bg-neutral-100 rounded-xl mb-3 flex items-center justify-center text-4xl">{item.img}</div>
              <span className="bg-primary/10 text-primary text-[10px] font-extrabold uppercase px-2 py-1 rounded w-max mb-2">{item.tag}</span>
              <h3 className="font-bold text-sm leading-tight mb-2">{item.n}</h3>
              <p className="font-extrabold text-accent mt-auto">{item.p}</p>
           </div>
         ))}
      </div>
    </div>
  );

  // CHAT LIST SCREEN (WhatsApp style)
  const ChatListScreen = () => (
    <div className="min-h-screen bg-white pb-28">
      <div className="bg-primary text-white px-6 pt-8 pb-6 sticky top-0 z-20 shadow-md">
         <h1 className="text-3xl font-extrabold tracking-tight">Messages</h1>
      </div>
      <div className="divide-y divide-neutral-100">
         {[
           { n: 'John Mwangi', m: 'I am on my way!', t: '10:42 AM', img: '👨‍🔧', unread: 2 },
           { n: 'Sarah Chanda', m: 'Thanks for the payment.', t: 'Yesterday', img: '👩‍💼', unread: 0 },
         ].map((c, i) => (
           <button key={i} onClick={() => navigate('chat-detail')} className="w-full px-6 py-4 flex items-center gap-4 hover:bg-neutral-50 transition text-left group">
              <div className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform">{c.img}</div>
              <div className="flex-1 min-w-0">
                 <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-lg">{c.n}</h3>
                    <span className={`text-xs font-bold ${c.unread ? 'text-accent' : 'text-neutral-400'}`}>{c.t}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <p className={`text-sm truncate ${c.unread ? 'font-bold text-foreground' : 'font-medium text-neutral-500'}`}>{c.m}</p>
                    {c.unread > 0 && <span className="bg-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ml-2">{c.unread}</span>}
                 </div>
              </div>
           </button>
         ))}
      </div>
    </div>
  );

  // CHAT DETAIL SCREEN
  const ChatDetailScreen = () => (
    <div className="min-h-screen bg-neutral-50 flex flex-col pb-20">
      <div className="bg-primary text-white px-4 py-4 flex items-center justify-between shadow-md z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('chat-list')} className="p-2 hover:bg-white/10 rounded-full transition"><ArrowLeft className="w-6 h-6" /></button>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">👨‍🔧</div>
          <div>
             <h2 className="font-bold text-lg leading-tight">John Mwangi</h2>
             <p className="text-xs text-white/70 font-medium">Online</p>
          </div>
        </div>
        <Phone className="w-6 h-6 text-white/80 hover:text-white cursor-pointer" />
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-4">
         <div className="bg-white border border-neutral-100 rounded-2xl rounded-tl-none p-4 max-w-[80%] shadow-sm">
           <p className="font-medium text-neutral-800">Hi! I saw your plumbing request. I can fix it today.</p>
           <span className="text-[10px] text-neutral-400 font-bold block mt-2 text-right">10:40 AM</span>
         </div>
         <div className="bg-primary text-white rounded-2xl rounded-tr-none p-4 max-w-[80%] shadow-sm ml-auto">
           <p className="font-medium">Great! Are you okay with the ZMW 1500 budget?</p>
           <span className="text-[10px] text-white/70 font-bold block mt-2 text-right">10:41 AM</span>
         </div>
         <div className="bg-white border border-neutral-100 rounded-2xl rounded-tl-none p-4 max-w-[80%] shadow-sm">
           <p className="font-medium text-neutral-800">I am on my way!</p>
           <span className="text-[10px] text-neutral-400 font-bold block mt-2 text-right">10:42 AM</span>
         </div>
      </div>
      <div className="bg-white border-t border-neutral-200 p-4 fixed bottom-0 w-full max-w-md z-30">
        <div className="flex gap-2">
          <button className="p-3 text-neutral-400 hover:text-primary transition"><PlusCircle className="w-6 h-6"/></button>
          <input type="text" placeholder="Type a message..." className="flex-1 bg-neutral-100 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary font-medium" />
          <button className="bg-primary hover:bg-primary-dark text-white rounded-full p-3 shadow-md transform hover:scale-105 transition"><Send className="w-5 h-5 ml-1" /></button>
        </div>
      </div>
    </div>
  );

  // PROFILE / SETTINGS (DASHBOARD FOR OWNER)
  const ProfileDashboardScreen = () => (
    <div className="min-h-screen bg-neutral-50 pb-28 pt-8">
      <div className="px-6 mb-8 text-center relative">
         <div className="w-28 h-28 mx-auto bg-white rounded-full border-4 border-white shadow-xl flex items-center justify-center text-4xl relative overflow-hidden group">
            <span className="z-0">👦</span>
            <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center transition-all cursor-pointer">
               <Camera className="w-8 h-8 text-white"/>
            </div>
         </div>
         <h1 className="text-2xl font-extrabold mt-4">Sean Tumaworks</h1>
         <p className="text-neutral-500 font-bold">sean@tumaworks.com</p>
         <button className="mt-4 bg-primary/10 text-primary font-bold px-6 py-2 rounded-full border border-primary/20 hover:bg-primary/20 transition">Edit Profile</button>
      </div>

      <div className="px-6 space-y-6">
         {/* Rewards Moved Here */}
         <div className={`bg-gradient-to-r from-accent to-accent-dark p-6 rounded-3xl text-white shadow-lg ${cardHover}`}>
            <div className="flex justify-between items-center mb-2">
               <h3 className="font-extrabold text-lg flex items-center gap-2"><Heart className="w-5 h-5"/> Rewards & Diamonds</h3>
               <span className="text-2xl font-black">{diamonds}</span>
            </div>
            <p className="text-sm font-medium text-white/80">Watch ads or complete jobs to earn more.</p>
            <button className="mt-4 bg-white text-accent font-bold px-4 py-2 rounded-xl text-sm w-full">Claim Rewards / Watch Ads</button>
         </div>

         {/* Account Settings */}
         <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 p-4">
            <h3 className="font-extrabold text-neutral-400 uppercase text-xs tracking-wider mb-4 ml-2">Account Settings</h3>
            <div className="space-y-1">
               {[
                 { i: Briefcase, l: 'My Skills & Services' },
                 { i: CheckCircle, l: 'Previous Jobs' },
                 { i: Grid, l: 'My Marketplace Listings' },
                 { i: Settings, l: 'App Preferences' },
               ].map((item, i) => (
                 <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-neutral-50 transition group">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors"><item.i className="w-5 h-5 text-neutral-600 group-hover:text-primary"/></div>
                     <span className="font-bold text-neutral-700">{item.l}</span>
                   </div>
                   <ChevronRight className="w-5 h-5 text-neutral-300" />
                 </button>
               ))}
            </div>
         </div>

         <button className="w-full py-4 text-red-500 font-bold bg-red-50 rounded-2xl border border-red-100 hover:bg-red-100 transition">Sign Out</button>
      </div>
    </div>
  );

  // NOTIFICATION & OTHERS placeholders
  const NotificationsScreen = () => <div className="p-6"><button onClick={()=>navigate('dashboard')} className="text-primary font-bold">Back</button><h1 className="text-2xl font-bold mt-4">Notifications</h1><p className="mt-4">No new notifications.</p></div>;
  const SubscriptionScreen = () => <div className="p-6"><button onClick={()=>navigate('dashboard')} className="text-primary font-bold">Back</button><h1 className="text-2xl font-bold mt-4">Premium Plans</h1></div>;

  const screenMap: Record<Screen, () => JSX.Element> = {
    onboarding: OnboardingScreen,
    signin: SignInScreen,
    signup: SignUpScreen,
    dashboard: DashboardScreen,
    'task-creation': TaskCreationScreen,
    'map-booking': MapBookingScreen,
    'worker-profile': WorkerProfileScreen,
    'watch-earn': () => null, // Moved to Profile
    'chat-list': ChatListScreen,
    'chat-detail': ChatDetailScreen,
    notifications: NotificationsScreen,
    'profile-dashboard': ProfileDashboardScreen,
    settings: ProfileDashboardScreen,
    subscription: SubscriptionScreen,
    marketplace: MarketplaceScreen,
    'browse-services': BrowseServicesScreen
  };

  const CurrentScreen = screenMap[currentScreen];
  const bottomNavScreens = ['dashboard', 'browse-services', 'map-booking', 'marketplace', 'chat-list', 'profile-dashboard', 'settings', 'worker-profile', 'task-creation', 'notifications', 'subscription'];
  const showBottomNav = bottomNavScreens.includes(currentScreen);

  return (
    <div className="bg-neutral-900 min-h-screen flex justify-center">
      {/* Mobile Frame / App Container */}
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col relative shadow-2xl">
        <CurrentScreen />

        {/* Sticky Bottom Navigation - fully interactive */}
        {showBottomNav && (
          <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-neutral-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-safe z-50">
            <div className="flex justify-around items-center p-2">
              {[
                { icon: Home, label: 'Home', s: 'dashboard' },
                { icon: Grid, label: 'Browse', s: 'browse-services' },
                { icon: ShoppingBag, label: 'Market', s: 'marketplace' },
                { icon: MessageCircle, label: 'Chat', s: 'chat-list' },
                { icon: Settings, label: 'Profile', s: 'profile-dashboard' },
              ].map((item, i) => {
                const isActive = currentScreen === item.s;
                return (
                  <button
                    key={i}
                    onClick={() => navigate(item.s as Screen)}
                    className="flex flex-col items-center gap-1 p-2 w-16 group relative"
                  >
                    <div className={`relative flex items-center justify-center transition-all duration-300 transform ${isActive ? '-translate-y-2' : 'group-hover:-translate-y-1'}`}>
                       <div className={`absolute inset-0 bg-primary/10 rounded-full scale-0 transition-transform duration-300 ${isActive ? 'scale-150' : 'group-hover:scale-100'}`}></div>
                       <item.icon className={`w-6 h-6 relative z-10 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-neutral-400 group-hover:text-primary'}`} />
                    </div>
                    <span className={`text-[10px] uppercase tracking-wider font-extrabold transition-all duration-300 ${isActive ? 'text-primary translate-y-0 opacity-100' : 'text-neutral-400 translate-y-1 group-hover:text-primary'}`}>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
