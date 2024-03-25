
import { NextResponse, NextRequest } from 'next/server'
import { getRouteSession } from '@/lib/session'
import { deleteRecipe, listFullRecipes } from '@/lib/data/recipe'
import { DateTime } from 'luxon'


export async function DELETE(request: NextRequest) {
    const session = await getRouteSession()
    if (!session) {
        return NextResponse.json({ error: "no valid session" }, { status: 500 })
    }

    const recipeId = parseInt(request.nextUrl.searchParams.get("recipeId")!!)

    await deleteRecipe(recipeId)

    return NextResponse.json({ error: null }, { status: 200 })
}

export async function GET() {
    const session = await getRouteSession()
    if (!session) {
        return NextResponse.json({ error: "no valid session" }, { status: 500 })
    }

    const allRecipe = await listFullRecipes()
    return NextResponse.json(allRecipe.map(x => ({
        id: x.id,
        name: x.name,
        createdAt: DateTime.fromJSDate(x.createdAt).toLocaleString(),
        ingredients: x.ingredients.map(y => ({
          name: y.name!!,
          quantity: y.quantity!!,
          measurementUnit: y.measurementUnit!!
        })),
        editable: session?.user?.id === x.createdBy
      })))
}