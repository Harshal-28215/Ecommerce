"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ContextProps {
    // Define your context properties here
    user: { name: string, email: string, id: string } | null;
}

const defaultContext = {
    user: null
}

const MyContext = createContext<ContextProps | undefined>(defaultContext);

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }): JSX.Element => {

    const [user, setUser] = useState(defaultContext.user);

    useEffect(() => {
    async function getUser(){
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
    

    const value = {
        user
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