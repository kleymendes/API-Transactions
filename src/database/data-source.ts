import { DataSource } from "typeorm";
import { TransactionEntity } from "./entity/transactions.entity";
import { UserEntity } from "./entity/user.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: "postgres://atividadedb_user:2pyVtTPKvhKEJaKxTYNsFsKdxNFswmyT@dpg-cgee6kl269v8dj6f77d0-a.oregon-postgres.render.com/atividadedb",
    synchronize: true,
    logging: true,
    entities: [UserEntity, TransactionEntity],
    subscribers: [],
    ssl: {
        rejectUnauthorized: false,
    }
})

