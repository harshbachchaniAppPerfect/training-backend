import { connectDB } from "./db/config.js";
import { app } from "./app.js";
import { createUserTable } from "./queries/user.query.js";
import { createTransactionTable } from "./queries/transaction.query.js";
import { createProductTable } from "./queries/product.query.js";

connectDB()
  .then(async () => {
    await createProductTable();
    await createUserTable();
    await createTransactionTable();
    app.listen(8000, () => {
      console.log("Server is running : http://localhost:8000");
    });
  })
  .catch((err) => {
    console.log("PostgreSQL connection Failed !!!", err);
  });
