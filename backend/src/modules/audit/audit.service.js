import { AuditLog } from './audit.model.js';

export const logAudit = async ({ actor, action, module, targetId, meta }) =>
  AuditLog.create({ actor, action, module, targetId, meta });
