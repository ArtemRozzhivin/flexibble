'use client';

import { getProviders, signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Button from './ui/Button';

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
          <Button type='button' pirmary key={provider.id} onClick={() => signIn(provider?.id)}>
            <span>SignIn</span>
          </Button>
        ))}
      </div>
    );
  }
};

export default AuthProviders;
