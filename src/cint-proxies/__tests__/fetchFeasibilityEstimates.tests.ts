const mockMakeRequest = jest.fn()
jest.mock('../makeRequest', () => mockMakeRequest)

import fetchFeasibilityEstimates from '../fetchFeasibilityEstimates'

mockMakeRequest.mockImplementation(() => ({ feasibility: 0}))

describe('fetchFeasibility tests', () => {  
  beforeEach(() => mockMakeRequest.mockClear());

  it('should provide results for a simple request', async () => {
    expect.assertions(2)
    const payload = {
      fieldPeriod: 3,
      lengthOfInterview: 20,
      limit: 100
    }

    await fetchFeasibilityEstimates(payload)

    expect(mockMakeRequest.mock.calls[0][0]).toEqual('ordering/FeasibilityEstimates')
    expect(mockMakeRequest.mock.calls[0][1]).toEqual({
      'incidenceRate': 100,
      'countryId': 1,
      'quotaGroups': [
        {
          'quotas': [
            {
              'limit': payload.limit,
              'targetGroup': {
                'minAge': 18,
                'maxAge': 99
              }
            }
          ]
        }
      ],
      'limit': payload.limit,
      'lengthOfInterview': payload.lengthOfInterview,
      'fieldPeriod': payload.fieldPeriod
    })
  })

  it('should propagate the error when makeRequest borks', () => {
    mockMakeRequest.mockImplementation(() => {throw new Error('Some upstream failure')}) 
    const payload = {
      fieldPeriod: 3,
      lengthOfInterview: 20,
      limit: 100
    }

    expect(fetchFeasibilityEstimates(payload)).rejects.toThrow('Some upstream failure')
  })
})