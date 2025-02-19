"use client"

import { productType } from '@/utils/utils';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ContextProps {
  user: { name: string, email: string, id: string, role: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ name: string, email: string, id: string, role: string } | null>>;

  cart: productType[] | null
  whishlist: productType[] | null
  item: {
    id: string,
    price: number,
  }[] | null;
  allitem: boolean
  selected: string
  active: boolean
  search: string

  setSearch: React.Dispatch<React.SetStateAction<string>>
  setActive: React.Dispatch<React.SetStateAction<boolean>>
  setSelected: React.Dispatch<React.SetStateAction<string>>
  setCart: React.Dispatch<React.SetStateAction<productType[] | null>>
  setWhishlist: React.Dispatch<React.SetStateAction<productType[] | null>>
  setItem: React.Dispatch<React.SetStateAction<{ id: string, price: number }[] | null>>
  setAllitem: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultContext: ContextProps = {
  user: null,
  cart: [],
  whishlist: [],
  item: [],
  allitem: false,
  selected: "",
  active: false,
  search: '',
  setSearch: () => { },
  setActive: () => { },
  setSelected: () => { },
  setAllitem: () => { },
  setItem: () => { },
  setUser: () => { },
  setCart: () => { },
  setWhishlist: () => { },
}

const MyContext = createContext<ContextProps>(defaultContext);

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }): JSX.Element => {

  const [user, setUser] = useState(defaultContext.user);
  const [cart, setCart] = useState(defaultContext.cart);
  const [whishlist, setWhishlist] = useState(defaultContext.whishlist);
  const [item, setItem] = useState(defaultContext.item)
  const [allitem, setAllitem] = useState(false)
  const [selected, setSelected] = useState("");
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState('')


  async function getCart() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/Cart?uid=${user?.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    })
    const data = await response.json()

    if (response.ok) {
      setCart(data.products);
    }else{
      throw new Error("Error fetching cart");
      
    }
  }

  async function getWhishlist() {
    if (user) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/whishlist/whishlist?uid=${user?.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      })
      const data = await response.json()

      if (response.ok) {
        setWhishlist(data.products);
      }else{
        throw new Error("Error fetching whishlist");
      }
    }
  }

  useEffect(() => {
    async function getUser() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      })
      const data = await response.json()

      if (response.ok) {
        setUser(data);
      }else{
        throw new Error("Error fetching user");
      }
    }
    getUser();
  }, [])

  useEffect(() => {
    if (user) {
      getCart();
      getWhishlist();
    }
  }, [user])


  const value = {
    user,
    setUser,
    cart,
    setCart,
    whishlist,
    setWhishlist,
    item,
    setItem,
    allitem,
    setAllitem,
    selected,
    setSelected,
    active,
    setActive,
    search,
    setSearch
  };

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = (): ContextProps => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};