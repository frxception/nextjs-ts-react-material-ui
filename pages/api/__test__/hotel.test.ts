/**
 * @jest-environment node
 */
import httpMocks from 'node-mocks-http';
import { NextApiRequest, NextApiResponse } from "next"
import HotelApi from '../hotels/[id]'
import { Hotel } from '@src/types/HotelTypes';

describe('Get a hotel from the API', () => {
    let mockReq: NextApiRequest; //= httpMocks.createRequest<NextApiRequest>();
    let mockRes: NextApiResponse; // = httpMocks.createResponse<NextApiResponse>();

    beforeEach(() => {
        mockReq = httpMocks.createRequest<NextApiRequest>();
        mockRes = httpMocks.createResponse<NextApiResponse>();
        jest.setTimeout(50000);
    });
    
    it("should get hotel by ID (/api/hotels/2?partnerId=1&currency=SGD)", async () => {
        // let mockReq = httpMocks.createRequest<NextApiRequest>();
        // let mockRes = httpMocks.createResponse<NextApiResponse>();

        const partnerId = 1;
        const currency = 'SGD'
        const id = '2'

        mockRes.setHeader('Access-Control-Allow-Origin', '*');
        // @ts-ignore
        mockReq.query = { partnerId, currency, id };

        // @ts-ignore
        const response = await HotelApi(mockReq, mockRes);
        const data: Hotel = JSON.parse(mockRes._getData()) ;

        expect(mockRes._getStatusCode()).toBe(200);
        expect(data).toBeTruthy();
        expect(data.currency).toBe(currency);
        expect(data.hotels.length).toBe(1);

    });

    it("should get hotel by ID (/api/hotels/2?partnerId=1&currency=USD)", async () => {
        // let mockReq = httpMocks.createRequest<NextApiRequest>();
        // let mockRes = httpMocks.createResponse<NextApiResponse>();

        const partnerId = 1;
        const currency = 'USD'
        const id = '1'

        mockRes.setHeader('Access-Control-Allow-Origin', '*');
        // @ts-ignore
        mockReq.query = { partnerId, currency, id };

        // @ts-ignore
        const response = await HotelApi(mockReq, mockRes);
        const data: Hotel = JSON.parse(mockRes._getData()) ;

        expect(mockRes._getStatusCode()).toBe(200);
        expect(data).toBeTruthy();
        expect(data.currency).toBe(currency);
        expect(data.hotels.length).toBe(1);

    });

    it("should get hotel by ID (/api/hotels/2?partnerId=1&currency=CNY)", async () => {
        // let mockReq = httpMocks.createRequest<NextApiRequest>();
        // let mockRes = httpMocks.createResponse<NextApiResponse>();

        const partnerId = 1;
        const currency = 'CNY'
        const id = '1'

        mockRes.setHeader('Access-Control-Allow-Origin', '*');
        // @ts-ignore
        mockReq.query = { partnerId, currency, id };

        // @ts-ignore
        const response = await HotelApi(mockReq, mockRes);
        const data: Hotel = JSON.parse(mockRes._getData()) ;

        expect(mockRes._getStatusCode()).toBe(200);
        expect(data).toBeTruthy();
        expect(data.currency).toBe(currency);
        expect(data.hotels.length).toBe(1);

    });

    it("should get hotel by ID (/api/hotels/2?partnerId=1&currency=KRW)", async () => {
        // let mockReq = httpMocks.createRequest<NextApiRequest>();
        // let mockRes = httpMocks.createResponse<NextApiResponse>();

        const partnerId = 1;
        const currency = 'KRW'
        const id = '1'

        mockRes.setHeader('Access-Control-Allow-Origin', '*');
        // @ts-ignore
        mockReq.query = { partnerId, currency, id };

        // @ts-ignore
        const response = await HotelApi(mockReq, mockRes);
        const data: Hotel = JSON.parse(mockRes._getData()) ;

        expect(mockRes._getStatusCode()).toBe(200);
        expect(data).toBeTruthy();
        expect(data.currency).toBe(currency);
        expect(data.hotels.length).toBe(1);

    });


});


