Vi gick igenom mongoDB och fick en uppgift.

PDF om dagens föreläsning:
https://chasacademy.instructure.com/courses/289/pages/forelasningar-slash-slides-slash-kodexempel-3?module_item_id=10892

## En första MongoDB-databas

Steg 1.

1. Skapa ett konto på MongoDB.com
   Gå till mongodb.com och registrera ett gratis konto.
2. Skapa ett cluster
   Efter att du loggat in, klicka på "Create Cluster" och välj en gratis plan (Shared
   Cluster).
3. Skapa en databas
   När klustret är färdigt, klicka på "Collections".
   Klicka på "Add My Own Data" och ange namn för databasen och en collection
   (t.ex. testDatabase och products ).
4. Lägg till dokument
   Lägg till ditt första dokument direkt i webbläsaren genom att klicka på "Insert Document".

Steg 2: Använd Mongo Shell

- Gå till ditt kluster på MongoDB.com, klicka på "Connect", och välj "Shell".
- Installera MongoDB Shell enligt instruktionerna
- Kopiera kommandot för att ansluta till din databas från terminalen med din unika connection string. Exempel:
  mongo "mongodb+srv://<cluster-url>" --username <your-username>

Steg 3: Visa dina databaser / collections

- När du är ansluten, skriv: show dbs för att se dina databaser
- För att börja jobba med den skriv: use testDatabase
- Om databasen inte redan finns kommer den att skapas

Skapa collection
`db.createCollection("animals")`

Lägg till ett dokument  
`db.animals.insertOne({ _id: 1, type: "cat", name: "Misse" })`

Hitta alla dokument i en collection  
`db.animals.find()`

Hitta dokument som matchar kriterie  
`db.animals.find({ type: "cat" })`

Uppdatera ett dokument  
`db.animals.updateOne({"_id": 1}, {$set: {type: "dog", name: "Misse" }})`

Ta bort ett dokument  
`db.animals.deleteOne({"_id": 1})`

# Övning

Skapa er första databas via MongoDB.com
Skapa en collection som heter books och lägg in ett dokument med följande fält:

- Title
- Author
- Year (år då boken publicerades)
- Genre (bokkategori som t.ex. Science Fiction, Drama, etc.)
- Pages (antal sidor)
- ISBN (bokens unika identifieringsnummer)

Använd MongoDB Compass eller MongoDB Atlas för att granska och verifiera att
dokumentet sparats korrekt.
Testa att göra en enkel sökning (query) för att hämta boken med hjälp av t.ex. titeln.

## Att jobba med till på tisdag

Bli en mästare på MongoDB genom att göra så många av nedanstående övningar som möjligt:

- http://nicholasjohnson.com/mongo/course/workbook/
- https://www.mongodb.com/developer/products/mongodb/cheat-sheet/
