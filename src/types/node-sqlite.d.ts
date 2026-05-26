declare module "node:sqlite" {
  export class StatementSync {
    run(...params: any[]): { changes: number; lastInsertRowid: number | bigint };
    get<T = Record<string, unknown>>(...params: any[]): T | undefined;
    all<T = Record<string, unknown>>(...params: any[]): T[];
  }

  export class DatabaseSync {
    constructor(path: string);
    exec(sql: string): void;
    prepare(sql: string): StatementSync;
    close(): void;
  }
}
