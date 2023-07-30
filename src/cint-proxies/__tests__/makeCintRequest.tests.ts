const mockFetch = jest.fn()
jest.mock('node-fetch', () => mockFetch)

import makeRequest from '../makeCintRequest';

mockFetch.mockImplementation(() => ({ json: () => ({ feasibility: 0}), ok: true}))

describe('makeRequests tests', () => {
  beforeEach(() => mockFetch.mockClear());

  it('test golden path', async () =>  {
    await makeRequest('sample/getSamples', { payload: 'test'})
    expect(mockFetch.mock.calls[0][0]).toEqual('https://example.com/sample/getSamples')
    const opts = mockFetch.mock.calls[0][1]
    expect(opts['method']).toEqual('POST')  
    expect(opts['headers']['X-Api-Key']).toEqual('123456')
    expect(opts['body']).toEqual('{"payload":"test"}')
  })
})