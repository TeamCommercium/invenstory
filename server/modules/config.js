export const db = { url:      process.env.DB_URL || 'localhost',
                    name:     process.env.DB_NAME || 'invenstory_db',
                    username: process.env.DB_USER || null,
                    password: process.env.DB_PASSWORD || null
                  }
export const webServer = {
                    port: process.env.PORT || 8080
}
