import mongoose from 'mongoose';
import { ENV } from './src/config/env.js';
import { MenuItem } from './src/models/MenuItem.js';
import { Reservation } from './src/models/Reservation.js';
import { ContactMessage } from './src/models/ContactMessage.js';
import {
  INITIAL_MENU_ITEMS,
  INITIAL_RESERVATIONS,
  INITIAL_MESSAGES,
} from './src/utils/initialData.js';

const seedDatabase = async () => {
  try {
    console.log(`[Seed] Connecting to MongoDB at ${ENV.MONGODB_URI}...`);
    await mongoose.connect(ENV.MONGODB_URI);
    console.log('[Seed] Connected successfully.');

    // Clear existing collections
    console.log('[Seed] Clearing existing demo collections...');
    await Promise.all([
      MenuItem.deleteMany({}),
      Reservation.deleteMany({}),
      ContactMessage.deleteMany({}),
    ]);

    // Insert Menu Items
    console.log(`[Seed] Seeding ${INITIAL_MENU_ITEMS.length} authentic demo menu items...`);
    await MenuItem.insertMany(INITIAL_MENU_ITEMS);

    // Insert Reservations
    console.log(`[Seed] Seeding ${INITIAL_RESERVATIONS.length} demo reservations...`);
    await Reservation.insertMany(INITIAL_RESERVATIONS);

    // Insert Messages
    console.log(`[Seed] Seeding ${INITIAL_MESSAGES.length} demo enquiries...`);
    await ContactMessage.insertMany(INITIAL_MESSAGES);

    console.log('----------------------------------------------------');
    console.log('✓ Successfully seeded Pind Da Dhaba demo database!');
    console.log('----------------------------------------------------');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Failed to seed database:', error);
    process.exit(1);
  }
};

seedDatabase();
