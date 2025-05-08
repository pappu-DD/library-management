import{serial, varchar, integer, text, pgTable, timestamp} from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: text("clerkId").notNull().unique(), // Clerk User ID
  name: text("name").notNull(),
  email: text("email").notNull(),
  imageUrl: text("imageUrl"), // Optional: Profile Image URL
});


export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  category: text("category"),
  description: text("description"),
  cover: text("cover"), // URL to cover image
  status: varchar("status", { length: 20 }).default("Available"), // e.g., Available, Issued, etc.
  isbn: varchar("isbn", { length: 20 }),
  publishedYear: integer("published_year"),
});

export const borrowedBooks = pgTable("borrowed_books", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id").notNull().references(() => books.id),
  userId: text("user_id").notNull().references(() => users.clerkId),
  borrowDate: timestamp("borrow_date").notNull().defaultNow(),
  dueDate: timestamp("due_date").notNull(),
  returnDate: timestamp("return_date"),
  status: varchar("status", { length: 20 }).default("Borrowed"),
});