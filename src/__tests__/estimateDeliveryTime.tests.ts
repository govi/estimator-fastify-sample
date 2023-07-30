const mockCintRequest = jest.fn()
jest.mock('../cint-proxies/cintFetchFeasibilityEstimates', () => mockCintRequest)

import estimateDeliveryTime from '../estimateDeliveryTime';

describe('estimateDeliveryTime tests', () => {
  beforeEach(() => mockCintRequest.mockClear());

  it('select day in 2 calls', async () => {
    mockCintRequest.mockImplementation(() => 1)
    const result = await estimateDeliveryTime(100, 20)
    expect(mockCintRequest).toHaveBeenCalledTimes(2)
    expect(result).toEqual('1 Day')
  })

  it('select week in 2 calls', async () => {
    mockCintRequest.mockImplementation((a, b, c) => c > 6 ? 1 : 0.5 )
    const result = await estimateDeliveryTime(100, 20)
    expect(mockCintRequest).toHaveBeenCalledTimes(2)
    expect(result).toEqual('1 Week')
  })

  it('select month in 2 calls', async () => {
    mockCintRequest.mockImplementation((a, b, c) => c > 7 ? 1 : 0.5 )
    const result = await estimateDeliveryTime(100, 20)
    expect(mockCintRequest).toHaveBeenCalledTimes(2)
    expect(result).toEqual('1 Month')
  })

  it('fails in 2 calls', async () => {
    mockCintRequest.mockImplementation(() => 0.5 )
    const result = await estimateDeliveryTime(100, 20)
    expect(mockCintRequest).toHaveBeenCalledTimes(2)
    expect(result).toBe('Never')
  })
})