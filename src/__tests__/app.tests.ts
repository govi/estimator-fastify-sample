const mockFetch = jest.fn()
jest.mock('node-fetch', () => mockFetch)

import app from '../app'

mockFetch.mockImplementation(() => ({ json: () => ({ feasibility: 0}), ok: true, status: 200}))

describe('test endpoint', () => {
  beforeEach(() => mockFetch.mockClear());

  it('basic test', async () => {
    const a = app()
    const response = await a.inject({
      method: 'GET',
      url: '/planning/estimateDeliveryTime',
      query: {limit: '100', lengthOfInterview: '35'},
    })
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual('Never')
  })

  it('when upstream fails with an error code, respond with same code and message', async () => {
    const a = app()
    mockFetch.mockImplementationOnce(() => ({ json: () => ({ errors: [{field: 'thing', message: 'has no value'}]}), ok: false, status: 412}))

    const response = await a.inject({
      method: 'GET',
      url: '/planning/estimateDeliveryTime',
      query: {limit: '100', lengthOfInterview: '35'},
    })
    
    expect(response.statusCode).toBe(412)
    expect(response.body).toEqual('thing: has no value')
  })

  it('when upstream fails with an error code but no message, should return generic error', async () => {
    const a = app()
    mockFetch.mockImplementationOnce(() => ({ json: () => ({ }), ok: false, status: 412}))

    const response = await a.inject({
      method: 'GET',
      url: '/planning/estimateDeliveryTime',
      query: {limit: '100', lengthOfInterview: '35'},
    })
    
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual('Upstream request failed with response code 412')
  })
})