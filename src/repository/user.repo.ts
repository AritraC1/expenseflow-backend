import User from "../models/user.model";

class UserRepository {
  // Find by email
  findByEmail = (email: string) => {
    return User.findOne({ email }).exec();
  };

  // Find by id
  findById = (id: string) => {
    return User.findById(id).exec();
  };

  // create new User
  createUser = (name: string, email: string, password: string) => {
    return User.create({ name, email, password });
  };
}

export default UserRepository;
