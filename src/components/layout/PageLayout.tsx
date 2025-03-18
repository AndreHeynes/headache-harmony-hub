
import React from "react";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader />
      <main className="pt-20 px-4 pb-12">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
      <PageFooter />
    </div>
  );
};

export default PageLayout;
