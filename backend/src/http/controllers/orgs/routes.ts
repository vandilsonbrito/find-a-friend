import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../../http/middlewares/verify-jwt'
import { orgProfile } from './profile'
import { editOrg } from './edit'
import { allOrgs } from './get-all'
import { getOrg } from './get-org'
import { orgStats } from './stats'
import {
  editOrgSchema,
  getAllOrgsSchema,
  getOrgProfileDetailsSchema,
  getOrgSchema,
  getOrgStatsSchema,
} from '@/docs/swagger/org-controllers'

export async function orgsRoutes(app: FastifyInstance) {
  app.get('/orgs', { schema: getAllOrgsSchema.schema }, allOrgs)
  app.get('/orgs/:orgId', { schema: getOrgSchema.schema }, getOrg)

  /* Authenticated */
  app.get(
    '/me',
    { schema: getOrgProfileDetailsSchema.schema, onRequest: [verifyJWT] },
    orgProfile,
  )
  app.get(
    '/me/stats',
    { schema: getOrgStatsSchema.schema, onRequest: [verifyJWT] },
    orgStats,
  )
  app.patch(
    '/orgs/:orgId/profile',
    { schema: editOrgSchema.schema, onRequest: [verifyJWT] },
    editOrg,
  )
}
