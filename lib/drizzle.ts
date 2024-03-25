import {
  pgTable,
  serial,
  text,
  timestamp,
  real,
  integer,
  varchar,
  boolean
} from 'drizzle-orm/pg-core'
import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'

export const IngredientTable = pgTable(
  'ingredient',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  }
)
export type Ingredient = InferSelectModel<typeof IngredientTable>
export type NewIngredient = InferInsertModel<typeof IngredientTable>


export const RecipeTable = pgTable(
  'recipe', 
  {
    id: serial('id').primaryKey(),
    createdBy: text('created_by'),
    name: text('name').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    servings: real('servings').default(1.0).notNull()
  }
)
export type Recipe = InferSelectModel<typeof RecipeTable>
export type NewRecipe = InferInsertModel<typeof RecipeTable>


export const RecipeIngredientTable = pgTable(
  'recipe_ingredient', 
  {
    id: serial('id').primaryKey(),
    ingredientId: integer('ingredient_id').references(() => IngredientTable.id),
    recipeId: integer('recipe_id').references(() => RecipeTable.id),
    quantity: real('quantity').default(1.0).notNull(),
    measurementUnit: varchar('measurement_unit').default('count').notNull(),
    basic: boolean('basic').notNull()
  }
)
export type RecipeIngredient = InferSelectModel<typeof RecipeIngredientTable>
export type NewRecipeIngredient = InferInsertModel<typeof RecipeIngredientTable>

export const MealWeekTable = pgTable(
  'meal_week',
  {
    id: serial('id').primaryKey(),
    year: integer('year').notNull(),
    weekNumber: integer('week_number').notNull(),
    ownerId: text('owner_id').notNull()
  }
)

export type MealWeek = InferSelectModel<typeof MealWeekTable>
export type NewMealWeek = InferInsertModel<typeof MealWeekTable>

export const WeekDayMealTable = pgTable(
  'week_day_meal',
  {
    id: serial('id').primaryKey(),
    mealWeekId: integer('meal_week_id').references(() => MealWeekTable.id),
    recipeId: integer('recipe_id').references(() => RecipeTable.id),
    dayOfWeek: integer('day_of_week').notNull()
  }
)

export type WeekDayMeal = InferSelectModel<typeof WeekDayMealTable>
export type NewWeekDayMeal = InferInsertModel<typeof WeekDayMealTable>

// Connect to Vercel Postgres
export const db = drizzle(sql)
