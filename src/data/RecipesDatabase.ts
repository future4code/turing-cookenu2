import { BaseDatabase } from "./BaseDatabase";

export class RecipesDatabase extends BaseDatabase {
    private static TABLE_NAME = "recipes"

    public async createRecipesDatabase(
        id: string,
        title: string,
        description: string,
        createdAt: string,
        creatorId: string
    ): Promise<void> {
        await this.getConnection()
        .insert({
            id,
            title,
            description,
            createdAt,
            creatorId
        })
        .into(RecipesDatabase.TABLE_NAME)
    }
}