import { Request, Response, NextFunction } from 'express';
import { MenuItem } from '../models/MenuItem.js';
import { getDbStatus } from '../config/db.js';
import { ENV } from '../config/env.js';
import { INITIAL_MENU_ITEMS } from '../utils/initialData.js';
import { menuItemSchema } from '../utils/validation.js';

// In-memory fallback store when DB is disconnected
let inMemoryMenuItems = INITIAL_MENU_ITEMS.map((item, idx) => ({
  ...item,
  id: `mock-menu-${idx + 1}`,
  _id: `mock-menu-${idx + 1}`,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

export const getMenuItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, search, available } = req.query;

    if (getDbStatus()) {
      const query: Record<string, any> = {};

      if (category && category !== 'All') {
        query.category = category;
      }

      if (available !== undefined) {
        query.available = available === 'true';
      }

      if (search && typeof search === 'string') {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }

      const items = await MenuItem.find(query).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        persisted: true,
        storage: 'mongodb',
        count: items.length,
        data: items,
      });
    }

    // Fallback store in development demo mode
    let filtered = [...inMemoryMenuItems];
    if (category && category !== 'All') {
      filtered = filtered.filter(i => i.category.toLowerCase() === (category as string).toLowerCase());
    }
    if (available !== undefined) {
      const isAvail = available === 'true';
      filtered = filtered.filter(i => i.available === isAvail);
    }
    if (search && typeof search === 'string') {
      const s = search.toLowerCase();
      filtered = filtered.filter(i => i.name.toLowerCase().includes(s) || i.description.toLowerCase().includes(s));
    }

    return res.status(200).json({
      success: true,
      persisted: false,
      storage: 'in-memory-fallback',
      warning: 'MongoDB is offline. Serving from temporary in-memory demo cache.',
      count: filtered.length,
      data: filtered,
    });
  } catch (err) {
    next(err);
  }
};

export const createMenuItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = menuItemSchema.parse(req.body);

    if (getDbStatus()) {
      const newItem = await MenuItem.create(validatedData);
      return res.status(201).json({
        success: true,
        persisted: true,
        storage: 'mongodb',
        data: newItem,
        message: 'Menu item created successfully (Stored in MongoDB)',
      });
    }

    if (ENV.NODE_ENV === 'production') {
      return res.status(503).json({
        success: false,
        persisted: false,
        error: 'Database unavailable',
        message: 'MongoDB connection is unavailable. In-memory fallback is disabled in production mode.',
      });
    }

    const mockItem = {
      ...validatedData,
      id: `mock-menu-${Date.now()}`,
      _id: `mock-menu-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    inMemoryMenuItems.unshift(mockItem as any);

    return res.status(201).json({
      success: true,
      persisted: false,
      storage: 'in-memory-fallback',
      warning: 'MongoDB is offline. Created in temporary in-memory demo store only.',
      data: mockItem,
      message: 'Menu item created successfully (in-memory demo)',
    });
  } catch (err) {
    next(err);
  }
};

export const updateMenuItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (getDbStatus()) {
      const updated = await MenuItem.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Menu item not found' });
      }
      return res.status(200).json({
        success: true,
        persisted: true,
        storage: 'mongodb',
        data: updated,
        message: 'Menu item updated successfully in MongoDB',
      });
    }

    if (ENV.NODE_ENV === 'production') {
      return res.status(503).json({
        success: false,
        persisted: false,
        error: 'Database unavailable',
        message: 'MongoDB connection is unavailable in production mode.',
      });
    }

    const idx = inMemoryMenuItems.findIndex(i => i.id === id || (i as any)._id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    inMemoryMenuItems[idx] = {
      ...inMemoryMenuItems[idx],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    return res.status(200).json({
      success: true,
      persisted: false,
      storage: 'in-memory-fallback',
      warning: 'MongoDB is offline. Updated in temporary in-memory demo store only.',
      data: inMemoryMenuItems[idx],
      message: 'Menu item updated successfully (in-memory demo)',
    });
  } catch (err) {
    next(err);
  }
};

export const deleteMenuItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (getDbStatus()) {
      const deleted = await MenuItem.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Menu item not found' });
      }
      return res.status(200).json({
        success: true,
        persisted: true,
        storage: 'mongodb',
        message: 'Menu item deleted successfully from MongoDB',
      });
    }

    if (ENV.NODE_ENV === 'production') {
      return res.status(503).json({
        success: false,
        persisted: false,
        error: 'Database unavailable',
        message: 'MongoDB connection is unavailable in production mode.',
      });
    }

    const idx = inMemoryMenuItems.findIndex(i => i.id === id || (i as any)._id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    inMemoryMenuItems.splice(idx, 1);
    return res.status(200).json({
      success: true,
      persisted: false,
      storage: 'in-memory-fallback',
      warning: 'MongoDB is offline. Deleted from temporary in-memory demo store only.',
      message: 'Menu item deleted successfully (in-memory demo)',
    });
  } catch (err) {
    next(err);
  }
};
