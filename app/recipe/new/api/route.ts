
import { NextResponse, NextRequest } from 'next/server'
import { getRouteSession } from '@/lib/session'
import { db, IngredientTable, RecipeIngredientTable, RecipeTable } from '@/lib/drizzle'
import { inArray } from 'drizzle-orm'


export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const session = await getRouteSession()
  if (!session) {
    return NextResponse.redirect(`${requestUrl.origin}/login`, {
      status: 302,
    })
  }

  const formData = await request.formData()
  const name = String(formData.get('name'))
  const servings = Number(formData.get('servings'))

  const ingredients = new Array(Number(formData.get('ingredient.count'))).fill(0).map((_, i) => ({
    name: String(formData.get(`ingredient[${i}].name`)),
    quantity: Number(formData.get(`ingredient[${i}].quantity`)),
    unit: String(formData.get(`ingredient[${i}].unit`))
  }))

  if (ingredients.length == 0) {
    return NextResponse.redirect(`${requestUrl.origin}/recipe/new`, {
      status: 302,
    })
  }

  await db.transaction(async tx => {
    const persistedIngredients = await tx.select().from(IngredientTable).where(inArray(IngredientTable.name, ingredients.map(x => x.name)))
    const ingredientsToSave = ingredients.filter(x => !Boolean(persistedIngredients.find(y => y.name == x.name)))

    await tx.insert(IngredientTable).values(ingredientsToSave.map(x => ({ name: x.name })))
  })

  await db.transaction(async tx => {
    const allIngredients = await tx.select().from(IngredientTable).where(inArray(IngredientTable.name, ingredients.map(x => x.name)))

    const newId = await tx.insert(RecipeTable)
      .values({
        createdBy: session?.user?.id,
        name: name,
        servings: servings
      })
      .returning({ id: RecipeTable.id })

    await tx.insert(RecipeIngredientTable)
      .values(
        allIngredients.map(x => ({
          recipeId: newId[0].id,
          ingredientId: x.id,
          quantity: ingredients.find(y => y.name == x.name)?.quantity,
          measurementUnit: ingredients.find(y => y.name == x.name)?.unit
        }))
      )
  })


  return NextResponse.redirect(`${requestUrl.origin}/recipe`, {
    status: 302,
  })
}
