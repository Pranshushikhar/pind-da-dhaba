import { Reservation } from '../models/Reservation.js';
import { ContactMessage } from '../models/ContactMessage.js';
import { MenuItem } from '../models/MenuItem.js';
import {
  reservationSchema,
  contactSchema,
  menuItemSchema,
  updateReservationStatusSchema,
} from '../utils/validation.js';

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    failed++;
  }
}

async function runTests() {
  console.log('====================================================');
  console.log('  RUNNING BACKEND FULL-STACK FUNCTIONALITY TESTS');
  console.log('====================================================\n');

  // --- 1. Mongoose Model Schema Validation ---
  console.log('[1. Mongoose Schema Verification]');
  
  // Valid Reservation
  const validResDoc = new Reservation({
    name: 'Harpreet Singh',
    phone: '+91 98765 43210',
    email: 'harpreet.singh@example.com',
    date: '2026-09-30',
    time: '20:00',
    guests: 4,
    specialRequest: 'Corner table',
    status: 'pending',
  });
  const resErr = validResDoc.validateSync();
  assert(!resErr, 'Mongoose Reservation schema validates valid document');

  // Invalid Reservation (guests > 20, bad status, invalid email)
  const invalidResDoc = new Reservation({
    name: '',
    phone: '',
    email: 'not-an-email',
    date: '',
    time: '',
    guests: 50,
    status: 'unknown_status',
  });
  const invalidResErr = invalidResDoc.validateSync();
  assert(!!invalidResErr, 'Mongoose Reservation schema catches multiple invalid fields');
  assert(!!invalidResErr?.errors['email'], 'Mongoose catches invalid email format');
  assert(!!invalidResErr?.errors['guests'], 'Mongoose catches guests exceeding max limit');
  assert(!!invalidResErr?.errors['status'], 'Mongoose catches invalid status enum');

  // Valid Contact Message
  const validMsgDoc = new ContactMessage({
    name: 'Gurpreet Kaur',
    email: 'gurpreet.kaur@example.com',
    phone: '+91 98111 00000',
    message: 'We would like to book the courtyard for a private dinner.',
    status: 'unread',
  });
  const msgErr = validMsgDoc.validateSync();
  assert(!msgErr, 'Mongoose ContactMessage schema validates valid document');

  // Invalid Contact Message
  const invalidMsgDoc = new ContactMessage({
    name: '',
    email: 'bademail',
    phone: '',
    message: '',
  });
  const invalidMsgErr = invalidMsgDoc.validateSync();
  assert(!!invalidMsgErr, 'Mongoose ContactMessage schema catches missing fields');
  assert(!!invalidMsgErr?.errors['email'], 'Mongoose ContactMessage catches bad email');

  // Valid Menu Item
  const validMenuDoc = new MenuItem({
    name: 'Paneer Kulcha',
    description: 'Crisp clay oven baked flatbread with paneer',
    price: 269,
    category: 'Breads',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950',
    vegetarian: true,
    spicy: false,
    available: true,
    featured: true,
  });
  const menuErr = validMenuDoc.validateSync();
  assert(!menuErr, 'Mongoose MenuItem schema validates valid document');

  // Invalid Menu Item (negative price, wrong category)
  const invalidMenuDoc = new MenuItem({
    name: '',
    description: '',
    price: -50,
    category: 'Burgers' as any,
    image: '',
  });
  const invalidMenuErr = invalidMenuDoc.validateSync();
  assert(!!invalidMenuErr, 'Mongoose MenuItem catches invalid fields');
  assert(!!invalidMenuErr?.errors['price'], 'Mongoose catches negative price');
  assert(!!invalidMenuErr?.errors['category'], 'Mongoose catches invalid category enum');

  // --- 2. Zod Validation Verification ---
  console.log('\n[2. Zod Request Payload Validation]');
  
  const validZodRes = reservationSchema.safeParse({
    name: 'Jasleen Kaur',
    phone: '+91 98888 11111',
    email: 'jasleen.kaur@example.com',
    date: '2026-10-01',
    time: '19:00',
    guests: 2,
    specialRequest: 'Window seating',
  });
  assert(validZodRes.success, 'Zod reservationSchema accepts valid payload');

  const invalidZodRes = reservationSchema.safeParse({
    name: 'J',
    phone: '123',
    email: 'bad-email',
    date: '',
    time: '',
    guests: 0,
  });
  assert(!invalidZodRes.success, 'Zod reservationSchema rejects invalid payload');
  if (!invalidZodRes.success) {
    assert(invalidZodRes.error.issues.length >= 4, 'Zod caught all invalid reservation fields');
  }

  const validZodContact = contactSchema.safeParse({
    name: 'Balwinder Singh',
    email: 'balwinder.singh@example.com',
    phone: '+91 98777 22222',
    message: 'Hello, looking forward to dining with family this Saturday.',
  });
  assert(validZodContact.success, 'Zod contactSchema accepts valid payload');

  const invalidZodContact = contactSchema.safeParse({
    name: '',
    email: 'invalid',
    phone: '123',
    message: 'short',
  });
  assert(!invalidZodContact.success, 'Zod contactSchema rejects invalid message and phone');

  // --- 3. Live Server Endpoint Tests ---
  console.log('\n[3. Live REST API Verification]');
  const baseUrl = 'http://localhost:5000/api';

  try {
    // Health check
    const healthRes = await fetch(`${baseUrl}/health`);
    assert(healthRes.status === 200, 'GET /api/health responds with 200 OK');
    const healthData = await healthRes.json();
    assert(healthData.service === 'Pind Da Dhaba API', 'Health response identifies service correctly');
    assert('database' in healthData, 'Health response explicitly reports database status');

    // Menu check
    const menuRes = await fetch(`${baseUrl}/menu`);
    assert(menuRes.status === 200, 'GET /api/menu responds with 200 OK');
    const menuData = await menuRes.json();
    assert(menuData.success === true && menuData.count >= 12, 'Menu returns all 12 authentic dishes');

    // Menu category filter
    const vegRes = await fetch(`${baseUrl}/menu?category=Veg`);
    const vegData = await vegRes.json();
    assert(vegData.data.every((d: any) => d.category === 'Veg'), 'Menu category filtering works correctly');

    // Reservation submission
    const resPost = await fetch(`${baseUrl}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Navjot Singh Sidhu',
        phone: '+91 98140 12345',
        email: 'navjot.sidhu@example.com',
        date: '2026-10-05',
        time: '20:30',
        guests: 6,
        specialRequest: 'Authentic Amritsari Kulcha with extra butter',
      }),
    });
    assert(resPost.status === 201, 'POST /api/reservations creates reservation with 201 Created');
    const resPostData = await resPost.json();
    assert(resPostData.data.status === 'pending', 'Reservation status defaults to pending');
    assert('storage' in resPostData, 'Reservation response explicitly reports storage mechanism');

    // Contact submission
    const contactPost = await fetch(`${baseUrl}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Manpreet Sandhu',
        email: 'manpreet.sandhu@example.com',
        phone: '+91 98765 99999',
        message: 'Inquiring about hosting an intimate gathering of 15 guests next Sunday.',
      }),
    });
    assert(contactPost.status === 201, 'POST /api/contact creates message with 201 Created');
    const contactPostData = await contactPost.json();
    assert(contactPostData.data.status === 'unread', 'Contact enquiry status defaults to unread');

    // Reservation status update (Admin)
    const updateRes = await fetch(`${baseUrl}/reservations/res-demo-1`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': 'dhaba_demo_admin_2026',
      },
      body: JSON.stringify({ status: 'confirmed' }),
    });
    assert(updateRes.status === 200, 'PUT /api/reservations/:id updates status (200 OK)');
    const updateResData = await updateRes.json();
    assert(updateResData.data.status === 'confirmed', 'Reservation status updated to confirmed');

    // Menu Item Creation (Admin)
    const newDishPost = await fetch(`${baseUrl}/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': 'dhaba_demo_admin_2026',
      },
      body: JSON.stringify({
        name: 'Pindi Chole Bhature',
        description: 'Puffy deep-fried leavened bread served with rich dark spiced chickpeas and pickled onions.',
        price: 249,
        category: 'Veg',
        image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46',
        vegetarian: true,
        spicy: true,
        available: true,
        featured: false,
      }),
    });
    assert(newDishPost.status === 201, 'POST /api/menu creates new dish with valid admin key');
    const createdDish = await newDishPost.json();
    const createdId = createdDish.data.id || createdDish.data._id;

    // Menu Item Update (Admin)
    const updateDish = await fetch(`${baseUrl}/menu/${createdId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': 'dhaba_demo_admin_2026',
      },
      body: JSON.stringify({ price: 279 }),
    });
    assert(updateDish.status === 200, 'PUT /api/menu/:id updates dish price');

    // Menu Item Delete (Admin)
    const deleteDish = await fetch(`${baseUrl}/menu/${createdId}`, {
      method: 'DELETE',
      headers: { 'x-admin-key': 'dhaba_demo_admin_2026' },
    });
    assert(deleteDish.status === 200, 'DELETE /api/menu/:id deletes dish successfully');

    // Admin Auth Protection Check
    const unauthStats = await fetch(`${baseUrl}/admin/stats`);
    assert(unauthStats.status === 401, 'GET /api/admin/stats blocks unauthenticated request (401)');

    const unauthRes = await fetch(`${baseUrl}/reservations`);
    assert(unauthRes.status === 401, 'GET /api/reservations blocks unauthenticated access (401)');

    const authStats = await fetch(`${baseUrl}/admin/stats`, {
      headers: { 'x-admin-key': 'dhaba_demo_admin_2026' },
    });
    assert(authStats.status === 200, 'GET /api/admin/stats succeeds with valid admin key');
    const statsData = await authStats.json();
    assert('totalMenuItems' in statsData.data && 'totalReservations' in statsData.data, 'Admin stats contain all required metrics');

  } catch (err: any) {
    console.error('Fetch error during live API check:', err.message);
    failed++;
  }

  console.log('\n----------------------------------------------------');
  console.log(`TOTAL: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('----------------------------------------------------');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
