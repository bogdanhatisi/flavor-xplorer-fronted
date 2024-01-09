enum Gender {
  male = 'male',
  female = 'female',
  prefer_not_to_say = 'prefer_not_to_say',
}

export interface User {
  id?: number;
  username?: string;
  email?: string;
  role?: string;
  first_name?: string;
  last_name?: string;
  description?: string;
  pronouns?: string;
  gender?: Gender;
  avatar?: string;
}
