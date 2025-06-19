export const getAllOrgsSchema = {
  schema: {
    description: 'List all organizations',
    tags: ['Orgs'],
    summary: 'Get all organizations',
    response: {
      200: {
        type: 'object',
        properties: {
          orgsList: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  format: 'uuid',
                  description: 'Organization ID',
                },
                name: { type: 'string', description: 'Organization name' },
                description: {
                  type: 'string',
                  description: 'Organization description',
                },
                whatsapp: {
                  type: 'string',
                  description: 'WhatsApp contact number',
                },
                address: {
                  type: 'string',
                  description: 'Organization address',
                },
                city: { type: 'string', description: 'City' },
                state: { type: 'string', description: 'State' },
                cep: { type: 'string', description: 'Postal code' },
                created_at: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Creation timestamp',
                },
              },
              required: [
                'id',
                'name',
                'description',
                'whatsapp',
                'address',
                'city',
                'state',
                'cep',
                'created_at',
              ],
            },
          },
        },
        required: ['orgsList'],
      },
    },
  },
}

export const getOrgSchema = {
  schema: {
    description: 'Get an organization',
    tags: ['Orgs'],
    summary: 'Get an organization',
    params: {
      type: 'object',
      properties: {
        orgId: {
          type: 'string',
          description: 'Organization ID',
          format: 'uuid',
        },
      },
      required: ['orgId'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          org: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                format: 'uuid',
                description: 'Organization ID',
              },
              name: { type: 'string', description: 'Organization name' },
              description: {
                type: 'string',
                description: 'Organization description',
              },
              whatsapp: {
                type: 'string',
                description: 'WhatsApp contact number',
              },
              address: { type: 'string', description: 'Organization address' },
              city: { type: 'string', description: 'City' },
              state: { type: 'string', description: 'State' },
              cep: { type: 'string', description: 'Postal code' },
              created_at: {
                type: 'string',
                format: 'date-time',
                description: 'Creation timestamp',
              },
            },
            required: [
              'id',
              'name',
              'description',
              'whatsapp',
              'address',
              'city',
              'state',
              'cep',
              'created_at',
            ],
          },
        },
        required: ['org'],
      },
    },
  },
}

export const getOrgProfileDetailsSchema = {
  schema: {
    description: 'Get an organization profile details',
    tags: ['Orgs'],
    summary: 'Get organization profile details',
    response: {
      200: {
        type: 'object',
        properties: {
          org: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                format: 'uuid',
                description: 'Organization ID',
              },
              name: { type: 'string', description: 'Organization name' },
              description: {
                type: 'string',
                description: 'Organization description',
              },
              email: {
                type: 'string',
                format: 'email',
                description: 'Organization email',
              },
              whatsapp: {
                type: 'string',
                description: 'WhatsApp contact number',
              },
              address: { type: 'string', description: 'Organization address' },
              city: { type: 'string', description: 'City' },
              state: { type: 'string', description: 'State' },
              cep: { type: 'string', description: 'Postal code' },
              created_at: {
                type: 'string',
                format: 'date-time',
                description: 'Creation timestamp',
              },
            },
          },
        },
        required: ['org'],
      },
    },
  },
}

export const editOrgSchema = {
  schema: {
    description: 'Edit an organization profile',
    tags: ['Orgs'],
    summary: 'Edit an organization profile',
    params: {
      type: 'object',
      properties: {
        orgId: {
          type: 'string',
          description: 'Organization ID',
          format: 'uuid',
        },
      },
      required: ['orgId'],
    },
    body: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Organization name' },
        email: {
          type: 'string',
          format: 'email',
          description: 'Organization email',
        },
        description: {
          type: 'string',
          description: 'Organization description',
        },
        whatsapp: { type: 'string', description: 'WhatsApp contact number' },
        address: { type: 'string', description: 'Organization address' },
        city: { type: 'string', description: 'City' },
        state: { type: 'string', description: 'State' },
        cep: { type: 'string', description: 'Postal code' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          org: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                format: 'uuid',
                description: 'Organization ID',
              },
              name: { type: 'string', description: 'Organization name' },
              email: {
                type: 'string',
                format: 'email',
                description: 'Organization email',
              },
              description: {
                type: 'string',
                description: 'Organization description',
              },
              whatsapp: {
                type: 'string',
                description: 'WhatsApp contact number',
              },
              address: { type: 'string', description: 'Organization address' },
              city: { type: 'string', description: 'City' },
              state: { type: 'string', description: 'State' },
              cep: { type: 'string', description: 'Postal code' },
              created_at: {
                type: 'string',
                format: 'date-time',
                description: 'Creation timestamp',
              },
              password_hash: { type: 'string', description: 'Hashed password' }, // Adiciona password_hash
            },
          },
        },
        required: ['org'],
      },
    },
  },
}
