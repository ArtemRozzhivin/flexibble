'use client';

import { getProviders, signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    };

    fetchProviders();
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider) => (
          <button key={provider.id} onClick={() => signIn(provider?.id)}>
            <span>SignIn</span>
          </button>
        ))}
      </div>
    );
  }
};

export default AuthProviders;
