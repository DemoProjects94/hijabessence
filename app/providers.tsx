"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// --- Theme Context ---
type Theme = "dark" | "light" | "brown";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

// --- Cart Context ---
export interface CartItem {
  id: string;
  name: string;
  price_iqd: number;
  image_url: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string, removeAll?: boolean) => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

// --- Auth Context ---
interface User {
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (type: "user" | "admin") => void;
  logout: () => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (isOpen: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};


// --- Search Context ---
interface SearchContextType {
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within SearchProvider");
  return context;
};

// --- Chat Context ---
interface ChatContextType {
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within ChatProvider");
  return context;
};

// --- Language Context ---
export type Language = "EN" | "KU" | "AR";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};

// --- Combined Provider ---
export function Providers({ children }: { children: React.ReactNode }) {
  // Theme State
  const [theme, setThemeState] = useState<Theme>("dark");
  
  useEffect(() => {
    const saved = localStorage.getItem("hijab-theme") as Theme;
    if (saved) {
      setTimeout(() => setThemeState(saved), 0);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("hijab-theme", newTheme);
    document.documentElement.className = ""; // clear old exactly
    if (newTheme !== "dark") {
      document.documentElement.classList.add(`theme-${newTheme}`);
    }
  };
  
  // Apply theme on mount
  useEffect(() => {
    document.documentElement.className = "";
    if (theme !== "dark") {
      document.documentElement.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("hijab-cart");
    if (saved) {
      setTimeout(() => setCart(JSON.parse(saved)), 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("hijab-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, removeAll = false) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing && existing.quantity > 1 && !removeAll) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price_iqd * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("hijab-user");
    if (saved) {
      setTimeout(() => setUser(JSON.parse(saved)), 0);
    }
  }, []);

  const login = (role: "user" | "admin") => {
    const newUser: User = role === "admin" 
      ? { name: "Admin Dashboard", email: "admin@hijabessence.com", role: "admin" }
      : { name: "Demo User", email: "user@example.com", role: "user" };
    setUser(newUser);
    localStorage.setItem("hijab-user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("hijab-user");
  };

  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Language State
  const [language, setLanguageState] = useState<Language>("EN");

  useEffect(() => {
    const saved = localStorage.getItem("hijab-lang") as Language;
    if (saved) {
      setTimeout(() => setLanguageState(saved), 0);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("hijab-lang", lang);
    document.documentElement.lang = lang.toLowerCase();
    document.documentElement.dir = lang === "AR" || lang === "KU" ? "rtl" : "ltr";
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <AuthContext.Provider value={{ user, login, logout, isAuthOpen, setIsAuthOpen }}>
          <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartTotal, cartCount, isCartOpen, setIsCartOpen }}>
            <SearchContext.Provider value={{ isSearchOpen, setIsSearchOpen }}>
              <ChatContext.Provider value={{ isChatOpen, setIsChatOpen }}>
                {children}
              </ChatContext.Provider>
            </SearchContext.Provider>
          </CartContext.Provider>
        </AuthContext.Provider>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}
