import axios from 'axios'

describe('testing POST methods', () => {
    it('should create a new pog', async () => {
        const newPog = {
            "name": 'Sample Pog',
            "ticker_symbol": 'SAMPLE',
            "price": 1000,
            "color": 'yellow'
        };
        const response = await axios.post('http://localhost:5000/pogs', newPog);
        expect(response.status).toBe(201);
        expect(response.data).toBeInstanceOf(Object);
    });

    it('should handle errors properly', async () => {
        try {
            const newPog = {
                name: 'Error Pog',
                ticker_symbol: 'ERR',
                price: 100,
                color: 'green'
            };
            await axios.post('http://localhost:5000/pogs', newPog);
        } catch(err : any) {
            expect(err.response.status).toBe(422);
        }
    });
    
});

describe('testing GET method', () => {
    it('should get all pogs', async () => {
        const response = await axios.get('http://localhost:5000/pogs')
        expect(response.status).toBe(200);
        expect(response.data).toBeInstanceOf(Array);
    });
});

describe('testing GET method', () => {
    it('should get a pog by ID', async () => {
        const response = await axios.get('http://localhost:5000/pogs/2')

        expect(response.status).toBe(200);
        expect(response.data).toBeInstanceOf(Array);
    });

    it('should handle if a pog is not found', async () => {
        try {
        const response = await axios.get('http://localhost:5000/pogs/999')
        expect(response.status).toBe(404);
        } catch (err: any) {
            expect(err.response.status).toBe(404)
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

        const response = await axios.put('http://localhost:5000/pogs/11', updatedPog)
        expect(response.status).toBe(200);
        expect(response).toEqual(expect.any(Object));
    });

    it('should throw an error if a pog does not exist', async () => {
        try {
        const response = await axios.put('http://localhost:5000/pogs/999', updatedPog)
        expect(response.status).toBe(404);
        } catch(err : any) {
            expect(err.response.status).toBe(404);
        }
    });
});

describe('testing DELETE method', () => {
    it('should delete a pog by ID', async () => {
        const response = await axios.delete('http://localhost:5000/pogs/13');

        expect(response.status).toBe(200);
        expect(response.data).toEqual({ message: 'Record deleted' });
    });

    it('should throw an error if the pog does not exist', async () => {
        try {
            await axios.delete('http://localhost:5000/pogs/999');
        } catch (error : any) {
            expect(error.response.status).toBe(404);
            expect(error.response.data).toBe('Record not found');
        }
    });
});