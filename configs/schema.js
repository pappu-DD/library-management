// configs/schema.ts
import { serial, varchar, integer, text, pgTable, date } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: text("clerkId").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  imageUrl: text("imageUrl"),
});

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  category: text("category"),
  description: text("description"),
  cover: text("cover"),
  status: varchar("status", { length: 20 }).default("Available"),
  isbn: varchar("isbn", { length: 20 }),
  publishedYear: integer("published_year"),
});

export const borrowings = pgTable("borrowings", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id").references(() => books.id),
  userId: integer("user_id").references(() => users.id),
  studentId: varchar("student_id", { length: 50 }), // Add this line
  studentName: varchar("student_name", { length: 100 }), // Add this line
  borrowDate: date("borrow_date").notNull(),
  dueDate: date("due_date").notNull(),
  returnDate: date("return_date"),
  status: varchar("status", { length: 20 }).default("Borrowed"),
});