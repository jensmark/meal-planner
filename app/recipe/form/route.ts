
import { NextResponse, NextRequest } from 'next/server'
import { getRouteSession } from '@/lib/session'
import { createRecipe } from '@/lib/data/recipe'


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

  if(name === "" || name === null) {
    return NextResponse.redirect(`${requestUrl.origin}/recipe/new`, {
      status: 302,
    })
  }

  if (ingredients.find(x => x.name === "" || x.name === null) !== undefined) {
    return NextResponse.redirect(`${requestUrl.origin}/recipe/new`, {
      status: 302,
    })
  }

  await createRecipe(name, servings, ingredients, session?.user)

  return NextResponse.redirect(`${requestUrl.origin}/recipe`, {
    status: 302,
  })
}
