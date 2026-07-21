import type { 
  ProfileResponseDTO,
  UpdateProfileRequestDTO,
  User 
} from '../types/profile.dto';

export const mapUserToResponseDTO = (user: User): ProfileResponseDTO => {
  return {
    id: user.id || '1',
    fullName: user.fullName,
    email: user.email,
    bio: user.bio,
    initials: user.initials,
    createdAt: user.createdAt || new Date().toISOString(),
    updatedAt: user.updatedAt || new Date().toISOString(),
  };
};

export const mapUpdateRequestToUser = (
  updateRequest: UpdateProfileRequestDTO
): Partial<User> => {
  const updatedUser: Partial<User> = {};
  
  if (updateRequest.fullName !== undefined) {
    updatedUser.fullName = updateRequest.fullName;
  }
  if (updateRequest.bio !== undefined) {
    updatedUser.bio = updateRequest.bio;
  }
  if (updateRequest.email !== undefined) {
    updatedUser.email = updateRequest.email;
  }
  
  return updatedUser;
};

export const mapFormDataToUpdateRequest = (
  formData: {
    fullName: string;
    bio: string;
  }
): UpdateProfileRequestDTO => {
  return {
    fullName: formData.fullName,
    bio: formData.bio,
  };
};