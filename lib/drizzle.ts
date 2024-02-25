import {
  pgTable,
  serial,
  text,
  timestamp,
  real,
  integer
} from 'drizzle-orm/pg-core'
import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'

export const UsersTable = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
  }
)
export type User = InferSelectModel<typeof UsersTable>


export const IngredientTable = pgTable(
  'ingredient',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
  }
)
export type Ingredient = InferSelectModel<typeof IngredientTable>
export type NewIngredient = InferInsertModel<typeof IngredientTable>


export const RecipeTable = pgTable(
  'recipe', 
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => UsersTable.id),
    name: text('name').notNull().unique(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    servings: integer('servings').default(1).notNull()
  }
)
export type Recipe = InferSelectModel<typeof RecipeTable>
export type NewRecipe = InferInsertModel<typeof RecipeTable>


export const AppliedIngredientTable = pgTable(
  'applied_ingredient', 
  {
    id: serial('id').primaryKey(),
    ingredientId: integer('ingredient_id').references(() => IngredientTable.id),
    recipeId: integer('recipe_id').references(() => RecipeTable.id),
    quantity: real('quantity')
  }
)
export type AppliedIngredient = InferSelectModel<typeof AppliedIngredientTable>
export type NewAppliedIngredient = InferInsertModel<typeof AppliedIngredientTable>




// Connect to Vercel Postgres
export const db = drizzle(sql)
