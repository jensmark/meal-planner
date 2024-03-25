import { db, IngredientTable, RecipeTable, RecipeIngredientTable } from '@/lib/drizzle'
import { eq, inArray } from 'drizzle-orm'
import { User } from "@supabase/auth-helpers-nextjs"


export const listRecipes = async () => {
    return await db.select().from(RecipeTable)
}

export const createRecipe = async (
    name: string,
    servings: number,
    ingredients: {
        name: string;
        quantity: number;
        unit: string;
    }[],
    user: User,
) => {
    await db.transaction(async tx => {
        const persistedIngredients = await tx.select().from(IngredientTable).where(inArray(IngredientTable.name, ingredients.map(x => x.name)))
        const ingredientsToSave = ingredients.filter(x => !Boolean(persistedIngredients.find(y => y.name == x.name)))

        await tx.insert(IngredientTable).values(ingredientsToSave.map(x => ({ name: x.name })))
    })

    return await db.transaction(async tx => {
        const allIngredients = await tx.select().from(IngredientTable).where(inArray(IngredientTable.name, ingredients.map(x => x.name)))

        const newItem = await tx.insert(RecipeTable)
            .values({
                createdBy: user?.id,
                name: name,
                servings: servings
            })
            .returning()

        await tx.insert(RecipeIngredientTable)
            .values(
                allIngredients.map(x => ({
                    recipeId: newItem[0].id,
                    ingredientId: x.id,
                    quantity: ingredients.find(y => y.name == x.name)?.quantity,
                    measurementUnit: ingredients.find(y => y.name == x.name)?.unit
                }))
            )

        return newItem
    })
}

export const listFullRecipes = async () => {
    const recipes = await db.select()
        .from(RecipeTable)

    const ingredients = await db.select()
        .from(RecipeTable)
        .leftJoin(RecipeIngredientTable, eq(RecipeTable.id, RecipeIngredientTable.recipeId))
        .leftJoin(IngredientTable, eq(IngredientTable.id, RecipeIngredientTable.ingredientId))

    return recipes.map(recipe => ({
        ...recipe,
        ingredients: ingredients.filter(x => x.recipe.id === recipe.id).map(({ recipe_ingredient, ingredient }) => ({
            ...recipe_ingredient,
            ...ingredient
        }))
    }))
}