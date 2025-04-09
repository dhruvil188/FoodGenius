import React from 'react';
import { Helmet } from 'react-helmet-async';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  description?: string;
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  subtitle,
  description,
  children,
}) => {
  return (
    <>
      <Helmet>
        <title>{title} | Recipe Snap</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
      <div className="container pt-8 px-4">
        <div className="max-w-6xl mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-lg text-slate-600 mt-2 tracking-tight max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </>
  );
};