import mongoose, { Document, Schema } from 'mongoose';

export interface IMenuItem extends Document {
  name: string;
  description: string;
  price: number;
  category: 'Veg' | 'Non-Veg' | 'Tandoor' | 'Breads' | 'Rice' | 'Desserts' | 'Drinks';
  image: string;
  vegetarian: boolean;
  spicy: boolean;
  available: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ['Veg', 'Non-Veg', 'Tandoor', 'Breads', 'Rice', 'Desserts', 'Drinks'],
    },
    image: { type: String, required: true },
    vegetarian: { type: Boolean, default: false },
    spicy: { type: Boolean, default: false },
    available: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: Record<string, any>) => {
        ret.id = ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const MenuItem = mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);
