// WHY: Load .env values before configuring the server.
import 'dotenv/config'
import cors from 'cors'
import express from 'express'

const app = express()
const port = process.env.PORT || 5000

// WHY: Allow frontend requests and parse JSON request bodies.
app.use(cors())
app.use(express.json())

// WHY: Provide a simple endpoint to verify the backend is running.
app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

// WHY: Use the configured port so local and hosted runs can choose their own port.
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
