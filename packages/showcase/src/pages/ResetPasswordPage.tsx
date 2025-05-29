import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthShell, Button, TextInput, useToast } from "@etherisc/ui-kit";
import { useState } from "react";

const resetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const { success, error: showError } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would call a password reset API
      console.log("Password reset requested for:", data.email);

      success(
        "Reset Link Sent",
        `Password reset instructions have been sent to ${data.email}`,
      );

      // Navigate back to login after successful submission
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      showError("Reset Failed", "Unable to send reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <AuthShell width="md">
      <div className="w-full space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Reset Your Password</h1>
          <p className="text-gray-600 mt-2">
            Enter your email address and we'll send you a link to reset your
            password
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextInput
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            error={errors.email?.message}
            {...register("email")}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={handleBackToLogin}
            className="text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
          >
            ← Back to Sign In
          </button>
        </div>
      </div>
    </AuthShell>
  );
}
