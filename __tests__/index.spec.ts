import supertest from 'supertest';
import { app } from "../src/index"
import { database } from "../src/routes";

let data: Record<string, any>;

beforeAll(async () => {
    data = await supertest(app).post('/pogs').send({
        name: 'Sample Pog',
        ticker_symbol: 'SAMPLE',
        price: 1000,
        color: 'yellow'
    });
})

describe('testing POST methods', () => {
    it('should create a new pog', async () => {
        const newPog = {
            name: 'Another Sample Pog',
            ticker_symbol: 'SAMPLE 1',
            price: 1001,
            color: 'blue'
        };
        const response = await supertest(app).post('/pogs').send(newPog);
        expect(response.statusCode).toBe(201);
        expect(response.body[0]).toEqual(expect.objectContaining(newPog));
        await supertest(app).delete(`/pogs/${response.body[0].id}`);
    });

    it('should handle errors properly', async () => {
        try {
            const newPog = {
                name: 'Error Pog',
                ticker_symbol: 'ERR',
                price: 100
            };
            await supertest(app).post('/pogs').send(newPog);
        } catch (err: any) {
            expect(err.status).toBe(422);
        }
    });
});

describe('testing GET method', () => {

    it('should get all pogs', async () => {
        const response = await supertest(app).get('/pogs');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should get a pog by ID', async () => {
        const id = data.body[0].id;
        const response = await supertest(app).get(`/pogs/${id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body[0]).toEqual(expect.objectContaining({ id: id }));
    });

    it('should handle if a pog is not found', async () => {
        try {
            const response = await supertest(app).get('/pogs/999');
            expect(response.statusCode).toBe(404);
        } catch (err: any) {
            expect(err.status).toBe(404);
        }
    });
});

describe('testing PUT method', () => {

    const newPogData = {
        "name": 'Sample Pog',
        "ticker_symbol": 'SAMPLE',
        "price": 1000,
        "color": 'yellow'
    }

    const updatedPog = {
        "name": 'Sample Pog',
        "ticker_symbol": 'UPDATED',
        "price": 2000,
        "color": 'red'
    };

    it('should update a pog based on ID', async () => {
        const newPog = await supertest(app).post('/pogs').send(newPogData);
        const response = await supertest(app).put('/pogs/' + newPog.body[0].id).send(updatedPog);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining(updatedPog));
        await supertest(app).delete(`/pogs/${newPog.body[0].id}`);
    });

    it('should throw an error if a pog does not exist', async () => {
        try {
            const response = await supertest(app).put('/pogs/999').send(updatedPog);
            expect(response.status).toBe(404);
        } catch (err: any) {
            expect(err.response.status).toBe(404);
        }
    });
});

describe('testing DELETE method', () => {

    const newPogData = {
        "name": 'Sample Pog',
        "ticker_symbol": 'SAMPLE',
        "price": 1000,
        "color": 'yellow'
    }

    it('should delete a pog by ID', async () => {

        const newPog = await supertest(app).post('/pogs').send(newPogData);
        const response = await supertest(app).delete('/pogs/' + newPog.body[0].id);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: 'Record deleted' });
    });

    it('should throw an error if the pog does not exist', async () => {
        try {
            await supertest(app).delete('/pogs/999');
        } catch (error: any) {
            expect(error.response.statusCode).toBe(404);
            expect(error.response.body).toBe('Record not found');
        }
    });
});

afterAll(async () => {
    await supertest(app).delete(`/pogs/${data.body[0].id}`);
    await database.end()
})
