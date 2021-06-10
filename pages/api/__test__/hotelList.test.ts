
import httpMocks from 'node-mocks-http';
import { NextApiRequest, NextApiResponse } from "next"
import HotelApi from '../hotels/index'
import { Hotel, HotelProps } from '@src/types/HotelTypes';
import { listAPIHandler } from '@src/services/hotel';
import { ProfileSettings } from '@src/components/config/types';


describe('Get hotel List REMOTE MOCK API for all currencies (/api/hotels)', () => {
    let mockReq: NextApiRequest; //= httpMocks.createRequest<NextApiRequest>();
    let mockRes: NextApiResponse; // = httpMocks.createResponse<NextApiResponse>();

    beforeEach(() => {
        mockReq = httpMocks.createRequest<NextApiRequest>();
        mockRes = httpMocks.createResponse<NextApiResponse>();
        jest.setTimeout(50000);

    });

    it("should get all hotels by SGD", async () => {
        // let mockReq = httpMocks.createRequest<NextApiRequest>();
        // let mockRes = httpMocks.createResponse<NextApiResponse>();

        const partnerId = 1;
        const currency = 'SGD'
        
        // @ts-ignore
        mockReq.query = { partnerId, currency };

        // @ts-ignore
        const response = await HotelApi(mockReq, mockRes);
        const data: Hotel = JSON.parse(mockRes._getData()) ;
        // console.log(">>>> test mockRes: ", data.currency);

        expect(mockRes._getStatusCode()).toBe(200);
        expect(data).toBeTruthy();
        expect(data.currency).toBe(currency)
        expect(data.hotels.length).toBeGreaterThan(0);

       
    });


    it("should get all hotels by USD", async () => {
        // let mockReq = httpMocks.createRequest<NextApiRequest>();
        // let mockRes = httpMocks.createResponse<NextApiResponse>();

        const partnerId = 1;
        const currency = 'USD'
        
        // @ts-ignore
        mockReq.query = { partnerId, currency };

        // @ts-ignore
        const response = await HotelApi(mockReq, mockRes);
        const data: Hotel = JSON.parse(mockRes._getData()) ;

        expect(mockRes._getStatusCode()).toBe(200);
        expect(data).toBeTruthy();
        expect(data.currency).toBe(currency)
        expect(data.hotels.length).toBeGreaterThan(0);

    });

    it("should get all hotels by CNY", async () => {
        // let mockReq = httpMocks.createRequest<NextApiRequest>();
        // let mockRes = httpMocks.createResponse<NextApiResponse>();

        const partnerId = 1;
        const currency = 'CNY'
        
        // @ts-ignore
        mockReq.query = { partnerId, currency };

        // @ts-ignore
        const response = await HotelApi(mockReq, mockRes);
        const data: Hotel = JSON.parse(mockRes._getData()) ;

        expect(mockRes._getStatusCode()).toBe(200);
        expect(data).toBeTruthy();
        expect(data.currency).toBe(currency)
        expect(data.hotels.length).toBeGreaterThan(0);
       
    });


    it("should get all hotels by KRW", async () => {
        // let mockReq = httpMocks.createRequest<NextApiRequest>();
        // let mockRes = httpMocks.createResponse<NextApiResponse>();

        const partnerId = 1;
        const currency = 'KRW'
        
        // @ts-ignore
        mockReq.query = { partnerId, currency };

        // @ts-ignore
        const response = await HotelApi(mockReq, mockRes);
        const data: Hotel = JSON.parse(mockRes._getData()) ;

        expect(mockRes._getStatusCode()).toBe(200);
        expect(data).toBeTruthy();
        expect(data.currency).toBe(currency)
        expect(data.hotels.length).toBeGreaterThan(0);
       
    });


});



describe('Get hotel List LOCAL API for all currencies (/api/hotels)', () => {
    // let mockReq = httpMocks.createRequest<NextApiRequest>();
    // let mockRes = httpMocks.createResponse<NextApiResponse>();
    let mockReq: NextApiRequest; 
    let mockRes: NextApiResponse; 

    beforeEach(() => {
        mockReq = httpMocks.createRequest<NextApiRequest>();
        mockRes = httpMocks.createResponse<NextApiResponse>();
        jest.setTimeout(50000);

    });
    it("should get local hotels (/api/hotels?partnerId=1&currency=SGD)", async () => {

        const partnerId = 1;
        const currency = 'SGD'
        
        // @ts-ignore
        mockReq.query = { partnerId, currency };

        // @ts-ignore
        // const response = await HotelApi(mockReq, mockRes);
        // const data: Hotel = JSON.parse(mockRes._getData()) ;

        const context = {
            req: mockReq,
            res: mockRes
        }
        const result: HotelProps  = await(await listAPIHandler(context, false) as HotelProps);
        const data: Hotel = {...result.data};
        const settings: ProfileSettings = {...result.settings}

        // expect(mockRes._getStatusCode()).toBe(200);
        expect(data).toBeTruthy();
        expect(data.currency).toBe(currency)
        expect(data.hotels.length).toBeGreaterThanOrEqual(1);

        expect(settings.currency).toBe(currency)
        expect(settings.partnerId.toString()).toBe('1')


    });
});