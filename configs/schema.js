import{serial, text, pgTable} from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: text("clerkId").notNull().unique(), // Clerk User ID
  name: text("name").notNull(),
  email: text("email").notNull(),
  imageUrl: text("imageUrl"), // Optional: Profile Image URL
});
