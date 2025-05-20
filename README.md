# Test-Blossom

Case Backend Dev - Blossom

## To run the API in local follow the next steps:

1. Install dependencies (npm install or pnpm install)
2. Run the server (npm run dev:watch or pnpm run dev:watch)
3. Server will be running on port 3000: http://localhost:3000
4. To test the API, you can use the following endpoints:
    * ### Pokemon
    * /api/pokemon/v1?metadata={"name":"bulbasaur"}&config={"baseUrl":"https://pokeapi.co/api/v2"}
    * ### Digimon
    * /api/digimon/v1?metadata={"id":100}&config={"baseUrl":"https://digi-api.com/api/v1"}
    * ### List saved characters
    * /api/list-characters


## Bonus (Optional)
- [✅] Unit tests
- [✅] Dockerfile or Docker Compose setup
- [✅] In-memory DB (e.g., SQLite or mocked)
- [❌] Rate limiting or retry logic for external APIs