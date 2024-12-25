"use client"

import { productType } from '@/utils/utils';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ContextProps {
  user: { name: string, email: string, id: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ name: string, email: string, id: string } | null>>;

  cart: productType[] | null

  setCart: React.Dispatch<React.SetStateAction<productType[] | null>>
}

const defaultContext: ContextProps = {
  user: null,
  cart: [],
  setUser: () => { },
  setCart: () => { },
}

const MyContext = createContext<ContextProps>(defaultContext);

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }): JSX.Element => {

  const [user, setUser] = useState(defaultContext.user);
  const [cart, setCart] = useState(defaultContext.cart);

  async function getCart() {
    const response = await fetch(`http://localhost:3000/api/cart/Cart?uid=${user?.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    })
    const data = await response.json()

    if (response.ok) {
      setCart(data.products);
    }
  }

  useEffect(() => {
    async function getUser() {
      const response = await fetch('http://localhost:3000/api/user/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      })
      const data = await response.json()

      if (response.ok) {
        setUser(data);
      }
    }
    getUser();
  }, [])

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user])


  const value = {
    user,
    setUser,
    cart,
    setCart
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