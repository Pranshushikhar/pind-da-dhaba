import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-charcoal-950 flex items-center justify-center text-cream-100 px-4">
      <div className="text-center space-y-6 max-w-md">
        <span className="text-xs uppercase tracking-[0.25em] text-terracotta-400 font-bold block">
          404 — Lost Along The GT Road
        </span>
        <h1 className="font-serif text-5xl sm:text-6xl font-bold">
          Table Not Found
        </h1>
        <p className="text-sm text-cream-400 font-light leading-relaxed">
          The page you are looking for has moved or does not exist. Come back to the main hearth and explore our menu.
        </p>
        <div>
          <Link to="/">
            <Button variant="primary" size="md">
              Return To Dhaba Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
