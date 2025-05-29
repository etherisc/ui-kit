import React from "react";
import { Button } from "@etherisc/ui-kit";
import { useNavigate } from "react-router-dom";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Code */}
        <div
          className="text-6xl font-bold text-muted-foreground mb-2"
          aria-hidden="true"
        >
          404
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-muted-foreground mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={handleGoHome}>Go to Dashboard</Button>
          <Button onClick={handleGoBack}>Go Back</Button>
        </div>
      </div>
    </div>
  );
};
