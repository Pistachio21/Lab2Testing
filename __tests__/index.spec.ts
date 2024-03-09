const supertest = require('supertest')
import {app} from '../index';

describe('testing POST methods', () => {
    it('should create a new pog', async () => {
        const newPog = {
            name :'Sample Pog',
            ticker_symbol: 'SAMPLE',
            price: 1000,
            color: 'yellow'
        };
        const response = await supertest(app).post('/pogs').send(newPog);
        expect(response.statusCode).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
    });

    it('should handle errors properly', async () => {
        try {
            const newPog = {
                name: 'Error Pog',
                ticker_symbol: 'ERR',
                price: 100
            };
            await supertest(app).post('/pogs', newPog);
        } catch(err : any) {
            expect(err.status).toBe(422);
        }
    });
});

describe('testing GET method', () => {
    it('should get all pogs', async () => {
        const response = await supertest(app).get('/pogs')
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});

describe('testing GET method', () => {
    it('should get a pog by ID', async () => {
        const response = await supertest(app).get('/pogs/42')

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should handle if a pog is not found', async () => {
        try {
        const response = await supertest(app).get('/pogs/999')
        expect(response.statusCode).toBe(404);
        } catch (err: any) {
            expect(err.status).toBe(404)
        }
    });
});

describe('testing PUT method', () => {
    const updatedPog = {
        "name": 'Sample Pog',
        "ticker_symbol": 'UPDATED',
        "price": 2000,
        "color": 'red'
    };
    it('should update a pog based on ID', async () => {

        const response = await supertest(app).put('/pogs/38', updatedPog)
        expect(response.status).toBe(200);
        expect(response).toEqual(expect.any(Object));
    });

    it('should throw an error if a pog does not exist', async () => {
        try {
        const response = await supertest(app).put('/pogs/999', updatedPog)
        expect(response.status).toBe(404);
        } catch(err : any) {
            expect(err.response.status).toBe(404);
        }
    });
});

describe('testing DELETE method', () => {
    it('should delete a pog by ID', async () => {
        const response = await supertest(app).delete('/pogs/7');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: 'Record deleted' });
    });

    it('should throw an error if the pog does not exist', async () => {
        try {
            await supertest(app).delete('/pogs/999');
        } catch (error : any) {
            expect(error.response.statusCode).toBe(404);
            expect(error.response.body).toBe('Record not found');
        }
    });
});