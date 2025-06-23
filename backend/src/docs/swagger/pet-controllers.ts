const basicPetSchema = {
  id: {
    type: 'string',
    format: 'uuid',
    description: 'Pet ID',
  },
  name: {
    type: 'string',
    description: 'Pet name',
  },
  description: {
    type: 'string',
    description: 'Pet description',
  },
  age: {
    type: 'string',
    enum: ['puppy', 'adult', 'senior'],
    description: 'Pet age group',
  },
  size: {
    type: 'string',
    enum: ['small', 'medium', 'large'],
    description: 'Pet size',
  },
  energy_level: {
    type: 'string',
    enum: ['low', 'medium', 'high'],
    description: 'Pet energy level',
  },
  independence_level: {
    type: 'string',
    enum: ['low', 'medium', 'high'],
    description: 'Pet independence level',
  },
  environment: {
    type: 'string',
    enum: ['small', 'medium', 'large'],
    description: 'Required environment size',
  },
  sex: {
    type: 'string',
    enum: ['male', 'female'],
    description: 'Pet sex',
  },
  type: {
    type: 'string',
    enum: ['dog', 'cat'],
    description: 'Pet type',
  },
  breed: {
    type: 'string',
    description: 'Pet breed',
  },
  city: {
    type: 'string',
    description: 'City where pet is located',
  },
  state: {
    type: 'string',
    description: 'State where pet is located',
  },
  is_adopted: {
    type: 'boolean',
    description: 'Is the pet adopted?',
  },
}

export const createPetSchema = {
  schema: {
    description:
      'Create Pet with file upload. Body params (multipart/form-data): "name", "description", "age", "size", "energy_level", "independence_level", "environment", "sex", "type", "breed", "city", "state", "org_id", "photos"',
    tags: ['Pets'],
    summary: 'Create a new pet for adoption',
    consumes: ['multipart/form-data'],
    requestBody: {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              ...basicPetSchema,
              org_id: {
                type: 'string',
                format: 'uuid',
                description: 'Organization ID',
              },
              photos: {
                type: 'array',
                items: {
                  type: 'string',
                  format: 'binary',
                },
                description: 'Pet photos',
                minItems: 1,
              },
            },
            required: [
              'name',
              'description',
              'age',
              'size',
              'energy_level',
              'independence_level',
              'environment',
              'sex',
              'type',
              'breed',
              'city',
              'state',
              'org_id',
              'photos',
            ],
          },
        },
      },
    },
    response: {
      201: {
        description: 'Pet successfully created',
        type: 'object',
        properties: {
          pet: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' },
              age: { type: 'string', enum: ['puppy', 'adult', 'senior'] },
              size: { type: 'string', enum: ['small', 'medium', 'large'] },
              energy_level: { type: 'string', enum: ['low', 'medium', 'high'] },
              independence_level: {
                type: 'string',
                enum: ['low', 'medium', 'high'],
              },
              environment: {
                type: 'string',
                enum: ['small', 'medium', 'large'],
              },
              sex: { type: 'string', enum: ['male', 'female'] },
              type: { type: 'string', enum: ['dog', 'cat'] },
              breed: { type: 'string' },
              city: { type: 'string' },
              state: { type: 'string' },
              photos: {
                type: 'array',
                items: {
                  type: 'string',
                  format: 'binary',
                },
                description: 'Pet photos (multiple files supported)',
                minItems: 1,
              },
              is_adopted: { type: 'boolean' },
              org_id: { type: 'string' },
              created_at: { type: 'string', format: 'date-time' },
            },
            additionalProperties: false,
          },
        },
      },
    },
  },
  attachValidation: true,
}

export const getAvailablePetsForAdoptionSchema = {
  schema: {
    description:
      'List available pets for adoption - all params are optional. Example: "/pets?city=sao-paulo&age=puppy&size=medium&energy_level=high&independence_level=low&environment=medium&sex=male&type=dog"',
    tags: ['Pets'],
    summary: 'List available pets for adoption',
    querystring: {
      type: 'object',
      properties: {
        city: { type: 'string', description: 'City where pets are located' },
        age: {
          type: 'string',
          enum: ['puppy', 'adult', 'senior'],
          description: 'Pet age group',
        },
        size: {
          type: 'string',
          enum: ['small', 'medium', 'large'],
          description: 'Pet size',
        },
        energy_level: {
          type: 'string',
          enum: ['low', 'medium', 'high'],
          description: 'Pet energy level',
        },
        independence_level: {
          type: 'string',
          enum: ['low', 'medium', 'high'],
          description: 'Pet independence level',
        },
        environment: {
          type: 'string',
          enum: ['small', 'medium', 'large'],
          description: 'Required environment size',
        },
        sex: {
          type: 'string',
          enum: ['male', 'female'],
          description: 'Pet sex',
        },
        type: {
          type: 'string',
          enum: ['dog', 'cat'],
          description: 'Pet type',
        },
        page: {
          type: 'number',
          default: 1,
          description: 'Page number for pagination',
        },
      },
      additionalProperties: false,
    },
    response: {
      200: {
        type: 'object',
        properties: {
          current_page: { type: 'number', description: 'Current page number' },
          pets: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid', description: 'Pet ID' },
                name: { type: 'string', description: 'Pet name' },
                description: { type: 'string', description: 'Pet description' },
                age: {
                  type: 'string',
                  enum: ['puppy', 'adult', 'senior'],
                  description: 'Pet age group',
                },
                size: {
                  type: 'string',
                  enum: ['small', 'medium', 'large'],
                  description: 'Pet size',
                },
                energy_level: {
                  type: 'string',
                  enum: ['low', 'medium', 'high'],
                  description: 'Pet energy level',
                },
                independence_level: {
                  type: 'string',
                  enum: ['low', 'medium', 'high'],
                  description: 'Pet independence level',
                },
                environment: {
                  type: 'string',
                  enum: ['small', 'medium', 'large'],
                  description: 'Required environment size',
                },
                sex: {
                  type: 'string',
                  enum: ['male', 'female'],
                  description: 'Pet sex',
                },
                type: {
                  type: 'string',
                  enum: ['dog', 'cat'],
                  description: 'Pet type',
                },
                breed: { type: 'string', description: 'Pet breed' },
                city: {
                  type: 'string',
                  description: 'City where pet is located',
                },
                state: {
                  type: 'string',
                  description: 'State where pet is located',
                },
                is_adopted: {
                  type: 'boolean',
                  description: 'Is the pet adopted?',
                },
                org_id: {
                  type: 'string',
                  format: 'uuid',
                  description: 'Organization ID',
                },
                created_at: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Creation timestamp',
                },
                photos: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Pet photos',
                },
              },
            },
          },
          total_pages: { type: 'number', description: 'Total number of pages' },
          total_pets: { type: 'number', description: 'Total number of pets' },
        },
        required: ['pets', 'total_pets', 'current_page', 'total_pages'],
      },
      400: {
        type: 'object',
        properties: {
          message: { type: 'string', description: 'Error message' },
          issues: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                path: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Field path',
                },
                message: {
                  type: 'string',
                  description: 'Validation error message',
                },
                code: { type: 'string', description: 'Error code' },
              },
            },
            description: 'Validation issues',
          },
        },
        required: ['message'],
      },
    },
    attachValidation: true,
  },
}

export const getOrgPetsSchema = {
  schema: {
    description: 'List pets from an organization',
    tags: ['Orgs'],
    summary: 'List pets from an organization',
    params: {
      type: 'object',
      properties: {
        orgId: {
          type: 'string',
          format: 'uuid',
          description: 'Organization ID',
        },
        page: { type: 'string' },
      },
      required: ['orgId'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          pets: {
            type: 'array',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' },
              age: { type: 'string', enum: ['puppy', 'adult', 'senior'] },
              size: { type: 'string', enum: ['small', 'medium', 'large'] },
              energy_level: { type: 'string', enum: ['low', 'medium', 'high'] },
              independence_level: {
                type: 'string',
                enum: ['low', 'medium', 'high'],
              },
              environment: {
                type: 'string',
                enum: ['small', 'medium', 'large'],
              },
              sex: { type: 'string', enum: ['male', 'female'] },
              type: { type: 'string', enum: ['dog', 'cat'] },
              breed: { type: 'string' },
              city: { type: 'string' },
              state: { type: 'string' },
              photos: { type: 'array', items: { type: 'string' } },
              is_adopted: { type: 'boolean' },
              org_id: { type: 'string' },
              created_at: { type: 'string', format: 'date-time' },
            },
            additionalProperties: false,
          },
          current_page: { type: 'number' },
          total_pages: { type: 'number' },
          total_pets: { type: 'number' },
        },
      },
    },
  },
}

export const deletePetSchema = {
  schema: {
    description: 'Delete a pet',
    tags: ['Pets'],
    summary: 'Delete a pet',
    params: {
      type: 'object',
      properties: {
        petId: {
          type: 'string',
          description: 'Pet ID',
          format: 'uuid',
        },
      },
      required: ['petId'],
    },
    response: {
      204: {
        description: 'Pet deleted successfully',
        type: 'null',
      },
    },
  },
}

export const editPetSchema = {
  schema: {
    description: 'Edit a pet',
    tags: ['Pets'],
    summary: 'Edit a pet',
    params: {
      type: 'object',
      properties: {
        petId: {
          type: 'string',
          description: 'Pet ID',
          format: 'uuid',
        },
      },
      required: ['petId'],
    },
    body: {
      type: 'object',
      properties: {
        ...basicPetSchema,
      },
    },
    response: {
      200: {
        description: 'Pet updated successfully',
        type: 'object',
        properties: {
          pet: {
            type: 'object',
            properties: {
              ...basicPetSchema,
              org_id: {
                type: 'string',
                description: 'Organization ID',
                format: 'uuid',
              },
              created_at: {
                type: 'string',
                description: 'Pet creation date',
                format: 'date-time',
              },
            },
          },
        },
      },
    },
  },
}

export const getPetSchema = {
  schema: {
    description: 'Get a pet',
    tags: ['Pets'],
    summary: 'Get a pet',
    params: {
      type: 'object',
      properties: {
        petId: {
          type: 'string',
          description: 'Pet ID',
          format: 'uuid',
        },
      },
      required: ['petId'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          pet: {
            type: 'object',
            properties: {
              ...basicPetSchema,
              photos: {
                type: 'array',
                items: { type: 'string' },
                description: 'Pet photos',
              },
              created_at: {
                type: 'string',
                format: 'date-time',
                description: 'Creation timestamp',
              },
              org_id: {
                type: 'string',
                format: 'uuid',
                description: 'Organization ID',
              },
            },
          },
        },
        required: ['pet'],
      },
    },
  },
}
