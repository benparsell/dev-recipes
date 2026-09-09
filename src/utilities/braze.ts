export type BrazeRecipeAnnouncement = {
  id: number | string
  slug: string
  title: string
}

export type BrazeDispatchResult = {
  dispatchId: string
  success: boolean
}

/**
 * Stand-in for a Braze REST API client. A real integration would POST to
 * Braze's campaign/canvas trigger endpoint (using an API key from env) to
 * fan the message out to subscribed devices. This just logs what would have
 * been sent so the hook can be exercised without real credentials.
 */
export const notifyBrazeOfNewRecipe = async ({
  id,
  slug,
  title,
}: BrazeRecipeAnnouncement): Promise<BrazeDispatchResult> => {
  const dispatchId = `simulated-${id}-${Date.now()}`

  console.log(
    `[braze:simulated] would trigger "new-recipe-announcement" campaign — push: "New recipe: ${title}" (recipeId: ${id}, slug: ${slug}, dispatchId: ${dispatchId})`,
  )

  // Simulate network latency of a real API call
  await new Promise((resolve) => setTimeout(resolve, 50))

  return { dispatchId, success: true }
}
