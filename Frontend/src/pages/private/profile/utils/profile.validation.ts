// pages/private/profile/utils/profile.validation.ts
import { profileValidation } from '../types/profile.dto';

export interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
}

export class ProfileValidationService {
    static validateUsername(username: string): string | null {
        const rules = profileValidation.username;

        if (rules.required && !username.trim()) {
            return 'Username is required';
        }
        if (username.trim().length < rules.minLength) {
            return `Username must be at least ${rules.minLength} characters`;
        }
        if (username.trim().length > rules.maxLength) {
            return `Username must not exceed ${rules.maxLength} characters`;
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
        username: string;
        email: string;
    }): ValidationResult {
        const errors: Record<string, string> = {};

        const usernameError = this.validateUsername(formData.username);
        const emailError = this.validateEmail(formData.email);

        if (usernameError) errors.username = usernameError;
        if (emailError) errors.email = emailError;

        return {
            isValid: Object.keys(errors).length === 0,
            errors,
        };
    }
}