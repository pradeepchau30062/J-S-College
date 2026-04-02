import { connectDb } from '../config/db.js';
import { env } from '../config/env.js';
import { User } from '../modules/users/user.model.js';

const run = async () => {
  await connectDb();
  const exists = await User.findOne({ role: 'admin' });
  if (exists) {
    console.log('Super admin already exists.');
    process.exit(0);
  }
  await User.create({
    fullName: 'Super Admin',
    email: env.adminEmail,
    password: env.adminPassword,
    role: 'admin',
    status: 'active',
    emailVerified: true
  });
  console.log('Super admin seeded successfully.');
  process.exit(0);
};

run();
