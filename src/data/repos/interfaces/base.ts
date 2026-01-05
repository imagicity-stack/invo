export interface BaseRepo<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | undefined>;
  upsert(entity: T): Promise<void>;
  upsertMany(entities: T[]): Promise<void>;
  delete(id: string): Promise<void>;
  clear(): Promise<void>;
}
