'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Home, MapPin, Users, Zap, MessageCircle, Bell, Settings, Crown, Star, Heart,
  Clock, DollarSign, ChevronRight, Search, ArrowRight, Eye, Send, Menu, X,
  ShoppingBag, Wrench, Car, Briefcase, Camera, Grid, List, Tag, Share2, Phone,
  Droplets, Hammer, PenTool, Flame, ArrowLeft, Navigation, Edit3, Image as ImageIcon,
  CheckCircle, PlusCircle, Filter, Baby, ShoppingCart, WashingMachine, TrendingUp, HandCoins, ShieldCheck, Wallet as WalletIcon,
  User, Wallet, Sliders, Plus
} from 'lucide-react';

import { AuthService } from './services/authService';
import { DBService } from './services/databaseService';
import { MatchingService } from './services/matchingService';
import { PaymentService } from './services/paymentService';
import { UserProfile, UserRole } from './types';

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
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [diamonds, setDiamonds] = useState(120);
  const [role, setRole] = useState<UserRole>('client');
  const [isPremium, setIsPremium] = useState(false);
  const [budget, setBudget] = useState(1500);

  // Load persistence logic
  useEffect(() => {
    const unsub = AuthService.onAuthStateChange(async (firebaseUser) => {
       if (firebaseUser) {
          let profile = await DBService.getUserProfile(firebaseUser.uid);
          
          // Self-healing: Create profile if missing
          if (!profile) {
            await DBService.createUserProfile(firebaseUser.uid, {
               name: firebaseUser.displayName || 'Anonymous User',
               email: firebaseUser.email || '',
               role: 'client'
            });
            profile = await DBService.getUserProfile(firebaseUser.uid);
          }

          setUser(profile);
          if (profile) setRole(profile.role);
          setCurrentScreen('dashboard');
       } else {
          setUser(null);
          setCurrentScreen('onboarding');
       }
       setLoading(false);
    });
    return () => unsub();
  }, []);

  const toggleRole = async () => {
    if (!user) return;
    const newRole = role === 'client' ? 'worker' : 'client';
    setLoading(true);
    try {
      await DBService.createUserProfile(user.id, { role: newRole as UserRole });
      setRole(newRole as UserRole);
      const updatedProfile = await DBService.getUserProfile(user.id);
      setUser(updatedProfile);
    } catch (err) {
      alert('Failed to switch role');
    } finally {
      setLoading(false);
    }
  };

  const navigate = (screen: Screen) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScreen(screen);
  };

  // BOLD PREMIUM DESIGN SYSTEM
  const btnPrimary = "solid-bold-btn bg-primary text-white hover:bg-primary/90";
  const btnAccent = "solid-bold-btn bg-accent text-accent-foreground hover:bg-accent/90";
  const cardHover = "transition-all duration-500 transform hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(31,38,135,0.12)] active:scale-95 cursor-pointer rounded-3xl";
  const glassCard = "bg-white/90 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-[40px] p-8";

  // BOLD ONBOARDING SCREEN
  const OnboardingScreen = () => (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-white to-accent/5 flex flex-col items-center justify-center px-8 py-12 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-[-5%] left-[-10%] w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      
      <div className="text-center space-y-10 max-w-sm w-full relative z-10 page-transition">
        <div className={`w-32 h-32 bg-white rounded-[40px] flex items-center justify-center mx-auto shadow-2xl animate-float border border-primary/10`}>
          <Zap className="w-16 h-16 text-primary fill-primary/20" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-6xl font-black text-foreground mb-4 tracking-tighter leading-none">Tuma<br/><span className="text-primary">works.</span></h1>
          <p className="text-xl text-neutral-500 font-bold tracking-tight">
            Connect. Hire. Grow. <br/><span className="text-neutral-400 font-medium">Zambia's #1 Service App.</span>
          </p>
        </div>

        <div className={glassCard}>
           <div className="flex items-center gap-4 mb-4 text-left">
              <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                 <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                 <p className="font-black text-sm uppercase tracking-widest text-primary">Find Experts</p>
                 <p className="text-xs text-neutral-400 font-bold">Safe and Secure</p>
              </div>
           </div>
           
           <button onClick={() => navigate('signin')} className={`w-full ${btnPrimary} mt-4`}>
             Get Started Now
           </button>
        </div>
      </div>
    </div>
  );

  // SIGNIN SCREEN
  const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authLoading, setAuthLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
       setError('');
       if (!email || !password) return setError('Please fill in all fields');
       setAuthLoading(true);
       try { 
         await AuthService.login(email, password); 
       } 
       catch (err: any) { 
         setError(err.message || 'Login failed. Please check your details.');
       } 
       finally { setAuthLoading(false); }
    };

    return (
      <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center px-10 page-transition">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="w-24 h-24 bg-primary rounded-[32px] flex items-center justify-center mb-12 shadow-2xl shadow-primary/40 animate-float relative z-10">
           <Zap className="w-12 h-12 text-white fill-white"/>
        </div>
        <h1 className="text-5xl font-black text-white mb-4 tracking-tighter uppercase relative z-10">Sign In</h1>
        <p className="text-neutral-500 font-black tracking-[0.2em] uppercase text-[10px] mb-12 relative z-10 text-center">Welcome back to Tumaworks</p>
        
        <div className="w-full space-y-4 max-w-sm relative z-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 rounded-[24px] blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[28px] p-1 flex items-center">
               <div className="w-12 h-12 flex items-center justify-center text-white/40"><Search className="w-5 h-5" /></div>
               <input type="email" placeholder="EMAIL ADDRESS" value={email} onChange={(e)=>setEmail(e.target.value)} className="flex-1 bg-transparent py-4 font-black text-white focus:outline-none placeholder:text-neutral-600 tracking-wider text-[11px] uppercase" />
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 rounded-[24px] blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[28px] p-1 flex items-center">
               <div className="w-12 h-12 flex items-center justify-center text-white/40"><ShieldCheck className="w-5 h-5" /></div>
               <input type="password" placeholder="PASSWORD" value={password} onChange={(e)=>setPassword(e.target.value)} className="flex-1 bg-transparent py-4 font-black text-white focus:outline-none placeholder:text-neutral-600 tracking-wider text-[11px] uppercase" />
            </div>
          </div>

          {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center animate-shake mt-2 px-4">{error}</p>}
          
          <button onClick={handleLogin} disabled={authLoading} className="w-full py-6 bg-primary text-white font-black rounded-[32px] text-xs uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 hover:shadow-primary/50 active:scale-95 transition-all flex justify-center items-center gap-4 mt-6">
             {authLoading ? <div className="w-6 h-6 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div> : <>Sign In <ArrowRight className="w-5 h-5"/></>}
          </button>
        </div>
        
        <div className="mt-12 text-neutral-500 font-black text-[10px] uppercase tracking-[0.2em] flex gap-4 relative z-10">
           New here? <button onClick={() => navigate('signup')} className="text-white hover:text-primary transition-colors">Create Account</button>
        </div>
      </div>
    );
  };

  const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [userRole, setUserRole] = useState<UserRole>('client');
    const [authLoading, setAuthLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignup = async () => {
       setError('');
       if (!email || !password || !name) return setError('Please fill in all fields');
       setAuthLoading(true);
       try { await AuthService.signup(email, password, name, userRole); } 
       catch (err: any) { 
         let msg = err.message || 'Signup failed. Please try again.';
         if (msg.includes('api-key-not-valid')) {
           msg = 'Firebase API Key is invalid or missing. Please check your Vercel Environment Variables.';
         }
         setError(msg);
       } 
       finally { setAuthLoading(false); }
    };

    return (
      <div className="min-h-screen bg-neutral-900 py-16 px-10 flex flex-col items-center justify-center page-transition overflow-y-auto">
        <h1 className="text-5xl font-black text-white mb-4 tracking-tighter uppercase relative z-10 text-center">Sign Up</h1>
        <p className="text-neutral-500 font-black tracking-[0.2em] uppercase text-[10px] mb-12 relative z-10 text-center">Join Zambia's #1 Service App</p>
        
        <div className="w-full space-y-4 max-w-sm relative z-10">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[28px] p-1">
             <input type="text" placeholder="FULL NAME" value={name} onChange={(e)=>setName(e.target.value)} className="w-full bg-transparent p-4 font-black text-white focus:outline-none placeholder:text-neutral-600 tracking-wider text-[11px] uppercase" />
          </div>
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[28px] p-1">
             <input type="email" placeholder="EMAIL ADDRESS" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full bg-transparent p-4 font-black text-white focus:outline-none placeholder:text-neutral-600 tracking-wider text-[11px] uppercase" />
          </div>
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[28px] p-1">
             <input type="password" placeholder="CREATE PASSWORD" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full bg-transparent p-4 font-black text-white focus:outline-none placeholder:text-neutral-600 tracking-wider text-[11px] uppercase" />
          </div>
          
          <div className="bg-white/5 backdrop-blur-2xl rounded-[32px] border border-white/10 p-6">
             <p className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] mb-4 text-center">I want to...</p>
             <div className="flex gap-4">
                {['client', 'worker'].map((r) => (
                   <button key={r} onClick={() => setUserRole(r as UserRole)} className={`flex-1 py-4 rounded-[20px] font-black uppercase text-[10px] tracking-widest transition-all duration-500 ${userRole === r ? 'bg-primary text-white shadow-2xl shadow-primary/40 scale-105' : 'bg-white/5 text-neutral-500 hover:text-white'}`}>
                      {r === 'client' ? 'Hire' : 'Work'}
                   </button>
                ))}
             </div>
          </div>

          {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center animate-shake mt-2 px-4">{error}</p>}

          <button onClick={handleSignup} disabled={authLoading} className="w-full py-6 bg-primary text-white font-black rounded-[32px] text-xs uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 hover:shadow-primary/50 active:scale-95 transition-all flex justify-center items-center gap-4 mt-6">
             {authLoading ? <div className="w-6 h-6 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div> : <>Create Account <ArrowRight className="w-5 h-5"/></>}
          </button>
        </div>
        
        <div className="mt-12 text-neutral-500 font-black text-[10px] uppercase tracking-[0.2em] flex gap-4 relative z-10">
           Have an account? <button onClick={() => navigate('signin')} className="text-white hover:text-primary transition-colors">Sign In</button>
        </div>
      </div>
    );
  };

  // BOLD PREMIUM DASHBOARD
  const DashboardScreen = () => (
    <div className="min-h-screen bg-neutral-50/50 pb-28 page-transition">
      {/* Dynamic Header */}
      <div className="bg-primary px-8 pt-12 pb-14 rounded-b-[60px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-80 h-80 bg-white/10 rounded-full blur-[80px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-60 h-60 bg-accent/20 rounded-full blur-[60px] animate-bounce-slow"></div>
        
        <div className="relative z-10 space-y-8">
          <div className="flex justify-between items-center">
            <div className="animate-slideUp">
              <p className="text-white/60 text-xs font-black uppercase tracking-[0.2em]">Good Morning,</p>
              <h1 className="text-3xl font-black text-white tracking-tighter">{user?.name?.split(' ')[0] || 'TumaBoss'}!</h1>
            </div>
            <div className="flex gap-3">
              <button onClick={() => navigate('notifications')} className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all active:scale-95 relative">
                <Bell className="w-6 h-6 text-white" />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-accent rounded-full border-2 border-primary animate-pulse" />
              </button>
              <button onClick={() => navigate('profile-dashboard')} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border-2 border-white/20 hover:scale-105 transition-transform overflow-hidden">
                <User className="w-6 h-6 text-primary" />
              </button>
            </div>
          </div>

          <div className={glassCard + " !p-6 border-white/30 text-white bg-gradient-to-br from-white/20 to-transparent shadow-neutral-900/10"}>
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-1">Wallet Balance</p>
                  <p className="text-5xl font-black tracking-tighter leading-none">ZMW {user?.walletBalance?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}</p>
               </div>
               <div className="p-3 bg-accent text-accent-foreground rounded-2xl animate-float">
                  <Wallet className="w-6 h-6" />
               </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button className="flex-1 bg-white text-primary rounded-3xl py-4 text-xs font-black uppercase tracking-widest hover:bg-neutral-100 transition-all active:scale-95 shadow-xl">Withdraw</button>
              <button className="flex-1 bg-accent/90 text-accent-foreground rounded-3xl py-4 text-xs font-black uppercase tracking-widest hover:bg-accent transition-all active:scale-95 shadow-xl shadow-accent/20">Add Funds</button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 -mt-10 space-y-12 relative z-20 pb-10">
        {/* Search */}
        <div className="relative group animate-slideUp" style={{animationDelay: '0.1s'}}>
          <div className="absolute inset-0 bg-primary/10 rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-[32px] border border-white p-2 shadow-[0_15px_40px_rgba(0,0,0,0.06)] flex items-center focus-within:ring-4 focus-within:ring-primary/10 transition-all">
             <div className="w-12 h-12 flex items-center justify-center text-primary">
                <Search className="w-6 h-6" />
             </div>
             <input type="text" placeholder="Search for help..." className="flex-1 bg-transparent py-4 font-bold text-neutral-800 focus:outline-none placeholder:text-neutral-300" />
             <button className="w-12 h-12 bg-neutral-900 rounded-2xl flex items-center justify-center text-white hover:bg-primary transition-colors">
                <Sliders className="w-5 h-5" />
             </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="animate-slideUp" style={{animationDelay: '0.2s'}}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-foreground tracking-tight">Browse Categories</h2>
             <button onClick={() => navigate('browse-services')} className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-neutral-100 shadow-sm hover:bg-primary hover:text-white transition-all">
                <ChevronRight className="w-5 h-5" />
             </button>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {[
              { icon: Wrench, label: 'Plumbing', color: 'bg-blue-600' },
              { icon: Flame, label: 'Welding', color: 'bg-orange-600' },
              { icon: Droplets, label: 'Cleaning', color: 'bg-teal-600' },
              { icon: Car, label: 'Rides', color: 'bg-indigo-600' },
              { icon: WashingMachine, label: 'Laundry', color: 'bg-purple-600' },
              { icon: Phone, label: 'Repairs', color: 'bg-rose-600' },
              { icon: ShoppingCart, label: 'Logistics', color: 'bg-yellow-600' },
              { icon: Baby, label: 'Childcare', color: 'bg-pink-600' },
            ].map((cat, i) => (
              <button key={i} onClick={() => navigate('task-creation')} className={`flex flex-col items-center gap-3 group transition-all`}>
                <div className={`w-16 h-16 rounded-[24px] ${cat.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-active:scale-95 transition-all duration-300 relative overflow-hidden`}>
                   <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <cat.icon className="w-8 h-8 text-white relative z-10" />
                </div>
                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest text-center truncate w-full">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Workers List */}
        <div className="animate-slideUp" style={{animationDelay: '0.3s'}}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-foreground tracking-tight">Experts Near You</h2>
            <button className="text-[10px] font-black uppercase text-primary tracking-widest border-b-2 border-primary/20 pb-1">Show on map</button>
          </div>
          <div className="space-y-6">
            {[
              { name: 'John Mwangi', role: 'Master Plumber · Lusaka East', rating: 4.9, dist: '0.5 km', price: 'ZMW 800', img: '👨‍🔧' },
              { name: 'Sarah Chanda', role: 'Domestic Specialist', rating: 4.8, dist: '1.2 km', price: 'ZMW 200', img: '👩‍💼' },
              { name: 'Mike Zulu', role: 'IT & Gadget Repair', rating: 4.7, dist: '2.0 km', price: 'ZMW 450', img: '👨‍🏭' },
            ].map((worker, i) => (
              <div key={i} onClick={() => navigate('worker-profile')} className={`group relative bg-white rounded-[32px] p-6 border border-neutral-100 flex items-center gap-5 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] active:scale-[0.98] cursor-pointer`}>
                <div className="absolute top-6 right-6 w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                   <Heart className="w-5 h-5" />
                </div>
                <div className="w-20 h-20 bg-neutral-100 rounded-[28px] flex items-center justify-center text-4xl shadow-inner group-hover:scale-105 transition-transform duration-500">
                   {worker.img}
                </div>
                <div className="flex-1 space-y-1">
                   <div className="flex items-center gap-2">
                      <h3 className="font-black text-foreground text-lg tracking-tight leading-none">{worker.name}</h3>
                      <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-0.5 rounded-lg">
                         <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                         <span className="text-[10px] font-black text-yellow-700">{worker.rating}</span>
                      </div>
                   </div>
                   <p className="text-sm font-bold text-neutral-400">{worker.role}</p>
                   <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center gap-1 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                         <MapPin className="w-3 h-3" />
                         {worker.dist}
                      </div>
                      <p className="text-primary font-black text-sm">from {worker.price}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // BOLD PREMIUM BROWSE SERVICES
  const BrowseServicesScreen = () => {
    const [activeTab, setActiveTab] = useState('All Services');
    const [searchQuery, setSearchQuery] = useState('');
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const categories = ['All Services', 'Home Services', 'Food & Delivery', 'Repairs & Maintenance', 'Creative', 'Transport', 'Business', 'Education'];

    const fetchServices = async (reset = false) => {
      setLoading(true);
      setTimeout(() => {
        const mock = [
          { id: '1', name: 'Elite Pipe Fitting', category: 'Repairs', subcategory: 'Plumbing', shortDescription: 'Industrial grade plumbing for residential and commercial sites.', price: 'ZMW 1,200', icon: '🔧', rating: 4.9, reviews: 42 },
          { id: '2', name: 'Master Welding', category: 'Repairs', subcategory: 'Metalwork', shortDescription: 'Heavy duty gates, frames and structural welding.', price: 'ZMW 2,500', icon: '🔥', rating: 4.8, reviews: 15 },
          { id: '3', name: 'Deep Cleaning Pro', category: 'Home Services', subcategory: 'Sanitation', shortDescription: 'Top-to-bottom sterilization and steam cleaning.', price: 'ZMW 600', icon: '🧼', rating: 5.0, reviews: 89 },
        ];
        setServices(reset ? mock : [...services, ...mock]);
        setHasMore(false);
        setLoading(false);
      }, 500);
    };

    useEffect(() => { fetchServices(true); }, [activeTab, searchQuery]);

    return (
      <div className="min-h-screen bg-neutral-50/50 flex flex-col page-transition">
        <div className="bg-white/80 backdrop-blur-2xl px-8 pt-12 pb-8 sticky top-0 z-40 border-b border-neutral-100 flex-shrink-0">
          <div className="flex justify-between items-center mb-10">
            <button onClick={() => navigate('dashboard')} className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all active:scale-95">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-black text-foreground tracking-tighter uppercase whitespace-nowrap">Service Hub</h1>
            <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary font-black text-xs uppercase tracking-widest">
               10K+
            </div>
          </div>
          
          <div className="relative group mb-8">
            <div className="absolute inset-0 bg-primary/5 rounded-[32px] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
            <div className="relative bg-neutral-50 border border-neutral-100 rounded-[32px] p-2 flex items-center focus-within:ring-4 focus-within:ring-primary/5 transition-all">
               <div className="w-12 h-12 flex items-center justify-center text-primary">
                  <Search className="w-6 h-6" />
               </div>
               <input 
                 type="text" 
                 placeholder="Search elite services..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="flex-1 bg-transparent py-4 font-black text-neutral-800 focus:outline-none placeholder:text-neutral-300 tracking-tight" 
               />
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 -mx-8 px-8 no-scrollbar">
            {categories.map((t, i) => (
              <button 
                key={i} 
                onClick={() => { setActiveTab(t); }}
                className={`py-4 px-8 rounded-[30px] font-black text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-500 ${activeTab === t ? 'bg-primary text-white shadow-2xl shadow-primary/20 scale-105' : 'bg-white text-neutral-400 border border-neutral-100 hover:border-primary/20'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-32 pt-10 space-y-8">
          <div className="grid grid-cols-1 gap-8">
            {services.map((srv) => (
              <div key={srv.id} onClick={() => navigate('worker-profile')} className={`group relative bg-white p-8 rounded-[40px] border border-neutral-100 shadow-sm flex gap-8 items-center transition-all duration-700 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] hover:-translate-y-2 active:scale-[0.98] cursor-pointer`}>
                <div className="w-24 h-24 bg-neutral-50 rounded-[32px] flex items-center justify-center text-5xl shadow-inner group-hover:scale-110 transition-transform duration-500 flex-shrink-0">
                  {srv.icon}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                       <h3 className="text-2xl font-black text-foreground leading-none tracking-tight group-hover:text-primary transition-colors">{srv.name}</h3>
                       <p className="text-[10px] uppercase font-black text-primary tracking-[0.2em] mt-2 inline-block bg-primary/5 px-3 py-1 rounded-full">{srv.category}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-400/10 px-3 py-1 rounded-2xl">
                       <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                       <span className="text-[10px] font-black text-yellow-700">{srv.rating}</span>
                    </div>
                  </div>
                  <p className="text-neutral-400 font-bold text-sm line-clamp-2 leading-relaxed tracking-tight">{srv.shortDescription}</p>
                  <div className="flex items-center justify-between pt-6 mt-4 border-t border-neutral-50">
                    <span className="font-black text-primary text-xl tracking-tighter">{srv.price}</span>
                    <button className="bg-neutral-900 text-white font-black px-6 py-3 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-primary transition-all shadow-xl">Contact Pro</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {loading && (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
               <div className="w-14 h-14 border-[6px] border-primary/10 border-t-primary rounded-full animate-spin"></div>
               <p className="text-[10px] font-black uppercase text-primary tracking-[0.3em]">Synching Elite Data...</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // BOLD PREMIUM TASK CREATION
  const TaskCreationScreen = () => {
    const [budget, setBudget] = useState(1500);
    return (
      <div className="min-h-screen bg-neutral-50/50 flex flex-col page-transition pb-32 overflow-y-auto">
        <div className="bg-white/80 backdrop-blur-2xl px-8 pt-12 pb-8 sticky top-0 z-40 border-b border-neutral-100 flex-shrink-0">
          <div className="flex justify-between items-center mb-10">
            <button onClick={() => navigate('dashboard')} className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all active:scale-95">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-black text-foreground tracking-tighter uppercase whitespace-nowrap">Create Mission</h1>
            <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary font-black text-xs uppercase tracking-widest">
               NEW
            </div>
          </div>
        </div>

        <div className="px-8 py-10 space-y-12">
          <div className="space-y-4">
             <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-2">Category</label>
             <div className="bg-white border border-neutral-100 rounded-[30px] p-2">
                <select className="w-full bg-transparent px-6 py-4 font-black text-foreground focus:outline-none appearance-none cursor-pointer uppercase text-xs tracking-widest">
                   <option>Plumbing</option>
                   <option>Welding</option>
                   <option>Cleaning</option>
                   <option>Electronic Repair</option>
                </select>
             </div>
          </div>
          
          <div className="space-y-4">
            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-2">Job Details</label>
            <div className="bg-white border border-neutral-100 rounded-[40px] p-2 focus-within:ring-4 focus-within:ring-primary/5 transition-all">
               <textarea placeholder="DESCRIBE WHAT YOU NEED HELP WITH..." className="w-full bg-transparent p-6 text-foreground focus:outline-none h-40 resize-none font-black text-xs tracking-widest uppercase placeholder:text-neutral-200" />
            </div>
          </div>

          <div className="bg-neutral-900 !p-10 rounded-[50px] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700"></div>
            <div className="relative z-10">
               <div className="flex justify-between items-center mb-10">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">My Budget</label>
                  <div className="bg-white/10 backdrop-blur-xl px-6 py-2 rounded-2xl border border-white/10">
                    <span className="font-black text-primary text-2xl tracking-tighter">ZMW {budget}</span>
                  </div>
               </div>
               <input type="range" min="100" max="10000" step="50" value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary" />
               <div className="flex justify-between text-[8px] text-white/30 font-black uppercase tracking-widest mt-6">
                 <span>Starts at ZMW 100</span>
                 <span>Up to ZMW 10K+</span>
               </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-2">Job Location</label>
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/5 rounded-[30px] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              <div className="relative bg-white border border-neutral-100 rounded-[30px] p-2 flex items-center">
                 <div className="w-12 h-12 flex items-center justify-center text-primary"><MapPin className="w-6 h-6" /></div>
                 <input type="text" placeholder="ENTER YOUR ADDRESS..." className="flex-1 bg-transparent py-4 font-black text-foreground focus:outline-none placeholder:text-neutral-200 text-[10px] tracking-widest" />
                 <button className="bg-neutral-900 text-white rounded-2xl px-4 py-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all active:scale-95 shadow-lg">
                   <Navigation className="w-4 h-4" /> GPS
                 </button>
              </div>
            </div>
          </div>

          <button onClick={() => navigate('map-booking')} className="w-full py-7 bg-primary text-white font-black rounded-[40px] text-xs uppercase tracking-[0.4em] shadow-2xl shadow-primary/30 hover:shadow-primary/50 active:scale-95 transition-all mt-10">
            Search for workers
          </button>
        </div>
      </div>
    );
  };
  // BOLD PREMIUM MAP & BOOKING
  const MapBookingScreen = () => (
    <div className="min-h-screen bg-neutral-50/50 pb-28 page-transition">
      <div className="h-[40vh] bg-neutral-200 relative overflow-hidden group">
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] scale-150 animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 to-transparent"></div>
        
        <button onClick={() => navigate('task-creation')} className="absolute top-12 left-8 bg-white/90 backdrop-blur-2xl rounded-2xl p-4 shadow-2xl hover:scale-110 active:scale-90 transition-all z-20 border border-white">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 transition-transform duration-700 group-hover:scale-110">
          <div className="w-40 h-40 bg-primary/20 rounded-full flex items-center justify-center animate-ping absolute -inset-10 opacity-30"></div>
          <div className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/40 relative">
             <MapPin className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      <div className="px-8 -mt-10 relative z-20 space-y-10">
        <div className="flex justify-between items-center group">
           <div className="space-y-1">
              <h2 className="text-3xl font-black text-foreground tracking-tighter uppercase leading-none">Workers nearby</h2>
              <p className="text-[10px] font-black uppercase text-primary tracking-[0.3em]">Verified Workers</p>
           </div>
           <button className="bg-white p-4 rounded-3xl shadow-xl hover:bg-neutral-900 hover:text-white transition-all duration-500 active:scale-95 group-hover:rotate-12 border border-neutral-100">
              <Filter className="w-6 h-6" />
           </button>
        </div>

        <div className="grid gap-8">
          {[
            { name: 'John Mwangi', role: 'Master Plumber', dist: '0.5 km', r: 4.9, p: 800, img: '👨‍🔧' },
            { name: 'Mike Zulu', role: 'Industrial Welder', dist: '1.2 km', r: 4.7, p: 750, img: '👨‍🏭' },
          ].map((w, i) => (
            <div key={i} onClick={() => navigate('worker-profile')} className={`group w-full bg-white rounded-[40px] p-8 border border-neutral-100 transition-all duration-700 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] hover:-translate-y-2 active:scale-[0.98] cursor-pointer flex gap-8 items-center animate-slideUp`} style={{animationDelay: `${i*0.1}s`}}>
               <div className="w-24 h-24 bg-neutral-50 rounded-[32px] flex items-center justify-center text-5xl shadow-inner group-hover:scale-105 transition-transform duration-500 flex-shrink-0">
                 {w.img}
               </div>
               <div className="flex-1 space-y-2 text-left">
                  <div className="flex justify-between items-start">
                     <div>
                        <h3 className="text-xl font-black text-foreground tracking-tight leading-none group-hover:text-primary transition-colors">{w.name}</h3>
                        <p className="text-[10px] uppercase font-black text-neutral-400 tracking-[0.2em] mt-2">{w.role}</p>
                     </div>
                     <div className="flex items-center gap-1 bg-yellow-400/10 px-3 py-1 rounded-xl">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-[10px] font-black text-yellow-700">{w.r}</span>
                     </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 mt-2 border-t border-neutral-50">
                    <span className="font-black text-primary text-lg tracking-tighter">ZMW {w.p}</span>
                    <span className="text-[10px] font-black uppercase text-neutral-300 tracking-[0.2em]">{w.dist} away</span>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // BOLD PREMIUM WORKER PROFILE
  const WorkerProfileScreen = () => (
    <div className="min-h-screen bg-neutral-50/50 pb-28 page-transition">
      <div className="bg-primary px-8 pt-16 pb-24 rounded-b-[60px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-white/10 rounded-full blur-[80px] animate-pulse-slow"></div>
        <div className="relative z-10">
          <button onClick={() => navigate('dashboard')} className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all active:scale-95 mb-10">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          
          <div className="flex gap-8 items-center">
             <div className="w-32 h-32 bg-white rounded-[40px] flex items-center justify-center text-6xl shadow-2xl border-[6px] border-white/20 animate-float">
               👨‍🔧
             </div>
             <div className="space-y-2">
                <h1 className="text-4xl font-black text-white tracking-tighter leading-none">John Mwangi</h1>
                <p className="text-white/60 font-black uppercase text-xs tracking-[0.3em]">Master Plumber</p>
                <div className="flex items-center gap-2 bg-accent/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-accent/30 w-max mt-4">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span className="text-[10px] font-black text-accent uppercase tracking-widest">Verified Pro</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="px-8 -mt-12 space-y-12 relative z-20 pb-10">
         <div className="grid grid-cols-2 gap-6">
            <div className={glassCard + " bg-white/90 !p-6 flex flex-col items-center text-center shadow-lg border-white"}>
               <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2">Experience</span>
               <p className="text-3xl font-black text-foreground tracking-tighter">5+ Years</p>
            </div>
            <div className={glassCard + " bg-white/90 !p-6 flex flex-col items-center text-center shadow-lg border-white"}>
               <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2">Success rate</span>
               <div className="flex items-center gap-2">
                 <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                 <p className="text-3xl font-black text-foreground tracking-tighter">4.9</p>
               </div>
            </div>
         </div>
         
         <div className="animate-slideUp" style={{animationDelay: '0.1s'}}>
            <h3 className="text-2xl font-black text-foreground tracking-tight mb-4">Skills & Experience</h3>
            <p className="text-neutral-500 font-bold leading-relaxed tracking-tight text-lg mb-8">Professional plumber specializing in high-quality piping, leak repair, and luxury bathroom installations.</p>
            <div className="flex flex-wrap gap-4">
              {['Plumbing', 'Fast Service', 'Big Projects', 'Cleaning'].map((s, i) => (
                <span key={i} className="bg-neutral-900 text-white px-6 py-3 rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-neutral-900/10 transition-transform hover:scale-105">{s}</span>
              ))}
            </div>
         </div>

         <div className="animate-slideUp" style={{animationDelay: '0.2s'}}>
            <h3 className="text-2xl font-black text-foreground tracking-tight mb-6">Past Jobs</h3>
            <div className="bg-white p-8 rounded-[40px] border border-neutral-100 flex items-center gap-6 mb-4 group cursor-pointer hover:shadow-2xl transition-all duration-500">
               <div className="w-16 h-16 bg-primary/5 rounded-[24px] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500"><Wrench className="w-8 h-8"/></div>
               <div className="flex-1">
                  <h4 className="font-black text-xl tracking-tight leading-none group-hover:text-primary transition-colors">Industrial Sink Overhaul</h4>
                  <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest mt-2">2 days ago · Lusaka South</p>
               </div>
               <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center group-hover:translate-x-2 transition-transform"><ChevronRight className="w-6 h-6 text-neutral-300"/></div>
            </div>
         </div>

         <div className="pt-10">
            <button onClick={() => navigate('chat-detail')} className={`w-full py-6 bg-primary text-white font-black rounded-[32px] text-xs uppercase tracking-[0.4em] shadow-2xl shadow-primary/30 hover:shadow-primary/40 active:scale-95 transition-all flex items-center justify-center gap-4`}>
               Hire Pro <ArrowRight className="w-5 h-5"/>
            </button>
         </div>
      </div>
    </div>
  );


  // BOLD PREMIUM CHAT LIST
  const ChatListScreen = () => (
    <div className="min-h-screen bg-neutral-50/50 pb-28 page-transition">
      <div className="bg-white/80 backdrop-blur-2xl px-8 pt-12 pb-8 sticky top-0 z-40 border-b border-neutral-100 flex-shrink-0">
          <h1 className="text-3xl font-black text-foreground tracking-tighter uppercase whitespace-nowrap">Messages</h1>
          <p className="text-[10px] font-black uppercase text-primary tracking-[0.3em] mt-2">Your Conversations</p>
      </div>

      <div className="divide-y divide-neutral-100 px-4 mt-6">
         {[
           { n: 'John Mwangi', m: 'I am on my way!', t: '10:42 AM', img: '👨‍🔧', unread: 2 },
           { n: 'Sarah Chanda', m: 'Thanks for the payment.', t: 'Yesterday', img: '👩‍💼', unread: 0 },
         ].map((c, i) => (
           <button key={i} onClick={() => navigate('chat-detail')} className="w-full px-4 py-8 flex items-center gap-6 hover:bg-white rounded-[40px] transition-all duration-500 group text-left border border-transparent hover:border-neutral-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] mb-4 animate-slideUp" style={{animationDelay: `${i*0.1}s`}}>
              <div className="w-20 h-20 bg-neutral-100 rounded-[28px] flex items-center justify-center text-4xl flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner">{c.img}</div>
              <div className="flex-1 min-w-0 space-y-2">
                 <div className="flex justify-between items-baseline">
                    <h3 className="font-black text-xl tracking-tight text-foreground">{c.n}</h3>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${c.unread ? 'text-primary' : 'text-neutral-300'}`}>{c.t}</span>
                 </div>
                 <div className="flex justify-between items-center pr-2">
                    <p className={`text-sm truncate font-bold tracking-tight ${c.unread ? 'text-foreground' : 'text-neutral-400'}`}>{c.m}</p>
                    {c.unread > 0 && <span className="bg-primary text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center animate-bounce-slow shadow-lg shadow-primary/30">{c.unread}</span>}
                 </div>
              </div>
           </button>
         ))}
      </div>
    </div>
  );

  // CHAT DETAIL SCREEN
  // BOLD PREMIUM CHAT DETAIL
  const ChatDetailScreen = () => (
    <div className="min-h-screen bg-neutral-50/50 flex flex-col pb-32 page-transition">
      <div className="bg-white/80 backdrop-blur-2xl px-6 py-10 flex items-center justify-between border-b border-neutral-100 sticky top-0 z-40">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('chat-list')} className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all active:scale-90"><ArrowLeft className="w-6 h-6" /></button>
          <div className="w-14 h-14 bg-neutral-100 rounded-[20px] shadow-inner flex items-center justify-center text-3xl">👨‍🔧</div>
          <div className="space-y-1">
             <h2 className="font-black text-xl tracking-tighter text-foreground leading-none">John Mwangi</h2>
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-[10px] text-neutral-400 font-black uppercase tracking-widest">Online</p>
             </div>
          </div>
        </div>
        <button className="w-12 h-12 bg-neutral-900 rounded-2xl flex items-center justify-center text-white hover:bg-primary transition-colors shadow-lg shadow-neutral-900/10">
           <Phone className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-8 space-y-8 mt-4">
         <div className="bg-white rounded-[32px] rounded-tl-none p-6 max-w-[85%] shadow-[0_15px_30px_rgba(0,0,0,0.03)] border border-neutral-50 animate-slideUp">
           <p className="font-bold text-neutral-800 leading-relaxed tracking-tight">Hi! I saw your plumbing request. I can fix it today.</p>
           <span className="text-[10px] text-neutral-300 font-black uppercase tracking-widest block mt-4 text-right">10:40 AM</span>
         </div>
         <div className="bg-primary text-white rounded-[32px] rounded-tr-none p-6 max-w-[85%] shadow-2xl shadow-primary/20 ml-auto animate-slideUp" style={{animationDelay: '0.1s'}}>
           <p className="font-black leading-relaxed tracking-tight">Great! Are you okay with the ZMW 1500 budget?</p>
           <span className="text-[10px] text-white/50 font-black uppercase tracking-widest block mt-4 text-right">10:41 AM</span>
         </div>
         <div className="bg-white rounded-[32px] rounded-tl-none p-6 max-w-[85%] shadow-[0_15px_30px_rgba(0,0,0,0.03)] border border-neutral-50 animate-slideUp" style={{animationDelay: '0.2s'}}>
           <p className="font-bold text-neutral-800 leading-relaxed tracking-tight">I am on my way!</p>
           <span className="text-[10px] text-neutral-300 font-black uppercase tracking-widest block mt-4 text-right">10:42 AM</span>
         </div>
      </div>

      <div className="bg-white/80 backdrop-blur-2xl border-t border-neutral-100 p-6 fixed bottom-0 w-full max-w-md z-30">
        <div className="flex gap-4">
          <button className="w-14 h-14 bg-neutral-100 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-primary transition-all active:scale-90"><Plus className="w-6 h-6"/></button>
          <div className="flex-1 relative group">
             <input type="text" placeholder="COMMAND INPUT..." className="w-full h-14 bg-neutral-100 rounded-3xl px-6 focus:outline-none focus:ring-4 focus:ring-primary/5 font-black text-[10px] uppercase tracking-widest placeholder:text-neutral-300" />
             <button className="absolute right-2 top-2 w-10 h-10 bg-primary text-white rounded-[18px] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all">
                <ArrowRight className="w-5 h-5" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );

  // PROFILE / SETTINGS (DASHBOARD FOR OWNER)
  // BOLD PREMIUM PROFILE DASHBOARD
  const ProfileDashboardScreen = () => (
    <div className="min-h-screen bg-neutral-50/50 pb-32 pt-12 page-transition">
      <div className="px-10 mb-12 text-center relative group">
         <div className="w-32 h-32 mx-auto bg-white rounded-[40px] shadow-2xl flex items-center justify-center text-6xl relative overflow-hidden transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3 border-[6px] border-white">
            <span className="z-0 animate-float">Boy</span>
            <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer">
               <Camera className="w-10 h-10 text-white"/>
            </div>
         </div>
         <h1 className="text-3xl font-black mt-8 text-foreground tracking-tighter uppercase leading-none">Sean Tumaworks</h1>
         <p className="text-neutral-400 font-bold mt-2 text-sm uppercase tracking-widest">Elite Member</p>
         <button className="mt-8 bg-neutral-900 text-white font-black px-10 py-4 rounded-[24px] text-[10px] uppercase tracking-[0.3em] hover:bg-primary transition-all shadow-2xl shadow-neutral-900/20 active:scale-95">Edit Profile</button>
      </div>

      <div className="px-8 space-y-12">
         {/* Rewards */}
         <div className={glassCard + " bg-gradient-to-br from-accent to-orange-600 !p-10 text-white shadow-2xl shadow-accent/20 border-accent/30 overflow-hidden relative group"}>
            <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative z-10">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-black text-xs uppercase tracking-[0.3em] flex items-center gap-3"><Gem className="w-5 h-5"/> My Points</h3>
                  <span className="text-4xl font-black tracking-tighter">{diamonds}</span>
               </div>
               <p className="text-xs font-bold text-white/70 tracking-tight leading-relaxed mb-10">Your earned points from successfully completed work.</p>
               <button className="w-full py-4 bg-white/20 backdrop-blur-xl border border-white/30 text-white font-black rounded-3xl text-[10px] uppercase tracking-widest hover:bg-white/30 transition-all">Refresh Points</button>
            </div>
         </div>

         {/* Settings */}
         <div className="space-y-6">
            <h3 className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.4em] ml-2">My Settings</h3>
            <div className="grid grid-cols-1 gap-4">
               {[
                 { i: Briefcase, l: 'My Skills' },
                 { i: CheckCircle, l: 'Job History' },
                 { i: Grid, l: 'Marketplace' },
                 { i: Settings, l: 'App Settings' },
               ].map((item, i) => (
                 <button key={i} className="w-full flex items-center justify-between p-8 bg-white rounded-[40px] border border-neutral-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group">
                   <div className="flex items-center gap-6">
                     <div className="w-14 h-14 bg-neutral-50 rounded-[20px] flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner"><item.i className="w-6 h-6 text-neutral-400 group-hover:text-white transition-colors"/></div>
                     <span className="font-black text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">{item.l}</span>
                   </div>
                   <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center group-hover:translate-x-2 transition-transform duration-500"><ChevronRight className="w-5 h-5 text-neutral-300" /></div>
                 </button>
               ))}
            </div>
         </div>

          <div className="bg-primary/5 rounded-[50px] p-10 border border-primary/10 mb-12 relative overflow-hidden group">
             <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="flex items-center gap-4 mb-6">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-black text-foreground tracking-tighter uppercase leading-none">User Mode</h3>
             </div>
             <p className="text-sm text-neutral-400 mb-10 font-bold leading-relaxed tracking-tight">You are currently a <span className="text-primary uppercase tracking-[0.1em] font-black">{role}</span>. Switch modes to see the other side of the app.</p>
             <button onClick={toggleRole} className="w-full py-6 bg-white border-[3px] border-primary text-primary font-black rounded-[32px] hover:bg-primary hover:text-white transition-all duration-700 transform active:scale-95 shadow-2xl shadow-primary/10 text-xs uppercase tracking-[0.3em]">
                Switch to {role === 'client' ? 'Worker' : 'Client'} Mode
             </button>
          </div>

          <button onClick={() => { AuthService.logout(); navigate('onboarding'); }} className="w-full py-6 text-red-500 font-black bg-red-50 rounded-[32px] text-xs uppercase tracking-[0.4em] hover:bg-red-500 hover:text-white transition-all duration-500 active:scale-95 mb-10">Logout</button>
      </div>
    </div>
  );

  // NOTIFICATION & OTHERS placeholders
  const NotificationsScreen = () => <div className="p-6"><button onClick={()=>navigate('dashboard')} className="text-primary font-bold">Back</button><h1 className="text-2xl font-bold mt-4">Notifications</h1><p className="mt-4">No new notifications.</p></div>;
  const SubscriptionScreen = () => <div className="p-6"><button onClick={()=>navigate('dashboard')} className="text-primary font-bold">Back</button><h1 className="text-2xl font-bold mt-4">Premium Plans</h1></div>;
  
  // BOLD PREMIUM MARKETPLACE
  const MarketplaceScreen = () => {
    const [listings, setListings] = useState<any[]>([]);
    const [loadingListings, setLoadingListings] = useState(false);

    useEffect(() => {
       setLoadingListings(true);
       setTimeout(() => {
          const mockListings = [
             { id: '1', title: 'Industrial Grade Drill Set', desc: 'Heavy duty, 18V cordless. Perfect for construction.', price: 1450, category: 'Tools', location: 'Lusaka CBD', img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=400', time: '1h ago' },
             { id: '2', title: 'Solar Power Inverter 5KW', desc: 'Pure sine wave, brand new. End load shedding today.', price: 8500, category: 'Tech', location: 'Silverest', img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=400', time: '3h ago' },
             { id: '3', title: 'Used Pick-up Truck', desc: 'Good condition, 2015 model. Reliable for farming.', price: 95000, category: 'Vehicles', location: 'Chongwe', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400', time: '6h ago' },
          ];
          setListings(mockListings);
          setLoadingListings(false);
       }, 800);
    }, []);

    return (
       <div className="min-h-screen bg-neutral-50/50 pb-28 page-transition">
          {/* Elite Header */}
          <div className="bg-white/80 backdrop-blur-xl p-8 sticky top-0 z-40 border-b border-neutral-100/50 flex items-center justify-between">
             <h1 className="text-3xl font-black text-foreground tracking-tighter">Marketplace</h1>
             <button className="bg-primary text-white p-4 rounded-3xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                <Plus className="w-6 h-6" />
             </button>
          </div>
          
          <div className="p-8 space-y-10">
             {/* Search */}
             <div className="relative group">
                <div className="absolute inset-0 bg-primary/5 rounded-[40px] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                <div className="relative bg-white border border-neutral-100 rounded-[40px] p-2 flex items-center shadow-sm focus-within:ring-4 focus-within:ring-primary/5 transition-all">
                   <div className="w-12 h-12 flex items-center justify-center text-primary">
                      <Search className="w-6 h-6" />
                   </div>
                   <input type="text" placeholder="Search for items..." className="flex-1 bg-transparent py-4 font-bold text-neutral-800 focus:outline-none placeholder:text-neutral-300" />
                </div>
             </div>
             
             {/* Categories */}
             <div className="flex gap-4 overflow-x-auto pb-4 -mx-8 px-8 no-scrollbar">
                {['All Items', 'Farming', 'Tech', 'Tools', 'Vehicles', 'Seeds'].map((c, i) => (
                   <button key={i} className={`flex-none px-8 py-4 rounded-[30px] font-black text-xs uppercase tracking-widest transition-all duration-500 ${i === 0 ? 'bg-primary text-white shadow-2xl shadow-primary/30 scale-105' : 'bg-white border border-neutral-100 text-neutral-400 hover:border-primary/20 hover:text-primary shadow-sm'}`}>{c}</button>
                ))}
             </div>

             {/* Listings Grid */}
             <div className="grid grid-cols-1 gap-10">
                {listings.map((item) => (
                   <div key={item.id} className="bg-white rounded-[50px] overflow-hidden border border-neutral-100 shadow-sm hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-700 group cursor-pointer relative">
                      <div className="h-80 relative overflow-hidden">
                         <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                         <div className="absolute top-8 right-8 bg-neutral-900 text-white px-6 py-3 rounded-[30px] shadow-2xl border border-white/10 font-black text-lg">
                            ZMW {item.price.toLocaleString()}
                         </div>
                         <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md text-primary px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                            {item.category}
                         </div>
                      </div>
                      <div className="p-10">
                         <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-black text-foreground leading-none tracking-tight group-hover:text-primary transition-colors">{item.title}</h3>
                            <button className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-300 hover:bg-red-50 hover:text-red-500 transition-all"><Heart className="w-6 h-6" /></button>
                         </div>
                         <p className="text-neutral-400 font-bold text-sm mb-10 line-clamp-2 leading-relaxed tracking-tight">{item.desc}</p>
                         <div className="flex items-center justify-between pt-8 border-t border-neutral-50">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center">
                                  <MapPin className="w-4 h-4 text-neutral-400" />
                               </div>
                               <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{item.location}</span>
                            </div>
                            <span className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">{item.time}</span>
                         </div>
                      </div>
                   </div>
                ))}
                
                {loadingListings && (
                   <div className="space-y-10 animate-pulse">
                      {[1, 2].map(i => <div key={i} className="h-96 bg-neutral-100 rounded-[50px]"></div>)}
                   </div>
                )}
             </div>
          </div>
       </div>
    );
  };

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
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-8 bg-neutral-900 overflow-hidden relative">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50"></div>
             <div className="custom-loader scale-150 relative z-10"></div>
             <div className="relative z-10">
                <h2 className="font-black text-2xl text-white tracking-widest uppercase mb-2">Tumaworks</h2>
                <p className="font-bold text-neutral-500 tracking-[0.3em] uppercase text-[10px] animate-pulse">Initializing Production Engine...</p>
             </div>
          </div>
        ) : (
          <div key={currentScreen} className="page-transition min-h-screen flex flex-col">
             <CurrentScreen />
          </div>
        )}

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
