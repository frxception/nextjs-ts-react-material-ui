import renderer from 'react-test-renderer'
import httpMocks from 'node-mocks-http';
import { createMocks, createRequest, createResponse } from 'node-mocks-http'
import { listAPIHandler } from '../../../src/services/hotel';
import { NextApiRequest, NextApiResponse } from "next"
import HotelApi from '../hotels/index'
import { Hotel } from '@src/types/HotelTypes';

describe('Get hotel listings from', () => {
    // const mockHandler = jest.fn();
    // const mockReq = httpMocks.createRequest<NextApiRequest>();
    // const mockRes = httpMocks.createResponse<NextApiResponse>();

    // let req = createRequest({
    //     method: 'GET'
    //   })
    //   let res = createResponse()
    //   res.header('Access-Control-Allow-Origin', '*');

    beforeEach(() => {
        process.env.REMOTE_API_URL = "https://5df9cc6ce9f79e0014b6b3dc.mockapi.io"
    })

    // const { req, res } = createMocks({
    //     method: 'GET',
    //     query: {
    //         partnerId: '1',
    //         currency: 'SGD',
    //     }
    // })

    
    
    it("should /api/hotels with default SGD", async () => {
        // const mockHandler = jest.fn();
        let mockReq = httpMocks.createRequest<NextApiRequest>();
        let mockRes = httpMocks.createResponse<NextApiResponse>();

        const partnerId = 1;
        const currency = 'SGD'
        
        // @ts-ignore
        mockReq.query = { partnerId, currency };

        // mockReq.query['partnerId'] = '1';
        // mockReq.query['currency'] = 'SGD';
        // context.req['query']['currency'] = 1;
        // const apiURL = 'https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo' //`/api/hotels?partnerId=${1}&currency=SGD`;
        // const response = await (await fetch(apiURL)).json();
        
        // const response = await listAPIHandler(context, false);
        // @ts-ignore
        const response = await HotelApi(mockReq, mockRes);
        // @ts-ignore
        // const responsex = await(call).json();
        // console.log(">>>> test response: ", response._getData())

        const data: Hotel = JSON.parse(mockRes._getData()) ;
        // console.log(">>>> test mockRes: ", data.currency);

        // const response = await HotelApi(req, req);
        // HotelApi(mockHandler)(mockReq, mockRes)
        // expect(mockRes.status).toBe(200);
        // expect(response).toBeTruthy();

        expect(mockRes._getStatusCode()).toBe(200);
        expect(data).toBeTruthy();
        expect(data.currency).toBe(currency)
        expect(data.hotels.length).toBeGreaterThan(0);


        // expect(response.status).toBe(200);
        // expect(response.length).toBeGreaterThan(0);

        // @ts-ignore
        // const tree = renderer.create(<Home {...response} />).toJSON()
        // expect(tree).toMatchSnapshot()
        // expect(response.data?.currency).toBe('SGD')
       
    });
});




// it('Renders correctly', async () => {
//   const req = createRequest({
//     method: 'GET'
//   })
//   const res = createResponse()
//   await apply(req, res)

//   const { props } = await getServerSideProps({ req, res })
//   const tree = renderer.create(<Home {...props} />).toJSON()
//   expect(tree).toMatchSnapshot()
// })
