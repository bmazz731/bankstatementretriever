/**
 * Password validation and strength checking
 * PRD Requirements: 12+ chars, zxcvbn ≥ 3
 */
import * as zxcvbn from "zxcvbn";
import * as bcrypt from "bcrypt";
import type { PasswordValidation, AuthConfig } from "./types";

export class PasswordValidator {
  private config: AuthConfig;

  constructor(config: AuthConfig) {
    this.config = config;
  }

  /**
   * Validate password against requirements
   */
  validate(password: string, userInputs?: string[]): PasswordValidation {
    const minLength = password.length >= this.config.passwordMinLength;

    // Run zxcvbn analysis
    const analysis = zxcvbn(password, userInputs);
    const strengthMet = analysis.score >= this.config.passwordMinStrength;

    const feedback: string[] = [];

    if (!minLength) {
      feedback.push(
        `Password must be at least ${this.config.passwordMinLength} characters long`,
      );
    }

    if (!strengthMet) {
      feedback.push(
        `Password strength is too weak (score: ${analysis.score}/4)`,
      );

      // Add specific zxcvbn feedback
      if (analysis.feedback.warning) {
        feedback.push(analysis.feedback.warning);
      }

      analysis.feedback.suggestions.forEach((suggestion) => {
        feedback.push(suggestion);
      });
    }

    return {
      valid: minLength && strengthMet,
      score: analysis.score,
      feedback,
      requirements: {
        minLength,
        strength: strengthMet,
      },
    };
  }

  /**
   * Hash password with bcrypt
   */
  async hash(password: string): Promise<string> {
    const saltRounds = 12; // High security for financial app
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Verify password against hash
   */
  async verify(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Check if password contains common patterns
   */
  containsUserInfo(password: string, userInputs: string[]): boolean {
    const lowercasePassword = password.toLowerCase();

    return userInputs.some((input) => {
      const lowercaseInput = input.toLowerCase();

      // Check if password contains user info
      return (
        lowercasePassword.includes(lowercaseInput) ||
        lowercaseInput.includes(lowercasePassword)
      );
    });
  }

  /**
   * Generate a secure random password
   */
  generateSecure(length: number = 16): string {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";

    // Ensure at least one character from each category
    const categories = [
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      "abcdefghijklmnopqrstuvwxyz",
      "0123456789",
      "!@#$%^&*",
    ];

    // Add one from each category
    categories.forEach((category) => {
      const randomIndex = Math.floor(Math.random() * category.length);
      password += category[randomIndex];
    });

    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    // Shuffle the password
    return password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }

  /**
   * Check if password has been compromised (stub for external API)
   */
  async isCompromised(password: string): Promise<boolean> {
    // In production, integrate with HaveIBeenPwned API
    // For MVP, use basic checks
    const commonPasswords = [
      "password",
      "123456",
      "123456789",
      "qwerty",
      "abc123",
      "password123",
      "admin",
      "letmein",
      "welcome",
      "monkey",
    ];

    return commonPasswords.includes(password.toLowerCase());
  }
}
