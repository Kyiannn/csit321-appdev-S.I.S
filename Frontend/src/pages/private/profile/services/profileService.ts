import type { User, UpdateProfileRequestDTO } from '../types/profile.dto';
import { createDefaultUser } from '../types/profile.dto';
import { ProfileValidationService } from '../utils/profile.validation';
import { mapUpdateRequestToUser } from '../utils/profile.mapper';

class ProfileService {
  private static instance: ProfileService;
  private user: User;

  private constructor() {
    this.user = createDefaultUser();
  }

  static getInstance(): ProfileService {
    if (!ProfileService.instance) {
      ProfileService.instance = new ProfileService();
    }
    return ProfileService.instance;
  }

  getUser(): User {
    return { ...this.user }; // Return a copy to prevent mutation
  }

  async updateUser(updateData: UpdateProfileRequestDTO): Promise<{ success: boolean; error?: string }> {
    // Validate
    const validationResult = ProfileValidationService.validateAll({
      fullName: updateData.fullName || this.user.fullName,
      email: updateData.email || this.user.email,
      bio: updateData.bio || this.user.bio,
    });

    if (!validationResult.isValid) {
      return {
        success: false,
        error: Object.values(validationResult.errors).join(', '),
      };
    }

    // Update user
    const updates = mapUpdateRequestToUser(updateData);
    this.user = { ...this.user, ...updates };
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { success: true };
  }

  async resetUser(): Promise<void> {
    this.user = createDefaultUser();
  }
}

export const profileService = ProfileService.getInstance();