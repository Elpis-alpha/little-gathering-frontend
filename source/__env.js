// Static Variables
export const creator = "Elpis"

export const siteName = "Little Gathering"

export const siteDescription = "A simple gathering titled Little Gathering which users publish posts and comments and interact with each other"

export const emailName = "Little Gathering"

export const hostEmail = "site.overseer.alpha@gmail.com"

// Dynamic Variables
export const host = process.env.NEXT_PUBLIC_HOST

export const backendLocation = process.env.NEXT_PUBLIC_BACK_END

export const isProduction = process.env.NEXT_PUBLIC_BACK_END === "true"
