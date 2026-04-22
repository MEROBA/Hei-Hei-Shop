import React, { useState } from 'react';
import { ShoppingBag, User, Search, Menu, X, ChevronRight, Heart, Package, Clock, CheckCircle } from 'lucide-react';

// --- Mock Data ---
const PRODUCTS = [
  { id: 1, name: "NewJeans 2nd EP 'Get Up' 限量黑膠", price: 1250, type: "預購", image: "https://images.unsplash.com/photo-1619983081563-430f53602796?auto=format&fit=crop&q=80&w=400&h=400" },
  { id: 2, name: "IVE 官方應援燈 (Light Stick)", price: 1100, type: "現貨", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=400&h=400" },
  { id: 3, name: "SEVENTEEN TOUR 'FOLLOW' 紀念T恤", price: 950, type: "預購", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=400&h=400" },
  { id: 4, name: "aespa Drama 專輯小卡套組 (隨機)", price: 450, type: "現貨", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=400&h=400" },
  { id: 5, name: "TWICE 13th Mini Album 'With YOU-th'", price: 680, type: "預購", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400&h=400" },
  { id: 6, name: "LE SSERAFIM 官方聯名老帽", price: 1050, type: "現貨", image: "https://images.unsplash.com/photo-1521369909029-2afed882ba28?auto=format&fit=crop&q=80&w=400&h=400" }
];

const MOCK_ORDERS = [
  { id: "ORD-20260422-001", date: "2026-04-22", total: 1250, status: "待付訂金", items: ["NewJeans 2nd EP 'Get Up' 限量黑膠"] },
  { id: "ORD-20260315-089", date: "2026-03-15", total: 2200, status: "採購中", items: ["IVE 官方應援燈 (Light Stick)", "aespa Drama 專輯小卡套組 (隨機)"] },
  { id: "ORD-20260210-042", date: "2026-02-10", total: 950, status: "已發貨", items: ["SEVENTEEN TOUR 'FOLLOW' 紀念T恤"] }
];

export default function App() {
  // --- State Management ---
  const [currentView, setCurrentView] = useState('home'); // 'home', 'products', 'orders', 'checkout_success'
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // --- Handlers ---
  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
      return;
    }
    setCart([]);
    setIsCartOpen(false);
    setCurrentView('checkout_success');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  // --- Components ---
  const Navbar = () => (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-rose-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentView('home')}>
            <span className="text-2xl font-bold text-rose-500 tracking-wider">嘿嘿代購</span>
            <span className="ml-2 text-xs text-rose-300 hidden sm:block">K-POP Goods & More</span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => setCurrentView('home')} className={`text-sm ${currentView === 'home' ? 'text-rose-500 font-semibold' : 'text-gray-600 hover:text-rose-400'}`}>首頁</button>
            <button onClick={() => setCurrentView('products')} className={`text-sm ${currentView === 'products' ? 'text-rose-500 font-semibold' : 'text-gray-600 hover:text-rose-400'}`}>商品一覽</button>
            {isLoggedIn && (
              <button onClick={() => setCurrentView('orders')} className={`text-sm ${currentView === 'orders' ? 'text-rose-500 font-semibold' : 'text-gray-600 hover:text-rose-400'}`}>訂單查詢</button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <input 
                type="text" 
                placeholder="搜尋偶像或商品..." 
                className="pl-8 pr-4 py-1.5 rounded-full border border-rose-200 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 bg-rose-50/50 w-48 transition-all"
              />
              <Search className="w-4 h-4 text-rose-300 absolute left-2.5 top-2" />
            </div>
            
            <button onClick={() => isLoggedIn ? setCurrentView('orders') : setIsAuthModalOpen(true)} className="p-2 text-gray-600 hover:text-rose-500 transition-colors">
              <User className="w-5 h-5" />
            </button>
            
            <button onClick={() => setIsCartOpen(true)} className="p-2 text-gray-600 hover:text-rose-500 transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-rose-500 rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const Footer = () => (
    <footer className="bg-stone-50 border-t border-stone-200 pt-12 pb-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-xl font-bold text-rose-500">嘿嘿代購</span>
            <p className="mt-4 text-sm text-stone-500 leading-relaxed">
              專注於韓國偶像周邊代購，提供最溫馨、透明的代購服務。將您心儀的偶像周邊安全送達您手中。
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-stone-800 mb-4">購物指南</h3>
            <ul className="space-y-2 text-sm text-stone-500">
              <li className="hover:text-rose-500 cursor-pointer">代購流程說明</li>
              <li className="hover:text-rose-500 cursor-pointer">訂金與尾款制度</li>
              <li className="hover:text-rose-500 cursor-pointer">常見問題 FAQ</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-stone-800 mb-4">會員服務</h3>
            <ul className="space-y-2 text-sm text-stone-500">
              <li className="hover:text-rose-500 cursor-pointer">訂單查詢</li>
              <li className="hover:text-rose-500 cursor-pointer">退換貨政策</li>
              <li className="hover:text-rose-500 cursor-pointer">隱私權條款</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-stone-800 mb-4">聯絡我們</h3>
            <ul className="space-y-2 text-sm text-stone-500">
              <li>客服信箱: service@heiheishop.tw</li>
              <li>營業時間: 週一至週五 10:00-18:00</li>
              <li className="pt-2 flex space-x-4">
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 cursor-pointer hover:bg-rose-200">IG</div>
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 cursor-pointer hover:bg-rose-200">FB</div>
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 cursor-pointer hover:bg-rose-200">LINE</div>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center text-xs text-stone-400 border-t border-stone-200 pt-8">
          © 2026 嘿嘿代購 HeiHei Shop. All rights reserved. (Demo)
        </div>
      </div>
    </footer>
  );

  const AuthModal = () => {
    if (!isAuthModalOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-stone-800">會員登入</h2>
              <button onClick={() => setIsAuthModalOpen(false)} className="text-stone-400 hover:text-rose-500">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">電子信箱</label>
                <input type="email" required defaultValue="user@example.com" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">密碼</label>
                <input type="password" required defaultValue="password" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-stone-600">
                  <input type="checkbox" className="mr-2 rounded border-stone-300 text-rose-500 focus:ring-rose-500" /> 記住我
                </label>
                <span className="text-rose-500 hover:underline cursor-pointer">忘記密碼？</span>
              </div>
              <button type="submit" className="w-full py-3 px-4 bg-rose-500 text-white rounded-lg font-medium hover:bg-rose-600 transition-colors mt-4">
                登入 / 註冊
              </button>
            </form>
            <div className="mt-6 text-center text-sm text-stone-500">
              點擊登入即代表您同意本站的 <span className="text-rose-500 underline cursor-pointer">服務條款</span>。
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CartDrawer = () => {
    return (
      <>
        {/* Backdrop */}
        {isCartOpen && (
          <div className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-50 transition-opacity" onClick={() => setIsCartOpen(false)} />
        )}
        {/* Drawer */}
        <div className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
          <div className="px-6 py-4 border-b border-rose-100 flex justify-between items-center bg-rose-50/50">
            <h2 className="text-lg font-bold text-stone-800 flex items-center">
              <ShoppingBag className="w-5 h-5 mr-2 text-rose-500" /> 購物車 ({cart.length})
            </h2>
            <button onClick={() => setIsCartOpen(false)} className="text-stone-400 hover:text-rose-500 p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-stone-400 space-y-4">
                <Package className="w-16 h-16 text-rose-100" />
                <p>購物車空空的耶，去逛逛吧！</p>
                <button onClick={() => {setIsCartOpen(false); setCurrentView('products');}} className="px-6 py-2 bg-rose-100 text-rose-600 rounded-full font-medium hover:bg-rose-200 transition-colors">
                  前往商品區
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="flex space-x-4 border-b border-stone-100 pb-4">
                  <div className="w-20 h-20 rounded-md bg-stone-100 overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-stone-800 line-clamp-2">{item.name}</h3>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-rose-50 text-rose-600 text-xs rounded-full">{item.type}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-semibold text-stone-800">NT$ {item.price.toLocaleString()}</span>
                      <button onClick={() => removeFromCart(index)} className="text-xs text-stone-400 hover:text-rose-500 underline">移除</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 bg-stone-50 border-t border-stone-200">
              <div className="flex justify-between text-stone-600 mb-2">
                <span>小計</span>
                <span>NT$ {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-stone-800 mb-6">
                <span>總計</span>
                <span className="text-rose-500">NT$ {cartTotal.toLocaleString()}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full py-3.5 bg-rose-500 text-white rounded-xl font-medium hover:bg-rose-600 transition-all flex justify-center items-center shadow-md shadow-rose-200"
              >
                前往結帳 ({cart.length} 件) <ChevronRight className="w-5 h-5 ml-1" />
              </button>
              <p className="text-xs text-center text-stone-400 mt-3">下一步將提供匯款帳戶以支付訂金</p>
            </div>
          )}
        </div>
      </>
    );
  };

  // --- Views ---
  const HomeView = () => (
    <div className="space-y-12 pb-12 animate-in fade-in duration-500">
      {/* Banner */}
      <div className="relative bg-rose-100/50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 z-10 space-y-6">
            <span className="px-3 py-1 bg-white text-rose-500 text-xs font-bold rounded-full shadow-sm tracking-widest">NEW ARRIVAL</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-800 leading-tight">
              找到屬於你的 <br/>
              <span className="text-rose-500">閃耀時刻 ✨</span>
            </h1>
            <p className="text-stone-600 text-lg max-w-md leading-relaxed">
              最新韓國偶像周邊、演唱會周邊預購中。我們提供最安心的代購服務，讓追星之路更輕鬆。
            </p>
            <button onClick={() => setCurrentView('products')} className="mt-4 px-8 py-3.5 bg-rose-500 text-white rounded-full font-medium hover:bg-rose-600 transition-all shadow-lg shadow-rose-200 flex items-center">
              立即逛逛 <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 relative">
            <div className="aspect-square rounded-full bg-rose-200/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 blur-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600&h=600" 
              alt="Idol Merch" 
              className="relative z-10 w-full max-w-md mx-auto rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-stone-800">熱門預購推薦</h2>
            <p className="text-sm text-stone-500 mt-1">Don't miss out on these trending items</p>
          </div>
          <button onClick={() => setCurrentView('products')} className="text-rose-500 text-sm font-medium hover:underline hidden sm:block">查看全部</button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {PRODUCTS.slice(0, 4).map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col">
              <div className="relative aspect-square overflow-hidden bg-stone-50">
                <span className="absolute top-3 left-3 z-10 px-2 py-1 bg-white/90 backdrop-blur-sm text-rose-500 text-xs font-bold rounded-md shadow-sm">
                  {product.type}
                </span>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button 
                    onClick={() => addToCart(product)}
                    className="translate-y-4 group-hover:translate-y-0 transition-all duration-300 px-6 py-2 bg-white text-stone-800 rounded-full font-medium hover:bg-rose-500 hover:text-white shadow-lg"
                  >
                    加入購物車
                  </button>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-medium text-stone-800 line-clamp-2 flex-1">{product.name}</h3>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-rose-500">NT$ {product.price.toLocaleString()}</span>
                  <button className="text-stone-300 hover:text-rose-400"><Heart className="w-5 h-5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProductsView = () => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold text-stone-800 mb-8">所有商品</h1>
      
      {/* Filters (Mock UI) */}
      <div className="flex flex-wrap gap-3 mb-8">
        {['全部商品', '官方現貨', '專輯預購', '演唱會周邊', '小卡特區'].map((tag, idx) => (
          <button key={idx} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${idx === 0 ? 'bg-rose-500 text-white shadow-md' : 'bg-white text-stone-600 border border-stone-200 hover:border-rose-300 hover:text-rose-500'}`}>
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col">
            <div className="relative aspect-square overflow-hidden bg-stone-50">
              <span className="absolute top-3 left-3 z-10 px-2 py-1 bg-white/90 backdrop-blur-sm text-rose-500 text-xs font-bold rounded-md shadow-sm">
                {product.type}
              </span>
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-sm font-medium text-stone-800 line-clamp-2 flex-1">{product.name}</h3>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-lg font-bold text-rose-500">NT$ {product.price.toLocaleString()}</span>
              </div>
              <button 
                onClick={() => addToCart(product)}
                className="mt-4 w-full py-2 bg-rose-50 text-rose-600 rounded-lg text-sm font-medium hover:bg-rose-500 hover:text-white transition-colors"
              >
                加入購物車
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CheckoutSuccessView = () => (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in slide-in-from-bottom-8 duration-500">
      <div className="bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden text-center">
        <div className="bg-rose-50 py-12 px-6 flex flex-col items-center border-b border-rose-100">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
            <CheckCircle className="w-10 h-10 text-rose-500" />
          </div>
          <h1 className="text-3xl font-bold text-stone-800 mb-2">訂單已建立！</h1>
          <p className="text-stone-600">您的訂單編號：<span className="font-mono font-semibold text-rose-600">ORD-20260422-999</span></p>
        </div>
        
        <div className="p-8 sm:p-12 text-left space-y-8">
          <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Package className="w-24 h-24 text-rose-500" /></div>
            <h2 className="text-lg font-bold text-rose-800 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2" /> 買方需知：請先匯款「訂金」
            </h2>
            <p className="text-sm text-stone-600 mb-4 leading-relaxed">
              為保障雙方權益，代購商品需先支付商品總額之 50% 作為訂金。<br/>
              確認收到訂金後，我們才會正式為您下單採購。尾款將於商品抵台後另行通知支付。
            </p>
            
            <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-stone-100">
                <span className="text-stone-500 text-sm">應繳訂金金額</span>
                <span className="text-2xl font-bold text-rose-500">NT$ 1,500</span>
              </div>
              <div className="space-y-2 pt-1">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">銀行名稱</span>
                  <span className="font-medium text-stone-800">808 玉山銀行 (虛擬帳號)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">匯款帳號</span>
                  <span className="font-mono font-medium text-stone-800 tracking-wider">9876-5432-1012-34</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">繳費期限</span>
                  <span className="font-medium text-rose-600">2026-04-24 23:59 前</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button onClick={() => setCurrentView('orders')} className="px-8 py-3 bg-rose-500 text-white rounded-xl font-medium hover:bg-rose-600 transition-colors shadow-md">
              查看訂單狀態
            </button>
            <button onClick={() => setCurrentView('home')} className="px-8 py-3 bg-stone-100 text-stone-600 rounded-xl font-medium hover:bg-stone-200 transition-colors">
              返回首頁
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const OrdersView = () => (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
      <div className="flex items-center space-x-3 mb-8">
        <User className="w-8 h-8 text-rose-500 p-1.5 bg-rose-100 rounded-full" />
        <h1 className="text-2xl font-bold text-stone-800">我的訂單查詢</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-stone-50 border-b border-stone-200 text-sm font-medium text-stone-500">
          <div className="col-span-3">訂單編號 / 日期</div>
          <div className="col-span-5">商品明細</div>
          <div className="col-span-2 text-right">總金額</div>
          <div className="col-span-2 text-center">狀態</div>
        </div>

        <div className="divide-y divide-stone-100">
          {/* Newest Mock Order (if checkout was clicked) */}
          {currentView === 'orders' && MOCK_ORDERS.map((order, idx) => (
            <div key={order.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center hover:bg-stone-50/50 transition-colors">
              <div className="col-span-1 md:col-span-3">
                <div className="font-mono text-sm text-stone-800 font-medium">{order.id}</div>
                <div className="text-xs text-stone-400 mt-1">{order.date}</div>
              </div>
              <div className="col-span-1 md:col-span-5">
                <ul className="text-sm text-stone-600 space-y-1">
                  {order.items.map((item, i) => (
                    <li key={i} className="line-clamp-1 flex items-center before:content-['•'] before:mr-2 before:text-rose-300">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-1 md:col-span-2 text-left md:text-right">
                <div className="text-sm font-bold text-stone-800">NT$ {order.total.toLocaleString()}</div>
              </div>
              <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                <span className={`px-3 py-1 rounded-full text-xs font-medium 
                  ${order.status === '待付訂金' ? 'bg-amber-100 text-amber-700' : 
                    order.status === '採購中' ? 'bg-blue-100 text-blue-700' : 
                    'bg-emerald-100 text-emerald-700'}`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50 font-sans selection:bg-rose-200 selection:text-rose-900">
      <Navbar />
      
      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'products' && <ProductsView />}
        {currentView === 'checkout_success' && <CheckoutSuccessView />}
        {currentView === 'orders' && <OrdersView />}
      </main>

      <Footer />
      <CartDrawer />
      <AuthModal />
    </div>
  );
}