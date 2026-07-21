// Base DTO with common fields
export interface ProfileBaseDTO {
  fullName: string;
  email: string;
  // bio: string; // REMOVED
}

// Request DTO - What the client sends to the server
export type UpdateProfileRequestDTO = Partial<ProfileBaseDTO>;

// Response DTO - What the server sends to the client
export interface ProfileResponseDTO extends ProfileBaseDTO {
  id: string;
  initials: string;
  createdAt: string;
  updatedAt: string;
}

// User type
export interface User {
  id?: string;
  fullName: string;
  email: string;
  // bio: string; // REMOVED
  initials: string;
  createdAt?: string;
  updatedAt?: string;
}

// Validation DTO - For form validation
export interface ProfileValidationDTO {
  fullName: {
    required: boolean;
    minLength: number;
    maxLength: number;
  };
  // bio: { // REMOVED
  //   maxLength: number;
  //   required: boolean;
  // };
  email: {
    required: boolean;
    pattern: string;
  };
}

// Validation instance
export const profileValidation: ProfileValidationDTO = {
  fullName: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    required: true,
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  },
};

// Default user factory
export const createDefaultUser = (): User => ({
  id: '1',
  fullName: 'Jane Doe',
  email: 'jane.doe@email.com',
  // bio: 'Software developer passionate about creating beautiful and functional web applications. Loves React, TypeScript, and Tailwind CSS.', // REMOVED
  initials: 'JD',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});