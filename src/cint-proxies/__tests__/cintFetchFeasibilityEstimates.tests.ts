const mockMakeRequest = jest.fn()
jest.mock('../makeCintRequest', () => mockMakeRequest)

import cintFetchFeasibilityEstimates from '../cintFetchFeasibilityEstimates'

mockMakeRequest.mockImplementation(() => ({ feasibility: 0}))

describe('cintFetchFeasibility tests', () => {  
  beforeEach(() => mockMakeRequest.mockClear());

  it('should provide results for a simple request', async () => {
    expect.assertions(2)

    await cintFetchFeasibilityEstimates(100, 20, 3)

    expect(mockMakeRequest.mock.calls[0][0]).toEqual('ordering/FeasibilityEstimates')
    expect(mockMakeRequest.mock.calls[0][1]).toEqual({
      'incidenceRate': 100,
      'countryId': 1,
      'quotaGroups': [
        {
          'quotas': [
            {
              'limit': 100,
              'targetGroup': {
                'minAge': 18,
                'maxAge': 99
              }
            }
          ]
        }
      ],
      'limit': 100,
      'lengthOfInterview': 20,
      'fieldPeriod': 3
    })
  })

  it('should propagate the error when makeRequest borks', () => {
    mockMakeRequest.mockImplementation(() => {throw new Error('Some upstream failure')}) 
    expect(cintFetchFeasibilityEstimates(100, 20, 3)).rejects.toThrow('Some upstream failure')
  })
})