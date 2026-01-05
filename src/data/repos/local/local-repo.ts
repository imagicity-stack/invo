import { getDB } from "./db";
import { BaseRepo } from "@/data/repos/interfaces/base";

export class LocalRepo<T extends Record<string, unknown>> implements BaseRepo<T> {
  constructor(private storeName: string, private keyField: keyof T & string = "id") {}

  async getAll(): Promise<T[]> {
    const db = await getDB();
    return (await db.getAll(this.storeName)) as T[];
  }

  async getById(id: string): Promise<T | undefined> {
    const db = await getDB();
    return (await db.get(this.storeName, id)) as T | undefined;
  }

  async upsert(entity: T): Promise<void> {
    const db = await getDB();
    const record = { ...entity } as T & Record<string, unknown>;
    if (!record[this.keyField]) {
      (record as Record<string, unknown>)[this.keyField] = crypto.randomUUID();
    }
    await db.put(this.storeName, record);
  }

  async upsertMany(entities: T[]): Promise<void> {
    const db = await getDB();
    const tx = db.transaction(this.storeName, "readwrite");
    for (const item of entities) {
      const record = { ...item } as T & Record<string, unknown>;
      if (!record[this.keyField]) {
        (record as Record<string, unknown>)[this.keyField] = crypto.randomUUID();
      }
      tx.store.put(record);
    }
    await tx.done;
  }

  async delete(id: string): Promise<void> {
    const db = await getDB();
    await db.delete(this.storeName, id);
  }

  async clear(): Promise<void> {
    const db = await getDB();
    await db.clear(this.storeName);
  }
}
