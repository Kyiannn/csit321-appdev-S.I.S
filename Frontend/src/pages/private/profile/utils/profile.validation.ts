import { profileValidation } from '../types/profile.dto';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export class ProfileValidationService {
  static validateFullName(fullName: string): string | null {
    const rules = profileValidation.fullName;

    if (rules.required && !fullName.trim()) {
      return 'Full name is required';
    }
    if (fullName.trim().length < rules.minLength) {
      return `Full name must be at least ${rules.minLength} characters`;
    }
    if (fullName.trim().length > rules.maxLength) {
      return `Full name must not exceed ${rules.maxLength} characters`;
    }
    return null;
  }

  static validateEmail(email: string): string | null {
    const rules = profileValidation.email;

    if (rules.required && !email.trim()) {
      return 'Email is required';
    }
    if (email.trim()) {
      const emailRegex = new RegExp(rules.pattern);
      if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
      }
    }
    return null;
  }

  static validateAll(formData: {
    fullName: string;
    email: string;
  }): ValidationResult {
    const errors: Record<string, string> = {};

    const nameError = this.validateFullName(formData.fullName);
    const emailError = this.validateEmail(formData.email);

    if (nameError) errors.fullName = nameError;
    if (emailError) errors.email = emailError;

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}