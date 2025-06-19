export const registerOrgSchema = {
  schema: {
    description: 'Register a new organization',
    tags: ['Orgs'],
    summary: 'Register a new organization',
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
        password: {
          type: 'string',
          format: 'password',
          description: 'Organization password',
          minLength: 6,
        },
        whatsapp: { type: 'string', description: 'WhatsApp contact number' },
        address: { type: 'string', description: 'Organization address' },
        city: { type: 'string', description: 'City' },
        state: { type: 'string', description: 'State' },
        cep: { type: 'string', description: 'Postal code' },
      },
      required: [
        'name',
        'email',
        'description',
        'password',
        'whatsapp',
        'address',
        'city',
        'state',
        'cep',
      ],
    },
    response: {
      201: {
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
            },
            required: [
              'id',
              'name',
              'email',
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

export const loginOrgSchema = {
  schema: {
    description: 'Login an organization',
    tags: ['Orgs'],
    summary: 'Login an organization',
    body: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          description: 'Organization email',
        },
        password: {
          type: 'string',
          format: 'password',
          description: 'Organization password',
          examples: ['123456'],
        },
      },
      required: ['email', 'password'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          accessToken: { type: 'string' },
        },
      },
    },
  },
}

export const refreshSchema = {
  schema: {
    description: 'Refresh token',
    tags: ['Orgs'],
    summary: 'Refresh token',
    response: {
      200: {
        type: 'object',
        properties: {
          accessToken: { type: 'string' },
        },
      },
    },
  },
}

export const logoutSchema = {
  schema: {
    description: 'Logout an organization',
    tags: ['Orgs'],
    summary: 'Logout an organization',
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
}
