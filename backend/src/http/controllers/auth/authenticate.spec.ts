import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { app} from '@/app'
import request from 'supertest'

describe("Authenticate Org Controller - E2E", () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    test("Should be able to authenticate as an org", async () => {
        await request(app.server).post("/orgs").send({
            name: "Org 1",
            email: "org1@example.com",
            password: "123456",
            whatsapp: "11999999999",
            address: "Rua Teste",
            city: "São Paulo",
            description: "Org description",
            state: "SP",
            cep: "12345678",
        })

        const response = await request(app.server).post("/sessions").send({
            email: "org1@example.com",
            password: "123456",
        })

        expect(response.statusCode).toEqual(200)
    });
});