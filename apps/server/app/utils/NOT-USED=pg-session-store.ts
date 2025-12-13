
import session = require('express-session');
import type { SessionData } from 'express-session';
import { Pool } from 'pg';

interface PgStoreOptions {
  pool: Pool;
  tableName?: string;
}

export class PgSessionStore extends session.Store {
  private pool: Pool;
  private table: string;

  constructor(options: PgStoreOptions) {
    super();
    this.pool = options.pool;
    this.table = options.tableName || 'session';
  }

  /**
   * Get session by ID
   */
  get(
    sid: string,
    callback: (err?: any, session?: SessionData | null) => void
  ): void {
    this.pool
      .query(
        `SELECT sess FROM ${this.table} WHERE sid = $1 AND expire > NOW()`,
        [sid]
      )
      .then((result) => {
        if (!result.rows.length) return callback(null, null);
        callback(null, result.rows[0].sess);
      })
      .catch((err) => callback(err));
  }

  /**
   * Save session
   */
  set(
    sid: string,
    sess: SessionData,
    callback?: (err?: any) => void
  ): void {
    const expire = sess.cookie?.expires
      ? new Date(sess.cookie.expires)
      : new Date(Date.now() + 86400000);

    this.pool
      .query(
        `
        INSERT INTO ${this.table} (sid, sess, expire)
        VALUES ($1, $2, $3)
        ON CONFLICT (sid)
        DO UPDATE SET sess = $2, expire = $3
        `,
        [sid, sess, expire]
      )
      .then(() => callback?.())
      .catch((err) => callback?.(err));
  }

  /**
   * Destroy session
   */
  destroy(sid: string, callback?: (err?: any) => void): void {
    this.pool
      .query(`DELETE FROM ${this.table} WHERE sid = $1`, [sid])
      .then(() => callback?.())
      .catch((err) => callback?.(err));
  }

  /**
   * Touch session (update expiration only)
   */
  override touch(
    sid: string,
    sess: SessionData,
    callback?: () => void
  ): void {
    const expire = sess.cookie?.expires
      ? new Date(sess.cookie.expires)
      : new Date(Date.now() + 86400000);

    this.pool
      .query(
        `UPDATE ${this.table} SET expire = $2 WHERE sid = $1`,
        [sid, expire]
      )
      .then(() => callback?.())
      .catch(() => callback?.());
  }
}
